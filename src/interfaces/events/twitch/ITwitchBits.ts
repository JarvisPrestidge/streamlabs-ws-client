import { IStreamlabsWSEventMessageBase } from "../IStreamlabsWSEvent";

/**
 * Represents a streamlabs bits event
 *
 * @export
 * @interface ITwitchBits
 */
export interface ITwitchBits extends IStreamlabsWSEventMessageBase {
    name: string;
    amount: string;
    emotes?: any;
    message: string;
}
