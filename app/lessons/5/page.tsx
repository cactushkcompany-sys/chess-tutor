'use client';

import { useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Lesson5() {
  const [step, setStep] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [game, setGame] = useState(new Chess());
  const [moveFrom, setMoveFrom] = useState('');
  const [rightSquareStyles, setRightSquareStyles] = useState({});
  const [optionSquares, setOptionSquares] = useState({});

  const steps = [
    {
      title: "学习马的走法",
      content: "马是国际象棋中最特别的棋子！它的走法独一无二，让我们一起来学习这个有趣的棋子。",
      speech: "马是国际象棋中最特别的棋子！它的走法独一无二，让我们一起来学习这个有趣的棋子。",
      position: "8/8/8/8/3N4/8/8/8 w - - 0 1",
      interactive: false,
    },
    {
      title: "马走'日'字形",
      content: "马的走法很特别：它走'日'字形（或者说'L'形）。先走两格，再转 90 度走一格。",
      speech: "马的走法很特别：它走日字形。先走两格，再转 90 度走一格。",
      position: "8/8/8/8/3N4/8/8/8 w - - 0 1",
      interactive: false,
      highlight: ['d4', 'c6', 'e6', 'f5', 'f3', 'e2', 'c2', 'b3', 'b5'],
    },
    {
      title: "马可以跳过棋子",
      content: "马最特别的地方：它可以跳过其他棋子！即使周围都是棋子，马也能跳出去。",
      speech: "马最特别的地方：它可以跳过其他棋子！即使周围都是棋子，马也能跳出去。",
      position: "8/8/8/8/2pNp3/3p4/8/8 w - - 0 1",
      interactive: false,
      highlight: ['d4', 'c6', 'e6', 'f5', 'f3', 'e2', 'c2', 'b3', 'b5'],
    },
    {
      title: "试试看：移动马",
      content: "现在轮到你了！试着把白马移动到任意位置。记住，要走'日'字形哦！",
      speech: "现在轮到你了！试着把白马移动到任意位置。记住，要走日字形哦！",
      position: "8/8/8/8/3N4/8/8/8 w - - 0 1",
      interactive: true,
    },
    {
      title: "马可以吃子",
      content: "当马跳到的位置有对方的棋子时，马可以吃掉它。看，白马可以吃掉这些黑兵。",
      speech: "当马跳到的位置有对方的棋子时，马可以吃掉它。看，白马可以吃掉这些黑兵。",
      position: "8/8/2p1p3/8/3N4/8/2p1p3/8 w - - 0 1",
      interactive: false,
      highlight: ['d4', 'c6', 'e6', 'c2', 'e2'],
    },
    {
      title: "试试看：吃子",
      content: "试着用白马吃掉一个黑兵！选择任意一个你想吃的黑兵。",
      speech: "试着用白马吃掉一个黑兵！选择任意一个你想吃的黑兵。",
      position: "8/8/2p1p3/8/3N4/8/2p1p3/8 w - - 0 1",
      interactive: true,
    },
    {
      title: "马在中心更强",
      content: "马在棋盘中心时最强大，因为它可以控制 8 个格子。在角落时只能控制 2 个格子。",
      speech: "马在棋盘中心时最强大，因为它可以控制 8 个格子。在角落时只能控制 2 个格子。",
      position: "N7/8/8/8/3N4/8/8/8 w - - 0 1",
      interactive: false,
    },
    {
      title: "马的价值",
      content: "在国际象棋中，马的价值约等于 3 个兵，和象的价值相当。",
      speech: "在国际象棋中，马的价值约等于 3 个兵，和象的价值相当。",
      position: "n6n/8/8/8/8/8/8/N6N w - - 0 1",
      interactive: false,
    },
    {
      title: "恭喜你！",
      content: "你已经掌握了马的走法！马是最有趣的棋子之一。下一课我们会学习象的走法。",
      speech: "你已经掌握了马的走法！马是最有趣的棋子之一。下一课我们会学习象的走法。",
      position: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1",
      interactive: false,
    },
  ];

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    const newGame = new Chess(steps[step].position);
    setGame(newGame);
    speak(steps[step].speech);
    setMoveFrom('');
    setRightSquareStyles({});
    setOptionSquares({});

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [step]);

  const getMoveOptions = (square: string) => {
    const moves = game.moves({ verbose: true });
    const squareMoves = moves.filter((m: any) => m.from === square);
    
    if (squareMoves.length === 0) {
      return false;
    }

    const newSquares: any = {};
    squareMoves.forEach((move: any) => {
      newSquares[move.to] = {
        background:
          game.get(move.to) && game.get(move.to).color !== game.get(square).color
            ? 'radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)'
            : 'radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)',
        borderRadius: '50%',
      };
    });
    newSquares[square] = {
      background: 'rgba(255, 255, 0, 0.4)',
    };
    setOptionSquares(newSquares);
    return true;
  };

  function onSquareClick(square: string, piece: any) {
    if (!steps[step].interactive) return;

    if (!moveFrom) {
      const hasMoveOptions = getMoveOptions(square);
      if (hasMoveOptions) setMoveFrom(square);
      return;
    }

    const moves = game.moves({ verbose: true });
    const squareMoves = moves.filter((m: any) => m.from === moveFrom);
    const foundMove = squareMoves.find((m: any) => m.from === moveFrom && m.to === square);

    if (!foundMove) {
      const hasMoveOptions = getMoveOptions(square);
      setMoveFrom(hasMoveOptions ? square : '');
      return;
    }

    const gameCopy = new Chess(game.fen());
    const move = gameCopy.move({
      from: moveFrom,
      to: square,
      promotion: 'q',
    });

    if (move) {
      setGame(gameCopy);
      setMoveFrom('');
      setOptionSquares({});
      setRightSquareStyles({
        [moveFrom]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' },
        [square]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' },
      });
      speak('太棒了！做得很好！');
      setTimeout(() => {
        if (step < steps.length - 1) {
          setStep(step + 1);
        }
      }, 2000);
    }
  }

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const getHighlightStyles = () => {
    if (!steps[step].highlight) return {};
    const styles: any = {};
    steps[step].highlight!.forEach((square: string) => {
      styles[square] = { backgroundColor: 'rgba(255, 255, 0, 0.4)' };
    });
    return styles;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* 顶部导航 */}
        <div className="mb-6 flex justify-between items-center">
          <Link href="/" className="text-gray-600 hover:text-gray-800">
            ← 返回首页
          </Link>
          <div className="text-sm text-gray-600">
            第 5 课 / 共 30 课
          </div>
        </div>

        {/* 主内容区 */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* 左侧：棋盘 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-xl p-6"
          >
            <div className="w-full max-w-[500px] mx-auto">
              <Chessboard
                position={game.fen()}
                {...({ onSquareClick } as any)}
                customSquareStyles={{
                  ...getHighlightStyles(),
                  ...optionSquares,
                  ...rightSquareStyles,
                }}
                arePiecesDraggable={false}
              />
            </div>
            {steps[step].interactive && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-center text-sm text-teal-600 font-semibold"
              >
                💡 点击马，然后点击目标位置
              </motion.div>
            )}
          </motion.div>

          {/* 右侧：说明 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8 flex flex-col"
          >
            <div className="flex-1">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  {steps[step].title}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {steps[step].content}
                </p>
              </motion.div>

              {/* 进度条 */}
              <div className="mt-8">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>进度</span>
                  <span>{step + 1} / {steps.length}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-teal-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </div>

            {/* 按钮区 */}
            {!steps[step].interactive && (
              <div className="mt-8 flex gap-4">
                <button
                  onClick={prevStep}
                  disabled={step === 0}
                  className="flex-1 py-3 px-6 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-all"
                >
                  上一步
                </button>

                {step < steps.length - 1 ? (
                  <button
                    onClick={nextStep}
                    className="flex-1 py-3 px-6 rounded-xl bg-teal-500 text-white font-semibold hover:bg-teal-600 transition-all shadow-lg"
                  >
                    下一步 →
                  </button>
                ) : (
                  <Link href="/" className="flex-1">
                    <button className="w-full py-3 px-6 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 transition-all shadow-lg">
                      完成本课 🎉
                    </button>
                  </Link>
                )}
              </div>
            )}

            {/* 语音提示 */}
            {isSpeaking && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-center text-sm text-gray-500"
              >
                🎙️ 正在播放语音...
              </motion.div>
            )}

            {/* 重新播放按钮 */}
            <button
              onClick={() => speak(steps[step].speech)}
              className="mt-4 text-sm text-teal-600 hover:text-teal-700 transition-colors"
            >
              🔊 重新播放语音
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
