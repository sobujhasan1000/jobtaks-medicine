import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import Navbar from "../componants/Shared/Navbar";
import Footer from "../componants/Shared/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type CommonLayOutProps = {
  children: ReactNode;
};

export default async function CommonLayOut({ children }: CommonLayOutProps) {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <Navbar session={session} />
      {children}
      <Footer />
      <ToastContainer />
    </div>
  );
}
