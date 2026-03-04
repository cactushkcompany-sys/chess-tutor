'use client';

import { useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Lesson3() {
  const [step, setStep] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [game, setGame] = useState(new Chess());
  const [moveFrom, setMoveFrom] = useState('');
  const [rightSquareStyles, setRightSquareStyles] = useState({});
  const [optionSquares, setOptionSquares] = useState({});

  const steps = [
    {
      title: "学习兵的走法",
      content: "兵是国际象棋中最基础的棋子。虽然它看起来简单，但掌握兵的走法是学习国际象棋的第一步！",
      speech: "兵是国际象棋中最基础的棋子。虽然它看起来简单，但掌握兵的走法是学习国际象棋的第一步！",
      position: "8/8/8/8/8/8/4P3/8 w - - 0 1",
      interactive: false,
    },
    {
      title: "兵向前走一格",
      content: "兵只能向前走，不能后退。通常情况下，兵每次只能向前走一格。",
      speech: "兵只能向前走，不能后退。通常情况下，兵每次只能向前走一格。",
      position: "8/8/8/8/8/8/4P3/8 w - - 0 1",
      interactive: false,
      highlight: ['e2', 'e3'],
    },
    {
      title: "首次移动可以走两格",
      content: "特别的是，如果兵还在起始位置（第2行或第7行），它可以选择向前走一格或两格！",
      speech: "特别的是，如果兵还在起始位置，它可以选择向前走一格或两格！",
      position: "8/8/8/8/8/8/4P3/8 w - - 0 1",
      interactive: false,
      highlight: ['e2', 'e3', 'e4'],
    },
    {
      title: "试试看：移动兵",
      content: "现在轮到你了！试着把白色的兵向前移动。你可以选择走一格或两格。",
      speech: "现在轮到你了！试着把白色的兵向前移动。你可以选择走一格或两格。",
      position: "8/8/8/8/8/8/4P3/8 w - - 0 1",
      interactive: true,
      validMoves: ['e3', 'e4'],
    },
    {
      title: "兵的吃子方式",
      content: "兵吃子的方式很特别：它只能斜着向前吃子，不能直着吃。看，白兵可以吃掉斜前方的黑兵。",
      speech: "兵吃子的方式很特别：它只能斜着向前吃子，不能直着吃。看，白兵可以吃掉斜前方的黑兵。",
      position: "8/8/8/8/3pPp2/8/8/8 w - - 0 1",
      interactive: false,
      highlight: ['e4', 'd4', 'f4'],
    },
    {
      title: "试试看：吃子",
      content: "试着用白兵吃掉一个黑兵！记住，只能斜着吃哦。",
      speech: "试着用白兵吃掉一个黑兵！记住，只能斜着吃哦。",
      position: "8/8/8/8/3pPp2/8/8/8 w - - 0 1",
      interactive: true,
      validMoves: ['d4', 'f4'],
    },
    {
      title: "兵不能后退",
      content: "记住：兵永远不能后退！一旦向前走了，就不能回头。所以要仔细考虑每一步。",
      speech: "记住：兵永远不能后退！一旦向前走了，就不能回头。所以要仔细考虑每一步。",
      position: "8/8/8/4P3/8/8/8/8 w - - 0 1",
      interactive: false,
      highlight: ['e5'],
    },
    {
      title: "兵的升变",
      content: "当兵走到对方的底线（第8行或第1行）时，它可以升变成后、车、象或马！通常我们会选择升变成后。",
      speech: "当兵走到对方的底线时，它可以升变成后、车、象或马！通常我们会选择升变成后。",
      position: "4P3/8/8/8/8/8/8/8 w - - 0 1",
      interactive: false,
      highlight: ['e8'],
    },
    {
      title: "恭喜你！",
      content: "你已经掌握了兵的所有走法！兵虽然简单，但在实战中非常重要。下一课我们会学习车的走法。",
      speech: "你已经掌握了兵的所有走法！兵虽然简单，但在实战中非常重要。下一课我们会学习车的走法。",
      position: "8/8/8/8/8/8/PPPPPPPP/8 w - - 0 1",
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

    const validMoves = steps[step].validMoves || [];
    if (validMoves.length > 0 && !validMoves.includes(square)) {
      speak('这一步不对哦，再试试看！');
      setMoveFrom('');
      setOptionSquares({});
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* 顶部导航 */}
        <div className="mb-6 flex justify-between items-center">
          <Link href="/" className="text-gray-600 hover:text-gray-800">
            ← 返回首页
          </Link>
          <div className="text-sm text-gray-600">
            第 3 课 / 共 30 课
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
                className="mt-4 text-center text-sm text-blue-600 font-semibold"
              >
                💡 点击棋子，然后点击目标位置
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
                    className="bg-blue-500 h-2 rounded-full"
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
                    className="flex-1 py-3 px-6 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all shadow-lg"
                  >
                    下一步 →
                  </button>
                ) : (
                  <Link href="/lessons/4" className="flex-1">
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
              className="mt-4 text-sm text-blue-600 hover:text-blue-700 transition-colors"
            >
              🔊 重新播放语音
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
