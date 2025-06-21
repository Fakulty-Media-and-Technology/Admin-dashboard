import { IGeneric } from "./auth.types";

export interface IEventEstimate {
  start: string;
  end: string;
  currency:string
}

export interface IEventEstimateResponse extends IGeneric {
  data: {
    estimated_cost: number;
  };
}
