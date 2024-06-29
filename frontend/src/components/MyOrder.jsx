import React,{useState , useEffect} from 'react'
import MyOrderNav from './MyOrderNav'
import MyOrderItemDisplay from './MyOrderItemDisplay'
import { useLocation } from 'react-router-dom'

const MyOrder = () => {
  
  const location = useLocation()

  const {username , password } = location.state || {}
  const [CollectData , SetCollectData] = useState([])
  // const [TotalItem , SetTotalItem] = useState(0)

  useEffect(() => {
    
    const FetchData = async ()=>{ 
  
      try{
        let response = await fetch('http://localhost:3000/user_profile' , {
          method : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ pass: password }),
        })
        
        if(!response.ok){
          throw new Error('Network response was not ok.');
        }
        const responseData = await response.json()
        SetCollectData([responseData.Order.USER_PIZZA , responseData.Order.USER_GARLIC , responseData.Order.USER_BEVERAGE  , responseData.Order.USER_DESSERT])
        SetTotalItem(responseData.Order.USER_PIZZA.length + responseData.Order.USER_GARLIC.length + responseData.Order.USER_BEVERAGE.length + responseData.Order.USER_DESSERT.length)
      }catch(error){
        console.log('An error occurred while fetching the initial count:', error);
      }
  
    } 
  
    FetchData()
  
  }, [])
  

  return (
    <div>
    <MyOrderNav username={username} password={password}/>
    <MyOrderItemDisplay password={password} CollectData={CollectData}/>
    </div>
    
  )
}

export default MyOrder
