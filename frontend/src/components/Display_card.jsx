
import React, { useState, useEffect, forwardRef } from 'react'
import './Display.css'
import Card from './Card';

const Display_card = forwardRef(({ food_name, password }, ref) => {
    const [Arr, setArr] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/get_some_${food_name}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                const responseData = await response.json();
                setArr(responseData);
            } catch (error) {
                console.error('An error occurred:', error);
            } 
        };

        fetchData();
    }, []);

    return (
        <div ref={ref} className='DISPLAY'>

            <div className='display_parent'>    
                <div className='display_header'>
                    <div>{food_name}</div>
                </div>
                <div className='display_area'>
                    {
                        Arr.map((item, index) => {
                            return ((Arr.length != 0) ? <Card key={index} items={Arr[index]} password={password} /> : '')
                        })
                    }
                </div>

            </div>

        </div>
    )
})

export default Display_card
