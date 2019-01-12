import { IStreamlabsWSEventMessageBase } from "../IStreamlabsWSEvent";

/**
 * Represents a streamlabs follow event
 *
 * @export
 * @interface ITwitchMerch
 */
export interface ITwitchMerch extends IStreamlabsWSEventMessageBase {
    name: string;
    message: string;
    to: { 
        name: string;
    }
    from: string;
    product: string;
    imageHref: string;
    condition: string;
}
