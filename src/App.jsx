import React from 'react';
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Airdrop from './Airdrop';
import Cbalance from './Cbalance';
import Sendsol from './Sendsol';
import '@solana/wallet-adapter-react-ui/styles.css';
import './App.css';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';

function WalletConnection() {
  const { connected } = useWallet();

  return (
    <div className="text-center">
      <div className="flex flex-col items-center space-y-4 mb-4">
        <WalletMultiButton className="w-full" />
        <WalletDisconnectButton className="w-full" />
      </div>
      {!connected && <p className='text-white font-mono text-bold'>Please Connect Your Wallet</p>}
      {connected && (
        <div>
          <h2 className='text-white font-mono'>Welcome! Your wallet is connected.</h2>
          <Airdrop />
          <Cbalance />
          <Sendsol />
        </div>
      )}
    </div>
  );
}

function App() {
  const endpoint = "https://api.devnet.solana.com";
  const wallets = [new PhantomWalletAdapter()];

  return (
    <div className="relative h-screen w-screen">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-lg"
          style={{ backgroundImage: "url('./big-data-concept-background_52683-24459.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-black bg-opacity-30"></div> 
      </div>

      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="bg-opacity-80 p-8 rounded-lg shadow-lg animated-border">
          <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
              <WalletModalProvider>
                <WalletConnection />
              </WalletModalProvider>
            </WalletProvider>
          </ConnectionProvider>
        </div>
      </div>
    </div>
  );
}

export default App;