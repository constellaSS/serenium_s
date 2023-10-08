use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;

declare_id!("7tGHjvmtx3dSXXjHqDQvPES4P1wGrmywXcQxKke4ihnT");

#[program]
pub mod serenium_s {
    use super::*;

    pub fn init_thread(ctx: Context<CreateThread>, thread_type: String, title: String ,content: String, thread_state: String) -> ProgramResult {
        let thread = &mut ctx.accounts.thread;
        thread.thread_type = thread_type;
        thread.title = title;
        thread.content = content;
        thread.replies = Vec::new();
        thread.state = thread_state;
        thread.distributed_tokens = 1;
        Ok(())
    }
}

#[account]
pub struct Reply{
    pub reply_owner: Pubkey,
    pub content: String,
    pub number_of_likes: u128,
    pub number_of_reports: u128,
}

#[derive(Accounts)]
pub struct CreateThread<'info> {
    #[account(init, payer=owner, space=9000, seeds=[b"THREAD_DEMO".as_ref(), owner.key().as_ref()], bump)]
    pub thread: Account<'info, Thread>,

    #[account(mut)]
    pub owner: Signer<'info>,

    pub system_program: Program<'info, System>
}

#[account]
pub struct Thread {
    pub thread_type: String,
    pub title: String,
    pub content: String,
    pub replies: Vec<Reply>,
    pub state: String,
    pub distributed_tokens: u128
}