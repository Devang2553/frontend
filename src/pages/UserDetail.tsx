import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../utils/axiosInstance";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";
import Notiflix from "notiflix";

interface UserDetailType {
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
}

const UserDetail = () => {
  const user = useSelector((state: RootState) => state.auth.user?.data);
  const [data, Setdata] = useState<UserDetailType>({});
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const getToken = localStorage.getItem("token");

  const GetUserData = async () => {
    try {
      const getData = await axiosInstance.get(
        `/getUserDetails/${JSON.parse(getToken)._id}`
      );
      console.log(getData.data);
      Setdata(getData.data.data);
      setFieldValue("firstName", getData.data.data?.firstName);
      setFieldValue("lastName", getData.data.data?.lastName);
      setFieldValue("email", getData.data.data?.email);
      setFieldValue("gender", getData.data.data?.gender);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetUserData();
  }, []);

  const initialUser = {
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    gender: Yup.string().required("Gender is required"),
  });

  const navigate = useNavigate();
  const handleDeleteAccount = async () => {
    try {
      const DeleteAcc = await axiosInstance.delete(
        `delete/${JSON.parse(getToken)._id}`
      );
      console.log("Account deleted");
      Notiflix.Notify.success(DeleteAcc.data.message);

      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.log(error, "Error");
      Notiflix.Notify.failure(error?.message);
    }
  };

  const HandleSubmitForm = async () => {
    try {
      const PostData = await axiosInstance.put(
        `users/${JSON.parse(getToken)._id}`,
        values
      );
      Notiflix.Notify.success(PostData.data.message);

      console.log(PostData, "PostData");
    } catch (error) {
      console.log(error, "Error");
      Notiflix.Notify.failure(error?.message);
    }
  };

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    isSubmitting,
    setFieldValue,
  } = useFormik<UserDetailType>({
    initialValues: initialUser,
    // validationSchema,
    onSubmit: () => {
      console.log("sdfnjlsdlfn");
      HandleSubmitForm();
    },
  });

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm border p-5 shadow-lg rounded-md">
        <h2 className="text-xl font-bold mb-4">User Detail</h2>
        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName}
              className="mt-1 p-2 border rounded-md w-full"
            />
            {touched.firstName && errors.firstName ? (
              <div className="text-red-500 text-sm">{errors.firstName}</div>
            ) : null}
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastName}
              className="mt-1 p-2 border rounded-md w-full"
            />
            {touched.lastName && errors.lastName ? (
              <div className="text-red-500 text-sm">{errors.lastName}</div>
            ) : null}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              className="mt-1 p-2 border rounded-md w-full"
              disabled
            />
          </div>

          {/* Gender */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              name="gender"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.gender}
              className="mt-1 p-2 border rounded-md w-full"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {touched.gender && errors.gender ? (
              <div className="text-red-500 text-sm">{errors.gender}</div>
            ) : null}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4"
            // disabled={isSubmitting}
          >
            {"Save Changes"}
          </button>

          {/* Delete Account Button */}
          <button
            type="button"
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={() => setShowDeletePopup(true)}
          >
            Delete Account
          </button>
        </form>
      </div>

      {/* Delete Confirmation Popup */}
      {showDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-lg">
            <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete your account?</p>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded-md mr-4"
                onClick={() => setShowDeletePopup(false)}
              >
                No
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={handleDeleteAccount}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
