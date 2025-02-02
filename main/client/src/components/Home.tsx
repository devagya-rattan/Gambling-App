// import { useState } from "react";
import { Link } from "react-router-dom";
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
          <Link to="/wallet">
            <button className="wallet-button">Wallet</button>
          </Link>
        </div>

        {/* Home Content */}
        <div className="home-content">
          <h2>Welcome to Stake Clone</h2>
          <p>Explore our games, casino, and promotions!</p>
          <div>
            <Link to="/game">
              <img
                style={{ width: "300px", height: "500px", objectFit: "cover" }}
                src="https://mediumrare.imgix.net/5cbb2498c956527e6584c6af216489b85bbb7a909c7d3c4e131a3be9bd1cc6bf?&dpr=2&format=auto&auto=format&q=50"
                alt="Card Image"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
