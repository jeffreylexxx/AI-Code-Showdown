import React, { useState } from 'react';
import { RAW_TOOLS_DATA } from './data/tools';
import { calculateScores } from './utils/scoring';

export default function App() {
  const calculatedTools = calculateScores(RAW_TOOLS_DATA);
  
  const [tools, setTools] = useState(
    [...calculatedTools].sort((a, b) => b.score - a.score)
  );
  const [sortBy, setSortBy] = useState('score');

  const handleSort = (type) => {
    setSortBy(type);
    const sorted = [...tools].sort((a, b) => {
      if (type === 'score') return b.score - a.score;
      if (type === 'reddit') return b.redditSentiment - a.redditSentiment;
      if (type === 'github') return b.githubStars - a.githubStars;
      return 0;
    });
    setTools(sorted);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black pb-12">
      {/* 炫酷背景光晕 */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* 头部区域 */}
      <header className="max-w-7xl mx-auto px-6 pt-16 pb-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 text-xs font-semibold mb-6 tracking-wider uppercase animate-pulse">
          ⚡ 动态算法打分大盘
        </div>
        <h1 className="text-5xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 pb-2">
          AI CODE SHOWDOWN
        </h1>
        <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-lg">
          结合 <span className="text-cyan-400 font-medium">GitHub 活力指标</span> 与 <span className="text-purple-400 font-medium">Reddit 开发者口碑</span>，通过公开公式计算，公正裁决宇宙最强 AI 编程神器。
        </p>

        {/* 打分公式面板 */}
        <div className="mt-6 max-w-xl mx-auto p-4 rounded-2xl bg-slate-900/30 border border-slate-800/40 text-xs text-slate-400 flex flex-col gap-1 items-center justify-center">
          <span className="text-slate-500 uppercase font-bold tracking-wider mb-1">⚖️ 核心打分公式</span>
          <div className="font-mono text-cyan-300 text-sm">
            Score = 0.4 * S_gh + 0.4 * S_rd + 0.2 * S_feat
          </div>
          <p className="text-[10px] text-slate-500 mt-1">
            (S_gh: GitHub Star 相对归一分 | S_rd: Reddit 情绪好评率 | S_feat: BYOK/多Agent/全库检索等硬核功能累积)
          </p>
        </div>

        {/* 排序交互控制区 */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => handleSort('score')}
            className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 border ${
              sortBy === 'score'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-black border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            🏆 综合得分排行
          </button>
          <button
            onClick={() => handleSort('github')}
            className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 border ${
              sortBy === 'github'
                ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            ⭐ GitHub Star 排行
          </button>
          <button
            onClick={() => handleSort('reddit')}
            className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 border ${
              sortBy === 'reddit'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-black border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            💬 Reddit 氛围评分
          </button>
        </div>
      </header>

      {/* Bento Grid (便当盒) 主体布局 */}
      <main className="max-w-7xl mx-auto px-6 pb-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-5 auto-rows-[220px]">
          
          {/* Bento Card 1: 冠军大展示位 */}
          <div className="md:col-span-6 lg:col-span-8 row-span-2 rounded-3xl bg-slate-900/40 border border-slate-800/80 p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.05)] relative overflow-hidden group">
            <div className={`absolute -right-16 -top-16 w-48 h-48 rounded-full bg-gradient-to-br ${tools[0].accentColor} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity`} />
            <div className="flex justify-between items-start">
              <div>
                <span className="px-3 py-1 rounded-md text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  当前领跑者 👑
                </span>
                <h2 className="text-4xl font-extrabold mt-4 text-white">{tools[0].name}</h2>
                <p className="text-slate-400 mt-1">{tools[0].type}</p>
              </div>
              <div className="text-right">
                <div className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                  {tools[0].score}
                </div>
                <div className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">综合得分</div>
              </div>
            </div>
            
            <p className="text-slate-300 text-lg max-w-xl leading-relaxed my-4">
              {tools[0].description}
            </p>

            <div className="grid grid-cols-3 gap-4 border-t border-slate-800/60 pt-6 mt-6">
              <div>
                <div className="text-xs text-slate-500 uppercase font-semibold">GitHub Stars</div>
                <div className="text-xl font-bold text-white mt-1">
                  {tools[0].githubStars > 0 ? `${(tools[0].githubStars / 1000).toFixed(1)}k` : 'N/A'}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500 uppercase font-semibold">Reddit 好评度</div>
                <div className="text-xl font-bold text-emerald-400 mt-1">{tools[0].redditSentiment}%</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 uppercase font-semibold">当前状态</div>
                <div className="text-xl font-bold text-cyan-400 mt-1">{tools[0].status}</div>
              </div>
            </div>
          </div>

          {/* Bento Card 2: 榜眼展示位 */}
          <div className="md:col-span-3 lg:col-span-4 row-span-2 rounded-3xl bg-slate-900/40 border border-slate-800/80 p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.05)] relative overflow-hidden group">
            <div className={`absolute -right-12 -bottom-12 w-32 h-32 rounded-full bg-gradient-to-br ${tools[1].accentColor} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />
            <div className="flex justify-between items-start">
              <div>
                <span className="px-3 py-1 rounded-md text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  极客最爱 🥈
                </span>
                <h2 className="text-3xl font-extrabold mt-3 text-white">{tools[1].name}</h2>
                <p className="text-slate-400 text-sm mt-1">{tools[1].type}</p>
              </div>
              <div className="text-3xl font-bold text-purple-400">{tools[1].score} 分</div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed my-4">
              {tools[1].description}
            </p>

            <div className="border-t border-slate-800/60 pt-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-500">Reddit Sentiment</span>
                <span className="text-purple-400 font-bold">{tools[1].redditSentiment}%</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full" style={{ width: `${tools[1].redditSentiment}%` }}></div>
              </div>
            </div>
          </div>

          {/* 其余平铺 Bento Cards */}
          {tools.slice(2).map((tool, idx) => (
            <div
              key={tool.name}
              className={`md:col-span-3 lg:col-span-4 row-span-1 rounded-3xl bg-slate-900/30 border border-slate-800/60 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${tool.borderColor} hover:shadow-lg ${tool.glowColor} relative overflow-hidden group`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{tool.name}</h3>
                  <span className="text-xs text-slate-500">{tool.type}</span>
                </div>
                <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-200 to-slate-400">
                  #{idx + 3}
                </span>
              </div>

              {/* 🚀 完美填充中间的空白区域 */}
              <p className="text-slate-400 text-xs line-clamp-2 my-3 leading-relaxed">
                {tool.description}
              </p>

              <div className="flex items-center justify-between text-sm mt-4 border-t border-slate-800/40 pt-4">
                <div>
                  <span className="text-xs text-slate-500 block">综合得分</span>
                  <span className="font-bold text-white">{tool.score}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">GitHub Stars</span>
                  <span className="font-bold text-slate-300">
                    {tool.githubStars > 0 ? `${(tool.githubStars / 1000).toFixed(1)}k` : 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Reddit 口碑</span>
                  <span className="font-bold text-emerald-400">{tool.redditSentiment}%</span>
                </div>
              </div>
            </div>
          ))}

        </div>
      </main>

      {/* 页脚 */}
      <footer className="border-t border-slate-900 bg-slate-950/40 py-8 text-center text-slate-600 text-sm">
        <p>© 2026 AI Code Showdown. Powered by Dynamic Scoring Algorithm. Built for Hackers.</p>
      </footer>
    </div>
  );
}