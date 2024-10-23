import { IDashboardTOTAL, IDashboardUsers } from "@/types/api/dashboard.types";

export const RP_Overview = (data: IDashboardTOTAL | undefined) => {
  if (!data) return [];
  return [
    {
      name: "Total Movies/Series",
      value: data.totalMovieSeries.toString() ?? "0",
    },
    {
      name: "Total Documentaries",
      value: data.totalContents.toString() ?? "0",
    },
    {
      name: "Total Skits",
      value: data.totalSkits.toString() ?? "0",
    },
    {
      name: "Total Music Videos",
      value: data.totalMusicVideos.toString() ?? "0",
    },
    {
      name: "Total Events",
      value: data.totalActiveEvents.toString() ?? "0",
    },
    {
      name: "Total Channels",
      value: "0",
    },
  ];
};

export const RP_Overview_2 = (data: IDashboardUsers | undefined) => {
  if (!data) return [];
  return [
    {
      name: "Total Balance",
      value: data.totalBalance.total_balance.toString() ?? "0",
    },
    {
      name: "Total Users",
      value: data.totUsers.toString() ?? "0",
    },
    {
      name: "Active Subscriptions",
      value: data.activeSubscriptions.toString() ?? "0",
    },
    {
      name: "Free Users",
      value: data.freeUsers.toString() ?? "0",
    },
  ];
};

export const RP_Overview3 = [
  {
    name: "Blood Sisters",
    views: "637906",
    image: "blood",
  },
  {
    name: "Kambili",
    views: "637906",
    image: "kambili",
  },
  {
    name: "Breaded Life",
    views: "637906",
    image: "breaded",
  },
  {
    name: "Glamour Girls",
    views: "637906",
    image: "glamour",
  },
  {
    name: "Mum's Soldier",
    views: "637906",
    image: "mum",
  },
];

export const TableHeads_Dashboard = [
  "top movies",
  "top series",
  "top documentaries",
  "top music videos",
  "top channels",
];
