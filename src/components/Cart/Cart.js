import { useContext , useState} from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout'
const Cart = (props) => {

  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitted] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false)
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const checkoutHandler = () =>{
    setIsCheckout(true);
  }

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const sendOrderHandler = async (userData) => {
    setIsSubmitted(true)
    await fetch('https://react-http-8579f-default-rtdb.firebaseio.com/orders.json', {
      method : 'POST',
      body : JSON.stringify({
        user : userData,
        orderedItems : cartCtx.items
      })
    })
    setIsSubmitted(false)
    setDidSubmit(true)
    cartCtx.clearCart();
  }

  const cartModalContent = 
  <>
  {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onConfirm={sendOrderHandler} onCancel={props.onClose}/>}
      {!isCheckout && <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button} onClick={checkoutHandler}>Order</button>}
      </div>}
  </>

  const isSubmittingModalContent = <p>Sending Order Data...</p>
  const didSubmitModalContent =
  <>
  <p>Successfully sent the order....</p>

  {/* {!isCheckout && <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
  
      </div>} */}
        
  </> 
  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isCheckout && didSubmit && didSubmitModalContent}
      
    </Modal>
  );
};

export default Cart;
