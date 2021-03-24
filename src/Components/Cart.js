import React from "react";
import { useSelector} from "react-redux";
import { Link } from "react-router-dom";
import CartCheckoutCard from './cards/CartCheckoutCard'
import {userCart} from '../functions/User'

const Cart = ({history}) => {
  const { cart, user } = useSelector((state) => ({ ...state }));


  //Function to calculate total
  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const checkOutOrder = () => {
    // console.log("cart", JSON.stringify(cart, null, 4))
    userCart(cart, user.token)
    .then(res => {
      console.log('CART POST RES', res)
      if (res.data.ok) 
      history.push('/checkout')
    })
    .catch((err) => console.log("cart save err", err))
  }

  const cartItems = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>

      {cart.map((p) => (
        < CartCheckoutCard  key={p._id} p={p}/>
      ))}
    </table>
  );

  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <h4>You have {cart.length} Items in your Cart</h4>

          {!cart.length ? (
            <p>
              Shopping Cart is Empty. <Link to="/shop">Continue Shopping.</Link>
            </p>
          ) : (
            cartItems()
          )}
        </div>
        <div className="col-md-4">
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} x {c.count} = ${c.price * c.count}
              </p>
            </div>
          ))}
          <hr />
          Total: <b>${getTotal()}</b>
          <hr />
          {user ? (
            <button
              onClick={checkOutOrder}
              className="btn btn-sm btn-primary mt-2 btn-raised"
              disabled={!cart.length}
            >
            Checkout
            </button>
          ) : (
            <button className="btn-sm  mt-2" >
              <Link
                to={{
                  pathname: "/login",
                  state: { from: "cart" },
                }}
              >
                Login to Checkout
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
