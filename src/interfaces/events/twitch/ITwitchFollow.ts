import { IStreamlabsWSEventMessageBase } from "../IStreamlabsWSEvent";

/**
 * Represents a streamlabs follow event
 *
 * @export
 * @interface ITwitchFollow
 */
export interface ITwitchFollow extends IStreamlabsWSEventMessageBase {
    name: string;
}
