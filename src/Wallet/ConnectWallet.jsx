import { useCallback, useEffect,useState} from 'react'
  
const ConnectWallet = ({signer,provider,setSigner,contract})=>{
    const [role, setRole] = useState()
    const check_session = useCallback(()=>{
        const status = localStorage.getItem("Auth")
        console.log(status)
        if(status){
            connect()
            
        }
        else{
            setSigner(null)
        }
    });
    const connect=useCallback(async()=>{
            if(provider){
                const _signer = await provider.getSigner();
            if(_signer){
                setSigner(_signer)
                Roless(_signer.address)
                console.log("Авторизация прошла успешно")
                localStorage.setItem("Auth",true)
            }
        }
    })
    const Roless = async(signers)=>{
      try{ 
      
       const userRole = await contract.connect(provider).getRole(signers)
       if(userRole ==2){
            setRole("admin")
       }
       else if(userRole ==0){
            setRole("user")
       }
       else if(userRole ==1){
            setRole("manager")
       }
        
        console.log(role)
        await userRole.wait()
      }
      catch(error){
        console.log(signers)
        console.log(error)
      }
        
    }
    const disconnect = useCallback(async()=>{
        localStorage.removeItem("Auth")
        setSigner(null)
        console.log("bye")
    })
    useEffect(()=>{
        check_session()
    },[ ]);
    return(
        <>
        {signer ? (<> 
            <p> {signer.address}</p>
            <p>ваша роль {role}</p>
            <button className='open-login-button' onClick={()=>disconnect()}>Выход</button>
            </>): (<>
            <button className='open-login-button' onClick={()=>connect()}>Вход</button>
            </>)}
            </>
    )


}


export default ConnectWallet;