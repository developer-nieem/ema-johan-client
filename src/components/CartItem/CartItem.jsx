import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

const CartItem = ({ product, removeCartItem }) => {
//   console.log(product);
  return (
    <div>
      
        <div className="card card-side bg-base-100 shadow-xl my-2 p-2">
          <figure>
            <img className="w-20"
              src={product.img}
              alt="Movie"
            />
          </figure>
          <div className="card-body justify-center p-2">
            <div className="flex justify-between">
            <div>
            <h2 className="card-title">{product.name}</h2>
            <p>Price: <span className="text-amber-600">${product.price}</span></p>
            <p>Order Qty: <span className="text-amber-600">{product.quantity}</span></p>
            </div>
            <div onClick={() => removeCartItem(product._id)} className="card-actions justify-end">
              <button className="btn btn-primary btn-circle">
              <FontAwesomeIcon icon={faTrashCan} />            
                </button>
            </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default CartItem;
