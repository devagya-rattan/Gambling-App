import React, { useState, useEffect } from "react";// Import the CSS file

const Wallet: React.FC = () => {
  const [balance, setBalance] = useState<number>(() => {
    return parseFloat(localStorage.getItem("balance") || "1000");
  });

  useEffect(() => {
    const updateBalance = () => {
      setBalance(parseFloat(localStorage.getItem("balance") || "1000"));
    };

    window.addEventListener("storage", updateBalance);
    return () => window.removeEventListener("storage", updateBalance);
  }, []);

  return (
    <div className="wallet-container">
      <div className="wallet-content">
        <h2>Wallet Balance: ${balance.toFixed(2)}</h2>
      </div>
    </div>
  );
};

export default Wallet;