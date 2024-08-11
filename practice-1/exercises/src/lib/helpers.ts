import {Connection, Keypair, LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js";

export function generateKeypair() {
    return Keypair.generate();
}

export function loadKeypairFromEnv(envKey: string) {
    const data = process.env[envKey];

    if (!data) {
        throw new Error("Invalid environment key");
    }

    const bytes = JSON.parse(data);

    return Keypair.fromSecretKey(new Uint8Array(bytes));
}

export async function getBalance(connection: Connection, publicKey: PublicKey) {
    return await connection.getBalance(publicKey);
}

export async function airdropOnLowBalance(connection: Connection, publicKey: PublicKey, amount: number, forceAirdrop: boolean = false) {
    const balance = await getBalance(connection, publicKey);

    const minBalanceToAirdrop = LAMPORTS_PER_SOL / 2;

    if (balance < minBalanceToAirdrop || forceAirdrop) {
        await connection.requestAirdrop(publicKey, amount);
    }
}