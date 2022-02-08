import {Fragment} from 'react'
import headerImage from '../../assets/meals.jpg';
import HeaderCartButton from './HeaderCartButton';
import classes from './Header.module.css'
const Header = ()=>{
   return( <Fragment>
    <header className={classes.header}>
        <h1>Tasty Meals</h1>
        <HeaderCartButton />
    </header>
    <div className={classes['main-image']}>
        <img src={headerImage} alt='A table full of delicious meal'/>
    </div>
   </Fragment>);
}

export default Header;