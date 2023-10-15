const assert = require('assert');
const anchor = require('@project-serum/anchor');
const idl = require('../frontend/src/idl.json')
const solana = require('@solana/web3.js')
const { SystemProgram } = anchor.web3;

describe("serenium_s", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.SereniumS;
  const wallet = provider.wallet;
  const thread = anchor.web3.Keypair.generate();
  it('Creates a thread', async () => {
    await program.methods.initThread('thread type', 'thread title', 'thread content').accounts({
      thread: thread.publicKey,
      owner: wallet.publicKey,
      systemProgram: SystemProgram.programId,
    }).signers([thread]).rpc();
    const account = await program.account.thread.fetch(
        thread.publicKey
    );
    assert.ok(account.title === 'thread title');
  });
})
