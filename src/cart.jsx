import { useState } from 'react'
import './As.css'

export  function Cart() {
    const [inCart, setInCart] = useState(false)



    
    return (
        <div> 
            <div className='vibrat' button={{ position: 'absolute', top: 50, left: 100}}>
                <button  onClick={() => setInCart(!inCart)} className='btn'>
                {inCart ? 'уже в корзине' : 'выбрать'}
                </button>
            </div>
        </div>
    )
}