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
        <div className="flex flex-col items-center space-y-4">
            <p className="text-white text-2xl font-semibold">
                Hi, {wallet.publicKey ? wallet.publicKey.toString() : "Please connect your wallet!"}
            </p>
            <input
                id="publickey"
                type="text"
                placeholder="Enter the amount of SOL"
                className="w-full max-w-sm p-2 border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
                className="px-6 py-2 text-white text-lg  hover:bg-customPurple rounded-lg transition-colors duration-300"
                onClick={sendAirdropToUser}
            >
                Send Airdrop
            </button>
        </div>
    );
};

export default Airdrop;
