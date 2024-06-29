import React, { useState , useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import style from './Login.module.css'

const Login = () => {

    const [Name, SetName] = useState('')
    const [Password, SetPassword] = useState('')
    const navigate = useNavigate()

const HandleSubmit_Sign = async () => {
    {
        try { 
                navigate("/Signin");
        } catch (error) {
            console.error(error);
            console.log('An error occurred. Please try again.');
        }
    };   
}


    const HandleSubmit = async () => {
        {
            const postData = { name: Name, pass: Password }

            if (Name == "") {
                alert("Enter your Name")
                return;
            }
            if (Name != "" && Password == "") {
                alert("Enter your Password")
                return;
            }
 
            try {
                const response = await fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(postData),
                });
 
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                } 
                const responseData = await response.text();

                if (responseData == "false") {
                    alert("Account not found")
                    navigate("/Signin")
                } else if (responseData == "true") {
                    navigate('/Menu', { state: { username: Name, password: Password } });
                }

            } catch (error) {
                console.error(error);
                console.log('An error occurred. Please try again.');
            }

        };
    }

    return (
        <div className={style.parent1}>

            <div className={style.login_page1}>

                <div className={style.header1}>
                    <h1>LOGIN</h1>
                </div>
                <div className={style.name1}>
                    <input type="text" placeholder='Name' value={Name} onChange={(e => { SetName(e.target.value) })} required />
                </div>
                <div className={style.password1}> 
                    <input type="text" placeholder='Password' value={Password} onChange={(e => { SetPassword(e.target.value) })} required />
                </div>
                <div>
                    <div className={style.button1} onClick={HandleSubmit}>
                        <span>Login</span>
                    </div>
                </div>
                <div className={style.small_button1}>
                    <span>Don't have an account?</span>
                    <div className={style.sign1} onClick={HandleSubmit_Sign}>
                        <span>SignIn</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
