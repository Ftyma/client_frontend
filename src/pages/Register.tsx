import React, { useState } from "react";
import logo from "../assets/logo.svg";
import footerImg from "../assets/footer.svg";
import { FormikErrors, useFormik } from "formik";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import custom from "../css/Login.module.css";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";

export default function Login() {
  const [formError, setFormError] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [postUsers, setPostUsers] = useState({
    username: "",
    email: "",
    password: "",
  });

  const url = import.meta.env.VITE_API;

  let navigate = useNavigate();

  const goProductPage = () => {
    navigate("/store");
  };

  const authentication = () => {
    setFormError(false);
  };

  const formik = useFormik<any>({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validate: (data) => {
      let errors: FormikErrors<any> = {};

      if (!data.username) {
        errors.username = "Username";
        setFormError(true);
      }

      if (!data.email) {
        errors.email = "Email";
        setFormError(true);
      }

      if (!data.password) {
        errors.password = "Password";
        setFormError(true);
      }

      return errors;
    },
    onSubmit: async (data) => {
      try {
        await axios
          .post(`${url}userUsers/signup`, postUsers)
          .then((res) => {
            console.log(res.data);
            alert("succesfully registered");
          })
          .then(() => goProductPage());
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 409) {
            alert("Email already registered");
          } else {
            console.error(axiosError);
          }
        } else {
          console.error(error);
          window.alert(error);
        }

        return;
      }

      setPostUsers({
        username: "",
        email: "",
        password: "",
      });

      console.log(data);
      // setLoading(true);
      setTimeout(() => {
        authentication();
      }, 500);
    },
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setPostUsers((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getFromErrorMessage = () => {
    let errorMsg: String = "";
    //let status: Boolean = false;
    if (formik.touched.username || formik.errors.username) {
      errorMsg = `${formik.errors.username} is required .`;
      //status = true;
    } else if (formik.touched.email || formik.errors.email) {
      errorMsg = `${formik.errors.email} is required .`;
      //status = true;
    } else if (formik.touched.password || formik.errors.password) {
      errorMsg = `${formik.errors.password} is required .`;
      //status = true;
    } else {
      //status = false;
    }
    console.log(errorMsg);
    return formError && <small className="p-error">{errorMsg}</small>;
  };

  return (
    <div className="flex flex-col w-full bg-orange">
      <img src={logo} className="mx-auto md:w-1/4 xs:w-2/4 md:my-8 xs:my-7" />
      {/* z-index: 2  */}
      <div className="flex justify-center mx-auto  xs:w-5/6 md:w-3/6 bg-white rounded-3xl z-10">
        <div className="card w-5/6 mb-60">
          <h5 className="text-center text-3xl my-9">Register</h5>

          <form
            onSubmit={formik.handleSubmit}
            onChange={formik.handleChange}
            className="p-fluid "
          >
            <div className="field mb-4">
              <InputText
                type="username"
                id="username"
                name="username"
                placeholder="username"
                value={postUsers.username}
                onChange={handleChange}
                //onBlur={formik.handleBlur}
                className={`${custom.loginInput}`}
              />
            </div>

            <div className="field mb-4">
              <InputText
                type="email"
                id="email"
                name="email"
                placeholder="email"
                value={postUsers.email}
                onChange={handleChange}
                //onBlur={formik.handleBlur}
                className={`${custom.loginInput}`}
              />
            </div>

            <div className="field mb-6">
              <Password
                type="password"
                id="password"
                name="password"
                placeholder="password"
                value={postUsers.password}
                className={`${custom.loginInput}`}
                //onBlur={formik.handleBlur}
                onChange={handleChange}
              />
              {getFromErrorMessage()}
            </div>

            <Button
              label={"Submit"}
              type="submit"
              className={`mt-12 rounded-3xl bg-orange border-none`}
            />
            <h1 className="text-center mt-3">
              Already has an account?{" "}
              <a href={`${url}login`} className="text-blue underline">
                Login
              </a>
            </h1>
          </form>
        </div>
      </div>
      {/* z-idex:1 */}
      <img src={footerImg} className="fixed bottom-0 z-0" />
    </div>
  );
}
