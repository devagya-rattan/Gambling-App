import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
interface Vector2D {
  x: number;
  y: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

class Ball {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  restitution: number;
  grounded: boolean;
  maxSpeed: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.radius = 15;
    this.vx = 0;
    this.vy = 0;
    this.restitution = 0.8;
    this.grounded = false;
    this.maxSpeed = 12;
  }

  update(gravity: number, friction: number) {
    // Apply gravity
    if (!this.grounded) {
      this.vy += gravity;
    }

    // Apply friction
    this.vx *= friction;
    this.vy *= friction;

    // Limit speed
    if (Math.abs(this.vx) > this.maxSpeed) {
      this.vx = Math.sign(this.vx) * this.maxSpeed;
    }
    if (Math.abs(this.vy) > this.maxSpeed) {
      this.vy = Math.sign(this.vy) * this.maxSpeed;
    }

    // Update position
    this.x += this.vx;
    this.y += this.vy;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#3498db";
    ctx.fill();
    ctx.closePath();
  }
}

class Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = `hsl(${Math.random() * 360}, 70%, 50%)`;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

class Goal {
  x: number;
  y: number;
  width: number;
  height: number;
  pulse: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 40;
    this.pulse = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = `rgba(0, 255, 0, ${0.5 + Math.sin(this.pulse) * 0.5})`;
    ctx.fill();
    ctx.closePath();
    this.pulse += 0.05;
  }
}

