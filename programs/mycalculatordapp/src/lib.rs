use anchor_lang::prelude::*;

declare_id!("9ggEpdVpSf7Lr95WW4FVeVB9c9sHqhrZANepHd7ZakaS");

#[program]
pub mod mycalculatordapp {
    use super::*;

    pub fn create(ctx: Context<Create>, init_message: String) -> Result<()> {
        let calculator: &mut Account<Calculator> = &mut ctx.accounts.calculator;
        calculator.greeting = init_message;
        Ok(())
    }

    pub fn add(ctx: Context<Addition>, num_1: i64, num_2: i64) -> Result<()> {
        let calculator: &mut Account<Calculator> = &mut ctx.accounts.calculator;
        calculator.result = num_1 + num_2;
        Ok(())
    }

    pub fn sub(ctx: Context<Subtraction>, num_1: i64, num_2: i64) -> Result<()> {
        let calculator: &mut Account<Calculator> = &mut ctx.accounts.calculator;
        calculator.result = num_2 - num_1;
        Ok(())
    }

    pub fn multiply(ctx: Context<Multiplication>, num_1: i64, num_2: i64) -> Result<()> {
        let calculator: &mut Account<Calculator> = &mut ctx.accounts.calculator;
        calculator.result = num_1 * num_2;
        Ok(())
    }

    pub fn divide(ctx: Context<Division>, num_1: i64, num_2: i64) -> Result<()> {
        let calculator: &mut Account<Calculator> = &mut ctx.accounts.calculator;
        calculator.result = num_2 / num_1;
        calculator.remainder = num_2 % num_1;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init, payer=user, space=264)]
    pub calculator: Account<'info, Calculator>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Addition<'info> {
    #[account(mut)]
    pub calculator: Account<'info, Calculator>,
}

#[derive(Accounts)]
pub struct Subtraction<'info> {
    #[account(mut)]
    pub calculator: Account<'info, Calculator>,
}

#[derive(Accounts)]
pub struct Multiplication<'info> {
    #[account(mut)]
    pub calculator: Account<'info, Calculator>,
}

#[derive(Accounts)]
pub struct Division<'info> {
    #[account(mut)]
    pub calculator: Account<'info, Calculator>,
}

#[account]
pub struct Calculator {
    pub greeting: String,
    pub result: i64,
    pub remainder: i64,
}
