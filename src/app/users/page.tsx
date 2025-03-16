"use client";

import {
  deleteUsers,
  getAllUsers,
  updateUsers,
  useGetUsersQuery,
  usersbyID,
} from "@/api/userRPSlice";
import {
  AppButton,
  CustomInput,
  InputWithIcon,
  SelectInput,
  SelectInputForm,
} from "@/components/AppLayout";
import { Empty_UserRP, U_Table, U_TableHeads } from "@/config/data/user.data";
import { roboto_400, roboto_500 } from "@/config/fonts";
import useToggle from "@/hooks/useToggle";
import { TableComp } from "@/screens/AccScreen";
import { IUser, IUserExample, IUsersResponse } from "@/types/api/users.types";
import Lottie from "lottie-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingSpinner from "@/config/lottie/loading.json";


const Roles = ["Regular", "Client", "Admin", "Super Admin"];
const ClientRoles = ["Channels", "Events", "Tv Show", "Podcast"];

export const runtime = "edge";


export default function page() {
  const [stage, setStage] = useState<string>("main");
  const [userPic, setUserPic] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [phoneNo, setPhoneNo] = useState<string>("");
  const [gender, setGender] = useState<string>("Select your gender");
  const [verifyUser, setVerifyUser] = useState(false);
  const [isView, setIsView] = useState<boolean>(false);
  const [subscriptionStatus, setSubscriptionStatus] = useToggle();
  const [usersList, setUsersList] = useState<IUserExample[]>([]);
  const [usersListFiltered, setUsersListFiltered] = useState<IUserExample[]>(
    []
  );
  const [selectedUser, setSelectedUser] = useState<IUserExample>(Empty_UserRP);
  const [pg, setPg] = useState<number>(1);
  const [firstName, setFirstName] = useState<string>(
    selectedUser.fullname.split(" ")[0]
  );
  const [lastName, setLastName] = useState<string>(
    selectedUser.fullname.split(" ").slice(1).join(" ")
  );
  const [DOB, setDOB] = useState<string>("");
  const {
    data: usersRP,
    refetch,
    error,
    isSuccess,
    isLoading,
  } = useGetUsersQuery({ limit: 8, page: 1 }, {});
  const [paginationList, setPaginationList] = useState(
    [...Array(8)].map((_, i) => i + 1)
  );
  const paginationStep = 8;

  const handleNext = () => {
    setPaginationList((prevList) =>
      prevList.map((num) => num + paginationStep)
    );
  };

  const handlePrevious = () => {
    if (paginationList[0] === 1) return;
    setPaginationList((prevList) =>
      prevList.map((num) => Math.max(1, num - paginationStep))
    );
  };

  const transformUserData = (usersRP: IUser[]) => {
    // if(usersRP.len) return [];
    return usersRP.map((user) => ({
      fullname: user.fullname,
      email: user.email,
      subs: "0 ",
      _id: user._id,
      joined: new Date(user.joined).toLocaleDateString(),
      substatus: user.substatus,
      verified: user.verified ? "yes" : "no",
      photo: user.photo,
      country_code: user.country_code
    }));
  };

  function handleUsersList(data: IUsersResponse | undefined) {
    if (!data) return;
    const usersList = transformUserData(data.data);
    setUsersList(usersList);
    setUsersListFiltered(usersList);
  }

  async function getUserbyID(userID: string) {
    const res = await usersbyID(userID);
    if (res.ok && res.data) {
      setSelectedUser((prev) => ({
        ...prev,
        mobile: res.data?.data.mobile,
      }));

      setGender(res.data.data.gender ?? "No gender selected");
      setVerifyUser(res.data.data.verified)
    }
  }

  async function handleRefreshMedia(query?: number) {
    try {
      setLoading(true);
      const res = await getAllUsers({ limit: 8, page: query ?? pg })
      if (res.ok && res.data) {
        handleUsersList(res.data);
      } else {
        toast(`Opps! couldn't get upcoming list`, { type: "error" });
      }
    } catch (error) {
      toast(`Opps! couldn't get upcoming list`, { type: "error" });
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateUser() {
    try {
      setLoading(true);
      const formdata = new FormData();

      if (userPic) formdata.append('photo', userPic);
      formdata.append('firstName', firstName);
      formdata.append('lastName', firstName);
      formdata.append('email', selectedUser.email);
      formdata.append('countryCode', selectedUser.country_code);
      formdata.append('mobile', selectedUser.mobile ?? "");
      formdata.append('gender', gender.toLowerCase());
      formdata.append('dob', DOB);


      const res = await updateUsers(formdata, selectedUser._id);
      if (res.ok && res.data) {
        const resU = await getAllUsers({ limit: 8, page: pg });
        if (resU.ok && resU.data) {
          handleUsersList(resU.data);
          setSelectedUser(Empty_UserRP);
          setFirstName("");
          setLastName("");
          setDOB("");
          setStage("main");
        }
      } else {
        toast(res.data?.message, { type: "error" });
      }
    } catch (error) {
      toast("Opps! could not update user", { type: "error" });
    } finally {
      setLoading(false);
    }
  }

  function handleFilterUsers(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.trim() == "") {
      setUsersListFiltered(usersList);
    }
    const filtered = usersList.filter((user) =>
      user.fullname.includes(e.target.value)
    );
    setUsersListFiltered(filtered);
  }

  async function handleAddUser() { }

  async function handleDelete(id: string) {
    setUsersList(usersList.filter((user) => user._id !== id));
    const res = await deleteUsers(id);
    if (
      res.ok &&
      res.data &&
      res.data.message.includes("deleted successfully")
    ) {
      toast("user deleted successfully", { type: "info" });
      const resU = await getAllUsers({ limit: 8, page: pg });
      if (resU.ok && resU.data) {
        handleUsersList(resU.data);
      }
    } else {
      toast("Opps! couldn't delete user", { type: "info" });
      const resU = await getAllUsers({ limit: 8, page: pg });
      if (resU.ok && resU.data) {
        handleUsersList(resU.data);
      }
    }
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files) setUserPic(files[0]);
  }

  const handleAccForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    handleUsersList(usersRP);
  }, [isSuccess]);

  useEffect(() => {
    getUserbyID(selectedUser._id);
  }, [selectedUser.email]);

  switch (stage) {
    case "main":
      return (
        <section
          className={`${roboto_400.className} relative h-full overflow-y-auto pl-5`}
        >
          <div className="bg-black3 py-3 px-10">
            <p className="font-normal text-lg text-grey_700">Home / Users</p>
          </div>

          <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between pr-5">
            <div className="w-full sm:w-[326px] lg:w-[556px] flex items-center">
              <button className="rounded-l-[10px] bg-red_500 py-[14.5px] flex items-center justify-center w-[63px]">
                <Image
                  src="/searchIcon.svg"
                  width={20}
                  height={20}
                  alt="search"
                />
              </button>
              <input
                type="text"
                placeholder="Search User"
                className="font-normal text-[17px] py-3 pl-6 text-grey_700 flex-1 bg-black3 outline-none placeholder:text-grey_700"
                onChange={(e) => handleFilterUsers(e)}
              />
            </div>

            {/* add butn */}
            <div
              onClick={() => setStage("add")}
              className={`${roboto_500.className} ml-auto md:ml-0 mt-2 md:mt-0 font-medium text-lg text-white bg-red_500 rounded-r-[10px] py-[10px] text-center w-[145px] cursor-pointer`}
            >
              Add User
            </div>
          </div>

          <div className="relative w-full md:h-[80%] h-[60%] pb-10 overflow-y-auto mt-8 pr-5">
            <div className="absolute h-[700px] w-full py-5 pb-6 pl-0 -ml-4 sm:ml-0 sm:pl-3 pr-10 overflow-x-auto">
              <div className="h-full relative">
                <table className={`${roboto_400.className} w-full min-w-[810px]`}>
                  <thead className="">
                    <tr>
                      {U_TableHeads.map((t, i) => {
                        return (
                          <th
                            key={i}
                            className={`${roboto_500.className} font-medium text-lg text-white uppercase`}
                          >
                            {t}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {usersListFiltered.map((tx, indx) => {
                      return (
                        <tr key={indx} className="text-white">
                          <td className="text-white py-2 min-w-[180px] pl-5">
                            <div className="flex items-center justify-start pl-2 py-1 rounded">
                              <Image
                                src={tx.photo ? tx.photo : `/tablepic/mum.png`}
                                width={42}
                                height={42}
                                alt="profiles"
                                className="object-contain h-[42px] rounded-full"
                              />
                              <p
                                className={`${roboto_500.className} ml-6 font-medium text-[#fff] text-[15px]`}
                              >
                                {tx.fullname}
                              </p>
                            </div>
                          </td>
                          <td className="text-center font-normal text-xs underline">
                            {tx.email}
                          </td>
                          <td className="text-center font-normal text-xs capitalize">
                            {tx.subs} months
                          </td>
                          <td className="text-center font-normal text-xs">
                            {tx.joined}
                          </td>
                          <td className="text-center font-normal text-xs capitalize">
                            {tx.substatus}
                          </td>
                          <td className="text-center font-normal text-xs capitalize">
                            {tx.verified}
                          </td>
                          <td>
                            <div className="flex items-center justify-center gap-x-4">
                              <button
                                onClick={() => [
                                  setIsView(true),
                                  setStage("add"),
                                  setSelectedUser(tx),
                                  setFirstName(tx.fullname.split(" ")[0]),
                                  setLastName(
                                    tx.fullname.split(" ").slice(1).join(" ")
                                  ),
                                ]}
                              >
                                <Image
                                  src="/eyeWH.svg"
                                  width={16.97}
                                  height={13.5}
                                  alt="eyeWH"
                                />
                              </button>
                              <button
                                onClick={() => [
                                  setStage("add"),
                                  setSelectedUser(tx),
                                  setFirstName(tx.fullname.split(" ")[0]),
                                  setLastName(
                                    tx.fullname.split(" ").slice(1).join(" ")
                                  ),
                                ]}
                              >
                                <Image
                                  src="/edit.svg"
                                  width={14}
                                  height={14}
                                  alt="edit"
                                />
                              </button>
                              <button onClick={() => handleDelete(tx._id)}>
                                <Image
                                  src="/delete.svg"
                                  width={15}
                                  height={18}
                                  alt="delete"
                                />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <div className="absolute ml-5 md:ml-10 lg:ml-16 bg-black2  bottom-5 z-50 flex flex-row items-center">
                  <div
                    className={`${roboto_500.className} py-2 px-7 flex w-fit items-center border border-[#C4C4C438]`}
                  >
                    <button
                      onClick={handlePrevious}
                      className={`${roboto_400.className} font-normal mr-3 text-[17px] text-grey_800`}
                    >
                      <span className="text-white mr-2">{`<<`}</span>
                      Previous
                    </button>
                    <div className="text-grey_800 text-[17px] flex flex-row mr-1 font-medium space-x-1.5">
                      {paginationList.map((num, index) => {
                        const active = pg === num;

                        return (
                          <p
                            key={index}
                            onClick={() => [
                              setPg(num),
                              handleRefreshMedia(num),
                            ]}
                            className={`${active ? "text-red" : "text-[#C4C4C4]"
                              } cursor-pointer`}
                          >
                            {num}
                          </p>
                        );
                      })}
                      {"   "} ...
                    </div>
                    <button
                      onClick={() => handleNext()}
                      className={`${roboto_400.className} font-normal ml-2 text-[17px] text-grey_800`}
                    >
                      Next <span className="text-white ml-2">{`>>`}</span>
                    </button>
                  </div>

                  {loading && (
                    <Lottie
                      animationData={LoadingSpinner}
                      loop
                      style={{ width: 35, height: 35, marginLeft: 15 }}
                    />
                  )}
                </div>

              </div>
            </div>
          </div>

          {/* PAGINATION..................... */}

        </section>
      );

    case "add":
      return (
        <section
          className={`${roboto_400.className} relative h-full overflow-y-auto pl-5`}
        >
          <div className="bg-black3 py-3 px-10">
            <p className="font-normal text-lg text-grey_700">
              Home / Users{" "}
              {!isView ? (selectedUser.email !== "" ? "/ Edit" : "/ Add") : ""}
            </p>
          </div>

          <div className="mt-8 flex flex-col md:flex-row items-start  justify-between pr-5">
            <div className="flex ">
              <div className=" ml-14 relative w-fit">
                {/* Here */}
                {userPic ? (
                  <Image
                    src={URL.createObjectURL(userPic)}
                    width={105}
                    height={106}
                    alt=""
                    className="rounded"
                  />
                ) : (
                  <Image
                    src="/accDummy.svg"
                    width={105}
                    height={106}
                    alt=""
                    className="rounded"
                  />
                )}

                <div className="absolute -bottom-[3px] -right-[4px] z-10">
                  {!isView && (
                    <div className="w-fit relative">
                      <Image src="/accEdit.svg" alt="" width={20} height={20} />
                      <input
                        type="file"
                        accept=".png, .jpeg, .jpg"
                        className="absolute top-0 -left-3 opacity-0"
                        onChange={(e) => handleInput(e)}
                      />
                    </div>
                  )}
                </div>
              </div>

              {isView && (
                <div className="ml-4 mt-3">
                  <p
                    className={`${roboto_500.className} font-medium text-base text-white`}
                  >
                    WALLET BALANCE
                  </p>
                  <p className="font-normal font-sm text-grey_500">$0</p>
                </div>
              )}
            </div>

            {/* add butn */}
            <div
              onClick={() => [
                setStage("main"),
                setFirstName(""),
                setLastName(""),
                setSelectedUser(Empty_UserRP),
                setIsView(false),
              ]}
              className={`${roboto_500.className} cursor-pointer ml-auto md:ml-0 mt-2 md:mt-0 font-medium text-lg text-white bg-red_500 rounded-r-[10px] py-[10px] text-center w-[145px]`}
            >
              Back
            </div>
          </div>

          <div className="bg-black3 py-7 px-14 mt-4 ">
            <form
              className={`${roboto_400.className} `}
              onSubmit={(e) => handleAccForm(e)}
            >
              <div className="flex flex-col lg:flex-row items-start pt-5 sm:gap-x-0 gap-x-0 lg:gap-x-28 xl:gap-x-40">
                <div className="space-y-4 flex-1 w-full">
                  <div>
                    <label
                      htmlFor="firstName"
                      className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
                    >
                      FIRST NAME *
                    </label>
                    <CustomInput
                      type="text"
                      id="firstName"
                      className="font-normal text-grey_500 text-sm py-2 mt-2 border border-border_grey rounded-sm"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
                    >
                      LAST NAME *
                    </label>
                    <CustomInput
                      type="text"
                      id="lastName"
                      className="font-normal text-sm py-2 mt-2 border text-grey_500 border-border_grey rounded-sm"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center gap-x-5 lg:gap-x-10">
                    <div className="flex-1">
                      <p
                        className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
                      >
                        PHONE NUMBER *
                      </p>
                      <div className="flex item-center gap-x-3 mt-2">
                        {!isView && (
                          <SelectInputForm
                            placeholder="+234"
                            setType={setPhoneNo}
                            selectData={["+234"]}
                            className="border-border_grey w-[130px] text-grey_500 rounded-sm flex-1"
                          />
                        )}

                        <CustomInput
                          type="tel"
                          placeholder=""
                          className="font-normal flex-1 text-sm py-2 border placeholder:text-input_grey text-grey_500 border-border_grey rounded-sm"
                          value={selectedUser.mobile}
                          readOnly={isView}
                          onChange={(e) =>
                            setSelectedUser((prev) => ({
                              ...prev,
                              mobile: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>

                    {isView && (
                      <div className="flex-1">
                        <label
                          htmlFor="subscription"
                          className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
                        >
                          TOTAL SUBSCRIPTION *
                        </label>
                        <CustomInput
                          type="text"
                          id="subscription"
                          placeholder="3 Months"
                          className="font-normal text-sm py-2 mt-2 border text-grey_500 placeholder:text-input_grey border-border_grey rounded-sm"
                          value={selectedUser.subs + "Months"}
                          readOnly
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* right */}
                <div className="space-y-4 flex-1 w-full mt-5 lg:mt-0">
                  <div>
                    <label
                      htmlFor="dob"
                      className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
                    >
                      DATE OF BIRTH *
                    </label>
                    {isView ? (
                      <CustomInput
                        type="dob"
                        id="dob"
                        className="font-normal text-grey_500 text-sm py-2 mt-2 border border-border_grey rounded-sm"
                        //  value={}
                        readOnly
                      />
                    ) : (
                      <CustomInput
                        placeholder="DD/MM/YYYY"
                        type="date"
                        className="font-normal text-grey_500 text-sm py-2 mt-2 border border-border_grey rounded-sm placeholder:text-input_grey"
                        value={DOB}
                        onChange={(e) => setDOB(e.target.value)}
                      />
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="gender"
                      className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
                    >
                      GENDER *
                    </label>
                    {isView ? (
                      <CustomInput
                        type="gender"
                        id="gender"
                        className="font-normal text-grey_500 text-sm py-2 mt-2 border border-border_grey rounded-sm"
                        value={gender}
                        readOnly
                      />
                    ) : (
                      <SelectInputForm
                        placeholder={gender}
                        selectData={["Male", "Female"]}
                        setType={setGender}
                        className="font-normal capitalize text-sm py-2 mt-2 border border-border_grey rounded-sm"
                        textStyles="text-grey_500"
                      />
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
                    >
                      EMAIL ADDRESS *
                    </label>
                    <CustomInput
                      type="email"
                      id="email"
                      className="font-normal text-grey_500 text-sm py-2 mt-2 border border-border_grey rounded-sm"
                      value={selectedUser.email}
                      onChange={(e) =>
                        setSelectedUser((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                    />
                  </div>

                  {!isView ? (
                    <div>
                      <p
                        className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
                      >
                        PASSWORD *
                      </p>
                      <CustomInput
                        type="password"
                        placeholder="****************"
                        className="font-normal flex-1 text-sm py-2 mt-2 border border-border_grey rounded-sm placeholder:text-input_grey"
                        readOnly
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-x-5 lg:gap-x-10">
                      <div className="flex-1">
                        <label
                          htmlFor="membership"
                          className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
                        >
                          MEMBER SINCE *
                        </label>
                        <CustomInput
                          type="text"
                          id="membership"
                          placeholder="12 Nov 2020"
                          className="font-normal text-sm py-2 mt-2 border text-grey_500 placeholder:text-input_grey border-border_grey rounded-sm"
                          readOnly
                          value={selectedUser.joined}
                        />
                      </div>

                      <div className="flex-1">
                        <label
                          htmlFor="country"
                          className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
                        >
                          COUNTRY *
                        </label>
                        <CustomInput
                          type="text"
                          id="country"
                          placeholder="Nigeria"
                          className="font-normal text-sm py-2 mt-2 border text-grey_500 placeholder:text-input_grey border-border_grey rounded-sm"
                          readOnly
                        // value={}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-6 mt-4 -mb-5 flex flex-col sm:flex-row items-start sm:items-center gap-y-5 sm:gap-y-0">
                <div className="flex-1 flex items-center gap-x-6">
                  <p
                    className={`${roboto_500.className} capitalize font-medium text-white text-base ml-2.5`}
                  >
                    {isView ? "Verified status" : "Verify User"} *
                  </p>
                  <div
                    className={`w-[45px] h-[18px] flex items-center rounded-[15px] ${(
                      isView
                        ? selectedUser.verified.toLowerCase() === "yes"
                        : verifyUser
                    )
                      ? `${isView ? "bg-[#00E3A373]" : "bg-[#FF131373]"}`
                      : "bg-[#BCBDBD73]"
                      }`}
                  >
                    <div
                      onClick={() =>
                        isView ? console.log("nothing") : setVerifyUser(!verifyUser)
                      }
                      className={`w-[26px] h-[26px] rounded-full transition-all ease-in-out duration-500 ${(
                        isView
                          ? selectedUser.verified.toLowerCase() === "yes"
                          : verifyUser
                      )
                        ? `translate-x-5 ${isView ? "bg-[#00E3A3]" : "bg-red"
                        }`
                        : "-translate-x-0 bg-[#BCBDBD]"
                        } `}
                    />
                  </div>
                </div>

                {isView && (
                  <div className="flex-1 lg:ml-36 flex items-center gap-x-6">
                    <p
                      className={`${roboto_500.className} capitalize font-medium text-white text-base ml-2.5`}
                    >
                      Make admin *
                    </p>
                    <div
                      className={`w-[45px] h-[18px] flex items-center rounded-[15px] ${subscriptionStatus ? "bg-[#00E3A373]" : "bg-[#BCBDBD73]"
                        }`}
                    >
                      <div
                        onClick={setSubscriptionStatus}
                        className={`w-[26px] h-[26px] rounded-full transition-all ease-in-out duration-500 ${subscriptionStatus
                          ? "bg-[#00E3A3]"
                          : "-translate-x-0 bg-[#BCBDBD]"
                          } `}
                      />
                    </div>
                  </div>
                )}
              </div>

              {!isView && (
                <div className="flex justify-end">
                  <AppButton
                    isLoading={loading}
                    onClick={() =>
                      selectedUser._id !== ""
                        ? handleUpdateUser()
                        : handleAddUser()
                    }
                    style={{ alignSelf: "center" }}
                    className={`${roboto_500.className} font-medium text-lg text-white bg-green_400 rounded-[5px] w-[145px] py-2 mt-12`}
                    title="Save"
                  />
                </div>
              )}
            </form>

            {isView && <div className="mt-28">
              <p className={`${roboto_500.className} text-lg text-white`}>
                PAYMENT HISTORY
              </p>
              <div className="w-full mt-4 sm:w-[326px] lg:w-[556px] flex items-center">
                <button className="rounded-l-[10px] min-w-5 bg-red_500 py-[14.5px] flex items-center justify-center w-[63px]">
                  <Image
                    src="/searchIcon.svg"
                    width={20}
                    height={20}
                    alt="search"
                  />
                </button>
                <input
                  type="text"
                  placeholder="Search History"
                  className="font-normal text-[17px] py-3 pl-6 text-grey_700 flex-1 bg-[#00000054] outline-none placeholder:text-grey_700"
                />
              </div>

              <TableComp />
            </div>}
          </div>
        </section>
      );
  }
};