const BouncingMaze: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [moneyWon, setMoneyWon] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const gameState = useRef<{
    ball: Ball;
    obstacles: Obstacle[];
    particles: Particle[];
    goal: Goal | null;
    difficulty: number;
    keys: { [key: string]: boolean };
    control: { left: boolean; right: boolean; jump: boolean };
  }>({
    ball: new Ball(50, 50),
    obstacles: [],
    particles: [],
    goal: null,
    difficulty: 1,
    keys: {},
    control: { left: false, right: false, jump: false },
  });

  useEffect(() => {
    const storedHighScore = localStorage.getItem("highScore");
    if (storedHighScore) setHighScore(parseInt(storedHighScore));
    setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
    initializeGame();

    // Keyboard event listeners
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") gameState.current.control.left = true;
      if (e.key === "ArrowRight") gameState.current.control.right = true;
      if (e.key === "ArrowUp") gameState.current.control.jump = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") gameState.current.control.left = false;
      if (e.key === "ArrowRight") gameState.current.control.right = false;
      if (e.key === "ArrowUp") gameState.current.control.jump = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx) {
      const gameLoop = setInterval(() => updateGame(ctx), 1000 / 60);
      return () => {
        clearInterval(gameLoop);
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
      };
    }
  }, []);

  const initializeGame = () => {
    gameState.current.ball = new Ball(50, 50);
    generateMaze();
    placeGoal();
  };

  const generateMaze = () => {
    const obstacles: Obstacle[] = [];
    const obstacleCount = 4 + gameState.current.difficulty * 2;
    const minDistance = 150;

    for (let i = 0; i < obstacleCount; i++) {
      let validPosition = false;
      let attempts = 0;

      while (!validPosition && attempts < 100) {
        const width = Math.random() * 80 + 40;
        const height = Math.random() * 80 + 40;
        const x = Math.random() * (800 - width);
        const y = Math.random() * (500 - height);

        const dx = x - gameState.current.ball.x;
        const dy = y - gameState.current.ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > minDistance) {
          obstacles.push(new Obstacle(x, y, width, height));
          validPosition = true;
        }
        attempts++;
      }
    }
    gameState.current.obstacles = obstacles;
  };

  const placeGoal = () => {
    let validPosition = false;
    const minDistance = 300;

    while (!validPosition) {
      const goal = new Goal(
        Math.random() * (800 - 40),
        Math.random() * (500 - 40)
      );

      const dx = goal.x - gameState.current.ball.x;
      const dy = goal.y - gameState.current.ball.y;
      const distanceToStart = Math.sqrt(dx * dx + dy * dy);

      validPosition =
        distanceToStart > minDistance &&
        !gameState.current.obstacles.some(
          (obstacle) =>
            goal.x < obstacle.x + obstacle.width &&
            goal.x + goal.width > obstacle.x &&
            goal.y < obstacle.y + obstacle.height &&
            goal.y + goal.height > obstacle.y
        );

      if (validPosition) gameState.current.goal = goal;
    }
  };

  const increaseDifficulty = () => {
    const amounts = [0.25, 0.5, 0.75];
    const wonAmount = amounts[Math.floor(Math.random() * amounts.length)];
    setMoneyWon(wonAmount);

    // Update balance in localStorage
    const currentBalance = parseFloat(
      localStorage.getItem("balance") || "1000"
    );
    const newBalance = currentBalance + wonAmount;
    localStorage.setItem("balance", newBalance.toString());

    // Trigger storage event to update Wallet component
    window.dispatchEvent(new Event("storage"));

    gameState.current.difficulty++;
    gameState.current.ball = new Ball(50, 50);
    generateMaze();
    placeGoal();
  };

  const resetGame = () => {
    setScore(0);
    setMoneyWon(0);
    gameState.current.difficulty = 1;
    initializeGame();
  };

  const checkCollisions = () => {
    const ball = gameState.current.ball;
    const obstacles = gameState.current.obstacles;
    const goal = gameState.current.goal;

    // Ball and canvas boundaries
    if (ball.x - ball.radius < 0) {
      ball.x = ball.radius;
      ball.vx *= -ball.restitution;
    }
    if (ball.x + ball.radius > 800) {
      ball.x = 800 - ball.radius;
      ball.vx *= -ball.restitution;
    }
    if (ball.y - ball.radius < 0) {
      ball.y = ball.radius;
      ball.vy *= -ball.restitution;
    }
    if (ball.y + ball.radius > 500) {
      ball.y = 500 - ball.radius;
      ball.vy *= -ball.restitution;
      ball.grounded = true;
    } else {
      ball.grounded = false;
    }

    // Ball and obstacles collision
    for (const obstacle of obstacles) {
      let closestX = Math.max(
        obstacle.x,
        Math.min(ball.x, obstacle.x + obstacle.width)
      );
      let closestY = Math.max(
        obstacle.y,
        Math.min(ball.y, obstacle.y + obstacle.height)
      );

      const dx = ball.x - closestX;
      const dy = ball.y - closestY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < ball.radius) {
        if (Math.abs(closestX - ball.x) > Math.abs(closestY - ball.y)) {
          ball.vx *= -ball.restitution;
        } else {
          ball.vy *= -ball.restitution;
        }
      }
    }

    // Ball and goal collision
    if (
      goal &&
      ball.x + ball.radius > goal.x &&
      ball.x - ball.radius < goal.x + goal.width &&
      ball.y + ball.radius > goal.y &&
      ball.y - ball.radius < goal.y + goal.height
    ) {
      setScore((prev) => prev + 1);
      if (score + 1 > highScore) {
        setHighScore(score + 1);
        localStorage.setItem("highScore", (score + 1).toString());
      }
      increaseDifficulty();
    }
  };

  const updateGame = (ctx: CanvasRenderingContext2D) => {
    const ball = gameState.current.ball;
    const obstacles = gameState.current.obstacles;
    const goal = gameState.current.goal;

    // Clear canvas
    ctx.clearRect(0, 0, 800, 500);

    // Update ball
    ball.update(0.5, 0.99);

    // Handle controls
    if (gameState.current.control.left) ball.vx -= 0.5;
    if (gameState.current.control.right) ball.vx += 0.5;
    if (gameState.current.control.jump && ball.grounded) {
      ball.vy = -10;
      ball.grounded = false;
    }

    // Check collisions
    checkCollisions();

    // Draw ball
    ball.draw(ctx);

    // Draw obstacles
    for (const obstacle of obstacles) {
      obstacle.draw(ctx);
    }

    // Draw goal
    if (goal) goal.draw(ctx);
  };

  return (
    <div
      style={{
        textAlign: "center",
        backgroundColor: "#1a1a1a",
        margin: 0,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          fontSize: "24px",
          color: "#fff",
          fontFamily: "Arial, sans-serif",
          position: "fixed",
          top: "10px",
          left: "10px",
        }}
      >
        Score: {score} | High: {highScore}{" "}
        {moneyWon > 0 && `| Won: ₹${moneyWon}`}
      </div>
      <Link to="/wallet">
    <button className="wallet-button">Wallet</button>
  </Link>
      <canvas
        ref={canvasRef}
        width={800}
        height={500}
        style={{
          border: "2px solid #333",
          backgroundColor: "#222",
          display: "block",
          margin: "20px auto",
        }}
      />


      <button
        onClick={resetGame}
        style={{
          position: "fixed",
          top: "10px",
          right: "10px",
          padding: "10px 20px",
          backgroundColor: "#3498db",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Reset
      </button>

      {isMobile && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            className="control-btn"
            onTouchStart={() => (gameState.current.control.left = true)}
            onTouchEnd={() => (gameState.current.control.left = false)}
          >
            ←
          </button>
          <button
            className="control-btn"
            onTouchStart={() => {
              if (gameState.current.ball.grounded)
                gameState.current.ball.vy = -10;
            }}
          >
            ↑
          </button>
          <button
            className="control-btn"
            onTouchStart={() => (gameState.current.control.right = true)}
            onTouchEnd={() => (gameState.current.control.right = false)}
          >
            →
          </button>
        </div>
      )}
    </div>
  );
};

export default BouncingMaze;
