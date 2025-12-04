import { useState } from 'react'
import {Link, Outlet} from 'react-router-dom'

import './As.css'

import ConnectWallet from './Wallet/ConnectWallet.jsx'
// import ManagerFunction from './ManagerFunction.jsx'
// import AdminFunction from './ContractFunction/AdminFunction.jsx'



function Header({ isOpenLogin,setIsOpenLogin,signer,setSigner,provider,dodoska,contract}){
    
    return(
        <div>
      <header className='head'>

        <Link to="/"> 
        <img
        className='ptiza'
        src="dodo/dodo.png"
        alt="Dodo"
        width={200}
        />
        </Link>
        <ConnectWallet className='open-login-button' isOpenLogin={isOpenLogin} setIsOpenLogin={setIsOpenLogin} signer={signer} setSigner={setSigner} provider={provider} dodoska={dodoska} contract={contract}/>
        <div>
        <Link to="/basket"> 
        <button className='basket'>
          Корзина
        </button>
        </Link>
        <Link to='/checks'>
        <button className='basket'>Чеки</button>
        </Link>
        <Link to='/ManagerFunction'>
        <button className='open-login-button'>
        Функции менеджера
        </button>
        </Link>
        <Link to='/AdminFunction'>
        <button className='open-login-button'>
          Функции админа
        </button>
        </Link>
        
        </div>
        
      </header>
     
      <main className='main'>
        </main>
       <Outlet/>
      </div>
      
    )
}
export default Header