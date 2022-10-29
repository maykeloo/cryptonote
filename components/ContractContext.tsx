import { createContext, ReactNode, useContext, useEffect, useReducer, useState } from "react";
import { load } from '../utils/utils';

enum ContractReducerActionKind {
      SET_CONTRACT = "SET_CONTRACT",
}

interface ContractReducerAction {
      type: ContractReducerActionKind;
      payload: Contract;
}
    
interface Contract {
      addressAccount: number;
      networkId: number;
      cryptonoteContract: any;
      refresh: boolean
}

// CONTEXT ------------- 
export const ContractContext = createContext<Contract | null>(null);


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
      });

      useEffect(() => {
            if (!state.refresh) return;
            load().then(option => {
                  dispatch({type: ContractReducerActionKind.SET_CONTRACT, payload: {
                        addressAccount: option.addressAccount,
                        cryptonoteContract: option.cryptonoteContract,
                        networkId: option.networkId,
                        refresh: false
                  }})
            });
      }, [state.refresh]);
      
      return (
            <ContractContext.Provider value={{
                  addressAccount: state.addressAccount,
                  cryptonoteContract: state.cryptonoteContract,
                  networkId: state.networkId,
                  refresh: state.refresh,
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