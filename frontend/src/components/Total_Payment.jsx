import React , {useState , useEffect} from 'react'
import './Total_Payment.css'

const Total_Payment = ({TotalItem , Food_Arr}) => {
  
    const [Amount, setAmount] = useState(0)

    useEffect(() => {
        const Amount = ()=>{
            let a = 0;
            for(var i = 0;i < Food_Arr.length ; i++){
                a += parseInt(Food_Arr[i].price)
            }
            setAmount(a)
        }
        Amount()
    
    }, [Food_Arr])

    if(TotalItem === 0){
        return null
    }
    
  
    return (
    <div className='FINALE'>
        <div className='Total_Payment_parent'> 

        <div className='Total_Payment_Amount'>
            <div className='Grand_Total'>Grand Total</div>
            <div className='Total_Amount'>{Amount}</div>
        </div>
        <div className='Place_Order'>
            Place Order
        </div>

        </div>
    </div>
  )
}

export default Total_Payment
