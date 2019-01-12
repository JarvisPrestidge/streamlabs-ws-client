import * as EventEmitter from "eventemitter3";
import * as IO from "socket.io-client";
import { isArray, removeCommas, removeNonNumeric } from "./utils/helpers";
import {
    isBits,
    isDonation,
    isFollow,
    isHost,
    isMerch,
    isRaid,
    isSubscription
} from "./utils/guards";
import { IStreamlabsWSEvent } from "./interfaces/events/IStreamlabsWSEvent";
import { IStreamlabsWSOptions } from "./interfaces/IStreamlabsWSOptions";


/**
 * Streamlabs Socket Client 
 *
 * @class StreamlabsClient
 * @extends {EventEmitter}
 */
class StreamlabsClient extends EventEmitter {

    private readonly BASE_URL = "https://sockets.streamlabs.com/?token=";

    private token: string;
    private emitTests?: boolean;
    private rawEvents?: string[];
    private idTable = new Set();
    private client!: SocketIOClient.Socket;

    /**
     * Creates an instance of StreamlabsClient.
     *
     * @param {IStreamlabsWSOptions} options
     */
    constructor(options: IStreamlabsWSOptions) {
        super();

        const { token, emitTests, rawEvents } = options;

        if (!token || typeof token !== "string") {
            throw new Error("[STREAMLABS-WS-CLIENT]: constructor expected `token` of type string");
        }

        this.token = token;
        this.emitTests = emitTests;
        this.rawEvents = rawEvents;
    }

    /**
     * Create an instance of a socket.io-client ready to connect
     *
     * @private
     * @returns
     */
    private createClient() {
        if (this.client) {
            return;
        }

        const socketUrl = `${this.BASE_URL}${this.token}`;

        const socketIOClientOptions: SocketIOClient.ConnectOpts = {
            autoConnect: false,
            forceJSONP: false
        };

        this.client = IO(socketUrl, socketIOClientOptions);

        this.hookEventListeners();
        this.hookRawEventListeners();
    }

    /**
     * Connect client to streamlabs websocket service
     */
    public connect() {
        this.createClient();
        this.client.connect();
    }

    /**
     * Disconnect client from streamlabs websocket service
     */
    public disconnect() {
        if (this.client) {
            this.client.disconnect();
        }
    }

    /**
     * Hook streamlabs events and handle each message individually
     *
     * @private
     */
    private hookEventListeners() {
        this.client.on("event", (event: IStreamlabsWSEvent) => {

            try {
                // Assert event.message is array
                if (!isArray(event.message)) {
                    throw new Error("[STREAMLABS-WS-CLIENT]: event.message must be an array");
                }

                for (const message of event.message) {
                    const currentEventMessage: IStreamlabsWSEvent = event;
                    currentEventMessage.message = message;
                    this.handleEvent(currentEventMessage);
                }
            } catch (error) {
                this.emit("error", error);
            }
        });
    }

    /**
     * Hook raw socket io client events
     *
     * @private
     * @returns
     */
    private hookRawEventListeners() {

        // Return early if no events specified
        if (!this.rawEvents) {
            return;
        }

        for (const eventName of this.rawEvents) {
            this.client.on(eventName, (...data: any[]) => {
                this.emit(eventName, ...data);
            });
        }
    }

