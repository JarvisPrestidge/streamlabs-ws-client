import { IStreamlabsWSEventMessageBase } from "../IStreamlabsWSEvent";

/**
 * Represents a streamlabs gifted subscription event
 *
 * @export
 * @interface ITwitchSubGift
 */
export interface ITwitchSubGift extends IStreamlabsWSEventMessageBase{
    from: string;
    emotes?: any;
    months: number;
    message: string;
    payload: any[];
    name: string;
    subPlan: string;
    gifter: string;
    count: number;
    repeat: boolean;
    createdAt: string;
    planName: string;
    hash: string;
    amount?: any;
}
