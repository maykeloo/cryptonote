import { useEffect, useRef } from "react";
import { useContractState } from "./ContractContext";

export const Contract = () => {
    const { cryptonoteContract: contract, addressAccount, networkId } = useContractState();
    const noteInputRef = useRef<HTMLInputElement>(null)

    const addNote = () => {
        contract.methods.createNotes(noteInputRef.current?.value).send({from: addressAccount})
    }

    useEffect(() => {
        if(contract){
            contract.methods.notes(addressAccount, 10).call().then((note: { text: string; }) => {
                console.log(note)
            })

            contract.methods.getAllNotes().call({from: addressAccount}).then((allNotes : string[]) => {
                console.log(allNotes)
            })
        }
    }, [contract, addressAccount]);
    
    return (
        <div>
            <p>Metamask wallet account is: {addressAccount}</p>
            <p>Network id is: {networkId}</p>
            <p>Pierwsza wiadomść umieszczona na blockchain : </p>
            <input type="text" ref={noteInputRef} />
            <button onClick={addNote}>Add note</button>
        </div>
    );

}