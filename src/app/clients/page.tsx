"use client"

import { createCLientAcc, getAllClients, useGetAllClientsQuery } from "@/api/clientSlice";
import { CLIENT_TH, DEPOSITS, WITHDRAWALS } from "@/config/data/live";
import { roboto_400, roboto_500, roboto_700 } from "@/config/fonts";
import { IClientsData, IClientsResponse, IPhoto } from "@/types/api/clients.types";
import Lottie from "lottie-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingSpinner from "@/config/lottie/loading.json";
import { TableComp } from "@/screens/AccScreen";
import { AppButton, CustomInput, SelectInputForm } from "@/components/AppLayout";
import useToggle from "@/hooks/useToggle";
import { IUserExample } from "@/types/api/users.types";
import { Empty_UserRP } from "@/config/data/user.data";
import { IUploadImage } from "@/types/api/upload.types";
import { uploadImage } from "@/api/upload";


const TABS = ['Clients', 'Deposits', 'Withdrawals', 'Tickets']


const page = () => {
  const [isAdd, setAddClient] = useState<boolean>(false);
  const [tab, setTab] = useState<string>('clients');
  const [clientList, setClientList] = useState<IClientsData[]>([]);
  const [clientFilteredList, setFilteredList] = useState<IClientsData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isViewClient, setIsViewClient] = useState<IClientsData | null>(null);
  const [isEditClient, setIsEditClient] = useState<IClientsData | null>(null);

  const {
    data: clientData,
    refetch,
    error,
    isSuccess,
    isLoading,
  } = useGetAllClientsQuery({ limit: 5, page }, {});

  function handleGetLists(data: IClientsResponse | undefined) {
    if (!data) return;
    const clients = data.data
    setClientList(clients);
    setFilteredList(clients);
  }

  async function handleGetRefreshList(query?: number) {
    try {
      setLoading(true);
      const res = await getAllClients({ limit: 5, page: query ?? page })
      if (res.ok && res.data) {
        handleGetLists(res.data)
      } else {
        toast(`Opps! couldn't get ${tab}`, { type: "error" });
      }
    } catch (error) {
      toast(`Opps! couldn't get ${tab}`, { type: "error" });
    } finally {
      setLoading(false)
    }
  };


  useEffect(() => {
    if (tab === 'clients') handleGetLists(clientData)
  }, [tab, clientData, isSuccess]);

  return <section className={`${roboto_400.className} h-full pl-5`}>
    <div className="bg-black3 py-3 px-10">
      <p className="font-normal text-lg text-grey_700">Home / Clients</p>
    </div>


    {!isAdd ? <div className='h-[calc(100%-58px)] min-h-fit relative'>
      <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between pr-5">
        <div className="w-full sm:w-[326px] lg:w-[556px] flex items-center">

        </div>

        {/* add butn */}
        <div
          onClick={() => setAddClient(!isAdd)}
          className={`${roboto_500.className} ml-auto md:ml-0 mt-2 md:mt-0 font-medium text-lg text-white bg-red_500 rounded-r-[10px] py-[10px] text-center w-[145px] cursor-pointer`}
        >
          {isAdd ? 'Back' : 'Add Client'}
        </div>
      </div>


      <div className="mt-12 flex flex-row w-fit h-[43px]">
        {TABS.map((x, i) => {
          const active = x.toLowerCase() === tab
          return (
            <div key={i} onClick={() => setTab(x.toLowerCase())} className={`${roboto_500.className} text-[17px] hover:text-white hover:text-[18.5px] hover:h-[47.5px] transition-all duration-300 ${active ? 'text-white' : 'text-grey_800'} ${x.toLowerCase() == 'withdrawals' ? 'w-[110px]' : x.toLowerCase() == 'tickets' ? 'w-[180px]' : 'w-[96px]'} text-center py-2.5 cursor-pointer h-[46px] ${active ? 'bg-[#0096D6C9]' : 'bg-black3'}`}>
              {x.toLowerCase() === 'tickets' ? 'Support tickets' : x}
            </div>
          )
        })}
      </div>


      <div className="bg-black3 min-h-[100%] flex-1 pt-12 px-5 md:px-10 lg:px-14 relative">
        <div className="w-full sm:w-[326px] lg:w-[556px] mb-5 flex items-center">
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
            placeholder={`Search ${tab}`}
            className="font-normal text-[17px] placeholder:capitalize py-3 pl-6 text-grey_700 flex-1 bg-[#181818] outline-none placeholder:text-grey_700"
            value={searchParams}
          // onChange={(e) => handleSearchfilter(e.target.value)}
          />
        </div>

        <div className="min-h-[500px] relative w-full md:h-[80%] h-[100%] pb-10 mt-8 pr-5">
          {tab === 'tickets' ?
            <div className="flex items-center justify-center h-[400px]">
              <p className={`${roboto_400.className} font-normal text-4xl text-white`}>
                3rd party support ticket API HERE
              </p>
            </div>

            : <div className="absolute w-full py-5 pb-6 pl-0 -ml-4 sm:ml-0 sm:pl-3 pr-10 overflow-x-auto">
              <table className={`${roboto_400.className} w-[calc(100%-20px)] min-w-[810px] lg:ml-5`}>
                <thead className="mb-3">
                  <tr>
                    {(tab === 'deposits' ? DEPOSITS : tab === 'withdrawals' ? WITHDRAWALS : CLIENT_TH).map((t, i) => {
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
                  {(tab === 'clients' ? clientFilteredList : []).map((tx, indx) => {
                    return (

                      <tr key={indx} className={`${roboto_400.className} text-white h-[110px]`}>
                        <td
                          className=" text-white py-2 w-[200px]"
                          key={indx}
                        >
                          <div className="flex items-center pl-2 py-1 pr-1 rounded w-fit ">
                            <Image
                              src={`/tablepic/mum.png`}
                              width={42}
                              height={42}
                              alt="profiles"
                              className="object-contain rounded-full"
                            />
                            <div className="ml-2.5">
                              <p
                                className={`${roboto_500.className} capitalize font-medium text-[#fff] text-[15px]`}
                              >
                                {tx.first_name} {tx.last_name}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="text-center font-normal text-xs capitalize">
                          {tx.first_name} {tx.last_name}
                        </td>

                        <td className="text-center font-normal text-xs capitalize">
                          {tx.role}
                        </td>


                        <td className="text-center font-normal text-xs">
                          {tx.email}
                        </td>

                        <td className="text-center font-normal text-xs capitalize">
                          Not set
                        </td>

                        <td className="text-center font-normal text-xs capitalize">
                          {tx.verified ? 'Yes' : 'No'}
                        </td>

                        <td className="">
                          <div className="flex items-center justify-center gap-x-5">
                            {tab !== 'clients' ?
                              <>
                                <button className={`${roboto_700.className} bg-[#29A87C] text-[11px] text-white py-1 px-2.5`}>
                                  Confirm
                                </button>
                                <button className={`${roboto_700.className} bg-[#EE2726] text-[11px] text-white py-1 px-2.5`}>
                                  Failed
                                </button>
                              </>
                              :
                              <>
                                <button
                                  onClick={() => [setIsViewClient(tx), setAddClient(true)]}
                                >
                                  <Image
                                    src="/eyeWH.svg"
                                    width={20}
                                    height={20}
                                    alt="view button"
                                  />
                                </button>
                                <button
                                  onClick={() => [setIsEditClient(tx), setAddClient(true)]}
                                >
                                  <Image
                                    src="/edit.svg"
                                    width={14}
                                    height={14}
                                    alt="edit"
                                  />
                                </button>
                                <button
                                // onClick={() => handleDelete(tx._id)}
                                >
                                  <Image
                                    src="/delete.svg"
                                    width={15}
                                    height={18}
                                    alt="delete"
                                  />
                                </button>
                              </>
                            }
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>}
        </div>



        {tab === 'clients' && <div className="mt-auto bg-black3 absolute bottom-10 z-50 flex flex-row items-center">
          <div
            className={`${roboto_500.className} py-2 px-7 ml-16 flex w-fit items-center border border-[#C4C4C438]`}
          >
            <button
              onClick={() => [setPage(page == 1 ? page : page - 1), handleGetRefreshList(page == 1 ? page : page - 1)]}
              className={`${roboto_400.className} font-normal mr-3 text-[17px] text-grey_800`}
            >
              <span className="text-grey_800 mr-2">{`<<`}</span>
              Previous
            </button>
            <div className="text-grey_800 text-[17px] mr-1 font-medium space-x-1.5">
              <span className="text-red">{page}</span>
            </div>
            <button
              onClick={() => [setPage(clientList.length > 0 ? page + 1 : page), handleGetRefreshList(clientList.length > 0 ? page + 1 : page)]}
              className={`${roboto_400.className} font-normal ml-2 text-[17px] text-grey_800`}
            >
              Next <span className="text-grey_800 ml-2">{`>>`}</span>
            </button>
          </div>

          {loading && <Lottie
            animationData={LoadingSpinner}
            loop
            style={{ width: 35, height: 35, marginLeft: 15 }}
          />}
        </div>}
      </div>

    </div> :
      <AddCleintComp isViewClient={isViewClient} isEditClient={isEditClient} handleReset={() => handleGetRefreshList()} handleClose={() => [setAddClient(false), setIsEditClient(null), setIsViewClient(null)]} />
    }

  </section>
};

export default page;


const ClientType = [
  'Channel', 'Event', 'Tv Show', 'Podcast'
]

interface Props {
  handleReset: () => void;
  handleClose: () => void;
  isViewClient: IClientsData | null
  isEditClient: IClientsData | null
}


export const AddCleintComp = ({ handleReset, handleClose, isEditClient, isViewClient }: Props) => {
  const [isView, setIsView] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<IClientsData | null>(isEditClient || isViewClient)
  const [subscriptionStatus, setSubscriptionStatus] = useToggle();
  const [userPic, setUserPic] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingImg, setLoadingImg] = useState<boolean>(false);
  const [phoneNo, setPhoneNo] = useState<string>(selectedUser ? selectedUser.country_code : "");
  const [mobile, setMobile] = useState<string>(selectedUser ? selectedUser.mobile : "");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>(selectedUser ? selectedUser.email : "");
  const [location, setLocation] = useState<string>("");
  const [verifyUser, setVerifyUser] = useToggle();
  const [gender, setGender] = useState<string>("Select your gender");
  const [photo, setPhoto] = useState<IPhoto>({ Bucket: '', Key: '' })
  const [clientType, setClientType] = useState<string>(selectedUser ? selectedUser.role : ClientType[0]);
  const [firstName, setFirstName] = useState<string>(selectedUser ? selectedUser.first_name : '');
  const [lastName, setLastName] = useState<string>(selectedUser ? selectedUser.last_name : '');
  const [DOB, setDOB] = useState<string>("");
  const isDisable = firstName === '' || lastName === '' || DOB === '' || photo.Bucket === '' || gender.includes('Select') || location === '' || email === '' || password === '' || mobile === '' || phoneNo === ''

  function reset() {
    setFirstName('');
    setLastName('');
    setPhoneNo('');
    setGender('Select your gender');
    setMobile('');
    setEmail('');
    setPassword('');
    setVerifyUser();
    setClientType(ClientType[0]);
    setDOB('');
    setLocation('');
    setUserPic(null)
  }

  function handleValidInput(query: string,) {
    const inputValue = query;
    if (/^\d*$/.test(inputValue)) {
      setMobile(inputValue);
    }
  }


  async function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const authToken = localStorage.getItem("auth_token");
    const files = e.target.files;
    if (files) setUserPic(files[0]);
    const data = new FormData();

    if (!files || !authToken) return;
    setLoadingImg(true);
    data.append("fileName", files[0].name);
    data.append("fileHandle", "photo");
    data.append("photo", files[0]);

    const res = await uploadImage(data, authToken);
    if (res.ok && res.data && res.data.message.includes("Successful")) {
      setLoadingImg(false);
      const photoData = {
        Bucket: res.data.data.Bucket,
        Key: res.data.data.Key,
      };
      setPhoto(photoData);
      toast("Image uploaded successfully", {
        type: "info",
      });
    }
    else {
      setLoadingImg(false);
      toast("Opps! couldn't upload image", {
        type: "error",
      });
    }
  }

  async function handleCreateAccount() {
    try {
      setLoading(true)
      const res = await createCLientAcc({
        client_type: clientType.toLowerCase(),
        country_code: phoneNo,
        cpassword: password,
        password,
        email,
        first_name: firstName,
        last_name: lastName,
        mobile,
        verified: verifyUser,
        photo
      });
      console.log(res)
      if (res.ok && res.data) {
        toast(`Client created successfully`, { type: "success" });
        handleReset();
        reset();
      } else {
        toast(`${res.data?.message.replace('Invalid Request:', '')}`, { type: "error" });
      }
    } catch (error) {
      toast(`Opps! couldn't create client`, { type: "error" });
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setIsView(isViewClient ? true : false)
  }, [isViewClient])

  useEffect(() => {
    if (selectedUser?.verified) setVerifyUser();
  }, [selectedUser])


  return (
    <div>
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
                className="rounded w-[105px] h-[106px]"
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
                  {!loadingImg ? (
                    <>
                      <Image src="/accEdit.svg" alt="" width={20} height={20} />
                      <input
                        type="file"
                        accept=".png, .jpeg, .jpg"
                        className="absolute top-0 -left-3 opacity-0"
                        onChange={(e) => handleInput(e)}
                      />
                    </>
                  ) : (
                    <Lottie
                      animationData={LoadingSpinner}
                      loop
                      style={{ width: 20, height: 20 }}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* add butn */}
        <div
          onClick={handleClose}
          className={`${roboto_500.className} cursor-pointer ml-auto md:ml-0 mt-2 md:mt-0 font-medium text-lg text-white bg-red_500 rounded-r-[10px] py-[10px] text-center w-[145px]`}
        >
          Back
        </div>
      </div>

      <div className="bg-black3 py-7 px-14 mt-4 ">
        <div
          className={`${roboto_400.className} `}
        >
          <div className="flex flex-col lg:flex-row items-start pt-5 sm:gap-x-0 gap-x-0 lg:gap-x-28 xl:gap-x-40">
            <div className="space-y-7 flex-1 w-full">

              <div className="flex flex-col">
                <label
                  htmlFor="clientType"
                  className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
                >
                  CLIENT TYPE *
                </label>
                {isView ? (
                  <CustomInput
                    type="text"
                    id="clientType"
                    className="font-normal w-[194px] text-grey_500 text-sm py-2 mt-2 border border-border_grey rounded-sm"
                    value={clientType}
                    readOnly
                  />
                ) : (
                  <SelectInputForm
                    placeholder={clientType}
                    selectData={ClientType}
                    setType={setClientType}
                    className="font-normal capitalize text-sm py-2 mt-2 border border-border_grey rounded-sm"
                    textStyles="text-grey_500"
                  />
                )}
              </div>

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
                  readOnly={selectedUser ? true : false}
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
                  readOnly={selectedUser ? true : false}
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
                      value={mobile}
                      readOnly={isView}
                      onChange={(e) =>
                        handleValidInput(e.target.value)
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
                      value={0 + "Months"}
                      readOnly
                    />
                  </div>
                )}
              </div>

              {!isView &&
                <div className="flex-1 pt-6 flex items-center gap-x-6">
                  <p
                    className={`${roboto_500.className} capitalize font-medium text-white text-base ml-2.5`}
                  >
                    {isView ? "Verified status" : "Verify User"} *
                  </p>
                  <div
                    className={`w-[45px] h-[18px] flex items-center rounded-[15px] ${(
                      isView
                        ? selectedUser?.verified
                        : verifyUser
                    )
                      ? `${isView ? "bg-[#00E3A373]" : "bg-[#FF131373]"}`
                      : "bg-[#BCBDBD73]"
                      }`}
                  >
                    <div
                      onClick={() =>
                        isView ? console.log("nothing") : setVerifyUser()
                      }
                      className={`w-[26px] h-[26px] rounded-full transition-all ease-in-out duration-500 ${(
                        isView
                          ? selectedUser?.verified
                          : verifyUser
                      )
                        ? `translate-x-5 ${isView ? "bg-[#00E3A3]" : "bg-red"
                        }`
                        : "-translate-x-0 bg-[#BCBDBD]"
                        } `}
                    />
                  </div>
                </div>
              }
            </div>

            {/* right */}
            <div className="space-y-7 flex-1 w-full mt-5 lg:mt-0">
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
              {!isView && <div>
                <label
                  htmlFor="location"
                  className={`${roboto_500.className} font-medium text-white text-base ml-2.5`}
                >
                  LOCATION *
                </label>
                <CustomInput
                  type="text"
                  id="location"
                  className="font-normal text-grey_500 text-sm py-2 mt-2 border border-border_grey rounded-sm"
                  value={location}
                  onChange={(e) =>
                    setLocation(e.target.value)
                  }
                />
              </div>}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  readOnly={selectedUser ? true : false}
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
                    value={password}
                    onChange={e => setPassword(e.target.value)}
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
                      value={'Not set'}
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
                    />
                  </div>
                </div>
              )}


              {!isView && (
                <div className="flex justify-end">
                  <AppButton
                    isLoading={loading}
                    disabled={isDisable}
                    onClick={handleCreateAccount}
                    style={{ alignSelf: "center" }}
                    className={`${roboto_500.className} font-medium text-lg text-white rounded-[5px] w-[145px] py-2 mt-12`}
                    title="Save"
                    bgColor="bg-green-400"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="pt-6 mt-4 -mb-5 flex flex-col sm:flex-row items-start sm:items-center gap-y-5 sm:gap-y-0">
            {isView && <div className="flex-1 flex items-center gap-x-6">
              <p
                className={`${roboto_500.className} capitalize font-medium text-white text-base ml-2.5`}
              >
                {isView ? "Verified status" : "Verify User"} *
              </p>
              <div
                className={`w-[45px] h-[18px] flex items-center rounded-[15px] ${(
                  isView
                    ? selectedUser?.verified
                    : verifyUser
                )
                  ? `${isView ? "bg-[#00E3A373]" : "bg-[#FF131373]"}`
                  : "bg-[#BCBDBD73]"
                  }`}
              >
                <div
                  onClick={() =>
                    isView ? console.log("nothing") : setVerifyUser
                  }
                  className={`w-[26px] h-[26px] rounded-full transition-all ease-in-out duration-500 ${(
                    isView
                      ? selectedUser?.verified
                      : verifyUser
                  )
                    ? `translate-x-5 ${isView ? "bg-[#00E3A3]" : "bg-red"
                    }`
                    : "-translate-x-0 bg-[#BCBDBD]"
                    } `}
                />
              </div>
            </div>}

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
                      ? "bg-[#00E3A3] translate-x-5"
                      : "-translate-x-0 bg-[#BCBDBD]"
                      } `}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

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
    </div>
  )
}
