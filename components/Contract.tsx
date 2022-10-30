import { useEffect, useRef } from "react";
import { useContractState } from "./ContractContext";

export const Contract = () => {
    const { cryptonoteContract: contract, addressAccount, networkId } = useContractState();
    const noteInputRef = useRef<HTMLInputElement>(null)
    const noteInputIdRef = useRef<HTMLInputElement>(null)


    const addNote = () => {
        //contract.methods.deleteNote(1).send({from: addressAccount}).then(console.log)
        contract.methods.createNotes(noteInputRef.current?.value).send({from: addressAccount})
    }
    const shareNote = () => {
        contract.methods._shareNotes("0xf2797FA0B874a0e9D431a20DB63161842F092d75",noteInputIdRef.current?.value).send({from: addressAccount})
        .then(console.log)
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
            <input type="number" ref={noteInputIdRef} placeholder="id note test" />
            <button onClick={shareNote}>Share note to another account </button>
            
        </div>
    );

}