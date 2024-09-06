import React from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import Airdrop from './Airdrop';

// Import necessary styles
import '@solana/wallet-adapter-react-ui/styles.css';
import './App.css';

function App() {
  const endpoint = "https://api.devnet.solana.com";

  return (
    <div className="relative h-screen w-screen">
      {/* Blurred Background */}
      <div className="absolute inset-0">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-lg"
          style={{ backgroundImage: "url('./big-data-concept-background_52683-24459.jpg" }}
        ></div>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div> 
      </div>

      {/* Wallet Interface */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className=" bg-opacity-80 p-8 rounded-lg shadow-lg animated-border">
          <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={[new UnsafeBurnerWalletAdapter()]} autoConnect>
              <WalletModalProvider>
                <div className="text-center">
                  {/* Wallet Buttons */}
                  <div className="flex flex-col items-center space-y-4 mb-4">
                    <WalletMultiButton className="w-full" />
                    <WalletDisconnectButton className="w-full" />
                  </div>

                  {/* Displaying other content */}
                  <div>
                    <Airdrop />
                  </div>
                </div>
              </WalletModalProvider>
            </WalletProvider>
          </ConnectionProvider>
        </div>
      </div>
    </div>
  );
}

export default App;
