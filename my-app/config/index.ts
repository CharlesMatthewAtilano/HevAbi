import { Contract, ContractRunner } from "ethers";
import abi from "./abi.json";

export function getContract(signer: ContractRunner) {
  return new Contract(
    "0x8423884970500ADC106F4cf083B25dfA199916Dd" /* address of the deployed contract */,
    abi as any,
    signer
  );
}