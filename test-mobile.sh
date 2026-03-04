#!/bin/bash

# 移动端测试脚本

echo "🚀 启动国际象棋小导师开发服务器..."
echo ""

# 获取本机 IP
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    LOCAL_IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -1)
else
    # Linux
    LOCAL_IP=$(hostname -I | awk '{print $1}')
fi

echo "📱 移动端测试地址："
echo "   http://$LOCAL_IP:3000"
echo ""
echo "💡 提示："
echo "   1. 确保手机和电脑在同一 WiFi"
echo "   2. 在手机浏览器输入上面的地址"
echo "   3. iOS: Safari → 分享 → 添加到主屏幕"
echo "   4. Android: Chrome → 菜单 → 添加到主屏幕"
echo ""
echo "🔧 开发工具："
echo "   - iOS 调试: Safari → 开发 → 你的设备"
echo "   - Android 调试: Chrome → chrome://inspect"
echo ""
echo "按 Ctrl+C 停止服务器"
echo ""

# 启动开发服务器
npm run dev -- -H 0.0.0.0
