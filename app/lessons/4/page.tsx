'use client';

import { useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Lesson4() {
  const [step, setStep] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [game, setGame] = useState(new Chess());
  const [moveFrom, setMoveFrom] = useState('');
  const [rightSquareStyles, setRightSquareStyles] = useState({});
  const [optionSquares, setOptionSquares] = useState({});

  const steps = [
    {
      title: "学习车的走法",
      content: "车是国际象棋中非常强大的棋子！它的走法简单但威力巨大。让我们一起来学习吧！",
      speech: "车是国际象棋中非常强大的棋子！它的走法简单但威力巨大。让我们一起来学习吧！",
      position: "8/8/8/8/3R4/8/8/8 w - - 0 1",
      interactive: false,
    },
    {
      title: "车可以横着走",
      content: "车可以沿着横线（行）移动任意格数，只要路上没有其他棋子挡住。",
      speech: "车可以沿着横线移动任意格数，只要路上没有其他棋子挡住。",
      position: "8/8/8/8/3R4/8/8/8 w - - 0 1",
      interactive: false,
      highlight: ['d4', 'a4', 'b4', 'c4', 'e4', 'f4', 'g4', 'h4'],
    },
    {
      title: "车可以竖着走",
      content: "车也可以沿着竖线（列）移动任意格数。横着竖着都可以，但不能斜着走！",
      speech: "车也可以沿着竖线移动任意格数。横着竖着都可以，但不能斜着走！",
      position: "8/8/8/8/3R4/8/8/8 w - - 0 1",
      interactive: false,
      highlight: ['d4', 'd1', 'd2', 'd3', 'd5', 'd6', 'd7', 'd8'],
    },
    {
      title: "试试看：移动车",
      content: "现在轮到你了！试着把白色的车移动到任意位置。记住，只能横着或竖着走哦！",
      speech: "现在轮到你了！试着把白色的车移动到任意位置。记住，只能横着或竖着走哦！",
      position: "8/8/8/8/3R4/8/8/8 w - - 0 1",
      interactive: true,
    },
    {
      title: "车可以吃子",
      content: "当车的移动路径上有对方的棋子时，车可以吃掉它。看，白车可以吃掉这些黑兵。",
      speech: "当车的移动路径上有对方的棋子时，车可以吃掉它。看，白车可以吃掉这些黑兵。",
      position: "8/8/8/3p4/pppRpppp/3p4/8/8 w - - 0 1",
      interactive: false,
      highlight: ['d4', 'a4', 'd1', 'd7'],
    },
    {
      title: "试试看：吃子",
      content: "试着用白车吃掉一个黑兵！选择任意一个你想吃的黑兵。",
      speech: "试着用白车吃掉一个黑兵！选择任意一个你想吃的黑兵。",
      position: "8/8/8/3p4/pppRpppp/3p4/8/8 w - - 0 1",
      interactive: true,
    },
    {
      title: "车不能跳过棋子",
      content: "重要提示：车不能跳过其他棋子！如果路上有棋子挡住，车就不能继续往前走了。",
      speech: "重要提示：车不能跳过其他棋子！如果路上有棋子挡住，车就不能继续往前走了。",
      position: "8/8/8/8/2pRp3/8/8/8 w - - 0 1",
      interactive: false,
      highlight: ['d4', 'd5', 'd6', 'd7', 'd8'],
    },
    {
      title: "车的价值",
      content: "在国际象棋中，车的价值约等于 5 个兵。它是除了后之外最强大的棋子！",
      speech: "在国际象棋中，车的价值约等于 5 个兵。它是除了后之外最强大的棋子！",
      position: "r6r/8/8/8/8/8/8/R6R w - - 0 1",
      interactive: false,
    },
    {
      title: "恭喜你！",
      content: "你已经掌握了车的走法！车是实战中非常重要的棋子。下一课我们会学习马的走法。",
      speech: "你已经掌握了车的走法！车是实战中非常重要的棋子。下一课我们会学习马的走法。",
      position: "r6r/pppppppp/8/8/8/8/PPPPPPPP/R6R w - - 0 1",
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* 顶部导航 */}
        <div className="mb-6 flex justify-between items-center">
          <Link href="/" className="text-gray-600 hover:text-gray-800">
            ← 返回首页
          </Link>
          <div className="text-sm text-gray-600">
            第 4 课 / 共 30 课
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
                className="mt-4 text-center text-sm text-orange-600 font-semibold"
              >
                💡 点击车，然后点击目标位置
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
                    className="bg-orange-500 h-2 rounded-full"
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
                    className="flex-1 py-3 px-6 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-all shadow-lg"
                  >
                    下一步 →
                  </button>
                ) : (
                  <Link href="/lessons/5" className="flex-1">
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
              className="mt-4 text-sm text-orange-600 hover:text-orange-700 transition-colors"
            >
              🔊 重新播放语音
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
