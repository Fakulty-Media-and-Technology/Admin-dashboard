import { IEditUser } from "@/types/api/profile.types";
import { IUserExample } from "@/types/api/users.types";

export const U_Table = [
  {
    name: "Mum's Soldier",
    email: "example@gmail.com",
    subs: "3",
    joined: "12-5-2023",
    sub_status: "active",
    verified: "yes",
  },
  {
    name: "Mum's Soldier",
    email: "example@gmail.com",
    subs: "2",
    joined: "12-5-2023",
    sub_status: "active",
    verified: "yes",
  },
  {
    name: "Mum's Soldier",
    email: "example@gmail.com",
    subs: "3",
    joined: "12-5-2023",
    sub_status: "active",
    verified: "no",
  },
  {
    name: "Mum's Soldier",
    email: "example@gmail.com",
    subs: "12",
    joined: "12-5-2023",
    sub_status: "active",
    verified: "yes",
  },
  {
    name: "Mum's Soldier",
    email: "example@gmail.com",
    subs: "3",
    joined: "12-5-2023",
    sub_status: "inactive",
    verified: "no",
  },
  {
    name: "Mum's Soldier",
    email: "example@gmail.com",
    subs: "3",
    joined: "12-5-2023",
    sub_status: "active",
    verified: "yes",
  },
  {
    name: "Mum's Soldier",
    email: "example@gmail.com",
    subs: "3",
    joined: "12-5-2023",
    sub_status: "inactive",
    verified: "no",
  },
  {
    name: "Mum's Soldier",
    email: "example@gmail.com",
    subs: "3",
    joined: "12-5-2023",
    sub_status: "inactive",
    verified: "yes",
  },
];

export const U_TableHeads = [
  "name",
  "email",
  "total subs",
  "joined",
  "sub status",
  "verified",
  "options",
];

export const Empty_User: IEditUser = {
  country_code: "",
  email: "",
  first_name: "",
  last_name: "",
  mobile: "",
  password: "",
  photo: {
    Bucket: "",
    Key: "",
  },
};

export const Empty_UserRP: IUserExample = {
  email: "",
  fullname: "",
  joined: "",
  subs: "",
  substatus: "",
  verified: "",
  photo: null,
  country_code: '',
  _id: '',
  walletBal: '',
  paymentHistory: []
};
