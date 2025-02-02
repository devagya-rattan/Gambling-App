import { createContext, useContext, useState, ReactNode } from "react";

interface BalanceContextType {
  balance: number;
  updateBalance: (amount: number) => void;
}

const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

export const BalanceProvider = ({ children }: { children: ReactNode }) => {
  const [balance, setBalance] = useState(1000); // Default balance

  const updateBalance = (amount: number) => {
    setBalance((prevBalance) => prevBalance + amount);
  };

  return (
    <BalanceContext.Provider value={{ balance, updateBalance }}>
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalance = () => {
  const context = useContext(BalanceContext);
  if (!context) {
    throw new Error("useBalance must be used within a BalanceProvider");
  }
  return context;
};
