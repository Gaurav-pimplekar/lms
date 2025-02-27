import Image from "next/image";
import Sidebar from "./components/Sidebar";
import LoginPage from "./login/page";

export default function Home() {
  return (
    // <LoginPage />
    <Sidebar userRole={"admin"} />
  );
}
