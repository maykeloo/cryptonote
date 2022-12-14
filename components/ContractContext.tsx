import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { load } from "../utils/utils";

enum ContractReducerActionKind {
  SET_CONTRACT = "SET_CONTRACT",
  TOGGLE_NOTE_MODAL = "TOGGLE_NOTE_MODAL",
  SET_REFRESH = "SET_REFRESH",
  SET_ALL_NOTES = "SET_ALL_NOTES",
}

export enum ContractNoteLabelType {
  ADD_NOTE = "ADD_NOTE",
  SHARE_NOTE = "SHARE_NOTE",
  EDIT_NOTE = "EDIT_NOTE",
}

interface ContractReducerAction {
  type: ContractReducerActionKind;
  payload: Contract;
}

interface Contract {
  addressAccount: number;
  networkId: number;
  cryptonoteContract: any;
  refresh: boolean;
  toggleNoteMode: {
    opened: boolean;
    type: ContractNoteLabelType;
    noteId: number
  };
  allNotes: string[];
}

interface ContextProvider extends Contract {
  setToggleNoteMode: (state: boolean, type: ContractNoteLabelType, noteId?: number) => void;
  addNode: (value: string) => void;
  shareNote: (userId: number, nodeId: number) => void;
  editNote: (value: string, noteId: number) => void;
  deleteNote: (noteId: number) => void
}

// CONTEXT -------------
export const ContractContext = createContext<ContextProvider | null>(null);

// REDUCER -------------
const contractReducer = (state: Contract, action: ContractReducerAction) => {
  const { type, payload } = action;

  switch (type) {
    case ContractReducerActionKind.SET_CONTRACT:
      return {
        addressAccount: payload.addressAccount,
        networkId: payload.networkId,
        cryptonoteContract: payload.cryptonoteContract,
        refresh: payload.refresh,
        toggleNoteMode: payload.toggleNoteMode,
        allNotes: payload.allNotes,
      };
    case ContractReducerActionKind.TOGGLE_NOTE_MODAL:
      return {
        ...state,
        toggleNoteMode: payload.toggleNoteMode,
      };
    case ContractReducerActionKind.SET_REFRESH:
      return {
        ...state,
        refresh: payload.refresh,
      };
    case ContractReducerActionKind.SET_ALL_NOTES:
      return {
        ...state,
        allNotes: payload.allNotes,
      };
    default:
      return state;
  }
};

// CONTEXT PROVIDER ----
export const ContractContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(contractReducer, {
    addressAccount: 0,
    networkId: 0,
    cryptonoteContract: 0,
    refresh: true,
    toggleNoteMode: {
      opened: false,
      type: ContractNoteLabelType.ADD_NOTE,
      noteId: 0
    },
    allNotes: [],
  });

  useEffect(() => {
    if (!state.refresh) return;
    load().then((option) => {
      dispatch({
        type: ContractReducerActionKind.SET_CONTRACT,
        payload: {
          addressAccount: option.addressAccount,
          cryptonoteContract: option.cryptonoteContract,
          networkId: option.networkId,
          refresh: false,
          toggleNoteMode: state.toggleNoteMode,
          allNotes: state.allNotes,
        },
      });
      option.cryptonoteContract.events.NoteCreated(() =>
        dispatch({
          type: ContractReducerActionKind.SET_CONTRACT,
          payload: { ...state, refresh: true },
        })
      );
      option.cryptonoteContract.events.NoteEdited(() =>
        dispatch({
          type: ContractReducerActionKind.SET_CONTRACT,
          payload: { ...state, refresh: true },
        })
      );
    });
  }, [state.refresh, state.toggleNoteMode, state]);

  useEffect(() => {
    if (state.cryptonoteContract) {
      state.cryptonoteContract.methods.getAllNotes().call().then((allNotes: string[]) => 
      dispatch({
            type: ContractReducerActionKind.SET_ALL_NOTES,
            payload: { ...state, allNotes },
          })
        );
    }
  }, [state.cryptonoteContract]);

  const shareNote: ContextProvider["shareNote"] = (userId, noteId) => {
    if (userId && noteId in state.allNotes) {
      state.cryptonoteContract.methods._shareNotes(userId, noteId).send({ from: state.addressAccount });
    }
    dispatch({
      type: ContractReducerActionKind.TOGGLE_NOTE_MODAL,
      payload: {
        ...state,
        toggleNoteMode: {
          opened: false,
          type: ContractNoteLabelType.SHARE_NOTE,
          noteId: Number(noteId)
        },
      },
    });
  };
  const editNote: ContextProvider["editNote"] = (value, noteId) => {
    if (noteId in state.allNotes && value) {
      state.cryptonoteContract.methods.editNote(noteId, value).send({ from: state.addressAccount });
    }
    dispatch({
      type: ContractReducerActionKind.TOGGLE_NOTE_MODAL,
      payload: {
        ...state,
        toggleNoteMode: {
          opened: false,
          type: ContractNoteLabelType.EDIT_NOTE,
          noteId: Number(noteId)
        },
      },
    });
  };
  const setToggleNoteMode: ContextProvider["setToggleNoteMode"] = (value, type, noteId) => {
    dispatch({
      type: ContractReducerActionKind.TOGGLE_NOTE_MODAL,
      payload: { ...state, toggleNoteMode: { opened: value, type: type, noteId: noteId ? noteId : 0 } },
    });
  };

  const addNote: ContextProvider["addNode"] = (value) => {
    state.cryptonoteContract.methods.createNotes(value).send({ from: state.addressAccount });
  };

  const deleteNote: ContextProvider['deleteNote'] = (noteId) => {
      state.cryptonoteContract.methods.deleteNote(noteId).send({ from: state.addressAccount });
  }

  return (
    <ContractContext.Provider
      value={{
        addressAccount: state.addressAccount,
        cryptonoteContract: state.cryptonoteContract,
        networkId: state.networkId,
        refresh: state.refresh,
        toggleNoteMode: state.toggleNoteMode,
        allNotes: state.allNotes,
        setToggleNoteMode: (state, type, noteId) => setToggleNoteMode(state, type, noteId),
        addNode: (value) => addNote(value),
        shareNote: (userId, noteId) => shareNote(userId, noteId),
        editNote: (noteId, value) => editNote(noteId, value),
        deleteNote: (noteId) => deleteNote(noteId)
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

//CONTEXT HOOK -------
export const useContractState = () => {
  const context = useContext(ContractContext);

  if (!context) {
    throw new Error("There is no ContractContextProvider");
  }
  return context;
};
