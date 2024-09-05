import React, { FC, useMemo,useEffect } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';
// import './App.css'
import Airdrop from './Airdrop'

function App() {
  useEffect(() => {
    document.body.style.backgroundColor = 'lightblue';
    
    // Cleanup on component unmount
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <div className=''>
    <div>
    <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
            <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                <WalletMultiButton></WalletMultiButton>
                <WalletDisconnectButton></WalletDisconnectButton>
                <div>
                hi there 
                <Airdrop/>
                </div> 
    </WalletModalProvider>
  </WalletProvider>
</ConnectionProvider>
</div>
</div>
  )
}

export default App
