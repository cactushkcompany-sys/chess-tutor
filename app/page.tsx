'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4 safe-top safe-bottom">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-6 sm:p-8"
      >
        <div className="text-center">
          {/* 棋子图标 */}
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="text-6xl sm:text-7xl mb-4 sm:mb-6"
          >
            ♔♕
          </motion.div>
          
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-3">
            国际象棋乐园
          </h1>
          
          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
            和友好的机器人一起下棋吧！
          </p>

          <div className="space-y-4">
            <Link href="/play">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white text-lg sm:text-xl font-semibold py-4 sm:py-5 px-8 rounded-xl shadow-lg transition-colors touch-manipulation"
              >
                开始游戏 🎮
              </motion.button>
            </Link>

            <Link href="/lessons/1">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white text-lg sm:text-xl font-semibold py-4 sm:py-5 px-8 rounded-xl shadow-lg transition-colors touch-manipulation"
              >
                学习课程 📚
              </motion.button>
            </Link>
          </div>

          <div className="mt-6 sm:mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">已完成课程</h3>
            <div className="space-y-2">
              <Link href="/lessons/1" className="block">
                <div className="flex items-center justify-between p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                  <span className="text-sm text-gray-700">第 1 课：认识棋盘</span>
                  <span className="text-green-600">✓</span>
                </div>
              </Link>
              <Link href="/lessons/2" className="block">
                <div className="flex items-center justify-between p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                  <span className="text-sm text-gray-700">第 2 课：认识棋子</span>
                  <span className="text-green-600">✓</span>
                </div>
              </Link>
              <Link href="/lessons/3" className="block">
                <div className="flex items-center justify-between p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                  <span className="text-sm text-gray-700">第 3 课：兵的移动</span>
                  <span className="text-green-600">✓</span>
                </div>
              </Link>
              <Link href="/lessons/4" className="block">
                <div className="flex items-center justify-between p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                  <span className="text-sm text-gray-700">第 4 课：车的移动</span>
                  <span className="text-green-600">✓</span>
                </div>
              </Link>
              <Link href="/lessons/5" className="block">
                <div className="flex items-center justify-between p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                  <span className="text-sm text-gray-700">第 5 课：马的移动</span>
                  <span className="text-green-600">✓</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
