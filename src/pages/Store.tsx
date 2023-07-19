import React, { useEffect, useState } from "react";
import axios from "axios";
import { StoreItem } from "../components/StoreItem";
import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from "primereact/progressspinner";
import SelectionFilter from "../components/SelectionFilter";
import { Checkout } from "../components/Checkout";
import Navbar from "../components/Navbar";

export default function Store() {
  const [productAll, setProductAll] = useState([]);
  const [filterQuery, setFilterQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState(0);
  const [filterData, setFilterData] = useState<object[]>([]);

  const [loading, setLoading] = useState(true);

  const url = import.meta.env.VITE_API;

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    if (!loading) {
      filterProduct();
    }
  }, [filterQuery, filterCategory, loading]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${url}userProducts`);
      setProductAll(res.data);
      console.log("fetched all products ", res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching all products ", error);
    }
  };

  const handleFilter = (e: any) => {
    setFilterQuery(e.target.value);
  };

  const handleClickCat = (e: any) => {
    setFilterCategory(e);
  };

  const filterProduct = () => {
    if (!filterCategory && !filterQuery) {
      console.log("fetch all", productAll);
      setFilterData(productAll);
      return;
    }

    const filter = productAll.filter((item: any) => {
      const queryMatch = item.product_name
        .toLowerCase()
        .includes(filterQuery.toLowerCase());
      const categoryMatch = item.category.includes(filterCategory);

      if (filterQuery && filterCategory) {
        return queryMatch && categoryMatch;
      } else if (filterQuery) {
        return queryMatch;
      } else if (filterCategory) {
        return categoryMatch;
      } else {
        return true;
      }
    });

    console.log("filter data", filter);
    setFilterData(filter);
  };

  return (
    <>
      <div className="bg-orange w-screen md:w-screen sm:w-screen">
        <Navbar />
        <div className="relative border rounded-3xl bg-white w-full top-32">
          {/* Search Products*/}
          <div className="flex p-fluid flex-row mx-auto justify-between w-11/12 lg:pt-36 xs:pt-7">
            <div className="flex w-full">
              <span className="p-input-icon-right">
                <i className="pi pi-search" />
                <InputText
                  value={filterQuery}
                  onChange={handleFilter}
                  placeholder="Keyword Search"
                  className="w-full"
                />
              </span>
            </div>
          </div>

          {/* Cateogry filter */}
          <SelectionFilter
            filterCategory={filterCategory}
            handleClickCat={handleClickCat}
          />

          {loading ? (
            <ProgressSpinner className="justify-center" />
          ) : (
            <div className="grid w-11/12 justify-center mx-auto pt-16">
              {filterData.map((item: any) => (
                <div key={item.id}>
                  <StoreItem product={item} />
                </div>
              ))}
              <div className=" h-52" />
              <Checkout />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
