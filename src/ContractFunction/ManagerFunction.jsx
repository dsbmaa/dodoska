import { id } from 'ethers'
import { useState } from 'react'

export function ManagerFunction ({ signer, contract}) {

    const [product, setProduct ] = useState()
    const [image, setImage] = useState()
    const [name, setName] = useState()
    const [desc, setDesc] = useState()
    const [price, setPrice] = useState()

    const [ did, setDid] = useState()

    const [ eid, setEid] = useState()
    const [ eimage, setEimage] = useState()
    const [ename, setEname] = useState()
    const [edesc, setEdesc] = useState()
    const [eprice, setEprice] = useState()

    const HandleSubmit = (e) => {
        e.preventDefault();
    };

 const addProduct =async(
            _name,
            _desc,
            _price,
            _image) =>{
     
      try{
        const tx = await contract.connect(signer).addProducts(
            _name,
            _desc,
            _price,
            _image
        );
        await tx.wait();
         alert("пицца добавлена");
      }
      catch(error){
       console.error(error)
      }
    
    }

const delProducts = async( id ) => {
    try{
        const tx = await contract.connect(signer).delProduct( id )
        await tx.wait()
    }
    catch(error){
        console.error(error)
    }
}
const editProducts = async(
    _id,
    _name,
    _desc,
    _price,
    _image
) =>{
    try{
        const tx = await contract.connect(signer).editProduct(
    _id,
    _name,
    _desc,
    _price,
    _image)
        await tx.wait()
    }
    catch(error){
        console.error(error)
    }
}

    return(
        <div className='form-add-pizza'>
            <form onSubmit={HandleSubmit}>
                <div>
                    <h1 className='name-type'>Создать продукт:</h1>
                   
                        <input
                        type='text'
                        placeholder='URL Изображения'
                        
                        onChange={(e) => setImage(e.target.value)}/>
                    
                </div>
                <div>
                    
                        <input
                        type='text'
                        placeholder='Название'
                        
                        onChange={(e) => setName(e.target.value)}/>
                    
                </div>
                <div>
                   
                        <input
                        type='text'
                        placeholder='Описание'
                        
                        onChange={(e) => setDesc(e.target.value)}/>
                   
                </div><div>
                    
                        <input
                        type='number'
                        placeholder='Цена'
                        
                        onChange={(e) => setPrice(e.target.value)}/>
                    
                </div>
                <button onClick={()=> addProduct(name,
            desc,
            price,
            image) }>Создать</button>
            </form>

            <form onSubmit={HandleSubmit}>
                <div>
                    <h1 className='name-type'>Удалить продукт:</h1>
                    <input
                    type="text"
                    placeholder="ID"
                    onChange={(e) => setDid(e.target.value)}/>
                    <button onClick={()=> delProducts( did)}>Удалить</button>
                </div>
            </form>

            <form onSubmit={HandleSubmit}>
                <div>
                    <h1 className='name-type'>Изменить продукт:</h1>
                   
                        <input
                        type='text'
                        placeholder='ID'
                        
                        onChange={(e) => setEid(e.target.value)}/>
                    
                </div>
                <div>
                   
                        <input
                        type='text'
                        placeholder='URL Изображения'
                        
                        onChange={(e) => setEimage(e.target.value)}/>
                    
                </div>
                <div>
                    
                        <input
                        type='text'
                        placeholder='Название'
                        
                        onChange={(e) => setEname(e.target.value)}/>
                    
                </div>
                <div>
                   
                        <input
                        type='text'
                        placeholder='Описание'
                        
                        onChange={(e) => setEdesc(e.target.value)}/>
                   
                </div><div>
                    
                        <input
                        type='number'
                        placeholder='Цена'
                        
                        onChange={(e) => setEprice(e.target.value)}/>
                    
                </div>
                <button onClick={()=> editProducts(
            eid,
            ename,
            edesc,
            eprice,
            eimage) }>Изменить</button>
            </form>
        </div>
       
    )
}

export default ManagerFunction