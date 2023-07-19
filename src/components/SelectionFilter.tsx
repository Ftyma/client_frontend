import { Button } from "primereact/button";
import React, { useState, useEffect } from "react";
import custom from "../css/Products.module.css";

type Tdata = {
  handleClickCat: (data: any) => void;
  filterCategory: any;
};

const SelectionFilter = (data: Tdata) => {
  //const [currentPage, setCurrentPage] = useState(0);
  //const [showAllOptions, setShowAllOptions] = useState(false);
  const [activeOption, setActiveOption] = useState(0);
  const options = [
    { label: "All", value: 0 },
    { label: "Category 1", value: 1 },
    { label: "Category 2", value: 2 },
    { label: "Category 3", value: 3 },
    { label: "Category 4", value: 4 },
    { label: "Category 5", value: 5 },
  ];

  useEffect(() => {
    const handleResize = () => {
      //setShowAllOptions(window.innerWidth > 640); // Show all options on wide screens
    };

    handleResize(); // Call initially to set the correct showAllOptions value

    window.addEventListener("resize", handleResize); // Add event listener for screen resize

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up the event listener on component unmount
    };
  }, []);
  //const startIndex = showAllOptions ? 0 : currentPage * 3;
  //const endIndex = showAllOptions ? options.length : (currentPage + 1) * 3;
  //  const visibleOptions = options.slice(startIndex, endIndex);

  return (
    <div className="flex items-center mt-6 md:justify-center">
      {/* <div className="md:hidden lg:hidden">
        <Button
          icon="pi pi-chevron-left"
          onClick={handleClickPrevious}
          className={`p-button-rounded p-button-text p-button-outlined ${
            currentPage === 0 ? "p-disabled" : ""
          }`}
          disabled={currentPage === 0}
        />
      </div> */}

      <div className="overflow-x-auto whitespace-nowrap xs:mx-3">
        {options.map((option, i) => (
          <Button
            key={i}
            value={data.filterCategory}
            onClick={() => {
              data.handleClickCat(option.value);
              setActiveOption(option.value);
            }}
            className={`text-md font-semibold py-2  ${custom.categoryBtn} ${
              option.value === activeOption ? custom.active : ""
            }`}
          >
            {option.label}
          </Button>
        ))}
      </div>

      {/* <div className="md:hidden lg:hidden">
        <Button
          onClick={handleClickNext}
          className={`p-button-rounded p-button-text p-button-outlined ${
            (currentPage + 1) * 4 >= options.length ? "p-disabled" : ""
          }`}
          disabled={(currentPage + 1) * 4 >= options.length}
          icon="pi pi-chevron-right"
        />
      </div> */}
    </div>
  );
};

export default SelectionFilter;
