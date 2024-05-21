import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import axiosInstance from "../utils/axiosInstance";
import Notiflix from "notiflix";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const user = useSelector((state: RootState) => state.auth.user?.data);
  console.log(user);
  const navigate = useNavigate();

  const getAllData = async () => {
    try {
      const getData = await axiosInstance.get("/allusers");
      console.log(getData.data.data, "getData");
      setUsers(getData.data.data);
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/logout");
      if (response.data.status) {
        localStorage.removeItem("token");
        Notiflix.Notify.success(response.data.message);
        navigate("/login");
      } else {
        console.log("Logout failed:", response.data.message);
        Notiflix.Notify.failure(response.data.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
      Notiflix.Notify.failure(error?.message);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-end  w-full justify-end">
        <button
          className="bg-blue-500 text-white p-2 rounded-md "
          onClick={() => handleLogout()}
        >
          Logout
        </button>
      </div>
      <div></div>
      {/* Hello Devang */}
      <div className="flex w-full justify-between">
        <div
          className="text-lg font-bold mb-4 flex cursor-pointer hover:underline"
          onClick={() => {
            navigate("/detail");
          }}
        >
          Hello {(user && `${user?.firstName} ${user?.lastName}`) || "User"}
          <img src="/editIcon.svg" className="h-5 mt-1" />
        </div>

        {/* Email */}
        <div className="flex items-center mb-4">
          <div className="mr-2"> email id:</div>
          <div className="font-bold">
            {user ? user?.email : "demo@gmail.com"}
          </div>
        </div>
      </div>

      {/* All User List Title */}
      <div className="text-xl font-bold mb-4">All User List</div>

      {/* User Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">No.</th>
            <th className="border border-gray-300 px-4 py-2">First Name</th>
            <th className="border border-gray-300 px-4 py-2">Last Name</th>
            <th className="border border-gray-300 px-4 py-2">Email ID</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through users and render each row */}
          {users.map((user, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">
                {user.firstName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {user.lastName}
              </td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
