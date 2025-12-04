import { useState, useEffect } from 'react'

export function Basket({ provider, contract, signer}){
const [basketProduct, setBasketProduct] = useState([])

useEffect (() => {

    viewBaskets()

  },[contract])

const viewBaskets = async() => {
  const signerAddr = await signer.getAddress()  // получи адрес
  const tx = await contract.connect(signer).viewBasket()  // используй signer
  console.log('Address:', signerAddr, 'Basket:', tx)
  setBasketProduct(tx)
}

 const buyBaskets = async() => {

    try{
        const totalWei = await contract.getBasketTotal(await signer.getAddress());
        const tx = await contract.connect(signer).buyBasket({
      value: totalWei  // MetaMask покажет эту сумму
    })
        await tx.wait()
    }
    catch(error){
        console.log(error)
    }
 }
 const clearBaskets = async() => {

    try{
        
        const tx = await contract.connect(signer).clearBasket()
        await tx.wait()
    }
    catch(error){
        console.log(error)
    }
 }
 

    return(
    
     <div>
        <h1 className='name-type'>Корзина</h1>
        {/* <button onClick={viewBaskets}>Показать корзину</button> */}
        <div>
            {basketProduct.map(list =>(
                <div key={list.id}>
                    <p>{list.name}</p>
                    <p>{list.quanity}</p>
                    <p>{list.price}</p>
                    
                </div>
                
            ))}
        <button onClick={buyBaskets}>Купить </button>
        <button onClick={clearBaskets}>Очистить корзину </button>
        </div>
    </div>
    )
}
export default Basket