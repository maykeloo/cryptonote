import { useRef } from "react";
import { useContractState } from "../ContractContext";

export const ContractAddNote = () => {
  const { setToggleNoteMode, addNode } = useContractState()
  const noteInputRef = useRef<HTMLTextAreaElement>(null);

  return (
            <>
                  <div className="fixed w-screen h-screen z-10">
                        <div onClick={() => setToggleNoteMode(false)} className="absolute w-full h-full bg-gray-800/75"></div>
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl p-4 flex flex-col gap-5 justify-center w-4/5 h-1/2 sm:w-96  sm:h-96 bg-yellow-500">
                              <p className="text-white font-semibold text-2xl">Add your note...</p>
                              <textarea placeholder="Note..." ref={noteInputRef} className="border-0 min-h-[10rem] py-2 px-4 outline-none rounded-xl"/>
                              <button className="bg-teal-600 text-white rounded-xl p-2" onClick={() => addNode(noteInputRef.current !== null ?  noteInputRef.current.value : "")}>Add note</button>
                        </div>
                  </div>
            </>
      );
}