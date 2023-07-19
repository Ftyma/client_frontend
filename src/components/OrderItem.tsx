import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { Currency } from "./Currency";
import custom from "../css/Cart.module.css";
import axios from "axios";

type Tdata = {
  orderId: any;
  onClose: () => void;
};

function OrderItem(props: Tdata) {
  const [order, setOrder] = useState([]);
  const url = import.meta.env.VITE_API;

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    const token = localStorage.getItem("token");
    const uid = localStorage.getItem("uid");

    // Check if token exists in local storage
    if (!token || !uid) {
      throw new Error("Token or UID is missing.");
    }

    await axios
      .get(`${url}userOrders?uid=${uid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("fetch from order", res.data);
        setOrder(res.data);
      })
      .catch((err) => console.log(err));
  };

  const selectedOrder: any = order.find(
    (item: any) => item._id === props.orderId
  );
  console.log("select order", selectedOrder);
  console.log(props.orderId);

  const goBack = () => {
    props.onClose();
  };

  if (!selectedOrder) {
    return null;
  }
  console.log(selectedOrder);
  console.log("Render dialog:", selectedOrder);

  let total: number = 0;

  return (
    <>
      <div className=" inset-0 bg-black bg-opacity-50" onClick={goBack} />

      <div className="fixed bg-white inset-0 w-screen h-screen  z-10 ">
        <div className="bg-orange h-40">
          <Button
            icon="pi pi-chevron-left"
            className={`p-button-rounded p-button-circle ml-3 mt-3 ${custom.backBtn}`}
            onClick={goBack}
          />
          <h1 className="text-xl text-center font-semibold text-white">
            Order Details
          </h1>
        </div>
        <div className="flex justify-center">
          <div className="bg-white w-10/12 md:w-8/12 h-full border rounded-3xl p-6 fixed top-24 overflow-y-auto">
            <div className="pb-4">
              <div className="flex  xs:flex-col md:flex-row">
                <p>Order Number:</p>
                <p className="font-semibold md:ml-2 ">{selectedOrder._id}</p>
              </div>
              <div className="flex">
                <p>Status:</p>
                <p className="text-orange ml-2">{selectedOrder.status}</p>
              </div>
            </div>
            <div className="h-px bg-gray-500" />

            {selectedOrder.orders.map((item: any) => {
              total += item.price * item.quantity;
              return (
                <>
                  <div key={item._id} className="py-4">
                    <p className="font-semibold lg:text-lg xs:text-md">
                      {item.product_name}
                    </p>
                    <div className="flex justify-between font-semibold lg:text-lg xs:text-sm">
                      <p>{item.description}</p>
                      <p>x{item.quantity}</p>
                    </div>
                    <div className="flex justify-end text-orange font-semibold">
                      <p>{Currency(item.price)}</p>
                    </div>
                  </div>
                  <div className="h-px bg-gray-500" />
                </>
              );
            })}
            <div className="font-semibold text-lg flex justify-between mt-3 mb-16">
              <h1>Total: </h1>
              <h1 className="text-orange">{Currency(total)}</h1>
            </div>
            <div className="h-32" />
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderItem;
