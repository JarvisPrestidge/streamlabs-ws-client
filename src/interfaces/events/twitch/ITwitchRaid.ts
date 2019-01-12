import { IStreamlabsWSEventMessageBase } from "../IStreamlabsWSEvent";

/**
 * Represents a streamlabs raid event
 *
 * @export
 * @interface ITwitchRaid
 */
export interface ITwitchRaid extends IStreamlabsWSEventMessageBase {
    raiders: number;
    name: string;
}
