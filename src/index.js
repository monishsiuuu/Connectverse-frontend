import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { WagmiProvider } from 'wagmi';
import store from "./redux";
import './index.css';
import App from './App';
import "antd/dist/reset.css";
import reportWebVitals from './reportWebVitals';
import { queryClient, wagmiContextConfig } from './services/web3-service';
import { QueryClientProvider } from '@tanstack/react-query';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <WagmiProvider config={wagmiContextConfig}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </WagmiProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
