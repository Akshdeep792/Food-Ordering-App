import {useEffect, useState} from 'react'
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState()
  useEffect(()=> {
      const fetchMeals = async () => {
        const response = await fetch('https://react-http-8579f-default-rtdb.firebaseio.com/Meals.json');
        if(!response.ok){
         throw new Error('Something went wrong!')
        }
        const responseData = await response.json();
        
        const loadMeals = [];
        for(const key in responseData){
          loadMeals.push({
            id : key,
            name : responseData[key].name,
            description : responseData[key].description,
            price : responseData[key].price
          })
          
        }
        setMeals(loadMeals);
        setIsLoading(false);
      }
      fetchMeals().catch(err => {
        setIsLoading(false)
        setHttpError(err.message);
      });
  }, [])

  if(isLoading){
    return (
      <section className={classes.Loading}>
        <p>Loading.....</p>
      </section>
    )
  }

  if(httpError){
    return (
      <section className={classes.nError}>
        <p>{httpError}</p>
      </section>
    )
  }
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
