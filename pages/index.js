import { useState } from 'react';

export default function Home() {
  const [wallets, setWallets] = useState('');
  const [amount, setAmount] = useState('');
  const [log, setLog] = useState('');

  const handleDisperse = async () => {
    setLog('Processing Disperse...');
    const response = await fetch('/api/disperse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wallets, amount })
    });
    const data = await response.json();
    if (response.ok) {
      setLog('Success! Tx Signature: ' + data.signature);
    } else {
      setLog('Error: ' + data.message);
    }
  };

  const handleCheckBalance = async () => {
    setLog('Checking Balance...');
    const response = await fetch('/api/check-balance');
    const data = await response.json();
    if (response.ok) {
      setLog('Wallet Balance: ' + data.balance + ' SOL');
    } else {
      setLog('Error: ' + data.message);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Solana Disperse</h1>
      <textarea placeholder="Recipient Wallets (one per line)" rows="10" cols="50" value={wallets} onChange={(e) => setWallets(e.target.value)} />
      <br />
      <input type="text" placeholder="Amount per Wallet (SOL)" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <br />
      <button onClick={handleDisperse}>Disperse</button>
      <br /><br />
      <button onClick={handleCheckBalance}>Check Balance</button>
      <pre>{log}</pre>
    </div>
  );
}