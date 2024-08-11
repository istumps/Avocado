import React, {useContext, useEffect, useState} from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
import { food_list_backup } from '../../assets/assets'
import Spinner from '../Spinner/Spinner'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const FoodDisplay = ({category}) => {

    const {food_list} = useContext(StoreContext)
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
      if (!food_list || food_list.length === 0 ) {
        setLoading(true);
        toast.info("Please wait up to 50 seconds to receive the updated menu due to free hosting delays.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } 
      else {
        setLoading(false);
      }
    }, [food_list]);

    if (loading) {
      return (
        <div className='center'>
        <Spinner/>
        <ToastContainer />
        </div>
      );
    }  

  return (
    <div className='food-display' id="food-display">
        <h2>Top dishes near you</h2>
        <div className="food-display-list">
            {food_list.map((item, index) => {
              if(category==="All" || category === item.category){
              return <FoodItem key={index} id={item._id} name={item.name} price={item.price} description={item.description} image={item.image} />
              }
                })}
        </div>
    </div>
  )
}

export default FoodDisplay