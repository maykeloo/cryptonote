import Image from "next/image";
import pin from '../../assets/icons/icon-pin.svg'
interface ContractNoteProps {
      id: string,
      text: string
}

export const ContractNote = ({ id, text }: ContractNoteProps) => {
  return (
    <>
      <div className="bg-orange-300/80 text-white p-4 rounded-xl relative shadow-lg min-h-[10rem]">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 h-[35px] w-[35px]">
                  <Image src={pin} width={35} height={35} alt="pin icon"/>
            </div>
            <div>
                  {text}
            </div>
      </div>
    </>
  );
}