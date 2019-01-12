/**
 * Represent streamlabs client configuration options
 *
 * @export
 * @interface IStreamlabsWSOptions
 */
export interface IStreamlabsWSOptions {
    /**
     * Required streamlabs access token
     *
     * @type {string}
     */
    token: string;
    /**
     * Boolean responsible for propagating test events or not
     *
     * @type {boolean}
     */
    emitTests?: boolean;
    /**
     * Array of strings represents addition socket.io events to listen to
     *
     * @type {string[]}
     */
    rawEvents?: string[];
}
