import React from 'react'
import { useLocation , useNavigate } from 'react-router-dom'
import './Profile.css'

const Profile = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const {username , password , address , phone} = location.state || {};
//   console.log(username , password , address , phone)

    const Handle_Menu = ()=>{
        navigate('/Menu' , {state : {username : username , password : password}})
    }
    const Handle_MyOrder = ()=>{
        navigate('/MyOrder' , {state : {username : username , password : password}})
    }

  
    return (
    <div className='Profile_parent'>
        
    <div className='Profile_box'>

        <div className="Profile_Both_Button">
            <div onClick={Handle_Menu} className='Profile_Button'>Menu</div>
            <div onClick={Handle_MyOrder} className='Profile_Button'>MyOrder</div>
        </div>
        <div className='Profile_Main'>
            <div className='Profile_Info'>
                <div className='Profile_Info_Box Profile_Info_heading'><span>Name : </span></div>
                <div className='Profile_Info_Box Profile_Info_Info'><span>{username}</span></div>
                <div className='Profile_Info_Box Profile_Info_heading'><span>Password : </span></div>
                <div className='Profile_Info_Box Profile_Info_Info'><span>{password}</span></div>
                <div className='Profile_Info_Box Profile_Info_heading'><span>Address : </span></div>
                <div className='Profile_Info_Box Profile_Info_Info'><span>{address}</span></div>
                <div className='Profile_Info_Box Profile_Info_heading'><span>Contact : </span></div>
                <div className='Profile_Info_Box Profile_Info_Info'><span>{phone}</span></div>
            </div>
            <div className='Profile_Header'>
                <span>PROFILE</span>
            </div>
        </div>

    </div>

    </div>
  )
}

export default Profile
