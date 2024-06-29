import React, { useState  } from 'react'
import { useNavigate } from 'react-router-dom';
import './Navbar.css'
import cart from './images/cart.svg'
import user_profile from './images/user.svg'
import hamburger from './images/hamburger.svg'
import Navbar_Res from './Navbar_Res'

const Navbar = ({ username , password}) => {
  const [IsVisible, setIsVisible] = useState(false)
  const navigate = useNavigate();
  const Handle_Toggle = () => {
    setIsVisible(!IsVisible)
  }


  const update = (e) => {  
    setIsVisible(e)
  }

  const Handle_User_Order = ()=>{
    navigate('/MyOrder' , {state : {username : username , password : password}} )
  }

  const Handle_User_Profile = async ()=>{
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
    <>
      {IsVisible && <Navbar_Res username={username} IsVisible={IsVisible} update={update} Handle_User_Profile={Handle_User_Profile} Handle_User_Order={Handle_User_Order} />}
      <div className='NAVIGATION'>
      <div className='navbar_parent'>
        <img className='hamburger' src={hamburger} alt="" onClick={Handle_Toggle} />

        <div onClick={Handle_User_Order} className='myorder'>
          <img src={cart} alt="Not Available" /><span>My Order</span>
        </div>
        <div className='logo'>
          <img src="https://pizzaonline.dominos.co.in/static/assets/logo_white.svg" alt="" />
        </div>
        <div onClick={Handle_User_Profile} className='user'>
          <img src={user_profile} alt="" /><span>{username}</span>
        </div>
      </div>
      </div>
    </>
  )
}

export default Navbar
