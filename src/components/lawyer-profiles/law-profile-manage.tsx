"use client";

import { useGetMyLawyerProfileQuery } from "@/store/endpoints/lawyerProfiles";
import { LawyerProfileComponent } from "./law-profile";
import { LawNoProfile } from "./law-no-profile";
import { LawyerEditForm, LawyerEditSettings } from "./forms";

export const LawyerProfileManage = () => {

  const { currentData } = useGetMyLawyerProfileQuery();

  if (currentData) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-3">
        <div className="lg:col-span-2">
          <LawyerProfileComponent law={currentData} />
        </div>
        <div className="lg:col-span-5">
          <LawyerEditForm law={currentData} />
          <br />
          <LawyerEditSettings law={currentData} />
        </div>
      </div>
    )
  } else {
    return <LawNoProfile />;
  }
}

