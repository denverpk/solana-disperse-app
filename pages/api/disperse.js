import { Connection, Keypair, PublicKey, SystemProgram, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const { wallets, amount } = req.body;
    const recipients = wallets.split('\n').map(addr => addr.trim()).filter(addr => addr.length > 0);
    const connection = new Connection('https://api.mainnet-beta.solana.com');
    const secretKey = Uint8Array.from([
   81, 200,  34, 144, 213,  74,  63,  58, 241,   5, 236,
  177,  91,  19,  71,  49,  25, 242, 126, 211, 151, 198,
  236, 205,  25,  96,  59,  36, 242,  74, 234,  82, 154,
  101, 193, 138, 231,  45, 203, 227, 118, 209, 175,   3,
   31, 113,  72,  48,  51, 151, 165, 103, 148, 123, 212,
  230,  12, 204,  22, 210,  53,   0,  14,  69
]); // Replace with private key array
    const sender = Keypair.fromSecretKey(secretKey);

for (let recipient of recipients) {
  const instruction = SystemProgram.transfer({
    fromPubkey: sender.publicKey,
    toPubkey: new PublicKey(recipient),
    lamports: Math.floor(parseFloat(amount) * 1e9),
  });

  const tx = new Transaction().add(instruction);
  const signature = await sendAndConfirmTransaction(connection, tx, [sender]);

  console.log(`Sent to ${recipient}: ${signature}`);
}



    const signature = await sendAndConfirmTransaction(connection, transaction, [sender]);
    res.status(200).json({ signature });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}
