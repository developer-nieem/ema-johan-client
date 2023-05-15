import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import {
  addToDb,
  deleteShoppingCart,
  getShoppingCart,
} from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [currentPage , setCurrentPage] =  useState(0);
  const [itemsPerPage , setItemsPerPage] =  useState(10);
  const {allProducts} = useLoaderData();

//   const itemsPerPage = 10; //Todo dynamic
  const totalPage = Math.ceil(allProducts / itemsPerPage);

  const pageNumber = [...Array(totalPage).keys()];
  const options =  [ 10, 20]
  const handelSelectPerPage =  (event) => {
        setItemsPerPage( parseInt(event.target.value));
        setCurrentPage(1)
  }

  useEffect(() => {
    fetch(`http://localhost:3000/products?page=${currentPage}&limit=${itemsPerPage}`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [currentPage, itemsPerPage]);

  const addTOCart = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    addToDb(product._id);
  };

  useEffect(() => {
    const storedCart = getShoppingCart();
    console.log(storedCart);
    const savedCart = [];

    // step 1: get id from localStorage
    for (const id in storedCart) {
      // step 2: find products bu using id
      const addedProducts = products.find((product) => product._id === id);

      if (addedProducts) {
        //  step 3: find qty and set qty in product
        const quantity = storedCart[id];
        addedProducts.quantity = quantity;
        console.log(addedProducts);

        //  add the addedProduct to the savedCart
        savedCart.push(addedProducts);
      }

      setCart(savedCart);
    }
  }, [products]);
  const clearAllCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  return (
    <>
      <div className="shop-container">
        <div className="grid grid-cols-3 gap-4 mx-4 mt-10">
          {products.map((product) => (
            <Product
              product={product}
              key={product._id}
              addTOCart={addTOCart}
            ></Product>
          ))}
        </div>
        <div className="bg-[#FF99004D] p-3 ">
          <Cart clearAllCart={clearAllCart} cart={cart}>
            <Link to="/orders">
              <button className="w-56 mt-3 bg-amber-500">order review </button>
            </Link>
          </Cart>
        </div>
      </div>

      {/* pagination  */}

      <div className="text-center mb-8 space-x-3">
      <p>current page {currentPage}</p>
        {pageNumber.map((page) => (
          <button onClick={() => setCurrentPage(page)} key={page}> {page}</button>
        ))}

<select id="itemsPerPage" value={itemsPerPage} onChange={handelSelectPerPage}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      </div>
    </>
  );
};

export default Shop;
