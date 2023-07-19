import React from "react";
import { Currency } from "../components/Currency";

import { useShoppingCart } from "../context/ShopppingCartContext";
import Navbar from "../components/Navbar";
import { InputNumber } from "primereact/inputnumber";
import custom from "../css/Cart.module.css";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    removeItem,
    totalPrice,
    increaseCartQuantity,
    decreaseCartQuantity,
    handleSubmitOrder,
    handleChange,
  } = useShoppingCart();

  let navigate = useNavigate();
  const handleSubmit = async () => {
    await handleSubmitOrder();
    navigate("/order");
  };

  const handleDelete = (id: any) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      removeItem(id);
    }
  };

  const cartOrder = cartItems.reverse();

  return (
    <div className="bg-orange h-screen">
      <Navbar />
      <div className="bg-white h-full rounded-3xl relative top-32 ">
        <br />
        <h1 className="text-3xl text-left ml-7 mt-4">Shopping Cart</h1>
        <div>
          {cartOrder.map((item: any) => (
            <div
              key={item.id}
              className="grid border rounded-xl my-4 w-10/12 mx-auto"
            >
              <Button
                icon="pi pi-trash"
                className={`p-button-rounded p-button-circle relative xs:left-64 lg:left-full ${custom.removeBtn} `}
                onClick={() => handleDelete(item._id)}
              />

              <img
                src={item.image}
                className=" my-4 xs:col-6 md:col-3 lg:w-24 lg:h-40 xs:w-24 xs:h-18 md:w-2 md:h-32"
              />

              <div className="lg:col-3 md:col-3 xs:col-6 m-auto ">
                <div className="flex justify-between items-center">
                  <h1
                    className={`lg:text-lg xs:text-md font-medium ${custom.productText}`}
                  >
                    {item.product_name}
                  </h1>
                </div>

                <h1 className="lg:text-lg xs:text-sm ">{item.description}</h1>
              </div>

              <div className="col-4 md:col-3 m-auto">
                <h1 className="text-center text-orange font-semibold text-lg ">
                  {Currency(item.price)}
                </h1>
              </div>

              <div className="col-6 md:col-3 m-auto flex xs:flex-row justify-center items-center">
                <div className="lg:col-4 md:col-3 xs:col-3 lg:pl-3 xl:pl-5">
                  <Button
                    icon="pi pi-minus"
                    onClick={() => decreaseCartQuantity(item._id)}
                    className={`p-button-rounded p-button-circle ${custom.addBtn}`}
                  />
                </div>

                <div className="lg:col-4 md:col-3 xs:col-3 xs:mx-2">
                  <InputNumber
                    value={item.quantity}
                    min={1}
                    inputClassName={`md:w-10 xs:w-14 w-100 text-center h-10 my-auto`}
                    onValueChange={(e) => handleChange(e, item._id)}
                  />
                </div>

                <div className="lg:col-4 md:col-3 xs:col-3">
                  <Button
                    icon="pi pi-plus"
                    onClick={() => increaseCartQuantity(item._id)}
                    className={`p-button-rounded p-button-circle ${custom.addBtn}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="h-64" />

        <div className="fixed bottom-0 bg-white flex flex-col border lg:py-4 xs:py-2 shadow-2xl w-full mt-16">
          <p className="lg:text-xl xs:text-lg font-semibold mx-auto">
            Total:{" "}
            <span className="lg:mx-24 xs:mx-2 ">{Currency(totalPrice())} </span>
          </p>
          <button
            onClick={handleSubmit}
            className="px-2 py-1 bg-orange rounded-3xl mx-auto text-white shadow-lg w-7/12 mt-2"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
