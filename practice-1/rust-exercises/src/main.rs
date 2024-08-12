use std::env;

use dotenv::dotenv;
use solana_sdk::{native_token::lamports_to_sol, pubkey::Pubkey, signer::{keypair::Keypair, Signer}};
use solana_client::rpc_client::RpcClient;

fn parse_secret_key(secret_key: String) -> Vec<u8> {
    return secret_key
        .trim_matches(|c| c == '[' || c == ']')
        .split(",")
        .map(|s| s.trim().parse::<u8>().expect("Failed to parse value to u8"))
        .collect();
}

#[allow(dead_code)]
fn generate_keypair() -> Keypair {
    return Keypair::new();
}

fn load_keypair_from_env(env_key: &str) -> Keypair {
    let val = env::var(env_key).unwrap();

    let secret_key = parse_secret_key(val);

    return Keypair::from_bytes(&secret_key).unwrap();
}

fn get_balance(pubkey: &Pubkey) -> u64 {
    let rpc = RpcClient::new("https://api.devnet.solana.com");

    return rpc.get_balance(pubkey).unwrap();
}

fn main() {
    dotenv().ok();

    let keypair = load_keypair_from_env("SECRET_KEY");

    println!("Successfully loaded keypair from .env");
    println!("Public key: {}", keypair.pubkey());

    let balance = get_balance(&keypair.pubkey());

    println!("Account {} balance: {} SOL", keypair.pubkey(), lamports_to_sol(balance));
}
