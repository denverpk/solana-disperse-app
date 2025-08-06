import { Connection, Keypair } from '@solana/web3.js';

export default async function handler(req, res) {
  try {
    const connection = new Connection('https://api.mainnet-beta.solana.com');
    const secretKey = Uint8Array.from(YOUR_PRIVATE_KEY_ARRAY); // Replace with private key array
    const sender = Keypair.fromSecretKey(secretKey);

    const balanceLamports = await connection.getBalance(sender.publicKey);
    const balanceSOL = balanceLamports / 1e9;
    res.status(200).json({ balance: balanceSOL });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}