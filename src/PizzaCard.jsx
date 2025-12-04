import { Cart } from './cart.jsx'
import './As.css'
import { useState } from 'react'
import { Modal } from './components/ui/Modal.jsx'



export function PizzaCard({
image, name, desc, price
}) {
    const [isOpenWindow, setIsOpenWindow] = useState(false)
    return <div className='cd' onClick={() => {
                setIsOpenWindow(true)}}>
        {isOpenWindow && (
        <Modal
        onClose= {(e)=> {
            if (e) e.stopPropagation();
            setIsOpenWindow(false);
        }}
        >
        <div className='text-mdl-style'>
                        <img
                        className='pizza-image'
                        width="300"
                        height="300"
                        src={image}
                        alt={name}
                        allowfullscreen
                        />
                        <h2 style={{ fontSize: '24px', marginBottom: '10px', color: 'black' }}>
                            {name}</h2>
                        <p style={{ fontSize: '16px', marginBottom: '15px', color: '#ccc' }}>
                            {desc}
                        </p>
                        <button className='card-modal-pizza'>
                            Добавить в корзину - {price}
                        </button>

     </div>
        </Modal>)}
            <img
                className='img'
                src={image}
                alt=''
                width={300}
            />
        <div>
            <h1>{name}</h1>
        </div>
        <div className="desc">
            {desc}
        </div>
        <div onClick={(e) => e.stopPropagation()}>
            <Cart/>
        </div>
        <div className='crdtxt'>
            {price}
        </div>
    </div>
}
