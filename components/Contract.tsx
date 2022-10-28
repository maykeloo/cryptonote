import { useEffect, useState } from "react";
import { load } from '../utils/utils'


interface Props {
}

export const Contract = ({ }: Props) => {
    const [addressAccount, setAddresAccount] = useState<any>(null);
    const [networkId, setNetworkId] = useState<number>(0);
    const [refresh, setRefresh] = useState<boolean>(true);
    const [contract, setContract] = useState<any>(null);
    const [testMessage, setTestMessage] = useState<any>(null);
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        if (!refresh) return;
        setRefresh(false);
        load().then(option =>{
            setAddresAccount(option.addressAccount)
            setNetworkId(option.networkId)
            setContract(option.cryptonoteContract)
        });
    });

    useEffect(() => {
        if(contract){
            contract.methods.notes(addressAccount,22).call().then((note: { text: any; }) => {
                setTestMessage(note.text)
            })
        }
    });
   
    
    const addNotes = async () => {
        console.log('dodaj notatke')
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };


    return (
        <div>
            <p>Metamask wallet account is: {addressAccount}</p>
            <p>Network id is: {networkId}</p>
            <p>Pierwsza wiadomść umieszczona na blockchain : {testMessage}</p>
            <input type="text" id="message" name="message" onChange={handleInputChange} value={message}/>
            <button onClick={()=>{
                contract.methods.createNotes(message).send({from: addressAccount});
                setRefresh(true);
            }}>DUPA SEND</button>
        </div>
    );

}