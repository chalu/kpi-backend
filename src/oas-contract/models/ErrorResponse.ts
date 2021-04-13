/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Schema for error responses from the server
 */
export type ErrorResponse = {
    /**
     * A brief description of the error that occured or action the user might need to take
     */
    message: string;
    /**
     * An optional dictionary of keys and values for the error raised
     */
    details?: any;
}
