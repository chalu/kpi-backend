/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * HTTP response schema for Sandbox KPI figures
 */
export type KPIFigureResponse = {
    /**
     * The number of API calls for the given date range
     */
    outcome: number;
    /**
     * Optional response message for the KPI, e.g what the KPI actually was
     */
    message?: string;
}
