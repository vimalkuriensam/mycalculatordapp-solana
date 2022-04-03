const anchor = require("@project-serum/anchor");
const assert = require("assert");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const BN = require("bn.js");
const bnChai = require("bn-chai");
const { SystemProgram } = anchor.web3;

chai.use(chaiAsPromised);
chai.use(bnChai(BN));
const expect = chai.expect;

describe("mycalculatordapp", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  const calculator = anchor.web3.Keypair.generate();
  const program = anchor.workspace.Mycalculatordapp;

  it("Creates a calculator", async () => {
    const initialMessage = "Welcome to solana!";
    await program.rpc.create(initialMessage, {
      accounts: {
        calculator: calculator.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [calculator],
    });
    const account = await program.account.calculator.fetch(
      calculator.publicKey
    );
    assert.equal(
      account.greeting,
      initialMessage,
      "Must match with the initial message at input and output"
    );
  });

  it("Should add two numbers", async () => {
    const num1 = 4,
      num2 = 6;
    const BNNum1 = new anchor.BN(num1),
      BNNum2 = new anchor.BN(num2);
    await program.rpc.add(BNNum1, BNNum2, {
      accounts: {
        calculator: calculator.publicKey,
      },
    });
    const account = await program.account.calculator.fetch(
      calculator.publicKey
    );
    expect(account.result).to.eq.BN(num1 + num2);
  });

  it("Should subtract two numbers", async () => {
    const num1 = 4,
      num2 = 6;
    const BNNum1 = new anchor.BN(num1),
      BNNum2 = new anchor.BN(num2);
    await program.rpc.sub(BNNum1, BNNum2, {
      accounts: {
        calculator: calculator.publicKey,
      },
    });
    const account = await program.account.calculator.fetch(
      calculator.publicKey
    );
    expect(account.result).to.eq.BN(num2 - num1);
  });

  it("Should multiply two numbers", async () => {
    const num1 = 4,
      num2 = 6;
    const BNNum1 = new anchor.BN(num1),
      BNNum2 = new anchor.BN(num2);
    await program.rpc.multiply(BNNum1, BNNum2, {
      accounts: {
        calculator: calculator.publicKey,
      },
    });
    const account = await program.account.calculator.fetch(
      calculator.publicKey
    );
    expect(account.result).to.eq.BN(num2 * num1);
  });

  it("Should divide two numbers", async () => {
    const num1 = 4,
      num2 = 6;
    const BNNum1 = new anchor.BN(num1),
      BNNum2 = new anchor.BN(num2);
    await program.rpc.divide(BNNum1, BNNum2, {
      accounts: {
        calculator: calculator.publicKey,
      },
    });
    const account = await program.account.calculator.fetch(
      calculator.publicKey
    );
    expect(account.result).to.eq.BN(num2 / num1);
    expect(account.remainder).to.eq.BN(num2 % num1);
  });
});
