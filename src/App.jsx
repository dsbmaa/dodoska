
import { useState, useEffect } from 'react'
import { BrowserRouter,Routes,Route} from 'react-router-dom'


import MainMenu from "./MainMenu.jsx"
import Header from "./Header.jsx"
import Basket from "./Basket/Basket.jsx"
import Checks from './Checks/Checks.jsx'
import AdminFunction from './ContractFunction/AdminFunction.jsx'

import ManagerFunction from './ContractFunction/ManagerFunction.jsx'

import './As.css'

import { ethers } from 'ethers'

import ContractAbi from './blockchein/artifacts/contracts/dodoska.sol/dodoska.json'


function App() {

  const [isOpenLogin, setIsOpenLogin] = useState(false)
  const [isOpenForm, setIsOpenForm] = useState(false)
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [dodoska, setDodoska] = useState(null)
  const [ userRole, setUserRole ] = useState(null)
  const [ product, setProduct] = useState([])

  const [contract, setContract] = useState()
  const [account, setAccount ] = useState()
  

  useEffect(()=>{
    if(window.ethereum){
      const provider = new ethers.BrowserProvider(window.ethereum)
      setProvider(provider)
    }
    else{
      alert("Загрузите метамаск")
    }
  },[])
  useEffect(()=>{
      const new_dodoska = new ethers.Contract(ContractAbi.address,ContractAbi.abi,provider)
    setContract(new_dodoska)
    },[provider, ContractAbi])

  return( 

  <>
  <BrowserRouter>
    <Routes>
      <Route element={<Header 
      contract={contract}
      signer={signer} setSigner={setSigner} 
      provider={provider} dodoska={dodoska} 
      isOpenLogin={isOpenLogin} setIsOpenLogin={setIsOpenLogin}
      isOpenForm={isOpenForm} setIsOpenForm={setIsOpenForm}
      account={account} />}>
        <Route path='/' element={<MainMenu  provider={provider} contract={contract} signer={signer}/>}/>
        <Route path='/basket' element={<Basket provider={provider} contract={contract} signer={signer}/>}/>
        <Route path='/Checks' element={<Checks provider={provider} contract={contract} signer={signer}/>}/>
        <Route path='/ManagerFunction' element={<ManagerFunction contract={contract} product={product} signer={signer} />}/>
        <Route path='/AdminFunction' element={<AdminFunction  contract={contract} provider={provider} signer={signer} setUserRole={setUserRole} userRole={userRole}/>}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
  </>

  );
}
export default App;