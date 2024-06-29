import React , {useState , useEffect} from 'react'
import './MyOrderItemDisplay.css'
import MyOrder_Card from './MyOrder_Card'
import Total_Payment from './Total_Payment'

const MyOrderItemDisplay = ({ password,  CollectData }) => {
    const [TotalItem, setTotalItem] = useState(0);

    useEffect(() => {
      const initialCount = CollectData.flat().length;
      setTotalItem(initialCount);
    }, [CollectData]);
  
    const incrementTotalItem = () => {
      setTotalItem(prevCount => prevCount + 1);
    }; 
  
    const decrementTotalItem = () => {
      setTotalItem(prevCount => prevCount - 1);
    };
    
    return (
        <div className='MyOrderItem_parent'>

            <div className='MyOrderItem_box'>
                <div className='Total_Item_Selected'>
                    <span>{TotalItem} Item you have selected</span>
                </div>
                {
                    CollectData.flatMap((item, index) =>
                        item.map((inner_item, inner_index) =>
                            <MyOrder_Card key={`${index}-${inner_index}`} password={password} items={inner_item} CollectData={CollectData} incrementTotalItem={incrementTotalItem} decrementTotalItem={decrementTotalItem} />
                        )
                    )
                }


                <Total_Payment TotalItem = {TotalItem} Food_Arr = {CollectData.flat()}/>
                


            </div>

        </div>
    )
}

export default MyOrderItemDisplay
