import { useEffect, useState } from 'react'

function Checks({provider, signer, contract}){

    const [check, setCheck] = useState([])

    useEffect(() => {
        viewChecks()
    },[contract])
const viewChecks = async () => {
    try {
        const signerAddr = await signer.getAddress();
        const tx = await contract.connect(signer).getCheck();
        console.log('Address:', signerAddr, 'Checks:', tx);
        setCheck(tx); // tx - это Basket[][]
    } catch (error) {
        console.error('Error fetching checks:', error);
    }
}

    return(<>
        <h1>Чеки</h1>
       <div>
    {check.map((checkGroup, groupIndex) => (
        <div key={groupIndex} className="check-group">
            <h3>Чек {groupIndex + 1}</h3>
            {checkGroup.map((item, itemIndex) => (
                <div key={itemIndex} className="check-item">
                    <p>{item.name}</p>
                    <p>Количество: {item.quanity}</p>
                    <p>Цена: {item.price}</p>
                </div>
            ))}
        </div>
    ))}
</div>

    </>
    )
}
export default Checks