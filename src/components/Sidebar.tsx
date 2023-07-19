import React, { useEffect, useState } from "react";

import { Button } from "primereact/button";
import custom from "../css/Sidebar.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Sidebar() {
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState([]);

  const token = localStorage.getItem("token");
  const uid = localStorage.getItem("uid");

  const url = import.meta.env.VITE_API;

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await axios.get(`${url}userUsers/getById?uid=${uid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
      console.log("Logged-in User:", user);
    } catch (error) {
      console.error("Failed to fetch logged-in user:", error);
    }
  };

  let navigate = useNavigate();

  const handleLogout = () => {
    if (token && uid) {
      localStorage.clear();
      navigate("/login");
    }
  };

  let menuList = [
    {
      label: "Store",
      icon: "pi pi-shopping-cart",
      url: "/store",
    },
    { label: "History", icon: "pi pi-clock", url: "/order" },
    { label: "Logout", icon: "pi pi-fw pi-power-off", action: handleLogout },
  ];

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <div
        className={`flex flex-col fixed top-0 z-3 ${
          showMenu ? "bg-white" : ""
        }`}
      >
        <Button
          onClick={toggleMenu}
          className={`${custom.sideBarButton} ${
            showMenu ? "bg-white border-none" : ""
          }`}
        >
          <i
            className={`${
              showMenu
                ? `pi pi-times ${custom.showBar}`
                : `pi pi-bars ${custom.showBar}`
            }`}
          ></i>
        </Button>

        {showMenu && (
          <div className="min-h-screen w-72 bg-white">
            <br />
            <div className="mx-auto w-60">
              <div>
                {user.map((u: any) => (
                  <h1 className="font-semibold text-lg m">
                    Hello, {u.username.toUpperCase()}
                  </h1>
                ))}
              </div>

              <div className="bg-black  h-0.5 opacity-20 my-3" />
              <ul className="grid" onClick={toggleMenu}>
                {menuList.map((item: any, i) => {
                  return (
                    <>
                      <div key={item.id} className="col-6 md:col-6">
                        <Button
                          key={i}
                          onClick={() => {
                            item.action ? item.action() : navigate(item.url);
                          }}
                          className={`flex h-full w-full ${custom.menuBtn}`}
                        >
                          <div className="mx-auto">
                            <i className={`${item.icon} py-2`}></i>
                            <br />
                            <span>{item.label}</span>
                          </div>
                        </Button>
                      </div>
                    </>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
