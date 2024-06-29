import React, { useState , useEffect , useRef} from 'react'
import './item_navbar.css'
import arrow_down from './images/arrow_down.svg'

const Food_navbar = ({Scroll_To1 , Scroll_To2 , Scroll_To3 , Scroll_To4 , Scroll_To5}) => {

const [DropDown , setDropDown] = useState(false)
const [currentWidth, setCurrentWidth] = useState(window.innerWidth);


const ChangeDisplay = ()=>{
    let arr = document.querySelectorAll(".food_item"); 
    for(let i = 1;i < arr.length ; i++){
        
        setTimeout(() => {
            arr[i].style.cssText = `
            display : block;
            `  
        },0);
        // console.log(arr[i].style)
    }
}
const ReverseDisplay = ()=>{
    let arr = document.querySelectorAll(".food_item"); 
    for(let i = 1;i < arr.length ; i++){
        
        setTimeout(() => {
            arr[i].style.cssText = `
            display : none;
            `  
        },0);
        // console.log(arr[i].style)
    }
}

useEffect(() => {
    const monitorWindowSize = () => {
        setCurrentWidth(window.innerWidth);
        if(window.innerWidth >= 700 ){
            ChangeDisplay()
        }else{
            ReverseDisplay()
        }
    };

    window.addEventListener('resize', monitorWindowSize);
    return () => {
        window.removeEventListener('resize', monitorWindowSize);
    };
}, []);

const Handle_DropDown = ()=>{

    if(window.innerWidth >= 700){
        return;
    }
    
    let arr = document.querySelectorAll(".food_item");
    // console.log(arr); 

    if(!DropDown){
        setDropDown(true);
        for(let i = 1;i < arr.length ; i++){
        
            setTimeout(() => {
                arr[i].style.cssText = `
                display : block;
                `  
            }, i*50);
            console.log(arr[i].style)
        }
    }else{
        for(let i = arr.length-1;i >= 1; i--){
        setDropDown(false);
            setTimeout(() => {
                arr[i].style.cssText = `
                display : none;
            ` 
            }, i*50);
            // console.log(arr[i].style)
        }
    }

    let arrow = document.querySelector(".food_choose_arrow_down");
    // console.log(arrow)
    arrow.style.cssText =  `
    rotate : ${ (!DropDown)  ? '180deg' : '0deg' };
    transition : rotate 1s;
    `
}

  return (
        <div className='food_navbar'>
        <div className="food_item food_dropdown" onClick={Handle_DropDown}><span>Choose</span><img className='food_choose_arrow_down' src={arrow_down} alt="" /></div>
        <div onClick={()=>{Scroll_To1() , Handle_DropDown()}} className='food_item'><span>Pizza</span></div>
        <div onClick={()=>{Scroll_To2() , Handle_DropDown()}}  className='food_item'><span>Combo</span></div>
        <div onClick={()=>{Scroll_To3() , Handle_DropDown()}}  className='food_item'><span>Garlic</span></div>
        <div onClick={()=>{Scroll_To4() , Handle_DropDown()}}  className='food_item'><span>beverages</span></div>
        <div onClick={()=>{Scroll_To5() , Handle_DropDown()}}  className='food_item'><span>Dessert</span></div>
    </div>
  )
}

export default Food_navbar
