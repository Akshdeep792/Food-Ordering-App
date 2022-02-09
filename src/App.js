import React, { useState } from 'react';
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header'
import Meals from './components/Meals/Meals';
import CartProvider from './store/CartProvider';
function App() {
  const [cartisShown, setCartisShown] = useState(false);

  function showCartHandler() {
    setCartisShown(true);
  }
  function hideCartHandler() {
    setCartisShown(false);
  }
  return (
    <CartProvider>
      {cartisShown && <Cart isClose={hideCartHandler} />}
      <Header isShown={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );

}

export default App;
