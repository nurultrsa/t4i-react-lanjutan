import { useEffect, useState } from "react";
import CardProduct from "./components/CardProduct";
import CartListItem from "./components/CartListItem";
import Navbar from "./components/Navbar";

import choice_menu from "./dummy-data";

export default function App() {
  const [total, setTotal] = useState(0);
  const [purchasedItem, setPurchasedItem] = useState(0);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setPurchasedItem(cart.reduce((d, currentI) => currentI.amount + d, 0));
    setTotal(
      cart.reduce((d, currentI) => currentI.amount * currentI.price + d, 0)
    );
  });

  const addToCart = (id) => {
    const item_id = cart.find((data) => data.id === id);
    const item_menu = choice_menu.find((data) => data.id === id);

    !item_id
      ? setCart([
          ...cart,
          {
            id,
            name: item_menu.name,
            price: item_menu.price,
            amount: 1,
          },
        ])
      : increaseCartAmount(id);
  };

  const decreaseCartAmount = (id) => {
    const item_id = cart.find((data) => data.id === id);
    item_id.amount = item_id.amount - 1;
    const cartWOActiveid = cart.filter((data) => data.id !== id);
    item_id.amount <= 0
      ? setCart(cartWOActiveid)
      : setCart([...cartWOActiveid, item_id]);
  };

  const increaseCartAmount = (id) => {
    const item_id = cart.find((data) => data.id === id);
    item_id.amount = item_id.amount + 1;
    const cartWOActiveid = cart.filter((data) => data.id !== id);
    setCart([...cartWOActiveid, item_id]);
  };

  return (
    <div className="bg-secondary">
      <Navbar totalItem={purchasedItem} />
      <div className="container py-5">
        <div className="row">
          <div className="col-md-8">
            <div className="card w-100">
              <div className="card-body">
                <div className="row">
                  {choice_menu.map((menu) => (
                    <div
                      key={menu.id}
                      className="col-md-4 col-sm-6 col-12 my-2"
                    >
                      <CardProduct
                        {...menu}
                        addToCart={() => addToCart(menu.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <ol className="list-group">
              {cart.map((c) => {
                return (
                  <CartListItem
                    key={c.id}
                    {...c}
                    increase={() => increaseCartAmount(c.id)}
                    decrease={() => decreaseCartAmount(c.id)}
                  />
                );
              })}
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Total Harga</div>
                </div>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(total)}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
