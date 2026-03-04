# 国际象棋小导师 ♔

一个友好、耐心的国际象棋教学应用，用语音和鼓励帮你爱上国际象棋。

## ✨ 特点

- 🎙️ **语音引导** — 每一步都有温暖的语音讲解
- 🎯 **渐进式学习** — 从认识棋子开始，循序渐进
- 🎉 **持续鼓励** — 大量正反馈，让学习充满乐趣
- 🎨 **简洁清爽** — 界面干净，专注学习
- 📱 **移动端优化** — 完美支持手机和平板，触摸操作流畅
- 🌐 **PWA 支持** — 可添加到主屏幕，像原生 App 一样使用
- 🔄 **响应式设计** — 自动适配各种屏幕尺寸和方向

## 🚀 在线体验

**方式一：一键部署到 Vercel（推荐）**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/cactushkcompany-sys/chess-tutor)

点击上面的按钮，Vercel 会自动：
1. Fork 这个仓库到你的 GitHub
2. 创建 Vercel 项目
3. 自动部署
4. 生成在线访问地址

**方式二：手动部署**

1. 访问 [Vercel](https://vercel.com/new)
2. 导入这个 GitHub 仓库
3. 点击 Deploy
4. 等待 2-3 分钟即可

## 💻 本地运行

```bash
# 克隆仓库
git clone https://github.com/cactushkcompany-sys/chess-tutor.git
cd chess-tutor

# 安装依赖
npm install --legacy-peer-deps

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

### 📱 移动端测试

**在手机上测试：**
1. 确保手机和电脑在同一 WiFi
2. 启动开发服务器后，访问 `http://你的电脑IP:3000`
3. 或使用 `npm run dev -- -H 0.0.0.0` 允许局域网访问

**添加到主屏幕（PWA）：**
- **iOS**: Safari 浏览器 → 分享 → 添加到主屏幕
- **Android**: Chrome 浏览器 → 菜单 → 添加到主屏幕

## 📚 课程内容

### 第一阶段：认识棋盘和棋子
- ✅ 第 1 课：认识棋盘
- ✅ 第 2 课：认识棋子
- ✅ 第 3 课：兵的移动（含互动练习）
- ✅ 第 4 课：车的移动（含互动练习）
- ✅ 第 5 课：马的移动（含互动练习）
- 🚧 第 6 课：象的移动
- 🚧 第 7 课：后的移动
- 🚧 第 8 课：王的移动
- ... 更多课程开发中

## 🛠️ 技术栈

- **框架**: Next.js 16 + React 19
- **样式**: Tailwind CSS
- **棋盘**: react-chessboard + chess.js
- **动画**: Framer Motion
- **语音**: Web Speech API
- **部署**: Vercel

## 📝 开发计划

- [ ] 完成 30+ 课程内容
- [ ] 集成 Stockfish AI 对手
- [ ] 添加练习关卡
- [ ] 成就系统
- [ ] 每日一题
- [ ] 用户进度云同步
- [ ] 多语言支持

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 License

MIT

---

Made with ❤️ for chess beginners
