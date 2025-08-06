import { Connection, Keypair, PublicKey, SystemProgram, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const { wallets, amount } = req.body;
    const recipients = wallets.split('\n').map(addr => addr.trim()).filter(addr => addr.length > 0);
    const connection = new Connection('https://api.mainnet-beta.solana.com');
    const secretKey = Uint8Array.from(YOUR_PRIVATE_KEY_ARRAY); // Replace with private key array
    const sender = Keypair.fromSecretKey(secretKey);

    const transaction = new Transaction();

    recipients.forEach((address) => {
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: sender.publicKey,
          toPubkey: new PublicKey(address),
          lamports: parseFloat(amount) * 1e9
        })
      );
    });

    const signature = await sendAndConfirmTransaction(connection, transaction, [sender]);
    res.status(200).json({ signature });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}