import { ContractNote } from "./Note";

interface ContractNotesListProps {
      notes: string[]
}

export const ContractNotesList = ({ notes }: ContractNotesListProps) => {
  return (
    <>
      <div className="sm:grid-cols-3 grid-cols-1 grid gap-8">
            {notes.map(note => <ContractNote key={note[0]} id={note[0]} text={note[1]}/>)}
      </div>
    </>
  );
}