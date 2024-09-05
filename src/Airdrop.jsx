import React from 'react';
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

const Airdrop = () => {
    const wallet = useWallet();
    const { connection } = useConnection();

    async function sendAirdropToUser() {
        if (!wallet.publicKey) {
            alert("Please connect your wallet first!");
            return;
        }

        let amount = document.getElementById("publickey").value;
        let amountInLamports = amount * 1000000000; // Convert SOL to lamports

        try {
            const txSignature = await connection.requestAirdrop(wallet.publicKey, amountInLamports);
            console.log(`Airdrop successful: ${txSignature}`);
        } catch (error) {
            console.error("Airdrop failed:", error);
        }
    }

    return (
        <div>
            <p>Hi, {wallet.publicKey ? wallet.publicKey.toString() : "please connect your wallet!"}</p>
            <input id="publickey" type="text" placeholder='Enter the amount of SOL'/>
            <button onClick={sendAirdropToUser}>Send Airdrop</button>
        </div>
    );
};

export default Airdrop;
