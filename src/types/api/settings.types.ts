export type PlanPrices = {
    one_month: string;
    six_month: string;
    one_year: string;
};

export interface IPrice_C {
    month: string,
    year: string,
}

export interface IPrice_E {
    hours: string,
    days: string,
    month: string,
}