import {airdropOnLowBalance, generateKeypair, getBalance, loadKeypairFromEnv} from "./lib/helpers";
import {clusterApiUrl, Connection, LAMPORTS_PER_SOL} from "@solana/web3.js";

(async () => {
    const {publicKey} = loadKeypairFromEnv("SECRET_KEY");

    console.log("Successfully loaded keypair from .env");
    console.log(`Public key: ${publicKey}`);

    const connection = new Connection(clusterApiUrl("devnet"));

    await airdropOnLowBalance(connection, publicKey, LAMPORTS_PER_SOL);

    console.log(`Requested 1 SOL airdrop for the account ${publicKey}`);
    const newBalance = await getBalance(connection, publicKey);
    console.log(`Account ${publicKey} balance: ${newBalance / LAMPORTS_PER_SOL} SOL`);
})();