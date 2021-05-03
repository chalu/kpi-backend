/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * HTTP response schema for Sandbox KPI data
 */
export type KPIDataResponse = {
    /**
     * Optional response message for the KPI, e.g what the KPI actually was
     */
    message?: string;
    data: Array<any>;
}
