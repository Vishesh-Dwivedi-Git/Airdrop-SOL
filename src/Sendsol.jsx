import React from 'react'
import { useConnection,useWallet } from '@solana/wallet-adapter-react'
import { Transaction,SystemProgram,LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';

const Sendsol = () => {
    const wallet=useWallet();
    const {connection}=useConnection();
    const transaction=new Transaction();
    async function sendT(){
        const to=document.getElementById("tokey").value;
        const amount=document.getElementById("amount").value*LAMPORTS_PER_SOL;
        transaction.add(
            SystemProgram.transfer({
                fromPubkey: wallet.publicKey,
                toPubkey:new PublicKey(to),
                lamports: amount,
            })
        )
        await wallet.sendTransaction(transaction,connection);
        alert("Sent "+amount/LAMPORTS_PER_SOL+ "to "+ to);
    };
    
  return (
    <div className='mt-4'>
    <input id='tokey' className='mr-5 p-1' placeholder='Enter the key'/>
    <input id='amount' className='mr-5 p-1' placeholder='Enter the amount'/>
    <button id="send" className="px-6 py-2 text-white text-lg  hover:bg-customPurple rounded-lg transition-colors duration-300" onClick={()=>sendT()} >Send the SOL</button>
    </div>
  )
}

export default Sendsol
