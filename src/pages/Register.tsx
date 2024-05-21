import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { registerAsync } from "../features/AuthSlice";
import { useNavigate } from "react-router-dom";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
}

const Register = () => {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is Required"),
    lastName: Yup.string().required("Last Name is Required"),
    email: Yup.string().email("Invalid email").required("Email is Required"),
    password: Yup.string().required("Password is Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is Required"),
    gender: Yup.string().required("Gender is Required"),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik<FormValues>({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
      },
      validationSchema,
      onSubmit: async (values) => {
        const resultAction = await dispatch(registerAsync(values));
        if (registerAsync.fulfilled.match(resultAction)) {
          localStorage.setItem(
            "token",
            JSON.stringify(resultAction.payload.data)
          );

          navigate("/");
        } else {
          console.log("first");
        }
      },
    });

  return (
    <div className="bg-blue-50  ">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up for an account
          </h2>
        </div>

        <div className="border p-5 shadow-xl rounded-md bg-gray-50 mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6 " onSubmit={handleSubmit}>
            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                First Name
              </label>
              <div className="mt-2">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                  className={
                    "block w-full rounded-md border py-2 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6" +
                    (errors.firstName && touched.firstName
                      ? " border-red-500"
                      : "")
                  }
                />
                {errors.firstName && touched.firstName && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.firstName}
                  </div>
                )}
              </div>
            </div>
            {/* Last Name */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Last Name
              </label>
              <div className="mt-2">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                  className={
                    "block w-full rounded-md border py-2 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6" +
                    (errors.lastName && touched.lastName
                      ? " border-red-500"
                      : "")
                  }
                />
                {errors.lastName && touched.lastName && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.lastName}
                  </div>
                )}
              </div>
            </div>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className={
                    "block w-full rounded-md border py-2 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6" +
                    (errors.email && touched.email ? " border-red-500" : "")
                  }
                />
                {errors.email && touched.email && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.email}
                  </div>
                )}
              </div>
            </div>
            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className={
                    "block w-full rounded-md border py-2 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6" +
                    (errors.password && touched.password
                      ? " border-red-500"
                      : "")
                  }
                />
                {errors.password && touched.password && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.password}
                  </div>
                )}
              </div>
            </div>
            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                  className={
                    "block w-full rounded-md border py-2 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6" +
                    (errors.confirmPassword && touched.confirmPassword
                      ? " border-red-500"
                      : "")
                  }
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
            </div>
            {/* Gender */}
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Gender
              </label>
              <div className="mt-2">
                <select
                  id="gender"
                  name="gender"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.gender}
                  className={
                    "block w-full rounded-md border py-2 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6" +
                    (errors.gender && touched.gender ? " border-red-500" : "")
                  }
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && touched.gender && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.gender}
                  </div>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
