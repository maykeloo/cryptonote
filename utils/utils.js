import Web3 from "web3";
import CryptonoteContractJson from '../build/contracts/Cryptonote.json'
import MSCBTokenSaleJson from '../build/contracts/MSCBSaleToken.json'
import MSCBJson from '../build/contracts/MSCB.json'

export const load = async () =>{
    await loadWeb3();
    const addressAccount = await loadAccount();
    const {networkId, cryptonoteContract, MSCBSaleTokenContract, MSCBTokenContract} = await loadNetworkId();
    //MSCBTokenContract.methods.balanceOf(addressAccount).call().then(console.log)
    //MSCBSaleTokenContract.methods.getBalance().call().then(console.log)
    return { addressAccount, networkId, cryptonoteContract, MSCBSaleTokenContract}
}

const loadNetworkId = async () => {
    const networkId = await web3.eth.net.getId();
    const cryptonote = CryptonoteContractJson.networks[networkId]
    const MSCBSaleToken = MSCBTokenSaleJson.networks[networkId];
    const MSCB = MSCBJson.networks[networkId];
    let MSCBSaleTokenContract = null;
    let cryptonoteContract = null;
    let MSCBTokenContract = null;
    if(cryptonote){
        cryptonoteContract = new window.web3.eth.Contract(CryptonoteContractJson.abi,cryptonote.address);
        cryptonoteContract.setProvider(web3.eth.currentProvider)
        MSCBSaleTokenContract = new window.web3.eth.Contract(MSCBTokenSaleJson.abi,MSCBSaleToken.address);
        MSCBSaleTokenContract.setProvider(web3.eth.currentProvider)
        MSCBTokenContract = new window.web3.eth.Contract(MSCBJson.abi,MSCB.address);
        MSCBTokenContract.setProvider(web3.eth.currentProvider)
    } else {
        window.alert("No contract are deployed on this network sorry")
    }

    return {networkId,cryptonoteContract, MSCBSaleTokenContract, MSCBTokenContract};
}

const loadAccount = async () => {
    const addressAccount = await web3.eth.getCoinbase();
    return addressAccount;
};


//Event handler TO DO.
const eventHandler = async (eventName, contract) => {
    contract.once(eventName, {
        fromBlock: 0
    }, (error, event) => { return event.returnValues['id']});
    
}


const loadWeb3 = async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            // Acccounts now exposed
            web3.eth.sendTransaction({/* ... */});
        } catch (error) {
            // User denied account access...
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */});
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
};