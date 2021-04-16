/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * HTTP request schema for getting Sandbox API calls KPI data
 */
export type APIsUseRequest = {
    /**
     * UNIX timestamp of the start date (inclusive) for API calls to include
     */
    fromDate: string;
    /**
     * UNIX timestamp of the end date (exclusive) for API calls to include
     */
    toDate: string;
}
