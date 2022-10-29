import { useEffect, useRef, useState } from "react";
import { load } from '../utils/utils';

export const Contract = () => {
    const [addressAccount, setAddresAccount] = useState<any>(null);
    const [networkId, setNetworkId] = useState<number>(0);
    const [refresh, setRefresh] = useState<boolean>(true);
    const [contract, setContract] = useState<any>(null);
    const [testMessage, setTestMessage] = useState<any>(null);
    const noteInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (!refresh) return;
        setRefresh(false);
        load().then(option =>{
            setAddresAccount(option.addressAccount)
            setNetworkId(option.networkId)
            setContract(option.cryptonoteContract)
        });
    }, [refresh]);

    const addNote = () => {
        contract.methods.createNotes(noteInputRef.current?.value).send({from: addressAccount})
    }

    useEffect(() => {
        if(contract){
            contract.methods.notes(1).call().then((note: { text: string; }) => {
                setTestMessage(note.text)
            })
        }
    }, [contract]);
    
    return (
        <div>
            <p>Metamask wallet account is: {addressAccount}</p>
            <p>Network id is: {networkId}</p>
            <p>Pierwsza wiadomść umieszczona na blockchain : {testMessage}</p>
            <input type="text" ref={noteInputRef} />
            <button onClick={addNote}>Add note</button>
        </div>
    );

}