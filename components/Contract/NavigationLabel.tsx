import { PlusIcon, ShareIcon, PencilSquareIcon} from "@heroicons/react/24/outline";
import { ContractNoteLabelType, useContractState } from "../ContractContext";

interface ContractNavigationLabelProps {}

export const ContractNavigationLabel = ({}: ContractNavigationLabelProps) => {
  const { setToggleNoteMode } = useContractState();
  return (
    <div className="my-12 flex gap-2">
      <button className="flex text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all gap-4 bg-teal-600" onClick={() => setToggleNoteMode(true, ContractNoteLabelType.ADD_NOTE)}>
            <PlusIcon width={24}/>
            <span>Add note</span>
      </button>
      <button className="flex text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all gap-4 bg-cyan-900" onClick={() => setToggleNoteMode(true, ContractNoteLabelType.SHARE_NOTE)}>
            <ShareIcon width={24}/>
            <span>Share note</span>
      </button>
    </div>
  );
};
