import React, { useState } from "react";

import custom from "../css/Products.module.css";
import axios from "axios";

import { Currency } from "./Currency";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useShoppingCart } from "../context/ShopppingCartContext";
import { InputNumber } from "primereact/inputnumber";
import customCart from "../css/Cart.module.css";

type StoreItemProps = {
  product: {
    id: number;
    product_name: string;
    description: string;
    price: number;
    image: string;
  };
};

export function StoreItem({ product }: StoreItemProps) {
  const url = import.meta.env.VITE_API;

  const { cartItems, setCartItems } = useShoppingCart();
  const [showDialog, setShowDialog] = useState(false);

  const [productId, setProductId] = useState<number>();
  const [productName, setProductName] = useState<string>();
  const [productDesc, setProductDesc] = useState<string>();
  const [productPrice, setProductPrice] = useState<number>(0);
  const [productImg, setProductImg] = useState<string>();
  const [productQty, setProductQty] = useState<number>(1);

  const selectProduct = (
    id: number,
    name: string,
    desc: string,
    price: number,
    img: string,
    quantity: number
  ) => {
    setProductId(id);
    setProductName(name);
    setProductDesc(desc);
    setProductPrice(price);
    setProductImg(img);
    setProductQty(quantity);
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setProductQty(1);
  };

  const increaseQty = () => {
    setProductQty((prevQty) => prevQty + 1);
  };

  const decreaseQty = () => {
    if (productQty !== 1) {
      setProductQty((prevQty) => prevQty - 1);
    }
  };

  const handleQty = (e: any) => {
    const value = e.target.value;
    setProductQty(value);
  };

  const handleAdd = async () => {
    try {
      const token = localStorage.getItem("token");
      const uid = localStorage.getItem("uid");

      //check if token and uid exist in local storage
      if (!token || !uid) {
        throw new Error("Token or UID is missing.");
      }

      const existedItem = cartItems.find((item) => item.id === productId);

      //if item exist, increase qty
      //else create new cart
      if (existedItem) {
        const updatedCart = cartItems.map((item) => {
          if (item.id === productId) {
            return {
              ...item,
              quantity: item.quantity + productQty,
            };
          }
          return item;
        });
        setCartItems(updatedCart);
      } else {
        const newCart = {
          id: productId,
          product_name: productName,
          price: productPrice,
          image: productImg,
          description: productDesc,
          quantity: productQty,
          uid: uid,
        };

        await axios.post(`${url}userCarts/add-carts`, newCart, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartItems([...cartItems, newCart]);
      }

      alert("Added to cart!");
      setShowDialog(false);
      setProductQty(1);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <>
      <div className="md:col-3 lg:col-3 xs:col-3 ">
        <Card
          className={`border rounded-2xl  ${custom.prodCard}`}
          // style={{ width: "350px", height: "450px" }}
        >
          <img
            src={product.image}
            className="xs:w-40 md:w-48 md:h-48 mx-auto"
          />

          <div className="flex flex-col">
            <h1
              className={`xs:text-md md:text-xl font-semibold  ${custom.productText}`}
            >
              {product.product_name}
            </h1>

            <h1 className={`xs:text-sm md:text-lg ${custom.productDescText}`}>
              {product.description}
            </h1>
          </div>

          <div className="flex justify-between">
            <span>
              <p className="lg:text-lg xs:text-md text-orange">
                {Currency(product.price)}
              </p>
              <p className="lg:text-lg xs:text-md opacity-50 line-through">
                {Currency(product.price)}
              </p>
            </span>

            <Button
              className={`p-button-rounded p-button-circle  ${custom.productAddButton}`}
              icon="pi pi-plus"
              onClick={() =>
                selectProduct(
                  product.id,
                  product.product_name,
                  product.description,
                  product.price,
                  product.image,
                  productQty
                )
              }
            />
          </div>

          {showDialog && (
            <Dialog visible={showDialog} onHide={handleCloseDialog}>
              <div className="grid w-72 text-center pt-0">
                <Card
                  className={`col-12 md:col-12 border pt-0 ${custom.popupCard}`}
                >
                  <div>
                    <p className="text-lg">{productName}</p>
                    <p className="font-semibold">{productDesc}</p>
                    <br />
                    <p className={`text-lg text-orange font-semibold`}>
                      {Currency(productPrice)}
                    </p>
                  </div>

                  <div className="w-full h-0.5 bg-black opacity-30 mt-3" />
                </Card>
              </div>

              <div className="grid w-64 justify-center mx-auto">
                <div className="col-4 md:col-4">
                  <Button
                    icon="pi pi-minus"
                    onClick={() => decreaseQty()}
                    className={`p-button-rounded p-button-circle ${customCart.addBtn}`}
                  />
                </div>

                <div className="col-4 md:col-4">
                  <InputNumber
                    value={productQty}
                    min={1}
                    inputClassName={`w-5 text-center h-10`}
                    onValueChange={(e) => handleQty(e)}
                  />
                </div>

                <div className="col-4 md:col-4">
                  <Button
                    icon="pi pi-plus"
                    onClick={() => increaseQty()}
                    className={`p-button-rounded p-button-circle ml-5 ${customCart.addBtn}`}
                  />
                </div>
              </div>

              <Button
                onClick={() => {
                  handleAdd();
                }}
                className={`${custom.popupButton}`}
              >
                Add to Cart
              </Button>
            </Dialog>
          )}
        </Card>
      </div>
    </>
  );
}
