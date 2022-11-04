import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import pin from "../../assets/icons/icon-pin.svg";
import { ContractNoteLabelType, useContractState } from "../ContractContext";
interface ContractNoteProps {
  id: string;
  text: string;
  timestamp: string;
  priority:number;
  imageLink: string;
  imageName: string;
}
export const ContractNote = ({ id, text, timestamp, priority, imageLink, imageName}: ContractNoteProps) => {

  const { setToggleNoteMode, deleteNote } = useContractState()

  return (
    <>
    <div className="group">
      <div>{timestamp}</div>
      <div className="bg-orange-300/80 text-white p-4 rounded-xl relative shadow-lg min-h-[10rem]">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 h-[35px] w-[35px]">
          <Image src={pin} width={35} height={35} alt="pin icon" />
        </div>
        <div className="absolute -top-2 -left-2 bg-black w-7 h-7 flex justify-center items-center rounded-full">
          {id}
        </div>
        <div className="absolute -top-2 -right-2 bg-red-900 w-7 h-7 flex justify-center items-center rounded-full">
          {priority}
        </div>
        <div>{text}</div>
        <div className="absolute -bottom-0 left-1/2 -translate-x-1/2 h-[70px] w-[70px]">
          <img src={`https://${imageLink}.ipfs.w3s.link/${imageName}`} width={70} height={70} alt={`${imageName}`} />
        </div>
      </div>
      <div className="mt-2 scale-0 group-hover:scale-100 transition-all flex gap-2">
        <div onClick={() => setToggleNoteMode(true, ContractNoteLabelType.EDIT_NOTE, +id)} className="w-8 h-8 rounded-full bg-teal-600 flex justify-center items-center p-2 cursor-pointer"><PencilSquareIcon color="white"/></div>
        <div onClick={() => deleteNote(+id)} className="w-8 h-8 rounded-full bg-sky-900 flex justify-center items-center p-2 cursor-pointer"><TrashIcon color="white"/></div>
      </div>
    </div>
    </>
  );
};
