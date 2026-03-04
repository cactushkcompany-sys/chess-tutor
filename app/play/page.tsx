'use client';

import { useState, useEffect, useRef } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Fireworks } from 'fireworks-js';

type CelebrationEffect = 'move' | 'capture' | 'check' | 'checkmate' | null;

export default function PlayPage() {
  const [game, setGame] = useState(new Chess());
  const [celebration, setCelebration] = useState<CelebrationEffect>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [captureSquare, setCaptureSquare] = useState<string | null>(null);
  const fireworksRef = useRef<HTMLDivElement>(null);
  const fireworksInstance = useRef<Fireworks | null>(null);
  const [isWhiteInCheck, setIsWhiteInCheck] = useState(false);
  const [boardWidth, setBoardWidth] = useState(600);
  const boardContainerRef = useRef<HTMLDivElement>(null);
  const [gameStarted, setGameStarted] = useState(false);

  // 响应式棋盘尺寸
  useEffect(() => {
    const updateBoardSize = () => {
      if (boardContainerRef.current) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const availableHeight = viewportHeight - 180;
        const availableWidth = viewportWidth - 24;
        const maxSize = Math.min(availableWidth, availableHeight, 600);
        setBoardWidth(Math.floor(maxSize));
      }
    };

    updateBoardSize();
    window.addEventListener('resize', updateBoardSize);
    window.addEventListener('orientationchange', () => {
      setTimeout(updateBoardSize, 100);
    });

    return () => {
      window.removeEventListener('resize', updateBoardSize);
      window.removeEventListener('orientationchange', updateBoardSize);
    };
  }, []);

  // 播放音效 - 使用 Web Audio API
  const playSound = (type: 'move' | 'capture' | 'check' | 'win') => {
    if (!gameStarted) return;
    
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContext();
      
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      if (type === 'move') {
        oscillator.frequency.value = 400;
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
      } else if (type === 'capture') {
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.2);
      } else if (type === 'check') {
        oscillator.type = 'sawtooth';
        oscillator.frequency.value = 600;
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0, audioContext.currentTime + 0.05);
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.2);
      } else if (type === 'win') {
        const notes = [523, 659, 784, 1047];
        notes.forEach((freq, i) => {
          const osc = audioContext.createOscillator();
          const gain = audioContext.createGain();
          osc.connect(gain);
          gain.connect(audioContext.destination);
          osc.frequency.value = freq;
          const startTime = audioContext.currentTime + i * 0.2;
          gain.gain.setValueAtTime(0.3, startTime);
          gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);
          osc.start(startTime);
          osc.stop(startTime + 0.3);
        });
        
        // 语音播报
        setTimeout(() => {
          try {
            const utterance = new SpeechSynthesisUtterance('你赢啦！太棒了！');
            utterance.lang = 'zh-CN';
            utterance.rate = 0.8;
            utterance.pitch = 1.5;
            utterance.volume = 1;
            window.speechSynthesis.speak(utterance);
          } catch (e) {
            console.log('语音失败');
          }
        }, 500);
      }
    } catch (e) {
      console.error('音效失败:', e);
    }
  };

  // 开始游戏
  const startGame = () => {
    // 播放测试音解锁音频
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.frequency.value = 500;
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
      console.log('音频初始化失败');
    }
    
    setGameStarted(true);
  };

  // AI 走棋
  const makeAIMove = () => {
    try {
      const moves = game.moves({ verbose: true });
      
      if (moves.length === 0) {
        setIsPlayerTurn(true);
        return;
      }

      // 只选择不吃子的走法
      const nonCaptureMoves = moves.filter((m: any) => !m.captured);
      
      if (nonCaptureMoves.length === 0) {
        setIsPlayerTurn(true);
        return;
      }
      
      const randomMove = nonCaptureMoves[Math.floor(Math.random() * nonCaptureMoves.length)];
      
      const newGame = new Chess(game.fen());
      newGame.move(randomMove);
      setGame(newGame);
      setIsPlayerTurn(true);
      playSound('move');
      
      // 检查白棋是否被将军
      if (newGame.in_check() && newGame.turn() === 'w') {
        setIsWhiteInCheck(true);
        setTimeout(() => setIsWhiteInCheck(false), 3000);
      }
    } catch (e) {
      console.error('AI 走棋错误:', e);
      setIsPlayerTurn(true);
    }
  };

  // 玩家走棋
  function onDrop(sourceSquare: string, targetSquare: string): boolean {
    if (!gameStarted) {
      return false;
    }

    if (!isPlayerTurn) {
      setErrorMessage('等一下哦，还没轮到你呢！');
      setTimeout(() => setErrorMessage(''), 2000);
      return false;
    }

    try {
      const piece = game.get(sourceSquare);
      if (!piece || piece.color !== 'w') {
        setErrorMessage('只能移动白色的棋子哦！');
        setTimeout(() => setErrorMessage(''), 2000);
        return false;
      }

      const newGame = new Chess(game.fen());
      const move = newGame.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
      });

      if (!move) {
        setErrorMessage('这样走不行哦，换一个试试！');
        setTimeout(() => setErrorMessage(''), 2000);
        return false;
      }

      setGame(newGame);
      setIsPlayerTurn(false);

      // 检查是否吃子
      if (move.captured) {
        setCaptureSquare(targetSquare);
        setCelebration('capture');
        playSound('capture');
        
        if (fireworksRef.current && !fireworksInstance.current) {
          fireworksInstance.current = new Fireworks(fireworksRef.current, {
            autoresize: true,
            opacity: 0.6,
            particles: 60,
            explosion: 4,
            intensity: 15,
          });
          fireworksInstance.current.start();
        }
        
        setTimeout(() => {
          setCelebration(null);
          setCaptureSquare(null);
          if (fireworksInstance.current) {
            fireworksInstance.current.stop();
            fireworksInstance.current = null;
          }
        }, 2000);
      } else {
        playSound('move');
      }

      // 检查黑棋状态
      const blackInCheck = newGame.in_check() && newGame.turn() === 'b';
      const blackMoves = newGame.moves();
      
      if (blackInCheck && blackMoves.length === 0) {
        // 将死！白棋获胜
        setCelebration('checkmate');
        playSound('win');
        
        if (fireworksRef.current && !fireworksInstance.current) {
          fireworksInstance.current = new Fireworks(fireworksRef.current, {
            autoresize: true,
            opacity: 0.7,
            particles: 150,
            explosion: 8,
            intensity: 50,
          });
          fireworksInstance.current.start();
        }
        
        setTimeout(() => {
          setCelebration(null);
          if (fireworksInstance.current) {
            fireworksInstance.current.stop();
            fireworksInstance.current = null;
          }
        }, 10000);
        
        return true;
      } else if (blackInCheck) {
        // 只是将军
        setCelebration('check');
        playSound('check');
        setTimeout(() => setCelebration(null), 1500);
      }

      // AI 走棋
      if (!newGame.game_over()) {
        setTimeout(() => makeAIMove(), 1000);
      }

      return true;
    } catch (error) {
      console.error('走棋错误:', error);
      setErrorMessage('这样走不行哦！');
      setTimeout(() => setErrorMessage(''), 2000);
      return false;
    }
  }

  const resetGame = () => {
    setGame(new Chess());
    setCelebration(null);
    setErrorMessage('');
    setIsPlayerTurn(true);
    setCaptureSquare(null);
    setGameStarted(false);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 safe-top safe-bottom flex flex-col">
      {/* 顶部导航栏 - 大按钮 */}
      <div className="flex-shrink-0 px-4 py-3 bg-white/90 backdrop-blur-sm">
        <div className="flex justify-between items-center gap-3">
          <Link href="/" className="bg-gray-200 active:bg-gray-300 text-gray-700 font-bold py-3 px-5 rounded-2xl text-lg touch-manipulation shadow-lg">
            🏠 回家
          </Link>
          <button
            onClick={resetGame}
            className="bg-orange-400 active:bg-orange-500 text-white font-bold py-3 px-5 rounded-2xl text-lg transition-colors touch-manipulation shadow-lg"
          >
            🔄 重新玩
          </button>
        </div>
      </div>

      {/* 游戏主区域 */}
      <div className="flex-1 flex flex-col justify-center items-center overflow-hidden px-3 py-2">
        {/* 开始游戏遮罩 */}
        {!gameStarted && (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/80 to-pink-500/80 backdrop-blur-md z-50 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-3xl p-10 shadow-2xl text-center max-w-sm mx-4"
            >
              <div className="text-8xl mb-6 animate-bounce">♔</div>
              <h2 className="text-3xl font-black text-gray-800 mb-4">准备好了吗？</h2>
              <p className="text-gray-600 mb-8 text-xl">点击大按钮开始玩！</p>
              <button
                onClick={startGame}
                className="w-full bg-gradient-to-r from-green-400 to-blue-500 active:from-green-500 active:to-blue-600 text-white text-2xl font-black py-6 px-8 rounded-2xl shadow-2xl transition-all touch-manipulation transform active:scale-95"
              >
                🎮 开始玩！
              </button>
            </motion.div>
          </div>
        )}

        {/* AI 信息 */}
        <div className="w-full max-w-[600px] mb-3">
          <div className="flex items-center gap-3 bg-blue-100 rounded-2xl p-3 shadow-lg">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
              🤖
            </div>
            <div className="flex-1">
              <div className="font-black text-gray-800 text-base">机器人朋友</div>
              <div className="text-sm text-gray-600">我不会吃你的棋子哦</div>
            </div>
          </div>
        </div>

        {/* 消息提示 */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="w-full max-w-[600px] mb-3 bg-red-200 border-4 border-red-400 text-red-800 px-4 py-3 rounded-2xl text-center font-bold shadow-lg text-base"
            >
              {errorMessage}
            </motion.div>
          )}
          
          {isWhiteInCheck && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="w-full max-w-[600px] mb-3 bg-yellow-200 border-4 border-yellow-400 text-yellow-900 px-4 py-3 rounded-2xl text-center font-black shadow-lg text-base"
            >
              ⚠️ 小心！你的国王有危险！⚠️
            </motion.div>
          )}
        </AnimatePresence>

        {/* 棋盘 */}
        <div ref={boardContainerRef} className="w-full flex justify-center items-center mb-3">
          <div className="relative shadow-2xl rounded-xl" style={{ width: boardWidth, height: boardWidth }}>
            <Chessboard
              position={game.fen()}
              onPieceDrop={onDrop}
              boardWidth={boardWidth}
              lightSquareStyle={{ backgroundColor: '#f0d9b5' }}
              darkSquareStyle={{ backgroundColor: '#b58863' }}
              customBoardStyle={{
                borderRadius: '12px',
              }}
            />
          </div>
        </div>

        {/* 玩家信息 */}
        <div className="w-full max-w-[600px]">
          <div className="flex items-center gap-3 bg-green-100 rounded-2xl p-3 shadow-lg">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
              👦
            </div>
            <div className="flex-1">
              <div className="font-black text-gray-800 text-base">你</div>
              <div className="text-sm text-gray-600">
                {isPlayerTurn ? '轮到你啦！' : '等一下...'}
              </div>
            </div>
          </div>
        </div>

        {/* 游戏结束提示 */}
        {game.game_over() && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center"
          >
            <div className="bg-white rounded-3xl p-10 shadow-2xl text-center max-w-sm mx-4">
              <div className="text-8xl mb-6 animate-bounce">🎉</div>
              <div className="text-4xl font-black text-gray-800 mb-6">
                你赢啦！
              </div>
              <button
                onClick={resetGame}
                className="w-full bg-gradient-to-r from-green-400 to-blue-500 active:from-green-500 active:to-blue-600 text-white text-2xl font-black py-6 px-8 rounded-2xl shadow-2xl transition-all touch-manipulation transform active:scale-95"
              >
                🔄 再玩一次！
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* 烟花容器 */}
      <div 
        ref={fireworksRef} 
        className="fixed inset-0 pointer-events-none z-30"
        style={{ display: (celebration === 'capture' || celebration === 'checkmate') ? 'block' : 'none' }}
      />

      {/* 特效层 */}
      <AnimatePresence>
        {celebration === 'capture' && captureSquare && (() => {
          const squareElement = document.querySelector(`[data-square="${captureSquare}"]`);
          if (!squareElement) return null;
          const rect = squareElement.getBoundingClientRect();
          const left = rect.left + rect.width / 2;
          const top = rect.top + rect.height / 2;
          
          return (
            <div key="capture-effects" className="fixed inset-0 pointer-events-none z-40">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ 
                  opacity: [0, 1, 1, 0],
                  scale: [0.5, 2, 1.8, 2.5],
                  rotate: [0, 360]
                }}
                transition={{ duration: 2 }}
                style={{ 
                  left: `${left}px`, 
                  top: `${top}px`, 
                  transform: 'translate(-50%, -50%)' 
                }}
                className="fixed text-[120px] drop-shadow-2xl"
              >
                🎉
              </motion.div>
            </div>
          );
        })()}

        {celebration === 'check' && (() => {
          const boardElement = document.querySelector('[data-square]')?.parentElement?.parentElement;
          if (!boardElement) return null;
          const rect = boardElement.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          return (
            <div key="check-effects" className="fixed inset-0 pointer-events-none z-40">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.4, 0, 0.4, 0] }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 bg-yellow-300"
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ 
                  opacity: 1, 
                  scale: [0.5, 1.3, 1.1],
                  rotate: [0, -10, 10, 0]
                }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.8 }}
                style={{ 
                  left: `${centerX}px`, 
                  top: `${centerY}px`, 
                  transform: 'translate(-50%, -50%)' 
                }}
                className="fixed bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 text-white font-black px-8 py-6 rounded-3xl shadow-2xl border-8 border-yellow-100 text-4xl"
              >
                ⚡ 将军！⚡
              </motion.div>
            </div>
          );
        })()}

        {celebration === 'checkmate' && (
          <div key="victory-effects" className="fixed inset-0 z-40 pointer-events-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-br from-purple-600/70 via-pink-600/70 to-orange-600/70"
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
