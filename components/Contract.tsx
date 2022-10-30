import { useEffect, useState } from "react";
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
        <ContractAccount addressAccount={addressAccount} networkId={networkId} notesCount={activeNotes.length}/>
        <ContractNavigationLabel/>
        <ContractNotesList notes={activeNotes}/>
      </div>
    </>
  );
};
