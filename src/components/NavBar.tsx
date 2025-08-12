import React from "react";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import { currentUser } from "@clerk/nextjs/server";
import { syncUser } from "@/actions/user.action";

const NavBar = async() => {
  const user =  await currentUser();
  if(user){
    await syncUser(); //POST 
  }
  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-background/80 backdrop-blur-md border border-border rounded-full px-8 py-4 z-50 shadow-lg">
      <div className="flex items-center justify-center space-x-6">
        <DesktopNavbar />
        <MobileNavbar />
      </div>
    </nav>
  );
};

export default NavBar;
