'use client';

import { useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Lesson2() {
  const [step, setStep] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [game] = useState(new Chess());

  const steps = [
    {
      title: "认识国际象棋的棋子",
      content: "国际象棋有 6 种不同的棋子，每种都有自己的特点。让我们一起来认识它们！",
      speech: "国际象棋有 6 种不同的棋子，每种都有自己的特点。让我们一起来认识它们！",
      position: "start",
    },
    {
      title: "王 (King) ♔",
      content: "王是最重要的棋子！如果你的王被将死，游戏就输了。王可以向任意方向移动一格。",
      speech: "王是最重要的棋子！如果你的王被将死，游戏就输了。王可以向任意方向移动一格。",
      position: "8/8/8/8/3K4/8/8/8 w - - 0 1",
      highlight: ['d4'],
    },
    {
      title: "后 (Queen) ♕",
      content: "后是最强大的棋子！她可以横着、竖着、斜着走任意格数。就像车和象的结合体。",
      speech: "后是最强大的棋子！她可以横着、竖着、斜着走任意格数。就像车和象的结合体。",
      position: "8/8/8/8/3Q4/8/8/8 w - - 0 1",
      highlight: ['d4'],
    },
    {
      title: "车 (Rook) ♖",
      content: "车可以横着或竖着走任意格数，但不能斜着走。每方有两个车，通常在棋盘的角落。",
      speech: "车可以横着或竖着走任意格数，但不能斜着走。每方有两个车，通常在棋盘的角落。",
      position: "8/8/8/8/3R4/8/8/8 w - - 0 1",
      highlight: ['d4'],
    },
    {
      title: "象 (Bishop) ♗",
      content: "象只能斜着走，可以走任意格数。每方有两个象，一个走白格，一个走黑格。",
      speech: "象只能斜着走，可以走任意格数。每方有两个象，一个走白格，一个走黑格。",
      position: "8/8/8/8/3B4/8/8/8 w - - 0 1",
      highlight: ['d4'],
    },
    {
      title: "马 (Knight) ♘",
      content: "马的走法很特别！它走'日'字形，可以跳过其他棋子。每方有两个马。",
      speech: "马的走法很特别！它走日字形，可以跳过其他棋子。每方有两个马。",
      position: "8/8/8/8/3N4/8/8/8 w - - 0 1",
      highlight: ['d4'],
    },
    {
      title: "兵 (Pawn) ♙",
      content: "兵是数量最多的棋子，每方有 8 个。兵只能向前走，但吃子时要斜着走。",
      speech: "兵是数量最多的棋子，每方有 8 个。兵只能向前走，但吃子时要斜着走。",
      position: "8/8/8/8/3P4/8/8/8 w - - 0 1",
      highlight: ['d4'],
    },
    {
      title: "完整的棋局",
      content: "现在你认识所有棋子了！这就是一局国际象棋开始时的样子。每种棋子都有自己的位置。",
      speech: "现在你认识所有棋子了！这就是一局国际象棋开始时的样子。每种棋子都有自己的位置。",
      position: "start",
    },
    {
      title: "太棒了！",
      content: "你已经认识了所有的棋子！下一课我们会学习兵的详细走法。继续加油！",
      speech: "太棒了！你已经认识了所有的棋子！下一课我们会学习兵的详细走法。继续加油！",
      position: "start",
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
    speak(steps[step].speech);
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [step]);

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

  const currentPosition = steps[step].position;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* 顶部导航 */}
        <div className="mb-6 flex justify-between items-center">
          <Link href="/" className="text-gray-600 hover:text-gray-800">
            ← 返回首页
          </Link>
          <div className="text-sm text-gray-600">
            第 2 课 / 共 30 课
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
                position={currentPosition}
              />
            </div>
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
                    className="bg-purple-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </div>

            {/* 按钮区 */}
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
                  className="flex-1 py-3 px-6 rounded-xl bg-purple-500 text-white font-semibold hover:bg-purple-600 transition-all shadow-lg"
                >
                  下一步 →
                </button>
              ) : (
                <Link href="/lessons/3" className="flex-1">
                  <button className="w-full py-3 px-6 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 transition-all shadow-lg">
                    完成本课 🎉
                  </button>
                </Link>
              )}
            </div>

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
              className="mt-4 text-sm text-purple-600 hover:text-purple-700 transition-colors"
            >
              🔊 重新播放语音
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
