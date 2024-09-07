import React from 'react'
import { useConnection ,useWallet} from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'

const Cbalance = () => {
const wallet=useWallet()
const {connection}=useConnection();

async function checkBalance() {
    try {
        const key=wallet.publicKey;
        if (!key) {
            alert("No Wallet Connected");
            return;
        }
        const bal=await connection.getBalance(key);
        document.getElementById("balance").innerText=bal/LAMPORTS_PER_SOL;
    
    } catch (error) {
        console.log(error);
    }

}
  return (
    <div>
    <button id='check' className='px-6 py-2 text-white text-lg  hover:bg-customPurple rounded-lg transition-colors duration-300' onClick={()=>checkBalance()}>Get Balance</button>
    <p>Your Balance:</p><div id="balance"></div>
    </div>
  )
}

export default Cbalance;
