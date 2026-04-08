import React, { useRef, useEffect } from 'react';

const Pong = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    const paddleWidth = 10;
    const paddleHeight = 100;
    const ballRadius = 10;
    
    let animationFrameId;

    const player = {
      x: 10,
      y: canvas.height / 2 - paddleHeight / 2,
      width: paddleWidth,
      height: paddleHeight,
      dy: 6,
      score: 0
    };

    const computer = {
      x: canvas.width - 20,
      y: canvas.height / 2 - paddleHeight / 2,
      width: paddleWidth,
      height: paddleHeight,
      score: 0
    };

    const ball = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: ballRadius,
      speed: 5,
      dx: 5,
      dy: 5
    };

    let upPressed = false;
    let downPressed = false;

    const keyDownHandler = (e) => {
      if(e.key === 'ArrowUp') upPressed = true;
      else if(e.key === 'ArrowDown') downPressed = true;
      
      // Prevent scrolling the page when playing with arrow keys
      if(['ArrowUp', 'ArrowDown', ' '].includes(e.key)) {
        e.preventDefault();
      }
    };

    const keyUpHandler = (e) => {
      if(e.key === 'ArrowUp') upPressed = false;
      else if(e.key === 'ArrowDown') downPressed = false;
    };

    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);

    const drawRect = (x, y, w, h, color) => {
      context.fillStyle = color;
      context.fillRect(x, y, w, h);
    };

    const drawCircle = (x, y, r, color) => {
      context.fillStyle = color;
      context.beginPath();
      context.arc(x, y, r, 0, Math.PI * 2, false);
      context.closePath();
      context.fill();
    };

    const drawText = (text, x, y, color) => {
      context.fillStyle = color;
      context.font = 'bold 36px "Righteous", sans-serif';
      context.fillText(text, x, y);
    };

    const resetBall = () => {
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;
      ball.speed = 5;
      ball.dx = -ball.dx;
    };

    const update = () => {
      if (upPressed && player.y > 0) {
        player.y -= player.dy;
      } else if (downPressed && player.y < canvas.height - player.height) {
        player.y += player.dy;
      }

      // Computer simple AI
      computer.y += ((ball.y - (computer.y + computer.height / 2))) * 0.08;

      ball.x += ball.dx;
      ball.y += ball.dy;

      // Wall collision (top and bottom)
      if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
      }

      let paddle = (ball.x < canvas.width / 2) ? player : computer;

      // Paddle collision
      if (ball.x + ball.radius > paddle.x && ball.x - ball.radius < paddle.x + paddle.width &&
          ball.y + ball.radius > paddle.y && ball.y - ball.radius < paddle.y + paddle.height) {
        
        let collidePoint = (ball.y - (paddle.y + paddle.height / 2));
        collidePoint = collidePoint / (paddle.height / 2);
        
        let angleRad = (Math.PI / 4) * collidePoint;
        let direction = (ball.x < canvas.width / 2) ? 1 : -1;
        
        ball.dx = direction * ball.speed * Math.cos(angleRad);
        ball.dy = ball.speed * Math.sin(angleRad);
        
        // Slightly speed up the ball after a hit to make it interesting
        ball.speed += 0.5;
      }

      // Scoring
      if (ball.x - ball.radius < 0) {
        computer.score++;
        resetBall();
      } else if (ball.x + ball.radius > canvas.width) {
        player.score++;
        resetBall();
      }
    };

    const render = () => {
      // Background
      drawRect(0, 0, canvas.width, canvas.height, '#111827');

      // Draw net
      for (let i = 0; i <= canvas.height; i += 20) {
        drawRect(canvas.width / 2 - 2, i, 4, 10, '#f9a8d4'); 
      }

      // Draw scores
      drawText(player.score, canvas.width / 4, 60, '#67e8f9');
      drawText(computer.score, 3 * canvas.width / 4, 60, '#67e8f9');

      // Draw paddles
      drawRect(player.x, player.y, player.width, player.height, '#fde047');
      drawRect(computer.x, computer.y, computer.width, computer.height, '#fde047');

      // Draw ball
      drawCircle(ball.x, ball.y, ball.radius, '#ffffff');
    };

    const gameLoop = () => {
      update();
      render();
      animationFrameId = window.requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      document.removeEventListener('keydown', keyDownHandler);
      document.removeEventListener('keyup', keyUpHandler);
    };
  }, []);

  return (
    <div className="pt-28 pb-12 min-h-screen bg-pink-100 flex flex-col items-center">
      <h1 className="text-4xl font-black tracking-tighter text-black uppercase mb-4" style={{ fontFamily: 'Righteous' }}>
        Pong
      </h1>
      <p className="mb-8 font-bold text-lg border-2 border-black bg-white px-4 py-2 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
        Use <span className="text-pink-600">Arrow Up</span> and <span className="text-pink-600">Arrow Down</span> to play!
      </p>
      <div className="border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] bg-black p-2 rounded-none">
        <canvas 
          ref={canvasRef} 
          width={800} 
          height={500} 
          className="bg-gray-900 block max-w-full"
        />
      </div>
    </div>
  );
};

export default Pong;