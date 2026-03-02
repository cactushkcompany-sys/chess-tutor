'use client';

import { useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Lesson1() {
  const [step, setStep] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const steps = [
    {
      title: "欢迎来到国际象棋的世界！",
      content: "你好！我是你的国际象棋小导师。今天我们要一起认识棋盘。准备好了吗？",
      speech: "你好！我是你的国际象棋小导师。今天我们要一起认识棋盘。准备好了吗？",
    },
    {
      title: "棋盘是 8×8 的格子",
      content: "国际象棋的棋盘有 8 行 8 列，一共 64 个格子。黑白相间，就像这样！",
      speech: "国际象棋的棋盘有 8 行 8 列，一共 64 个格子。黑白相间，就像这样！",
    },
    {
      title: "右下角是白格",
      content: "记住一个小技巧：棋盘摆放时，你的右下角一定是白色格子。这样就不会摆错啦！",
      speech: "记住一个小技巧：棋盘摆放时，你的右下角一定是白色格子。这样就不会摆错啦！",
    },
    {
      title: "太棒了！",
      content: "你已经认识了国际象棋的棋盘！是不是很简单？下一课我们会认识棋子。",
      speech: "太棒了！你已经认识了国际象棋的棋盘！是不是很简单？下一课我们会认识棋子。",
    },
  ];

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* 顶部导航 */}
        <div className="mb-6 flex justify-between items-center">
          <Link href="/" className="text-gray-600 hover:text-gray-800">
            ← 返回首页
          </Link>
          <div className="text-sm text-gray-600">
            第 1 课 / 共 30 课
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
              <Chessboard />
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
                    className="bg-primary h-2 rounded-full"
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
                  className="flex-1 py-3 px-6 rounded-xl bg-primary text-white font-semibold hover:bg-green-600 transition-all shadow-lg"
                >
                  下一步 →
                </button>
              ) : (
                <Link href="/lessons/2" className="flex-1">
                  <button className="w-full py-3 px-6 rounded-xl bg-success text-white font-semibold hover:bg-green-500 transition-all shadow-lg">
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
              className="mt-4 text-sm text-secondary hover:text-blue-700 transition-colors"
            >
              🔊 重新播放语音
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
