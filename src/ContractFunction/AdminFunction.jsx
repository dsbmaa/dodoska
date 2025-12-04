import { useState, React } from "react"

export function AdminFunction({ contract, signer, provider, userRole, setUserRole}) {

    const [ adminRole, setAdminRole ] = useState('')


    const HandleSubmit = (e) => {
        e.preventDefault();
  };
const AddAdmins = async ()=>{
 
      try{
        const add = await contract.connect(signer).addAdmin(userRole)
        await add.wait()
        alert("Админ добавлен")
        
      }
      catch(error){
        console.log(error)
      }
    }
const addManagers = async () =>{
    try{
        const add = await contract.connect(signer).addMeneger(userRole)
        await add.wait()
        console.log("Админ добавлен")
    }
    catch(error){
        console.log(error)
    }

}
return (
<>
<h1 className="name-type">Назначить сотрудников</h1>
<form onSubmit={HandleSubmit}>
    <div>
        <p>Назначить менеджера</p>
        <input 
            type='address'
            placeholder='Адрес'
            value={adminRole}
            onChange={(e)=>setAdminRole(e.target.value)}
        >
        </input>
        <button onClick={addManagers}>Назначить</button>
    </div>
    <div>
        <p>Назначить админа</p>
        <input 
            type='address'
            placeholder='Адрес'
            value={userRole}
            onChange={(e)=>setUserRole(e.target.value)}
        >
        </input>
        <button onClick={AddAdmins}>Назначить</button>
    </div>
</form>
</>
)
}
export default AdminFunction;