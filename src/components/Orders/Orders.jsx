import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { deleteShoppingCart, getShoppingCart, removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import CartItem from '../CartItem/CartItem';

const Orders = () => {
    const savedCart =  useLoaderData();
    
    const [orderItem, setOrderItem] = useState(savedCart);

    const removeCartItem =(id)=>{
        const getCartId = orderItem.filter(pd => pd._id !== id);
        setOrderItem(getCartId);
        removeFromDb(id)
    }

    const clearAllCart = () =>{
        setOrderItem([])
        deleteShoppingCart();
    }
    return (
        <div className='shop-container'>
        <div className='gap-4 mx-4 mt-10'>
           {
           orderItem.map(product => <CartItem 
            key={product._id}
            product={product}
            removeCartItem = {removeCartItem}

            
            ></CartItem>)
           }
        </div>
        <div className='bg-[#FF99004D] p-3 ' >
           <Cart clearAllCart={clearAllCart} cart={orderItem}>
           <button className='w-56 bg-amber-500'>Proceed Checkout  </button>
          
           </Cart>
           
        </div>
    </div>
    );
};

export default Orders;