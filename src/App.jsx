import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { walletConnect } from 'wagmi/connectors';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import '@rainbow-me/rainbowkit/styles.css';

import Login from './components/Login';
import Home from './components/Home';
import Feed from './components/Feed';
import Bio from './components/Bio';
import Signin from './components/Signin';
import Jobs from './components/Jobs';
import Notifications from './components/Notifications';
import Tickets from './components/Tickets';
import Proposals from './components/Proposals';
import CompNotifications from './components/CompNotifications';
import Complogin from './components/Complogin';

export const availSepolia = {
  id: 202402021700,
  name: 'OP Avail Sepolia Testnet',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: 'https://op-avail-sepolia.alt.technology' }
  },
  blockExplorers: {
    default: { name: 'OP Avail Sepolia Explorer', url: 'https://op-avail-sepolia-explorer.alt.technology' },
  },
};

const queryClient = new QueryClient();

export const config = getDefaultConfig({
  appName: 'EthMumbai',
  projectId: 'b4c074b408e38eb0348c3810737f0ff4',
  chains: [sepolia],
});

export const wagmiConfig = createConfig({
  chains: [availSepolia],
  connectors: [
    walletConnect({
      projectId: 'b4c074b408e38eb0348c3810737f0ff4'
    }),
  ],
  transports: {
    [availSepolia.id]: http(),
  },
});

const App = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <div className="min-h-screen bg-black font-mono md:w-full w-fit">
            <Router>
              <Routes>
                <Route path='/signup' element={<Login />} />
                <Route path='/' element={<Home />} />
                <Route path='/feed' element={<Feed />} />
                <Route path='/profile' element={<Bio />} />
                <Route path='/signin' element={<Signin />} />
                <Route path='/jobs' element={<Jobs />} />
                <Route path='/notifications' element={<Notifications />} />
                <Route path='/company/tickets' element={<Tickets />} />
                <Route path='/company/proposals' element={<Proposals />} />
                <Route path='/company/compNotifications' element={<CompNotifications />} />
                <Route path='/company/login' element={<Complogin />} />
              </Routes>
            </Router>
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;