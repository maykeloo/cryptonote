import { createContext, ReactNode, useContext, useEffect, useReducer } from "react";
import { load } from '../utils/utils';

enum ContractReducerActionKind {
      SET_CONTRACT = "SET_CONTRACT",
      SET_ADD_NOTE_MODE = "SET_ADD_NODE_MODE",
      SET_REFRESH = "SET_REFRESH"
}

interface ContractReducerAction {
      type: ContractReducerActionKind;
      payload: Contract;
}
    
interface Contract {
      addressAccount: number;
      networkId: number;
      cryptonoteContract: any;
      refresh: boolean,
      toggleNoteMode: boolean
}

interface ContextProvider extends Contract {
      setToggleNoteMode: (state: boolean) => void,
      addNode: (value: string) => void
}

// CONTEXT ------------- 
export const ContractContext = createContext<ContextProvider | null>(null);


// REDUCER -------------
const contractReducer = (state: Contract, action: ContractReducerAction) => {
      const { type, payload } = action;

      switch(type) {
            case ContractReducerActionKind.SET_CONTRACT: 
                  return {
                        addressAccount: payload.addressAccount,
                        networkId: payload.networkId,
                        cryptonoteContract: payload.cryptonoteContract,
                        refresh: payload.refresh,
                        toggleNoteMode: payload.toggleNoteMode
                  }
            case ContractReducerActionKind.SET_ADD_NOTE_MODE:
                  return {
                        ...state,
                        toggleNoteMode: payload.toggleNoteMode
                  }
            case ContractReducerActionKind.SET_REFRESH:
                  return {
                        ...state,
                        refresh: payload.refresh
                  }
            default: 
                  return state
      }
}

// CONTEXT PROVIDER ----
export const ContractContextProvider = ({ children }: { children: ReactNode }) => { 
      const [state, dispatch] = useReducer(contractReducer, {   
            addressAccount: 0,
            networkId: 0,
            cryptonoteContract: 0,
            refresh: true,
            toggleNoteMode: false
      });


      useEffect(() => {
            if (!state.refresh) return;
            load().then(option => {
                  dispatch({type: ContractReducerActionKind.SET_CONTRACT, payload: {
                        addressAccount: option.addressAccount,
                        cryptonoteContract: option.cryptonoteContract,
                        networkId: option.networkId,
                        refresh: false,
                        toggleNoteMode: state.toggleNoteMode
                  }})
                  option.cryptonoteContract.events.NoteCreated(() => dispatch({type: ContractReducerActionKind.SET_CONTRACT, payload: { ...state, refresh: true }}))
            });

      }, [state.refresh, state.toggleNoteMode, state]);

      const setToggleNoteMode = (value: boolean) => {
            dispatch({ type: ContractReducerActionKind.SET_ADD_NOTE_MODE, payload: { ...state, toggleNoteMode: value}})
      }

      const addNote = (value: string) => {
            state.cryptonoteContract.methods.createNotes(value).send({ from: state.addressAccount });
      };
      
      return (
            <ContractContext.Provider value={{
                  addressAccount: state.addressAccount,
                  cryptonoteContract: state.cryptonoteContract,
                  networkId: state.networkId,
                  refresh: state.refresh,
                  toggleNoteMode: state.toggleNoteMode,
                  setToggleNoteMode: (state) => setToggleNoteMode(state),
                  addNode: (value) => addNote(value)
            }}>
                  {children}
            </ContractContext.Provider>
      )
};

//CONTEXT HOOK -------
export const useContractState = () => {
      const context = useContext(ContractContext);

      if (!context) {
        throw new Error("There is no ContractContextProvider");
      }
      return context;
};