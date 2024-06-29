import React , {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import style from './Signin.module.css'

const Signin = () => {

const [Name, setName] = useState('')
const [Password, setPassword] = useState('')
const [Address, setAddress] = useState('')
const [Phone, setPhone] = useState('')
console.log("jdaikjdi  ",Name, Password , Address , Phone)
const navigate = useNavigate()

const Handle_Login = ()=>{
    {
        try {
            navigate("/");
        } catch (error) {
            console.error(error);
            console.log('An error occurred. Please try again.');
        }
    };  
}

const Handle_Signin_Submit = async () =>{

    {
        const postData = {name : Name , pass : Password,address : Address,phone : Phone}
        try {
          const response = await fetch('http://localhost:3000/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
              },
            body: JSON.stringify(postData),
          });
        //   console.log(Name,Password)
    
          if (!response.ok) {
            throw new Error('Network response was not ok.');
          }
          console.log(response)
          const responseData = await response.text();
          console.log(responseData); 
          console.log(typeof responseData);
          
          if(responseData == "false"){
              console.log("New Account is Added")
              alert("Now Login Again")
            navigate("/" , {state : { UserName : Name , UserPassword : Password , UserAddress : Address , UserPhone : Phone }})
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
    <div className={style.parent2}>
      
      <div className={style.box2}>
        <div className={style.header2}>
            <h1>Sign Up</h1>
        </div>
        <div className={style.name2}>
        <input placeholder='Name' type="text" value={Name} onChange={(e)=>{setName(e.target.value)}} />
        </div>
        <div className={style.password2}>
        <input placeholder='Password' type="text" value={Password} onChange={(e)=>{setPassword(e.target.value)}} />
        </div>
        <div className={style.address2}>
        <input placeholder='Address' type="text" value={Address} onChange={(e)=>{setAddress(e.target.value)}} />
        </div>
        <div className={style.contact2}>
        <input placeholder='Contact' type="number" value={Phone} onChange={(e)=>{setPhone(e.target.value)}} />
        </div>
        <div className={style.button2}>
        <div onClick={Handle_Signin_Submit}>Signin</div>
        </div>

        <div className={style.small_button2}>
            <span>Return to Login</span>
            <div onClick={Handle_Login}  className={style.sign2}><span>Login</span></div>
        </div>

      </div>

    </div>
  )
}

export default Signin