    /**
     * Core event handling logic
     *
     * @private
     * @param {*} event
     * @returns
     */
    private handleEvent(event: IStreamlabsWSEvent) {

        // Now assert event.message is not an array
        if (isArray(event.message)) {
            throw new Error("[STREAMLABS-WS-CLIENT]: event.message is expected to be a single object");
        }

        // Check for repeat message
        if (this.idTable.has(event.message._id)) {
            return;
        }

        // Otherwise add to id table 
        this.idTable.add(event.message._id);

        // Return early if configured not to emit tests 
        if (!this.emitTests && event.message && event.message.isTest) {
            return;
        }

        const isTest = !!event.message.isTest;

        switch (event.type) {

            case "follow": {

                // Assert follow event
                if (!isFollow(event)) {
                    throw new Error("[STREAMLABS-WS-CLIENT]: event expected to be of type `follow`");
                }

                this.emit("follow", {
                    ...event.message,
                    platform: "twitch",
                    isTest
                });

                break;
            }

            case "subscription": {

                // Assert subscription event
                if (!isSubscription(event)) {
                    throw new Error("[STREAMLABS-WS-CLIENT]: event expected to be of type `subscription`");
                }

                // Assert single message object
                if (isArray(event.message)) {
                    throw new Error("[STREAMLABS-WS-CLIENT]: event.message is expected to be a single object");
                }

                // Ensure months is of type number
                const months = Number(removeCommas(event.message.months));

                const isReSub = event.message.sub_type && event.message.sub_type === "resub";

                if (isReSub) {
                    this.emit("resubscription", {
                        ...event.message,
                        platform: "twitch",
                        months,
                        isTest
                    });
                } else {
                    this.emit("subscription", {
                        ...event.message,
                        platform: "twitch",
                        months,
                        isTest
                    });
                }

                break;
            }

            case "donation": {

                // Assert donation event
                if (!isDonation(event)) {
                    throw new Error("[STREAMLABS-WS-CLIENT]: event expected to be of type `donation`");
                }

                // Assert single message object
                if (isArray(event.message)) {
                    throw new Error("[STREAMLABS-WS-CLIENT]: event.message is expected to be a single object");
                }

                // Ensure amount is of type number
                const amount = Number(removeNonNumeric(event.message.amount));

                this.emit("donation", {
                    ...event.message,
                    platform: "streamlabs",
                    amount,
                    isTest
                });

                break;
            }

            case "host": {

                // Assert host event
                if (!isHost(event)) {
                    throw new Error("[STREAMLABS-WS-CLIENT]: event expected to be of type `host`");
                }

                // Assert single message object
                if (isArray(event.message)) {
                    throw new Error("[STREAMLABS-WS-CLIENT]: event.message is expected to be a single object");
                }

                // Ensure viewers is of type number
                const viewers = Number(removeNonNumeric(event.message.viewers));

                this.emit("host", {
                    ...event.message,
                    platform: "twitch",
                    viewers,
                    isTest
                });

                break;
            }

            case "bits": {

                // Assert bits event
                if (!isBits(event)) {
                    throw new Error("[STREAMLABS-WS-CLIENT]: event expected to be of type `bits`");
                }

                // Assert single message object
                if (isArray(event.message)) {
                    throw new Error("[STREAMLABS-WS-CLIENT]: event.message is expected to be a single object");
                }

                // Ensure viewers is of type number
                const amount = Number(removeNonNumeric(event.message.amount));

                this.emit("bits", {
                    ...event.message,
                    platform: "twitch",
                    amount,
                    isTest
                });

                break;
            }

            case "raid": {

                // Assert bits event
                if (!isRaid(event)) {
                    throw new Error("[STREAMLABS-WS-CLIENT]: event expected to be of type `raid`");
                }

                // Assert single message object
                if (isArray(event.message)) {
                    throw new Error("[STREAMLABS-WS-CLIENT]: event.message is expected to be a single object");
                }

                // Ensure viewers is of type number
                const raiders = Number(removeNonNumeric(event.message.raiders));

                this.emit("raid", {
                    ...event.message,
                    platform: "twitch",
                    raiders,
                    isTest
                });

                break;
            }

            case "merch": {

                // Assert bits event
                if (!isMerch(event)) {
                    throw new Error("[STREAMLABS-WS-CLIENT]: event expected to be of type `merch`");
                }

                this.emit("merch", {
                    ...event.message,
                    platform: "twitch",
                    isTest
                });

                break;
            }

            default: {

                // Unknown event type
                this.emit(event.type, {
                    ...event.message,
                    isTest
                });

                break;
            }
        }
    }
}

export default StreamlabsClient;