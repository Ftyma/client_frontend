import React from "react";
import { Button } from "primereact/button";
import custom from "../css/Products.module.css";
import { useNavigate } from "react-router-dom";
import { useShoppingCart } from "../context/ShopppingCartContext";

export function Checkout() {
  const { cartQuantity } = useShoppingCart();

  let navigate = useNavigate();

  const goCart = () => {
    navigate("/cart");
  };

  return (
    <div className="fixed bottom-0 bg-white w-screen border py-3">
      <div className=" flex justify-center">
        <Button
          className={`w-10/12 justify-center ${custom.bottomButton} `}
          onClick={goCart}
        >
          Checkout
          <div className="flex flex-row ml-3 px-3 items-center bg-amber-300 rounded-xl bg-opacity-30">
            <i className="pi pi-shopping-cart pr-2"></i>
            {cartQuantity}
          </div>
        </Button>
      </div>
    </div>
  );
}
