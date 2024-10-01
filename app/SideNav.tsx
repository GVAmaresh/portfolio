"use client";
import Side_Comp from "@/components/SideNav_Comp/Side_Comp";
import Side_Comp_lg from "@/components/SideNav_Comp/Side_comp_lg";
import { useEffect, useState } from "react";
import { MdOutlineInvertColors } from "react-icons/md";
import { useColor } from "./ColorContext";
import { usePathname } from "next/navigation";

import {
  fetchAboutDetails,
  fetchContactDetails,
  fetchProjectDetails,
  fetchResumeDetails,
  fetchUserDetails
} from "@/redux/firebase/getUserDetails";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";

export default function SideNav({ children }: { children: React.ReactNode }) {
  const { theme, setChangeColor } = useColor();
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname(); 
  const { userName, loading, error } = useSelector(
    (state: RootState) => state.user
  );
  useEffect(() => {
    dispatch(fetchUserDetails());
    dispatch(fetchAboutDetails());
    dispatch(fetchResumeDetails());
    dispatch(fetchProjectDetails());
    dispatch(fetchContactDetails());
  }, [dispatch]);

  return (
    <div className="h-screen" style={{ backgroundColor: theme.backgroundColor }}>
      <div className="flex justify-end ">
        <MdOutlineInvertColors
          size={30}
          color={theme.color}
          onClick={setChangeColor}
          className="cursor-pointer"
        />
      </div>
      <div className="h-fit pt-2 md:pt-2 lg:py-5 px-4 md:px-16 lg:px-32 gap-2 md:gap-4 lg:gap-10 flex flex-col lg:flex-row">
      {pathname !== "/login" && pathname !== "/features" && (
        <div
          className="w-full lg:w-1/4 rounded-3xl"
          style={{ backgroundColor: theme.sideNav }}
        >
          {/* <div className="hidden lg:contents "></div> */}
          <div className=" contents lg:hidden h-full ">
            <Side_Comp />
          </div>
          <div className="hidden lg:contents ">
            <Side_Comp_lg />
          </div>
        </div>)}

        <div
          className="w-full lg:w-2/3 flex-grow h-auto lg:h-auto rounded-3xl overflow-hidden mb-2 md:mb-0"
          style={{ backgroundColor: theme.contentBar }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
