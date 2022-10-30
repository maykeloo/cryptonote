import { PlusIcon } from "@heroicons/react/24/outline";
import { useContractState } from "../ContractContext";

interface ContractNavigationLabelProps {}

export const ContractNavigationLabel = ({}: ContractNavigationLabelProps) => {
  const { setToggleNoteMode } = useContractState();
  return (
    <div className="my-12">
      <button className="flex text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all gap-4 bg-teal-600" onClick={() => setToggleNoteMode(true)}>
            <PlusIcon width={24}/>
            <span>Add note</span>
      </button>
    </div>
  );
};
