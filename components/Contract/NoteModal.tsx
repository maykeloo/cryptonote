import { useRef } from "react";
import { ContractNoteLabelType, useContractState } from "../ContractContext";

export const ContractNoteModal = () => {
  const { setToggleNoteMode, addNode, toggleNoteMode, shareNote, editNote } = useContractState()
  const noteInputIDRef = useRef<HTMLInputElement>(null);
  const noteInputUSERRef = useRef<HTMLInputElement>(null);
  const noteTextareaRef = useRef<HTMLTextAreaElement>(null);

  return (
            <>
                  <div className="fixed w-screen h-screen z-10">
                        <div onClick={() => setToggleNoteMode(false, toggleNoteMode.type, toggleNoteMode.noteId)} className="absolute w-full h-full bg-gray-800/75"></div>
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl p-4 flex flex-col gap-5 justify-center w-4/5 h-1/2 sm:w-96  sm:h-96 bg-yellow-500">
                              {/* ADD NOTE */}
                              {toggleNoteMode.type === ContractNoteLabelType.ADD_NOTE ? <p className="text-white font-semibold text-2xl">Add your note...</p> : null}
                              {toggleNoteMode.type === ContractNoteLabelType.ADD_NOTE ? <textarea placeholder="Note..." ref={noteTextareaRef} className="border-0 min-h-[10rem] py-2 px-4 outline-none rounded-xl"/> : null}
                              {toggleNoteMode.type === ContractNoteLabelType.ADD_NOTE ?  <button className="bg-teal-600 text-white rounded-xl p-2" onClick={() => addNode(noteTextareaRef.current !== null ?  noteTextareaRef.current.value : "")}>Add note</button> : null}
                              

                              {/* SHARE NOTE */}
                              {toggleNoteMode.type === ContractNoteLabelType.SHARE_NOTE? <p className="text-white font-semibold text-2xl">Share your note...</p> : null}
                              {toggleNoteMode.type === ContractNoteLabelType.SHARE_NOTE ?  <input type="text" placeholder="Note ID.." ref={noteInputIDRef} className="border-0 py-2 px-4 outline-none rounded-xl"/> : null}
                              {toggleNoteMode.type === ContractNoteLabelType.SHARE_NOTE ?  <input type="text" placeholder="User ID.." ref={noteInputUSERRef} className="border-0 py-2 px-4 outline-none rounded-xl"/> : null}
                              {toggleNoteMode.type === ContractNoteLabelType.SHARE_NOTE ?  <button className="bg-teal-600 text-white rounded-xl p-2" onClick={() => shareNote(noteInputUSERRef.current ? +noteInputUSERRef.current.value : 0, noteInputIDRef.current ? Number(noteInputIDRef.current.value) : 0)}>Share note</button> : null}
                              
                              {/* EDIT NOTE */}
                              {toggleNoteMode.type === ContractNoteLabelType.EDIT_NOTE? <p className="text-white font-semibold text-2xl">Edit note</p> : null}
                              {toggleNoteMode.type === ContractNoteLabelType.EDIT_NOTE ? <textarea placeholder="Note..." ref={noteTextareaRef} className="border-0 min-h-[10rem] py-2 px-4 outline-none rounded-xl"/> : null}
                              {toggleNoteMode.type === ContractNoteLabelType.EDIT_NOTE ?  <button className="bg-teal-600 text-white rounded-xl p-2" onClick={() => editNote(noteTextareaRef.current ? noteTextareaRef.current.value : "", +toggleNoteMode.noteId)}>Edit Note</button> : null}
                        </div>
                  </div>
            </>
      );
}