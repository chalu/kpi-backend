/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * HTTP response schema for getting Sandbox API calls KPI data
 */
export type KPIResponse = {
    /**
     * The number of API calls for the given date range
     */
    outcome: number;
    /**
     * Optional response message for the KPI, e.g what the KPI actually was
     */
    message?: string;
}
