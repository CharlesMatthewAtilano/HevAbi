declare global {
  interface Window {
    ethereum: any;
  }
}

"use client";
import { useEffect, useState } from "react";
import { BrowserProvider } from "ethers";
import { getContract } from "../config";
import backgroundImg from "../public/habg.jpg";
import Image from "next/image";

export default function Home() {
  const [walletKey, setwalletKey] = useState("");

  

  const [mintingAmount, setMintingAmount] = useState<number>(0);
  const [mintSubmitted, setMintSubmitted] = useState(false);
  const [mintError, setMintError] = useState<string>("");

  const [balance, setBalance] = useState<number>(0);
  const [balanceLoading, setBalanceLoading] = useState(false);

  const [stakingAmount, setStakingAmount] = useState<number>(0);
  const [stakeSubmitted, setStakeSubmitted] = useState(false);
  const [stakeError, setStakeError] = useState<string>("");

  const [stakedAmount, setStakedAmount] = useState<number>(0);
  const [stakedAmountLoading, setStakedAmountLoading] = useState(false);

  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  const [withdrawSubmitted, setWithdrawSubmitted] = useState(false);
  const [withdrawError, setWithdrawError] = useState<string>("");

  const [showCoins, setShowCoins] = useState<boolean>(false);


  const mintCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    setMintSubmitted(true);
    setMintError("");

    try {
      const tx = await contract.mint(signer, mintingAmount);
      await tx.wait();
      setMintSubmitted(false);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      setMintError(`Minting failed: ${decodedError?.args}`);
      setMintSubmitted(false);
    }
  };

  const mintAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setMintingAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setMintingAmount(0);
    }
  };

  const stakeCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.stake(stakingAmount);
      await tx.wait();
      setStakeSubmitted(true);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };

  const stakeAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setStakingAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setStakingAmount(0);
    }
  };

  const withdrawCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.withdraw();
      await tx.wait();
      setWithdrawSubmitted(true);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };

  const connectWallet = async () => {
    const { ethereum } = window as any;

    await ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          nativeCurrency: {
            name: "ETH",
            symbol: "ETH",
            decimals: 18,
          },
          rpcUrls: [
            "https://sepolia-rollup.arbitrum.io/rpc",
            "https://arbitrum-sepolia.blockpi.network/v1/rpc/public",
          ],
          chainId: "0x66eee",
          chainName: "Arbitrum Sepolia",
        },
      ],
    });

    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setwalletKey(accounts[0]);
    setShowCoins(true);

    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [
        {
          chainId: "0x66eee",
        },
      ],
    });
  };
  useEffect(() => {
    const fetchBalance = async () => {
      const { ethereum } = window as any;
      const provider = new BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const contract = getContract(signer);
      setBalanceLoading(true);

      try {
        const balance = await contract.balanceOf(signer.getAddress());
        setBalance(Number(balance));
      } catch (e: any) {
        console.error("Failed to fetch balance", e);
      }
      setBalanceLoading(false);
    };

    fetchBalance();
  }, []);

  useEffect(() => {
    const fetchMintedCoins = async () => {
      if (walletKey) {
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = getContract(signer);
        // const mintedCoins = await contract.currentUserMintedCoins(walletKey);
        // setMintedCoins(mintedCoins.toNumber());
      }
    };
  
    fetchMintedCoins();
  }, [walletKey]);

  useEffect(() => {
    const fetchStakedCoins = async () => {
      if (walletKey) {
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = getContract(signer);
        // const stakedCoins = await contract.currentUserStakedCoins(walletKey);
        // setStakedCoins(stakedCoins.toNumber());
      }
    };
  
    fetchStakedCoins();
  }, [walletKey]);



  useEffect(() => {
    const fetchStakedAmount = async () => {
      const { ethereum } = window as any;
      const provider = new BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const contract = getContract(signer);
      setStakedAmountLoading(true);

      try {
        const stakedAmount = await contract.stakedAmount(signer.getAddress());
        setStakedAmount(Number(stakedAmount));
      } catch (e: any) {
        console.error("Failed to fetch staked amount", e);
      }
      setStakedAmountLoading(false);
    };

    fetchStakedAmount();
  }, []);


  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between p-8 bg-custom-yellow"
      style={{ backgroundImage: `url("${backgroundImg.src}")` }}
    >


<div className="flex flex-col items-center justify-between p-8 bg-custom-yellow" style={{ backgroundImage: `url("${backgroundImg.src}")` }}>


{/* {showCoins && (
  <div className="absolute top-0 left-0 m-4">
    <div className="text-lg font-semibold mb-2">Your Minted Coins:</div>
    <div className="text-lg font-semibold mb-2">{mintedCoins}</div>
    <div className="text-lg font-semibold mb-2">Your Staked Coins:</div>
    <div className="text-lg font-semibold mb-2">{stakedCoins}</div>
  </div>
)} */}


<div className="flex flex-col items-center justify-between p-8 bg-custom-yellow" style={{ backgroundImage: `url("${backgroundImg.src}")` }}>
  {/* rest of the component */}
</div>
</div>

      <div className="fixed bottom-0 right-0 mb-4 mr-4">
        <audio controls autoPlay loop hidden>
          <source src="/welcome.mp3" type="audio/mpeg" />
        </audio>
      </div>

      <div className="w-96">
        <div className="bg-blue p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-6">Hev Abi Coin $HAVI</h1>

          <div className="text-center">
            <button
              onClick={() => {
                connectWallet();
              }}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-2 w-full"
            >
              {walletKey ? `Connected: ${walletKey.substring(0, 6)}...${walletKey.substring(38)}` : "Connect Wallet"}
            </button>
          </div>

          <div className="text-center mb-6 mt-10">
            <h2 className="text-lg font-semibold mb-2">Mint</h2>
            
            <input
  type="number"
  className="w-full border p-2 mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-black"
  value={mintingAmount.toString()}
  onChange={(e) => {
    const inputValue = Number(e.target.value);
    if (inputValue >= 0) {
      setMintingAmount(inputValue);
    }
  }}
  placeholder="Enter amount to mint"
/>

            <button
              onClick={() => {
                mintCoin();
              }}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
            >
              Mint $HAVI
            </button>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-lg font-semibold mb-2">Stake</h2>

            <input
  type="number"
  className="w-full border p-2 mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-black"
  value={stakingAmount.toString()}
  onChange={(e) => {
    const inputValue = Number(e.target.value);
    if (inputValue >= 0) {
      setStakingAmount(inputValue);
    }
  }}
  placeholder="Enter amount to stake"
/>

            <button
              onClick={() => {
                stakeCoin();
              }}
              className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
            >
              Stake $HAVI
            </button>
          </div>

          <div className="text-center">
            <h2 className="text-lg font-semibold mb-2">Withdraw</h2>
            <button
              onClick={() => {
                withdrawCoin();
              }}
              className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
            >
              Withdraw $HAVI
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

