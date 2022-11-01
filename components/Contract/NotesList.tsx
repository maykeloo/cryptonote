import { useEffect, useState } from "react";
import { useContractState } from "../ContractContext";
import { ContractNote } from "./Note";

export const ContractNotesList = () => {
  const { allNotes } = useContractState();
  const [notes, setNotes] = useState<string[]>();

  useEffect(() => {
    if (Array.isArray(allNotes)) {
      setNotes([...allNotes]);
    }
  }, [allNotes]);

  return (
    <>
      <div className="sm:grid-cols-3 grid-cols-1 grid gap-8">
        {notes
          ? notes.map((note) => (
              <ContractNote key={note[0]} id={note[0]} text={note[1]} />
            ))
          : null}
      </div>
    </>
  );
};
