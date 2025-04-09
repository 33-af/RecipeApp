"use client"
import Image from "next/image";
import povar from "../../../public/povar.png"
import dubaiChoko from "../../../public/dubaiChocoSmall.jpg"
import avatar from "../../../public/blackAvatar.svg"
// import LogoutImage from "../../../public/logout.svg"
import deleteIcon from "../../../public/delete.svg"
// import { useEffect } from "react";
import { useAuthStore } from "@/store/AuthStore";

export default function Profile() {
    const {user, token } = useAuthStore();
    // useEffect(()=>{
    //     checkAuth();
    // }, []);
    return (
        <section>
            <div className="container flex items-end justify-between gap-[164px] w-full">
                <div className="bg-[#FCE2CE] py-10 px-[60px] rounded-[10px]">
                    <h1 className="text-center font-medium text-[47px]">My Profile</h1>
                    <div className="w-[513px] bg-white px-[28px] pb-5 pt-11 mt-10 mb-12 rounded-[10px]">
                        <div className="flex items-start gap-10">
                            <Image src={avatar} alt="" height={100} width={100} />
                            <div>
                                <div className="text-[25px] font-bold">{user?.username}</div>
                                <div className="mt-3 mb-5 text-black/70 text-[20px]">{user?.email}</div>
                                <div className="text-black/70 text-[20px]">🗓️ Joined Mart 2025
                                {token}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <button onClick={logout} className="flex items-center justify-center gap-2 text-[25px] font-bold py-[10px] w-full bg-[#EF8C6D] rounded-[10px]">
                        <Image src={LogoutImage} alt="" />
                        Logout
                    </button> */}

                    <div className="mt-7">
                        <div className="flex items-center justify-between w-full">
                            <h2>My Receipts</h2>
                            <div className="text-[27px] text-black/70 font-medium">3 receipts</div>
                        </div>

                        <div className="max-h-[430px] overflow-y-auto mt-9 flex flex-col  gap-7">
                            <div className="bg-white max-w-[450px] p-4 rounded-[10px]">
                                <div className="flex items-center gap-[10px]">
                                    <Image src={dubaiChoko} alt="" height={133} width={237} />
                                    <div>
                                        <div className="font-bold mb-5">Double cheese burger</div>
                                        <p>
                                            Grill two beef patties
                                            and melt a
                                            slice of cheese...
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between w-full mt-3">
                                    <div className="text-black/66">Shared on March 15, 2025</div>
                                    <button><Image src={deleteIcon} alt="" /></button>
                                </div>
                            </div>
                            
                            <div className="bg-white max-w-[450px] p-4 rounded-[10px]">
                                <div className="flex items-center gap-[10px]">
                                    <Image src={dubaiChoko} alt="" height={133} width={237} />
                                    <div>
                                        <div className="font-bold mb-5">Double cheese burger</div>
                                        <p>
                                            Grill two beef patties
                                            and melt a
                                            slice of cheese...
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between w-full mt-3">
                                    <div className="text-black/66">Shared on March 15, 2025</div>
                                    <button><Image src={deleteIcon} alt="" /></button>
                                </div>
                            </div>
                            
                            <div className="bg-white max-w-[450px] p-4 rounded-[10px]">
                                <div className="flex items-center gap-[10px]">
                                    <Image src={dubaiChoko} alt="" height={133} width={237} />
                                    <div>
                                        <div className="font-bold mb-5">Double cheese burger</div>
                                        <p>
                                            Grill two beef patties
                                            and melt a
                                            slice of cheese...
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between w-full mt-3">
                                    <div className="text-black/66">Shared on March 15, 2025</div>
                                    <button><Image src={deleteIcon} alt="" /></button>
                                </div>
                            </div>

                            <div className="bg-white max-w-[450px] p-4 rounded-[10px]">
                                <div className="flex items-center gap-[10px]">
                                    <Image src={dubaiChoko} alt="" height={133} width={237} />
                                    <div>
                                        <div className="font-bold mb-5">Double cheese burger</div>
                                        <p>
                                            Grill two beef patties
                                            and melt a
                                            slice of cheese...
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between w-full mt-3">
                                    <div className="text-black/66">Shared on March 15, 2025</div>
                                    <button><Image src={deleteIcon} alt="" /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-[#FCE2CE] pt-[132px] pl-8 rounded-t-[394px]">
                    <Image src={povar} alt="" height={800} width={519} />
                </div>
            </div>
        </section >
    );
}
