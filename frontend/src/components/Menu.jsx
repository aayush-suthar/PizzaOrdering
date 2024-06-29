import React , {useState , useEffect , useRef} from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar';
import Food_navbar from './Food_navbar'
import './Menu.css' 
import Display_card from './Display_card'; 

const Menu = () => {
  
  const location = useLocation();
  const {username , password } = location.state || {};
  const targetRef1 = useRef(null)
  const targetRef2 = useRef(null)
  const targetRef3 = useRef(null)
  const targetRef4 = useRef(null)
  const targetRef5 = useRef(null)


  const HandleScroll1 = ()=>{
    if(targetRef1.current){
      targetRef1.current.scrollIntoView({ behavior: 'smooth' });
    }
  }
  const HandleScroll2 = ()=>{
    if(targetRef2.current){
      targetRef2.current.scrollIntoView({ behavior: 'smooth' });
    }
  }
  const HandleScroll3 = ()=>{
    if(targetRef3.current){
      targetRef3.current.scrollIntoView({ behavior: 'smooth' });
    }
  }
  const HandleScroll4 = ()=>{
    if(targetRef4.current){
      targetRef4.current.scrollIntoView({ behavior: 'smooth' });
    }
  }
  const HandleScroll5 = ()=>{
    if(targetRef5.current){
      targetRef5.current.scrollIntoView({ behavior: 'smooth' });
    }
  }


  return (
    <div className='MENU'>

    <Navbar username={username} password={password}/>
    <div className='Menu_Display'>

    <Food_navbar Scroll_To1={HandleScroll1} Scroll_To2 = {HandleScroll2} Scroll_To3 = {HandleScroll3} Scroll_To4 = {HandleScroll4} Scroll_To5 = {HandleScroll5}/>
    <Display_card ref={targetRef1} food_name="Pizza" password={password}/>
    <Display_card ref={targetRef2} food_name="Combo" password={password}/>
    <Display_card ref={targetRef3} food_name="Garlic" password={password}/>
    <Display_card ref={targetRef4} food_name="Beverage" password={password}/>
    <Display_card ref={targetRef5} food_name="Dessert" password={password}/>
    
    </div>
    </div>
  )
}

export default Menu
