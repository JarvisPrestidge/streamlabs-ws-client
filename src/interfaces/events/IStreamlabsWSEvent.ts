import { IStreamlabsDonation } from "./streamlabs/IStreamlabsDonation";
import { ITwitchFollow } from "./twitch/ITwitchFollow";
import { ITwitchBits } from "./twitch/ITwitchBits";
import { ITwitchSub } from "./twitch/ITwitchSub";
import { ITwitchHost } from "./twitch/ITwitchHost";
import { ITwitchSubGift } from "./twitch/ITwitchSubGift";
import { ITwitchMerch } from "./twitch/ITwitchMerch";
import { ITwitchRaid } from "./twitch/ITwitchRaid";

export type StreamlabsWSEventPlatform =
    | "streamlabs"
    | "twitch";

export type StreamlabsWSEventType =
    | "follow"
    | "subscription"
    | "resubscription"
    | "bits"
    | "host"
    | "donation"
    | "raid"
    | "merch";

export type StreamlabsWSEventMessage =
    | IStreamlabsDonation
    | ITwitchFollow
    | ITwitchBits
    | ITwitchSub
    | ITwitchSubGift
    | ITwitchRaid
    | ITwitchMerch
    | ITwitchHost;

export type StreamlabsWSEventFor =
    | "streamlabs"
    | "twitch_account";

/**
 * Represents a streamlabs event
 *
 * @export
 * @interface IStreamlabsWSEvent
 * @template T
 */
export interface IStreamlabsWSEvent<T = StreamlabsWSEventMessage> {
    type: StreamlabsWSEventType;
    message: T[] | T;
    for?: StreamlabsWSEventFor;
    event_id?: string;
}

/**
 * Common properties for all streamlabs ws responses
 *
 * @export
 * @interface IStreamlabsWSEventMessageBase
 */
export interface IStreamlabsWSEventMessageBase {
    _id: string;
    isTest: boolean;
    platform: StreamlabsWSEventPlatform;
}
