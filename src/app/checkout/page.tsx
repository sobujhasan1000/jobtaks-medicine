import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/utils/authOptions";
import Checkout from "../componants/CheakOut/CheakOut";
import { User } from "@/type";

export default async function CheckoutPage() {
  const session = await getServerSession(authOptions);
  // console.log(session);
  if (!session || !session.user) {
    redirect("/loging"); // Redirect to login page if not logged in
  }

  const user: User = {
    name: session.user.name as string,
    email: session.user.email as string,
  };

  return <Checkout user={user} />;
}
