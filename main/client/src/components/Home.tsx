// import { useState } from "react";

const Home = () => {
  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Dashboard</h2>
        </div>
        <ul className="sidebar-menu">
          {["Home", "Games", "Casino", "Promotions"].map((text) => (
            <li key={text}>{text}</li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Bar */}
        <div className="top-bar">
          <div className="menu-icon">&#9776;</div>
          <div className="title">Stake Clone</div>
          <div className="search-icon">&#128269;</div>
          <button className="wallet-button">Wallet</button>
        </div>

        {/* Home Content */}
        <div className="home-content">
          <h2>Welcome to Stake Clone</h2>
          <p>Explore our games, casino, and promotions!</p>
        </div>
      </div>
    </div>
  );
};

export default Home;