import React, { useState, useEffect } from 'react';
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Airdrop from './Airdrop';
import Cbalance from './Cbalance';
import Sendsol from './Sendsol';
import Sign from './Sign';
import '@solana/wallet-adapter-react-ui/styles.css';
import './App.css';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';



function App() {
  const endpoint = "https://api.devnet.solana.com";
  const { connected } = useWallet();
  const [signed, setSign] = useState(false);
  const wallets=[new PhantomWalletAdapter()];

  useEffect(() => {
    console.log("Wallet connected:", connected);
  }, [connected]);

  const handleSign = () => {
    console.log("Sign button clicked");
    setSign(true);
  };
  


  useEffect(() => {
    console.log("Signed state:", signed);
  }, []);

  return (
    <div className="relative h-screen w-screen">
      {/* Blurred Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-lg"
          style={{ backgroundImage: "url('./big-data-concept-background_52683-24459.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-black bg-opacity-30"></div> 
      </div>

      {/* Wallet Interface */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="bg-opacity-80 p-8 rounded-lg shadow-lg animated-border">
          <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
              <WalletModalProvider>
                <div className="text-center">
                  {/* Wallet Buttons */}
                  <div className="flex flex-col items-center space-y-4 mb-4">
                    <WalletMultiButton className="w-full" />
                    <WalletDisconnectButton className="w-full" />
                  </div>
                  {!connected && <p>Please Connect Your Wallet</p>}
                  {connected && (
                    !signed ? (
                      <div>
                        <h2>Sign In</h2>
                        <Sign onSignIn={handleSign} />
                      </div>
                    ) : (
                      <div>
                        <h2>Welcome! You're signed in.</h2>
                        <Airdrop />
                        <Cbalance />
                        <Sendsol />
                      </div>
                    )
                  )}
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
