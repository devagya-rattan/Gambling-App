import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
const WIDTH = 650;
const HEIGHT = 650;
const DECIMAL_MULTIPLIER = 10000;
const ballRadius = 7;
const obstacleRadius = 4;
const gravity = 0.2 * DECIMAL_MULTIPLIER;
const horizontalFriction = 0.4;
const verticalFriction = 0.8;

const pad = (n: number) => n * DECIMAL_MULTIPLIER;
const unpad = (n: number) => Math.floor(n / DECIMAL_MULTIPLIER);

interface Obstacle {
  x: number;
  y: number;
  radius: number;
}

interface Sink {
  x: number;
  y: number;
  width: number;
  height: number;
  value: number;
}

class Ball {
  x: number;
  y: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
  hasLanded: boolean;

  constructor(x: number, y: number, radius: number, color: string) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.vx = 0;
    this.vy = 0;
    this.hasLanded = false;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(unpad(this.x), unpad(this.y), this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update(
    obstacles: Obstacle[],
    sinks: Sink[],
    onSinkHit: (value: number) => void
  ) {
    if (this.hasLanded) return;

    this.vy += gravity;
    this.x += this.vx;
    this.y += this.vy;

    obstacles.forEach((obstacle) => {
      const dist = Math.hypot(this.x - obstacle.x, this.y - obstacle.y);
      if (dist < pad(this.radius + obstacle.radius)) {
        const angle = Math.atan2(this.y - obstacle.y, this.x - obstacle.x);
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        this.vx = Math.cos(angle) * speed * horizontalFriction;
        this.vy = Math.sin(angle) * speed * verticalFriction;
        const overlap = this.radius + obstacle.radius - unpad(dist);
        this.x += pad(Math.cos(angle) * overlap);
        this.y += pad(Math.sin(angle) * overlap);
      }
    });

    sinks.forEach((sink) => {
      if (
        unpad(this.x) > sink.x - sink.width / 2 &&
        unpad(this.x) < sink.x + sink.width / 2 &&
        unpad(this.y) + this.radius > sink.y - sink.height / 2
      ) {
        this.vx = 0;
        this.vy = 0;
        this.hasLanded = true;
        onSinkHit(sink.value);
      }
    });
  }
}

const GameCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [balls, setBalls] = useState<Ball[]>([]);
  const [balance, setBalance] = useState<number>(() => {
    return parseFloat(localStorage.getItem("balance") || "1000");
  });

  useEffect(() => {
    localStorage.setItem("balance", balance.toString());
  }, [balance]);

  const obstacles: Obstacle[] = Array.from({ length: 12 }, (_, row) => {
    return Array.from({ length: row + 1 }, (_, col) => {
      const y = 0 + row * 35;
      const spacing = 36;
      const x = WIDTH / 2 - spacing * (row / 2 - col);
      return { x: pad(x), y: pad(y), radius: obstacleRadius };
    });
  }).flat();

  const sinks: Sink[] = Array.from({ length: 15 }, (_, i) => ({
    x: WIDTH / 2 + (i - 7.5) * 36 + obstacleRadius,
    y: HEIGHT - 240,
    width: 36,
    height: 36,
    value: 1 / Math.pow(i + 1, 2),
  }));

  const onSinkHit = (value: number) => {
    setBalance((prevBalance) => {
      const newBalance = prevBalance + value;
      localStorage.setItem("balance", newBalance.toString());
      return newBalance;
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const update = () => {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      ctx.fillStyle = "#0d0d0d";

      obstacles.forEach((obs) => {
        ctx.beginPath();
        ctx.arc(unpad(obs.x), unpad(obs.y), obs.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#00ff88";
        ctx.fill();
        ctx.closePath();
      });

      ctx.fillStyle = "#00bfff";
      sinks.forEach((sink) =>
        ctx.fillRect(
          sink.x,
          sink.y - sink.height / 2,
          sink.width - obstacleRadius * 2,
          sink.height
        )
      );

      balls.forEach((ball) => {
        ball.draw(ctx);
        ball.update(obstacles, sinks, onSinkHit);
      });

      requestAnimationFrame(update);
    };

    update();
  }, [balls, balance]);

  const addBall = () => {
    setBalls((prev) => [
      ...prev,
      new Ball(pad(WIDTH / 2 + 13), pad(50), ballRadius, "#ff6347"),
    ]);
  };

  return (
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
      <div className="game-container">
        <div className="canvas-wrapper">
          <canvas
            ref={canvasRef}
            width={WIDTH}
            height={HEIGHT}
            className="game-canvas"
          ></canvas>
          <button className="add-ball-button" onClick={addBall}>
            Add Ball
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCanvas;
