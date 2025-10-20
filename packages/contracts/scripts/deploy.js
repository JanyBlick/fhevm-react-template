const hre = require('hardhat');
const fs = require('fs');
const path = require('path');

async function main() {
  console.log('Deploying PrivateVoting contract...');

  const [deployer] = await hre.ethers.getSigners();
  console.log('Deploying with account:', deployer.address);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log('Account balance:', hre.ethers.formatEther(balance), 'ETH');

  // Deploy PrivateVoting
  const PrivateVoting = await hre.ethers.getContractFactory('PrivateVoting');
  const privateVoting = await PrivateVoting.deploy();
  await privateVoting.waitForDeployment();

  const address = await privateVoting.getAddress();
  console.log('PrivateVoting deployed to:', address);

  // Save deployment info
  const deploymentInfo = {
    network: hre.network.name,
    contract: 'PrivateVoting',
    address: address,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    blockNumber: await hre.ethers.provider.getBlockNumber(),
  };

  const deploymentsDir = path.join(__dirname, '../deployments');
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }

  const filename = `${hre.network.name}-${Date.now()}.json`;
  fs.writeFileSync(
    path.join(deploymentsDir, filename),
    JSON.stringify(deploymentInfo, null, 2)
  );

  console.log('Deployment info saved to:', filename);
  console.log('\nDeployment complete!');
  console.log('\nTo verify on Etherscan (if not localhost):');
  console.log(`npx hardhat verify --network ${hre.network.name} ${address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
