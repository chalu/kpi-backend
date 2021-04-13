/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * HTTP request schema for getting Sandbox API calls KPI data
 */
export type APICallsKPIRequest = {
    /**
     * UNIX timestamp (inclusive) of the start date for API calls to include
     */
    fromDate: string;
    /**
     * UNIX timestamp (inclusive) of the end date for API calls to include
     */
    toDate: string;
    /**
     * Set to `true` to eliminate duplicate entries in the response
     */
    uniqueEntries: boolean;
}
