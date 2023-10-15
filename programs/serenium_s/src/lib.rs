use rand;
use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;
use rand::Rng;

declare_id!("2PiwqNRwRYhhKuqkSf6XtcZ6vo2pMFRKMBSQfYkDyffi");

#[program]
pub mod serenium_s {
    use super::*;

    pub fn init_thread(ctx: Context<CreateThread>, thread_type: String, title: String, content: String) -> ProgramResult {
        let thread = &mut ctx.accounts.thread;
        thread.thread_type = thread_type;
        thread.title = title;
        thread.content = content;
        thread.replies = Vec::new();
        thread.state = ThreadState::Active;
        thread.distributed_tokens = 1;
        Ok(())
    }

    pub fn add_reply(ctx: Context<AddReply>, reply_id: String, reply_owner: Pubkey, content: String) -> ProgramResult {
        let thread = &mut ctx.accounts.thread;
        let reply = Reply::new(reply_id,reply_owner, content);
        thread.replies.push(reply);
        thread.distributed_tokens += 1;
        // TODO: pay for submitting the post

        Ok(())
    }

    pub fn end_thread(ctx: Context<AddReply>) -> ProgramResult {
        let thread = &mut ctx.accounts.thread;
        thread.state = ThreadState::Expired;
        // TODO: distribute awards according to rules

        Ok(())
    }

    pub fn like_reply(ctx: Context<AddReply>, target_id: String) -> ProgramResult {
        let thread = &mut ctx.accounts.thread;
        let reply = thread.replies.iter_mut().find(|reply| reply.reply_id == target_id).expect("Reply not found");
        reply.like();
        thread.distributed_tokens += 1;
        // TODO: transfer 1 token to escrow

        Ok(())
    }
}

#[derive(Debug, Clone, AnchorDeserialize, AnchorSerialize)]
pub struct Reply {
    pub reply_id: String,
    pub reply_owner: Pubkey,
    pub content: String,
    pub number_of_likes: u64,
    pub number_of_reports: u64,
}

impl Reply {
    fn new(reply_id: String, reply_owner: Pubkey, content: String) -> Reply {
        Reply {
            reply_id,
            reply_owner,
            content,
            number_of_likes: 0,
            number_of_reports: 0
        }
    }

    fn like(&mut self) {
        self.number_of_likes += 1;
    }
}

#[derive(Accounts)]
pub struct CreateThread<'info> {
    #[account(init, payer=owner, space=9000, seeds=[b"THREAD_DEMO".as_ref(), owner.key().as_ref()], bump)]
    pub thread: Account<'info, Thread>,

    #[account(mut)]
    pub owner: Signer<'info>,

    pub system_program: Program<'info, System>
}

#[derive(Accounts)]
pub struct AddReply<'info> {
    #[account(mut)]
    pub thread: Account<'info, Thread>,
    signer: Signer<'info>
}

#[account]
pub struct Thread {
    pub thread_type: String,
    pub title: String,
    pub content: String,
    pub replies: Vec<Reply>,
    pub state: ThreadState,
    pub distributed_tokens: u64
}

#[derive(Debug, Clone, AnchorDeserialize, AnchorSerialize)]
pub enum ThreadState {
    Active,
    Expired
}