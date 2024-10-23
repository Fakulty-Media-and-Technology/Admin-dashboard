import { IGeneric } from "./auth.types";

export interface IDashboardTOTAL_Contents extends IGeneric {
  data: IDashboardTOTAL;
}

export interface IDashboardTOTAL_Users extends IGeneric {
  data: IDashboardUsers;
}

export interface IDashboardTOTAL {
  totalContents: number;
  totalMovieSeries: number;
  totalMusicVideos: number;
  totalSkits: number;
  totalActiveEvents: number;
}

export interface IDashboardUsers {
  totalBalance: {
    total_balance: number;
  };
  totUsers: number;
  freeUsers: number;
  activeSubscriptions: number;
}
