# ⚡ AI Code Showdown: 2026 生产力大盘

> **2026 年最硬核的 AI 编程工具动态评价指标系统。** 拒绝主观评测，完全基于 GitHub 活跃数据、Reddit 开发者口碑及五维功能矩阵，实时捕捉 AI 编程界的权力更迭。

---

## 🚀 在线预览

---

## ✨ 项目特色

* ​**📊 五维深度评估**​：独创蜘蛛雷达图（Radar Chart）与条形图（Bar Chart）实时切换，全方位衡量工具的：
  * 核心智力与代码质量
  * 工作流与响应速度
  * 成本与收费模式
  * 仓库理解与上下文深度
  * 协同机制与安全性
* ​**🌌 赛博霓虹 UI**​：基于 **Tailwind CSS** 构建的深色 Bento Grid 布局，排行数字附带高亮霓虹发光效果。
* ​**🤖 自动化数据工厂**​：通过 **GitHub Actions** 每日自动运行 Node.js 爬虫，抓取全网最新数据并自动重新部署。
* ​**⚡ 响应式设计**​：完美适配 Mac/Windows 桌面端及移动端浏览器。

---

## ⚖️ 核心打分算法

系统采用加权归一化算法计算最终综合指数（Index Score）：

$$
Score = (S_{gh} \times 0.4) + (S_{rd} \times 0.4) + (S_{feat} \times 0.2)
$$

> **其中：**
> 
> * \$S\_{gh}\$：GitHub Stars 增长斜率与活跃度归一分
> * \$S\_{rd}\$：Reddit 近 7 日开发者情绪好评率
> * \$S\_{feat}\$：五维功能评估矩阵平均分

---

## 🛠️ 技术栈

* ​**核心框架**​: [React 18](https://reactjs.org/)
* ​**构建工具**​: [Vite](https://vitejs.dev/)
* ​**样式处理**​: [Tailwind CSS](https://tailwindcss.com/)
* ​**部署方案**​: [GitHub Pages](https://pages.github.com/) (Deploy from `/docs`)
* ​**自动化**​: [GitHub Actions](https://github.com/features/actions)

---

## 📦 本地开发指南

如果你想在本地运行或修改本项目：

1. **克隆仓库**
2. **安装依赖**
3. **启动开发预览**
4. **构建发布版本**

---

## 📂 目录结构说明

Plaintext

```
AI-Code-Showdown/
├── .github/workflows/   # GitHub Actions 自动化指令
├── docs/                # 编译后的静态产物（部署于 GitHub Pages）
├── scripts/             # 自动抓取数据的爬虫脚本 (update-data.js)
├── src/
│   ├── data/            # 存储 AI 工具核心 JSON 数据
│   ├── App.jsx          # 核心视图组件（含五维图表逻辑）
│   └── main.jsx         # 项目入口
├── vite.config.js       # Vite 配置文件（含 base 路径设置）
└── package.json         # 项目依赖与脚本配置
```

---

## 🛡️ 部署注意事项 (For Mac Users)

* ​**隐藏文件显示**​：在 Finder 中按 `Command + Shift + .` 可显示/隐藏 `.github` 等文件夹。
* ​**路径配置**​：若部署后出现空白页，请检查 `vite.config.js` 中的 `base` 路径是否匹配仓库名。
* ​**手动发布**​：修改 `src` 代码后，需运行 `npm run build`，并将 `docs/` 文件夹内容上传至 GitHub。

---

## 🤝 贡献建议

如果你发现 2026 年出现了新的黑马工具，欢迎提交 **Pull Request** 或在 **Issues** 中反馈真实的用户评价关键词！

---

**© 2026 AI Code Showdown Project.**

*Built with logic, neon, and high-performance AI agents.*

