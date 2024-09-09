import React from 'react';
import nacl from 'tweetnacl';
import naclUtil from 'tweetnacl-util';
import { useWallet } from '@solana/wallet-adapter-react';

const Sign = ({ onSignIn}) => {
    const { publicKey, signMessage} = useWallet();
    
    async function signIn() {
        if (!publicKey) {
            alert("Wallet not connected");
            return;
        }
        if (!signMessage) {
            alert("Wallet does not support message signing!");
            return;
        }
        
        const message = document.getElementById("message").value;
        const encodedMessage = naclUtil.decodeUTF8(message);

        try {
            const signature = await signMessage(encodedMessage);

            // Decode the public key and signature
            const publicKeyBytes = new Uint8Array(publicKey.toBytes());
            const signatureBytes = new Uint8Array(signature);

            // Verify the signature
            const isValid = nacl.sign.detached.verify(encodedMessage, signatureBytes, publicKeyBytes);

            if (!isValid) {
                alert("Message signature invalid");
                return;
            }

            // Encode the signature to a readable format
            const encodedSignature = naclUtil.encodeBase64(signatureBytes);

            alert(`Message signature: ${encodedSignature}`);
            if (onSignIn) onSignIn(); // Call the function to indicate successful sign-in
        } catch (error) {
            alert("An error occurred while signing the message.");
            console.error(error);
        }
    }

    return (
        <div>
            <input id='message' type='text' placeholder='Message'/>
            <button onClick={signIn}>Sign Message</button>
        </div>
    );
};

export default Sign;
