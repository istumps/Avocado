import React, {useContext, useEffect, useState} from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
import { food_list_backup } from '../../assets/assets'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const FoodDisplay = ({category}) => {

    const {food_list} = useContext(StoreContext)
    const [displayList, setDisplayList] = useState([]);

    
    useEffect(() => {
      if (!food_list || food_list.length === 0) {
        setDisplayList(food_list_backup);
        toast.info("Please wait up to 50 seconds to receive the updated menu due to free hosting delays.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        setDisplayList(food_list);
      }
    }, [food_list]);

  return (
    <div className='food-display' id="food-display">
        <h2>Top dishes near you</h2>
        <ToastContainer />
        <div className="food-display-list">
            {displayList.map((item, index) => {
              if(category==="All" || category === item.category){
              return <FoodItem key={index} id={item._id} name={item.name} price={item.price} description={item.description} image={item.image} />
              }
                })}
        </div>
    </div>
  )
}

export default FoodDisplay