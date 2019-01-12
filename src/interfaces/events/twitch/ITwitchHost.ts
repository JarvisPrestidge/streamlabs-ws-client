import { IStreamlabsWSEventMessageBase } from "../IStreamlabsWSEvent";

/**
 * Represents a streamlabs host event
 *
 * @export
 * @interface ITwitchHost
 */
export interface ITwitchHost extends IStreamlabsWSEventMessageBase {
    name: string;
    viewers: string;
}
