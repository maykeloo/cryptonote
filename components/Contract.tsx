import { useEffect, useState } from "react";
import { load } from '../utils/utils'


interface Props {
}

export const Contract = ({ }: Props) => {
    const [addressAccount, setAddresAccount] = useState<any>(null);
    const [networkId, setNetworkId] = useState<number>(0);
    const [refresh, setRefresh] = useState<boolean>(true);
    const [contract, setContract] = useState<any>(null);
    const [testMessage, setTestMessage] = useState<any>(null);

    useEffect(() => {
        if (!refresh) return;
        setRefresh(false);
        load().then(option =>{
            setAddresAccount(option.addressAccount)
            setNetworkId(option.networkId)
            setContract(option.cryptonoteContract)
        });
    });

    useEffect(() => {
        if(contract){
            contract.methods.notes(1).call().then((note: { text: any; }) => {
                setTestMessage(note.text)
            })
        }
    });
    
    return (
        <div>
            <p>Metamask wallet account is: {addressAccount}</p>
            <p>Network id is: {networkId}</p>
            <p>Pierwsza wiadomść umieszczona na blockchain : {testMessage}</p>
        </div>
    );

}