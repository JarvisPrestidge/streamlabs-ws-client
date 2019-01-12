import { IStreamlabsDonation } from "../interfaces/events/streamlabs/IStreamlabsDonation";
import { IStreamlabsWSEvent, StreamlabsWSEventMessage } from "../interfaces/events/IStreamlabsWSEvent";
import { ITwitchBits } from "../interfaces/events/twitch/ITwitchBits";
import { ITwitchFollow } from "../interfaces/events/twitch/ITwitchFollow";
import { ITwitchHost } from "../interfaces/events/twitch/ITwitchHost";
import { ITwitchMerch } from "../interfaces/events/twitch/ITwitchMerch";
import { ITwitchRaid } from "../interfaces/events/twitch/ITwitchRaid";
import { ITwitchSub } from "../interfaces/events/twitch/ITwitchSub";

/**
 * User-defined type guard for asserting a concrete event type
 *
 * @param {IStreamlabsWSEvent<StreamlabsWSEventMessage>} event
 * @returns {event is IStreamlabsWSEvent<ITwitchFollow>}
 */
export const isFollow = (event: IStreamlabsWSEvent<StreamlabsWSEventMessage>): event is IStreamlabsWSEvent<ITwitchFollow> => {
    return (event as IStreamlabsWSEvent<ITwitchFollow>).type === "follow";
};

/**
 * User-defined type guard for asserting a concrete event type
 *
 * @param {IStreamlabsWSEvent<StreamlabsWSEventMessage>} event
 * @returns {event is IStreamlabsWSEvent<ITwitchSub>}
 */
export const isSubscription = (event: IStreamlabsWSEvent<StreamlabsWSEventMessage>): event is IStreamlabsWSEvent<ITwitchSub> => {
    return (event as IStreamlabsWSEvent<ITwitchSub>).type === "subscription";
};

/**
 * User-defined type guard for asserting a concrete event type
 *
 * @param {IStreamlabsWSEvent<StreamlabsWSEventMessage>} event
 * @returns {event is IStreamlabsWSEvent<ITwitchBits>}
 */
export const isBits = (event: IStreamlabsWSEvent<StreamlabsWSEventMessage>): event is IStreamlabsWSEvent<ITwitchBits> => {
    return (event as IStreamlabsWSEvent<ITwitchBits>).type === "bits";
};

/**
 * User-defined type guard for asserting a concrete event type
 *
 * @param {IStreamlabsWSEvent<StreamlabsWSEventMessage>} event
 * @returns {event is IStreamlabsWSEvent<ITwitchHost>}
 */
export const isHost = (event: IStreamlabsWSEvent<StreamlabsWSEventMessage>): event is IStreamlabsWSEvent<ITwitchHost> => {
    return (event as IStreamlabsWSEvent<ITwitchHost>).type === "host";
};

/**
 * User-defined type guard for asserting a concrete event type
 *
 * @param {IStreamlabsWSEvent<StreamlabsWSEventMessage>} event
 * @returns {event is IStreamlabsWSEvent<ITwitchRaid>}
 */
export const isRaid = (event: IStreamlabsWSEvent<StreamlabsWSEventMessage>): event is IStreamlabsWSEvent<ITwitchRaid> => {
    return (event as IStreamlabsWSEvent<ITwitchRaid>).type === "raid";
};

/**
 * User-defined type guard for asserting a concrete event type
 *
 * @param {IStreamlabsWSEvent<StreamlabsWSEventMessage>} event
 * @returns {event is IStreamlabsWSEvent<ITwitchMerch>}
 */
export const isMerch = (event: IStreamlabsWSEvent<StreamlabsWSEventMessage>): event is IStreamlabsWSEvent<ITwitchMerch> => {
    return (event as IStreamlabsWSEvent<ITwitchMerch>).type === "merch";
};

/**
 * User-defined type guard for asserting a concrete event type
 *
 * @param {IStreamlabsWSEvent<StreamlabsWSEventMessage>} event
 * @returns {event is IStreamlabsWSEvent<IStreamlabsDonation>}
 */
export const isDonation = (event: IStreamlabsWSEvent<StreamlabsWSEventMessage>): event is IStreamlabsWSEvent<IStreamlabsDonation> => {
    const coercedEvent = (event as IStreamlabsWSEvent<IStreamlabsDonation>);
    return coercedEvent.type === "donation" || (coercedEvent.type === undefined && coercedEvent.for === "streamlabs");
};
