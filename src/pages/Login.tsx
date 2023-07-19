import React from "react";
import logo from "../assets/logo.svg";
import footerImg from "../assets/footer.svg";
import { FormikErrors, useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import custom from "../css/Login.module.css";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import axios, { AxiosError } from "axios";

export default function Login() {
  // const [formError, setFormError] = useState(false);
  // const [loading, setLoading] = useState(false);

  const authentication = () => {
    // setFormError(false);
  };

  let navigate = useNavigate();
  const goProductPage = () => {
    navigate("/store");
  };

  const url = import.meta.env.VITE_API;

  const formik = useFormik<any>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (data) => {
      let errors: FormikErrors<any> = {};

      if (!data.email) {
        errors.email = "Email";
        //setFormError(true);
      }

      if (!data.password) {
        errors.password = "Password";
        //setFormError(true);
      }
      return errors;
    },
    onSubmit: async (data) => {
      try {
        const response = await axios.post(`${url}userUsers/signin`, {
          email: data.email,
          password: data.password,
        });

        const { token } = response.data;
        const { uid } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("uid", uid);

        console.log(response.data);
        goProductPage();
        //setLoading(true);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 401) {
            alert("Invalid Email or Password");
          }
        }
        console.error(error);
      }

      console.log(data);
      //setLoading(true);
      setTimeout(() => {
        authentication();
      }, 500);
    },
  });

  // const getFromErrorMessage = () => {
  //   let errorMsg: String = "";
  //   let status: Boolean = false;
  //   if (formik.touched.email || formik.errors.email) {
  //     errorMsg = `${formik.errors.email} is required .`;
  //     status = true;
  //   } else if (formik.touched.password || formik.errors.password) {
  //     errorMsg = `${formik.errors.password} is required .`;
  //     status = true;
  //   } else {
  //     status = false;
  //   }
  //   console.log(errorMsg);
  //   return formError && <small className="p-error">{errorMsg}</small>;
  // };

  const getFromErrorMessage = () => {
    if (formik.touched.email && formik.errors.email) {
      return true;
      //<small className="p-error">{formik.errors.email} is required.</small>
    }
    if (formik.touched.password && formik.errors.password) {
      return false;
      // <span className="p-error">{formik.errors.password} is required.</span>
    }
    return null;
  };

  return (
    <div className="flex flex-col w-full bg-orange">
      <img src={logo} className="mx-auto md:w-1/4 xs:w-2/4 md:my-8 xs:my-7" />
      {/* z-index: 2  */}
      <div className="flex justify-center mx-auto xs:w-5/6 md:w-3/6 bg-white rounded-3xl z-10">
        <div className="card w-5/6 mb-60">
          <h5 className="text-center my-9 xs:text-2xl md:text-3xl">Login</h5>

          <form onSubmit={formik.handleSubmit} className="p-fluid ">
            <div className="field md:mb-4 xs:mb-4">
              <InputText
                type="email"
                id="email"
                name="email"
                placeholder="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className={`${custom.loginInput}`}
              />
            </div>

            <div className="mb-4">
              <Password
                type="password"
                id="password"
                name="password"
                placeholder="password"
                value={formik.values.password}
                className={`border-round-xl ${custom.pwInput}`}
                onChange={formik.handleChange}
              />
              {getFromErrorMessage()}
            </div>

            <Button
              label={"Submit"}
              type="submit"
              className={`mt-4 rounded-3xl bg-orange border-none`}
            />
          </form>
        </div>
      </div>
      {/* z-idex:1 */}
      <img src={footerImg} className="fixed bottom-0 z-0" />
    </div>
  );
}
