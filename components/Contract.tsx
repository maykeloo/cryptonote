import { useEffect, useRef, useState } from "react";
import { ContractAccount } from "./Contract/Account";
import { ContractAddNote } from "./Contract/AddNote";
import { useContractState } from "./ContractContext";
import { ContractNotesList } from "./Contract/NotesList";
import { ContractNavigationLabel } from "./Contract/NavigationLabel";

export const Contract = () => {
  const {
    cryptonoteContract: contract,
    addressAccount,
    networkId,
    toggleNoteMode, 
  } = useContractState();
  const [activeNotes, setActiveNotes] = useState<string[]>([]);
  const noteInputIdRef = useRef<HTMLInputElement>(null)

  const shareNote = () => {
      contract.methods._shareNotes("0xf2797FA0B874a0e9D431a20DB63161842F092d75",noteInputIdRef.current?.value).send({from: addressAccount})
      .then(console.log)
  }

  useEffect(() => {
    if (contract) {
      contract.methods
        .notes(addressAccount, 10)
        .call()
        .then((note: { text: string }) => {
          console.log(note);
        });

      contract.methods
        .getAllNotes()
        .call({ from: addressAccount })
        .then((allNotes: string[]) => {
          setActiveNotes(allNotes);
        });
    }
  }, [contract, addressAccount]);

  return (
    <>
      {toggleNoteMode ? <ContractAddNote /> : null}
      <div className="sm:p-24 p-4">
        <input type="number" ref={noteInputIdRef} placeholder="id note test" />
          <button onClick={shareNote}>Share note to another account </button> 
        <ContractAccount addressAccount={addressAccount} networkId={networkId} notesCount={activeNotes.length}/>
        <ContractNavigationLabel/>
        <ContractNotesList notes={activeNotes}/>
      </div>
    </>
  );
};
