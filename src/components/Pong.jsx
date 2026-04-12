import React, { useRef, useEffect, useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient.js';

const Pong = () => {
  const canvasRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameId, setGameId] = useState(0);
  
  // Leaderboard states
  const [postGameState, setPostGameState] = useState('ask'); // 'ask', 'select', 'leaderboard'
  const [selectedName, setSelectedName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const [guestList, setGuestList] = useState([]);

  // Keep game loop from running when typing/interacting with overlays
  const isOverlayActive = gameOver;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch guest list
        const { data: guestsData, error: guestsError } = await supabase.from('guests').select('name');
        if (!guestsError && guestsData) {
          const names = guestsData.map(guest => guest.name).filter(Boolean).sort();
          setGuestList(names);
        }
        
        // Fetch top 5 global leaderboard
        const { data: scoresData, error: scoresError } = await supabase
          .from('pong_scores')
          .select('name, score')
          .order('score', { ascending: false })
          .limit(5);
        if (!scoresError && scoresData) {
          setLeaderboard(scoresData);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (gameOver) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    const paddleWidth = 10;
    const paddleHeight = 100;
    const ballRadius = 10;
    
    let animationFrameId;
    let isGameOver = false;

    const player = {
      x: 10,
      y: canvas.height / 2 - paddleHeight / 2,
      width: paddleWidth,
      height: paddleHeight,
      dy: 6,
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
      if(['ArrowUp', 'ArrowDown', ' '].includes(e.key) && !isOverlayActive) {
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

    const update = () => {
      if (upPressed && player.y > 0) {
        player.y -= player.dy;
      } else if (downPressed && player.y < canvas.height - player.height) {
        player.y += player.dy;
      }

      ball.x += ball.dx;
      ball.y += ball.dy;

      // Wall collision (top and bottom)
      if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
      }

      // Wall collision (right wall)
      if (ball.x + ball.radius > canvas.width) {
        ball.x = canvas.width - ball.radius; // Prevent ball from getting stuck
        ball.dx = -ball.dx;
      }

      // Paddle collision
      if (ball.x - ball.radius < player.x + player.width &&
          ball.x + ball.radius > player.x &&
          ball.y + ball.radius > player.y && 
          ball.y - ball.radius < player.y + player.height) {
        
        if (ball.dx < 0) { // Only count hit if the ball is approaching from the right
          let collidePoint = (ball.y - (player.y + player.height / 2));
          collidePoint = collidePoint / (player.height / 2);
          
          let angleRad = (Math.PI / 4) * collidePoint;
          
          ball.dx = ball.speed * Math.cos(angleRad); // Bounce right towards wall
          ball.dy = ball.speed * Math.sin(angleRad);
          
          // Speed up the ball slightly to increase difficulty
          ball.speed += 0.5;
          player.score++; // Increment streak
        }
      }

      // Missed the ball (left wall)
      if (ball.x - ball.radius < 0) {
        isGameOver = true;
        setScore(player.score);
        setGameOver(true);
      }
    };

    const render = () => {
      // Background
      drawRect(0, 0, canvas.width, canvas.height, '#111827');

      // Draw right wall indicator
      drawRect(canvas.width - 10, 0, 10, canvas.height, '#f9a8d4');

      // Draw streak score
      context.textAlign = 'center';
      drawText(`Streak: ${player.score}`, canvas.width / 2, 60, '#67e8f9');
      context.textAlign = 'left'; // Reset back to default

      // Draw player paddle
      drawRect(player.x, player.y, player.width, player.height, '#fde047');

      // Draw ball
      drawCircle(ball.x, ball.y, ball.radius, '#ffffff');
    };

    const gameLoop = () => {
      if (isGameOver) return;
      update();
      if (!isGameOver) {
        render();
        animationFrameId = window.requestAnimationFrame(gameLoop);
      }
    };

    gameLoop();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      document.removeEventListener('keydown', keyDownHandler);
      document.removeEventListener('keyup', keyUpHandler);
    };
  }, [gameId, gameOver]);

  const saveScore = async () => {
    if (!selectedName) return;
    
    try {
      // Insert the new score into Supabase
      const { error: insertError } = await supabase
        .from('pong_scores')
        .insert([{ name: selectedName, score: score }]);
        
      if (insertError) throw insertError;

      // Fetch the updated top 5 leaderboard globally
      const { data, error: fetchError } = await supabase
        .from('pong_scores')
        .select('name, score')
        .order('score', { ascending: false })
        .limit(5);

      if (!fetchError && data) {
        setLeaderboard(data);
      }
    } catch (err) {
      console.error('Error saving score:', err);
    }
    
    setPostGameState('leaderboard');
  };

  return (
    <div className="pt-28 pb-12 min-h-screen bg-pink-100 flex flex-col items-center">
      <h1 className="text-4xl font-black tracking-tighter text-black uppercase mb-4" style={{ fontFamily: 'Righteous' }}>
        Pong
      </h1>
      <p className="mb-8 font-bold text-lg border-2 border-black bg-white px-4 py-2 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
        Use <span className="text-pink-600">Arrow Up</span> and <span className="text-pink-600">Arrow Down</span> to play!
      </p>
      <div className="relative border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] bg-black p-2 rounded-none">
        {gameOver && (
          <div className="absolute inset-0 z-10 bg-black/90 flex flex-col items-center justify-center p-4 text-center">
            <h2 className="text-6xl text-pink-400 font-black tracking-tighter mb-2" style={{ fontFamily: 'Righteous' }}>
              GAME OVER
            </h2>
            <p className="text-3xl text-white font-bold mb-6">
              Final Score: {score}
            </p>
            
            {postGameState === 'ask' && (
              <div className="space-y-4">
                <p className="text-xl text-yellow-300 font-bold mb-4">Add your score to the leaderboard?</p>
                <div className="flex gap-4 justify-center">
                  <button 
                    onClick={() => setPostGameState('select')}
                    className="px-6 py-2 bg-green-400 text-black border-4 border-black font-bold uppercase text-xl shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition-all"
                  >
                    Yes
                  </button>
                  <button 
                    onClick={() => setPostGameState('leaderboard')}
                    className="px-6 py-2 bg-red-400 text-black border-4 border-black font-bold uppercase text-xl shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition-all"
                  >
                    No
                  </button>
                </div>
              </div>
            )}

            {postGameState === 'select' && (
              <div className="space-y-4 flex flex-col items-center w-full max-w-sm">
                <p className="text-xl text-yellow-300 font-bold">Search for your name:</p>
                <div className="w-full relative">
                  <input 
                    type="text"
                    placeholder="Start typing..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setSelectedName(''); // Clear selected name when typing
                    }}
                    className="w-full px-4 py-2 border-4 border-black font-bold text-lg text-black focus:outline-none focus:ring-4 focus:ring-cyan-300"
                  />
                  {searchTerm && !selectedName && (
                    <div className="absolute z-20 w-full mt-1 max-h-40 overflow-y-auto bg-white border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] text-black">
                      {guestList.filter(name => name.toLowerCase().includes(searchTerm.toLowerCase())).length > 0 ? (
                        guestList.filter(name => name.toLowerCase().includes(searchTerm.toLowerCase())).map(name => (
                          <div 
                            key={name} 
                            className="px-4 py-2 hover:bg-cyan-200 cursor-pointer font-bold border-b-2 border-gray-200 last:border-0 text-left"
                            onClick={() => {
                              setSelectedName(name);
                              setSearchTerm(name); // Fill input with selected name
                            }}
                          >
                            {name}
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-2 text-gray-500 font-bold text-left">No matches found</div>
                      )}
                    </div>
                  )}
                </div>
                <button 
                  onClick={saveScore}
                  disabled={!selectedName}
                  className="px-6 py-2 bg-cyan-400 text-black border-4 border-black font-bold uppercase text-xl shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] disabled:opacity-50 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-none transition-all"
                >
                  Submit Score
                </button>
              </div>
            )}

            {postGameState === 'leaderboard' && (
              <div className="flex flex-col items-center w-full max-w-sm">
                <h3 className="text-2xl text-yellow-300 font-black mb-4 uppercase">Top 5 Scores</h3>
                <div className="w-full bg-white border-4 border-black p-4 mb-6">
                  {leaderboard.length === 0 ? (
                    <p className="text-black font-bold text-center">No scores yet!</p>
                  ) : (
                    <ul className="space-y-2 text-left">
                      {leaderboard.map((entry, idx) => (
                        <li key={idx} className="flex justify-between font-bold text-black border-b-2 border-gray-200 last:border-0 pb-1">
                          <span>{idx + 1}. {entry.name}</span>
                          <span>{entry.score}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <button 
                  onClick={() => {
                    setGameOver(false);
                    setPostGameState('ask');
                    setSelectedName('');
                    setSearchTerm('');
                    setGameId(prev => prev + 1);
                  }}
                  className="px-6 py-3 bg-yellow-300 text-black border-4 border-black font-bold uppercase text-xl shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all"
                >
                  Play Again
                </button>
              </div>
            )}
          </div>
        )}
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