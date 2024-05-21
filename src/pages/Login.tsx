import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { loginAsync } from "../features/AuthSlice";
import Register from "./Register";
import Notiflix from "notiflix";

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is Required"),
    password: Yup.string().required("Password is Required"),
  });
  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik<FormValues>({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema,
      onSubmit: async (values) => {
        console.log(values);

        const resultAction = await dispatch(loginAsync(values));
        if (loginAsync.fulfilled.match(resultAction)) {
          console.log(resultAction.payload.data?.token);

          localStorage.setItem(
            "token",
            JSON.stringify(resultAction.payload.data)
          );

          navigate("/"); 
        }
        if (loginAsync.rejected.match(resultAction)) {
          console.log(resultAction,"resultAction")
          const errorMessage = resultAction.error.message;
          Notiflix.Notify.failure(errorMessage);
          console.log(errorMessage);
        }
        // dispatch(loginAsync(values));
      },
    });

  return (
    <div className="w-screen h-screen bg-blue-50 ">
      <div className=" flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 w-auto ">
        <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="border p-5 shadow-xl rounded-md bg-gray-50 mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* email */}
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
                    "pl-3 block w-full rounded-md outline-none border py-2 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6" +
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
            {/* password */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className={
                    "pl-3 block w-full rounded-md border py-2 text-gray-900 outline-none shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6" +
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
            <p
              className="text-blue-500 text-sm text-right underline cursor-pointer"
              onClick={() => navigate("/register")}
            >
              New User? Register here
            </p>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
