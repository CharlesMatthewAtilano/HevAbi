"use client";
import { useEffect, useState } from "react";
import { BrowserProvider } from "ethers";
import { getContract } from "../config";
import Image from "next/image";

export default function Home() {

  const [mintingAmount, setMintingAmount] = useState<number>(0);
  const [mintSubmitted, setMintSubmitted] = useState(false);
  const [balance, setBalance] = useState<number>(0);

  const [stakingAmount, setStakingAmount] = useState<number>(0);
  const [stakedAmount, setStakedAmount] = useState<number>(0);
  const [stakeSubmitted, setStakeSubmitted] = useState(false);

  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  const [elapsedStakeTime, setElapsedStakeTime] = useState<number>(0);
  const [withdrawSubmitted, setWithdrawSubmitted] = useState(false);
  
  const mintAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setMintingAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setMintingAmount(0);
    }
  };

  const stakeAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setStakingAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setStakingAmount(0);
    }F
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex justify-center items-center ">
        <div className="w-96 bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-6">
            HevAbi Minting
          </h1>

          <div className="text-center mb-6">
            <h2 className="text-lg font-semibold">Mint</h2>
            <input
              type="number"
              className=" border rounded-md p-2 focus:outline-none focus:ring-4 focus:ring-yellow-500 focus:border-transparent"
              value={mintingAmount}
              onChange={(e) => mintAmountChange(e)}
              placeholder="Enter amount to mint"
              style={{ color: "black" }}
            />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
              Mint Tokens
            </button>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-lg font-semibold">Stake</h2>
            <input
          type="number"
          className="border rounded-md p-2 focus:outline-none focus:ring-4 focus:ring-yellow-500 focus:border-transparent"
          value={stakingAmount}
          onChange={(e) => stakeAmountChange(e)}
          placeholder="Enter amount to stake"
          style={{ color: "black" }}
        />
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2">
              Stake Tokens
            </button>
          </div>

          <div className="text-center">
            <h2 className="text-lg font-semibold">Withdraw</h2>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2">
              Withdraw Tokens
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
