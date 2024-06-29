import React, { useState , useEffect } from 'react'
import './MyOrder_Card.css'
import rupee from './images/rupee.svg'

const MyOrder_Card = ({password , items , CollectData , incrementTotalItem , decrementTotalItem}) => {
  
    const calculateItemCount = () => {
        let count = 0;
        for (let i = 0; i < CollectData.length; i++) {
          for (let j = 0; j < CollectData[i].length; j++) {
            if (CollectData[i][j] === items) {
              count++;
            }
          }  
        }
        return count;
      };

  const [Item_Count , setItem_Count] = useState(calculateItemCount)

  useEffect(() => {
  },[CollectData , Item_Count])
  

  const Delete_Item =  async ()=>{
    if(Item_Count > 0){
        setItem_Count(Item_Count-1)
        decrementTotalItem()
        try {
            const response = await fetch('http://localhost:3000/order_delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({pass : password , food_type : items.type , food_item : items}),
            });
            
            
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const responseData = await response.text();
        } catch (error) {
            console.error(error);
            console.log('An error occurred. Please try again.');
        }  
    }
  }

  const Insert_Item = async ()=>{
  
    setItem_Count(Item_Count + 1);
    incrementTotalItem()
    try {
      const response = await fetch('http://localhost:3000/order_insert', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body : JSON.stringify({pass : password , food_type : items.type , food_item : items}),
      });
  
      if (!response.ok) {
          throw new Error('Network response was not ok.');
      }
      const responseData = await response.text();
  } catch (error) {
      console.error(error);
      console.log('An error occurred. Please try again.');
  }
  
  }

  if (Item_Count === 0) {
    return null;
  }
  const veg_url = (items.veg) ? "https://uxwing.com/wp-content/themes/uxwing/download/signs-and-symbols/green-circle-icon.png" : "https://uxwing.com/wp-content/themes/uxwing/download/signs-and-symbols/red-circle-icon.png";
    return (
    <div className='MyOrder_Card_Parent'>
      <div className='veg_image'><img src={veg_url} alt="" /></div>
      <div className='MyOrder_Card_pic'>
        <img src={items.pic} alt="" />
      </div>
      <div className='MyOrder_Card_Text'>
        <div><span>{items.name}</span></div>
        <div><span>{items.description}</span></div>
      </div>
      <div className='MyOrder_Card_Price'>
        <div><img src={rupee} alt="" />{items.price}</div>
      </div>
      
    </div>
  )
}

export default MyOrder_Card
