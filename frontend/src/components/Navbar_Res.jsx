import React from 'react'
import './navbar_res.css'
import cross_pic from './images/cross.svg'
import user from './images/user.svg'
import order from './images/cart.svg'

const Navbar_Res = ({ username, IsVisible, update, Handle_User_Profile ,Handle_User_Order }) => {
  const Handle_Side_Close = () => {
    update(!IsVisible)
  }


  return (
    <div className='nav_side'>
      <div className='side_cross_pic'>
        <div><h2>{username}</h2></div>
        <img onClick={Handle_Side_Close} src={cross_pic} alt="" />
      </div>
      <div onClick={Handle_User_Profile} className='nav_side_user nav_side_list'><img src={user} alt="" /><span>Profile</span></div>
      <div onClick={Handle_User_Order} className='nav_side_myorder nav_side_list'><img src={order} alt="" /><span>MyOrder</span></div>
    </div>
  )
}

export default Navbar_Res
