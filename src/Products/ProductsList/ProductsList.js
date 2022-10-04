import React, { useState } from "react";
import AddButton from "../../UI/AddButton";

import "../../Styles/ProductsList.css";
import { useEffect } from "react";
import axios from "axios";
import Footer from "../../UI/Footer";

function ProductsList() {
  const [data, setData] = useState([]);
  const [checked, setChecked] = useState([]);
  // Fetch Products from Database
  const getData = () => {
    axios
      .get("https://heroku-scandiwebtest.herokuapp.com/products")
      .then((response) => {
        setData(response.data);
      });
  };

  // This function fills the data array the first time the page is loaded
  useEffect(() => {
    getData();
    setChecked([]);
  }, []);

  // Set checked list whenever the checkboxes are ticked
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    }
    setChecked(updatedList);
  };

  // Delete the checked data from the database
  const deleteSku = () => {
    axios
      .delete(`https://heroku-scandiwebtest.herokuapp.com/delete/${checked}`)
      .then((res) => {
        getData();
      });
  };

  return (
    <>
      <div className="container productlistcontainer mt-4">
        <div className="headercontainer">
          <div className="hcontainer">
            <h1>Product List</h1>
          </div>
          <div className="buttonscontainer">
            <AddButton />
            <button
              className="delete-btn"
              id="delete-product-btn"
              onClick={() => {
                deleteSku();
              }}
            >
              MASS DELETE
            </button>
          </div>
        </div>
        <div className="cardcontainer">
          {data.map((val, key) => {
            if (val.kg) {
              return (
                <div className="cardproductlist" key={key}>
                  <div className="valuescontainercheckbox pt-4 ml-3">
                    <input
                      className="delete-checkbox"
                      type="checkbox"
                      value={val.sku}
                      id={val.sku}
                      onChange={handleCheck}
                    />
                  </div>
                  <div className="valuescontainer">
                    <span> {val.name}</span>
                  </div>
                  <div className="valuescontainer">
                    <span> {val.price}$</span>
                  </div>
                  <div className="valuescontainer">
                    <span>{val.sku}</span>
                  </div>
                  <div className="valuescontainer">
                    <span className="pb-5">
                      <span>Weight: {val.kg} KG</span>
                    </span>
                  </div>
                </div>
              );
            } else if (val.mb) {
              return (
                <div className="cardproductlist" key={key}>
                  <div className="valuescontainercheckbox pt-4 ml-3">
                    <input
                      type="checkbox"
                      value={val.sku}
                      id={val.sku}
                      onChange={handleCheck}
                    />
                  </div>
                  <div className="valuescontainer">
                    <span> {val.name}</span>
                  </div>
                  <div className="valuescontainer">
                    <span> {val.price}$</span>
                  </div>
                  <div className="valuescontainer">
                    <span>{val.sku}</span>
                  </div>
                  <div className="valuescontainer">
                    <span className="pb-5">
                      <span>Size: {val.mb} MB</span>
                    </span>
                  </div>
                </div>
              );
            } else if (val.length) {
              return (
                <div className="cardproductlist" key={key}>
                  <div className="valuescontainercheckbox pt-4 ml-3">
                    <input
                      type="checkbox"
                      value={val.sku}
                      id={val.sku}
                      onChange={handleCheck}
                    />
                  </div>
                  <div className="valuescontainer">
                    <span> {val.name}</span>
                  </div>
                  <div className="valuescontainer">
                    <span> {val.price}$</span>
                  </div>
                  <div className="valuescontainer">
                    <span>{val.sku}</span>
                  </div>
                  <div className="valuescontainer">
                    <span className="pb-5">
                      <span>
                        Dimensions: {val.length}x{val.width}x{val.height}
                      </span>
                    </span>
                  </div>
                </div>
              );
            } else {
              return (
                <div className="cardproductlist" key={key}>
                  <div className="valuescontainercheckbox pt-4 ml-3">
                    <input
                      type="checkbox"
                      value={val.sku}
                      id={val.sku}
                      onChange={handleCheck}
                    />
                  </div>
                  <div className="valuescontainer">
                    <span> {val.name}</span>
                  </div>
                  <div className="valuescontainer">
                    <span> {val.price}$</span>
                  </div>
                  <div className="valuescontainer pb-5">
                    <span>{val.sku}</span>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductsList;
