import { IStreamlabsWSEventMessageBase } from "../IStreamlabsWSEvent";

/**
 * Represents a streamlabs subscription event
 *
 * @export
 * @interface ITwitchSub
 */
export interface ITwitchSub extends IStreamlabsWSEventMessageBase {
    name: string;
    months: number;
    message: string;
    emotes?: any;
    sub_plan: number;
    sub_plan_name: string;
    sub_type: string;
}
