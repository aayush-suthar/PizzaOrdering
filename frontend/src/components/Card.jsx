import React , {useState , useEffect} from 'react'
import './Card.css'
import dustbin from './images/dustbin.svg'
import rupee from './images/rupee.svg'


const Card = ({items , password}) => {

  const [count, setCount] = useState(0);
  useEffect(() => {
    const fetchInitialCount = async () => {
      try {
        const response = await fetch('http://localhost:3000/user_profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify({ pass: password }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
 
        const responseData = await response.json();
        let initialCount = 0;
        const itemLists = [
          responseData.Order.USER_PIZZA,
          responseData.Order.USER_BEVERAGE,
          responseData.Order.USER_GARLIC,
          responseData.Order.USER_DESSERT,
        ];

        itemLists.forEach((list) => {
          list.forEach((item) => {
            if (JSON.stringify(item) === JSON.stringify(items)) {
              initialCount++;
            }
          });
        });

        setCount(initialCount);
      } catch (error) {
        console.error('An error occurred while fetching the initial count:', error);
      }
    };
    fetchInitialCount();
    
  }, [items]);

const HandleOrderInsert = async ()=>{
  setCount(count + 1);
  
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

const HandleOrderDelete = async ()=>{
  if(count == 0){
    return
  }

  setCount(count - 1);
  
  try {
    console.log("fetching.......")
    const response = await fetch('http://localhost:3000/order_delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body : JSON.stringify({pass : password , food_type : items.type , food_item : items}),
    });
    console.log(response)

    if (!response.ok) {
        throw new Error('Network response was not ok.');
    }
    const responseData = await response.text();
} catch (error) {
    console.error(error);
    console.log('An error occurred. Please try again.');
}  
}

const veg_url = (items.veg) ? "https://uxwing.com/wp-content/themes/uxwing/download/signs-and-symbols/green-circle-icon.png" : "https://uxwing.com/wp-content/themes/uxwing/download/signs-and-symbols/red-circle-icon.png";


  // console.log(items)
  return (
    <>
    <div className='card_parent'>
      <img className='Veg' src={veg_url} alt="" />
        <div className="card_pic">
        <img className='Card_Rupee' src={rupee} alt="" /><span className='Card_Cost'>{items.price}</span><img className='Card_food_pic' src={items.pic} alt="" />
        </div>
        <div className="card_about">
          <div className='card_about_name'>{items.name}</div>
          <div className='card_about_desc'>{items.description}</div>
        </div>
        <div className="card_add">
            <div onClick={HandleOrderDelete} className='card_add_delete'><img src={dustbin} alt="" /></div>
            <div className='card_add_count'>{count}</div>
            <div onClick={HandleOrderInsert} className='card_add_add'>{ (count === 0) ? 'Add to Cart' : '+' }</div>
        </div>

    </div>
    </>
  )

}

export default Card
