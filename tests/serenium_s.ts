import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { SereniumS } from "../target/types/serenium_s";

const assert = require('assert');
// @ts-ignore
const anchor = require('@project-serum/anchor');
const { SystemProgram } = anchor.web3;

describe("serenium_s", () => {
  const provider = anchor.AnchorProvider.local();
  anchor.setProvider(provider);
  const thread = anchor.web3.Keypair.generate();
  const program = anchor.workspace.Serenium_s;

  it('Creates a thread', async () => {
    await program.rpc.create('thread type', 'thread title', 'thread content', {
      accounts: {
        thread: thread.publicKey,
        owner: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [thread],
    });
    const account = await program.account.thread.fetch(
        thread.publicKey
    );
    assert.ok(account.title == 'thread title');
  });
})
