import { IStreamlabsWSEventMessageBase } from "../IStreamlabsWSEvent";

/**
 * Represents a streamlabs donation event
 *
 * @export
 * @interface IStreamlabsDonation
 */
export interface IStreamlabsDonation extends IStreamlabsWSEventMessageBase{
    name: string;
    amount: string;
    formatted_amount: string;
    formattedAmount: string;
    message: string;
    currency: string;
    emotes?: any;
    iconClassName: string;
    to: {
        name: string
    };
    from: string;
    from_user_id?: any;
}
