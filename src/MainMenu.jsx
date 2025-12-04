import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

import './As.css'

function MainMenu({ provider, contract, signer}) {
  
  const [ product, setProduct] = useState([])
  const [quanity,setQuanity] = useState(1)


    useEffect (() => {

    viewProduct()

  },[contract])

  const viewProduct =async() =>{
    try{

      const tx = await contract.connect(provider).viewProducts()
      
      setProduct(tx)
      console.log(tx)
    }
    catch(error){
      console.error(error)
      
    }
  }

  const buyProduct = async(id) =>{

    try{
      const quanityValue = quanity[id] || 1 
      const tx = await contract.connect(signer).setProductInBasket(id, quanityValue)
      console.log(tx)
      await tx.wait(tx)
      
      }
    catch(error){
      console.error(error)
      
      } 
  }
  
  const plus = (id) => {
  setQuanity(prev => ({
    ...prev,
    [id]: (prev[id] || 1) + 1
  }))
}

// Уменьшить количество для конкретного продукта
const minus = (id) => {
  setQuanity(prev => ({
    ...prev,
    [id]: Math.max((prev[id] || 1) - 1, 1)  // не меньше 1
  }))
}

  return (
  <div>

        <h1 className='name-type'>
           Ассортимент
        </h1>
  
  <div className='card'>
        
      {product.map(list =>(
        <div className='cd' key={list.id}>
        <img className='img' src={list.image}></img>
          <h2 className='name-type'>{list.name}</h2>
          <p className='desc'>{list.desc}</p>
          <p>{list.price} руб</p>
          {/* <input
          placeholder='Количество'
          type='number'
          min='1'
          value={list.quanity}
          onChange={(e) => setQuanity(e.target.value)}
          /> */}
          <div className='razmer'>
          <button className='minus' onClick={()=>minus(list.id)} >-</button>
          <span>{quanity[list.id]}</span>
          <button className='plus' onClick={()=>plus(list.id)} >+</button>
          </div>
          <button onClick={()=>buyProduct(list.id)} className='btn' >Добавить в корзину</button>
              
        </div>
      ))
      }  
      </div>
    </div>
  );
}
export default MainMenu;