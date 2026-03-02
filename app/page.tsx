'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="text-8xl mb-6"
          >
            ♔
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            国际象棋小导师
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            从零开始，用温暖的语音和鼓励<br />
            帮你爱上国际象棋 🎉
          </p>

          <div className="space-y-4">
            <Link href="/lessons/1">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-primary text-white text-xl font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                开始学习 →
              </motion.button>
            </Link>

            <p className="text-sm text-gray-500">
              完全免费 · 无需注册 · 随时开始
            </p>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">30+</div>
              <div className="text-sm text-gray-600">精心设计的课程</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary">🎙️</div>
              <div className="text-sm text-gray-600">语音引导</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-success">🎉</div>
              <div className="text-sm text-gray-600">持续鼓励</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
