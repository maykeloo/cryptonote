import Image from "next/image";
import metamast from '../../assets/images/metamask-logo.png'
import { DocumentTextIcon, GlobeAltIcon, HashtagIcon } from '@heroicons/react/24/outline'

interface ContractAccountProps {
      networkId: number,
      addressAccount: number,
      notesCount: number
}

export const ContractAccount = ({ addressAccount, networkId, notesCount }: ContractAccountProps) => {
  return (
            <>
                  <div className="flex gap-5 items-center w-full flex-col sm:flex-row">
                        <div className="bg-teal-600 w-[120px] h-[120px] flex justify-center items-center rounded-3xl shadow-xl">
                             <Image src={metamast} width={100} height={100} alt="metamask logo"/> 
                        </div>
                        <div className="flex flex-col gap-1">
                              <p className="flex gap-2 text-xs"><HashtagIcon width={18}/><span>{addressAccount}</span></p>
                              <p className="flex gap-2 text-xs"><GlobeAltIcon width={18}/><span>{networkId}</span></p>
                              <p className="flex gap-2 text-xs"><DocumentTextIcon width={18}/><span>{notesCount}</span></p>
                        </div>
                  </div>   
            </>
      );
}