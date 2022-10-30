import { ContractAccount } from "./Contract/Account";
import { ContractNoteModal } from "./Contract/NoteModal";
import { useContractState } from "./ContractContext";
import { ContractNotesList } from "./Contract/NotesList";
import { ContractNavigationLabel } from "./Contract/NavigationLabel";

export const Contract = () => {
  const {
    addressAccount,
    networkId,
    toggleNoteMode, 
    allNotes
  } = useContractState();

  return (
    <>
      {toggleNoteMode.opened ? <ContractNoteModal /> : null}
      <div className="sm:p-24 p-4">
        <ContractAccount addressAccount={addressAccount} networkId={networkId} notesCount={allNotes.length}/>
        <ContractNavigationLabel/>
        <ContractNotesList/>
      </div>
    </>
  );
};
