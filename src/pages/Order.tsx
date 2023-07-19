import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useShoppingCart } from "../context/ShopppingCartContext";
import moment from "moment";
import OrderItem from "../components/OrderItem";
import axios from "axios";

export default function Order() {
  const { orderItems } = useShoppingCart();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [items, setItems] = useState<Object[]>([]);

  useEffect(() => {
    fetchOrder();
  }, [orderItems]);

  const fetchOrder = async () => {
    const token = localStorage.getItem("token");
    const uid = localStorage.getItem("uid");
    const url = import.meta.env.VITE_API;
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
        const sortList = res.data.sort((a: any, b: any) => {
          moment(a.date).diff(moment(b.date));
        });
        const reversedItems = sortList.reverse();
        console.log("fetch from order", items);
        setItems(reversedItems);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Navbar />
      <div className="relative xs:top-36 md:top-60">
        <div className="w-10/12 mx-auto">
          <div className="grid m-auto">
            <p className=" bg-orange w-0.5 h-12 mr-4" />
            <h1 className="font-semibold text-3xl">Order History</h1>
          </div>

          {items.map((item: any) => (
            <div
              key={item._id}
              onClick={() => setSelectedOrder(item._id)}
              className="border rounded-xl px-3 py-3 my-4 shadow-md"
            >
              <div className="flex justify-between font-semibold xs:text-sm md:text-lg">
                <h1>{moment(item.date).format("DD/MM/YYYY HH:mm")}</h1>
                <h1 className="text-orange">{item.status}</h1>
              </div>
              <div className="flex justify-between xs:flex-col md:flex-row xs:text-sm md:text-lg">
                <h1 className="font-medium">Order Number: </h1>

                <h1 className="font-semibold">{item._id}</h1>
              </div>
            </div>
          ))}
          <br />
          <br />
        </div>
      </div>
      {selectedOrder && (
        <OrderItem
          orderId={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </>
  );
}
