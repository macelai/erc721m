import { HardhatRuntimeEnvironment } from 'hardhat/types';

export interface ISetBaseURIParams {
  limit: string;
  contract: string;
}

export const setGlobalWalletLimit = async (
  args: ISetBaseURIParams,
  hre: HardhatRuntimeEnvironment,
) => {
  const { ethers } = hre;
  const ERC721M = await ethers.getContractFactory('ERC721M');
  const contract = ERC721M.attach(args.contract);
  const tx = await contract.setGlobalWalletLimit(args.limit);
  console.log(`Submitted tx ${tx.hash}`);

  await tx.wait();

  console.log('Set global wallet limit:', tx.hash);
  const newLimit = await contract.getGlobalWalletLimit();
  console.log(`New limit: ${newLimit.toNumber()}`);
};
