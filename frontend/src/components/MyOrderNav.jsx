import React from 'react'
import { useLocation , useNavigate } from 'react-router-dom'
import './MyOrderNav.css'
 


const MyOrderNav = ({username , password}) => {

// const location = useLocation()
const navigate = useNavigate()
// const {username , password} = location.state || {}

const Handle_Menu = ()=>{
    navigate('/Menu' , {state : {username : username , password : password}})
}

const Handle_Profile = async ()=>{
  {
    const postData = {pass : password}
    try {
      const response = await fetch('http://localhost:3000/user_profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const responseData = await response.json();
      if(responseData !== "false"){
        navigate("/Profile" , {state : {username : responseData.Name , password : responseData.Password , address : responseData.Address , phone : responseData.Phone }})
    }else{
        alert("Password Already exist")
    }

    } catch (error) {
    console.log("ERORORORJOROROROOROR")
      console.error(error);
      console.log('An error occurred. Please try again.');
    }

  };
}


    return (
    <div className='Order_Display_Nav'>
      <div onClick={Handle_Menu}><span className='Order_Nav_Side'>Menu</span></div>
      <div><span className='Order_Nav_Center'>CART</span></div>
      <div onClick={Handle_Profile}><span className='Order_Nav_Side'>{username}</span></div>
    </div>
  )
}

export default MyOrderNav
