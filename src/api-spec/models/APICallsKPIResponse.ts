/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * HTTP response schema for getting Sandbox API calls KPI data
 */
export type APICallsKPIResponse = {
    /**
     * The number of API calls for the given date range
     */
    calls: number;
    /**
     * Optional response message for the request
     */
    message?: string;
}
