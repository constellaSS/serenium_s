use anchor_lang::prelude::*;

declare_id!("7tGHjvmtx3dSXXjHqDQvPES4P1wGrmywXcQxKke4ihnT");

#[program]
pub mod serenium_s {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
