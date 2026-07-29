# NEXUS · Inner Orbit

一个仅面向手机宽度的自我探索 Demo。它使用固定的星盘观察内容与本地存储，不包含真实星盘计算、账号系统或后端服务。

## Setup

```bash
npm install
npm run dev
```

访问 `http://localhost:3000`。电脑浏览器会居中显示手机宽度预览。

## Test

```bash
npm run lint
npm run typecheck
npm run build
```

GitHub Actions 会在每次 push 和 Pull Request 上执行相同的检查。

## Deploy

该项目可直接导入 Vercel：选择 GitHub 仓库并使用默认 Next.js 配置部署。部署完成后，使用生成的 HTTPS 地址在 iPhone Safari 上测试。

## Known demo limitations

- 星盘、每日观察与人物内容均为固定 Mock 数据。
- 每日观察按本地日期在 5 条策展内容间稳定轮换。
- 用户资料与反馈仅保存在浏览器 `localStorage`。
- 分享卡通过浏览器生成 PNG；支持 Web Share API 的设备会优先打开系统分享面板。
