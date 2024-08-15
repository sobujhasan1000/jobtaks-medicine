import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-400 to-blue-600">
      <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Welcome to the Dashboard
        </h1>
        {session?.user?.name ? (
          <p className="text-2xl text-center text-gray-600">
            Hello,{" "}
            <span className="font-semibold text-gray-800">
              {session.user.name}
            </span>
          </p>
        ) : (
          <p className="text-2xl text-center text-gray-600">Hello, Guest</p>
        )}
        <div className="mt-8 flex justify-center">
          <button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300">
            View Home page
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
