import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useUserData } from "../Hooks/useUserData";
import SettingDashboard from "./SettingDashboard";

export default function Setting() {
  const { userdata, handleLogout } = useUserData();

  // useEffect(()=>{
  //   showUserPost()
  // },[])
  console.log(userdata);
  return (
    <div>
      <Navbar userdata={userdata} handleLogout={handleLogout} />
      <SettingDashboard />
    </div>
  );
}
