"use client"
import Image from "next/image";
import Sidebar from "./components/Sidebar";
import LoginPage from "./components/Login";
import { Provider } from "react-redux";
import store from "@/redux/store";

export default function Home() {

  return (
    <>
      <LoginPage />
    </>
  );
}
