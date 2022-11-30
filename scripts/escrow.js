const hre = require("hardhat");

async function main() {
  const [lawer,payer,receiver] = await hre.ethers.getSigners();

  const Escrow = await hre.ethers.getContractFactory("Escrow");
  const escrow = await Escrow.deploy(payer.address,receiver.address, 100000);

  // 1. payer send amount before contract deploy
  const balancePayer = await escrow.connect(payer).balancePayer({value: 100000});
  await escrow.deployed();

  const checkBalance = await escrow.checkBalance();

  // 2.
  const balanceReceiver = await escrow.connect(receiver).balanceReceiver();
  const beforeBalanceReceive = await hre.ethers.provider.getBalance(receiver.address);

  const balanceOFLawer = await hre.ethers.provider.getBalance(lawer.address);
  const balanceOfEscrow = await hre.ethers.provider.getBalance(escrow.address);

  // 3.
  const balanceSender = await escrow.connect(lawer).balanceSender();
  const afterBalanceReceive = await hre.ethers.provider.getBalance(receiver.address);

  const balanceOFLawer1 = await hre.ethers.provider.getBalance(lawer.address);
  const balanceOfEscrow1 = await hre.ethers.provider.getBalance(escrow.address);

  console.log(`1. checkBalance => ${checkBalance} 
2. beforeBalanceReceive => ${beforeBalanceReceive} 
3. afterBalanceReceive => ${afterBalanceReceive} 
4. escrow address => ${escrow.address}
5. lawer address => ${lawer.address}
6. balanceOFLawer => ${balanceOFLawer}
7. balanceOFLawer1 => ${balanceOFLawer1}
8. balanceOfEscrow => ${balanceOfEscrow}
9. balanceOfEscrow1 => ${balanceOfEscrow1}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
