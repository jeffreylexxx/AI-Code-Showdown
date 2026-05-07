import React, { useState } from 'react';
import RAW_TOOLS_DATA from './data/tools.json';
import { calculateScores } from './utils/scoring';

export default function App() {
  const calculatedTools = calculateScores(RAW_TOOLS_DATA);
  const [tools, setTools] = useState([...calculatedTools].sort((a, b) => b.score - a.score));
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
    <div className="min-h-screen bg-[#07090e] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black pb-20">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <header className="max-w-7xl mx-auto px-6 pt-16 pb-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 text-xs font-semibold mb-6 tracking-wider uppercase animate-pulse">
          ⚡ 2026 AI 编程生产力大盘
        </div>
        <h1 className="text-5xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 pb-2">
          AI CODE SHOWDOWN
        </h1>
        <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
          客观呈现 GitHub 活力与 Reddit 口碑，通过加权算法动态更新。<br />
          <span className="text-xs text-slate-500 mt-2 block italic">当前最新趋势：Codex 凭借 GPT-5.5 重回巅峰，Manus 智能体爆发。</span>
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {['score', 'github', 'reddit'].map((key) => (
            <button key={key} onClick={() => handleSort(key)} className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 border ${sortBy === key ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-black border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]' : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:border-slate-700'}`}>
              {key === 'score' ? '🏆 综合打分' : key === 'github' ? '⭐ Star 排行' : '💬 社区口碑'}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 relative z-10">
        {/* 将行高提升至 240px，完美解决描述文字被遮挡的问题 */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-5 auto-rows-[240px]">
          
          {/* 冠亚军卡片保持 row-span-2 (480px) */}
          <div className="md:col-span-6 lg:col-span-8 row-span-2 rounded-3xl bg-slate-900/40 border border-slate-800/80 p-8 flex flex-col justify-between transition-all duration-300 hover:border-cyan-500/30 relative overflow-hidden group">
            <div className={`absolute -right-16 -top-16 w-48 h-48 rounded-full bg-gradient-to-br ${tools[0].accentColor} opacity-10 blur-3xl`} />
            <div className="flex justify-between items-start">
              <div>
                <span className="px-3 py-1 rounded-md text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase tracking-tighter">Leader 👑</span>
                <h2 className="text-4xl font-extrabold mt-4 text-white">{tools[0].name}</h2>
                <p className="text-slate-400 mt-1">{tools[0].type}</p>
              </div>
              <div className="text-right"><div className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">{tools[0].score}</div></div>
            </div>
            <p className="text-slate-300 text-lg max-w-xl leading-relaxed my-4">{tools[0].description}</p>
            <div className="grid grid-cols-3 gap-4 border-t border-slate-800/60 pt-6 mt-6">
              {[['Stars', tools[0].githubStars > 0 ? `${(tools[0].githubStars/1000).toFixed(1)}k` : 'N/A'], ['Reddit', `${tools[0].redditSentiment}%`], ['Status', tools[0].status]].map(([l, v]) => (
                <div key={l}><div className="text-xs text-slate-500 uppercase font-semibold">{l}</div><div className={`text-xl font-bold mt-1 ${l === 'Reddit' ? 'text-emerald-400' : 'text-white'}`}>{v}</div></div>
              ))}
            </div>
          </div>

          <div className="md:col-span-3 lg:col-span-4 row-span-2 rounded-3xl bg-slate-900/40 border border-slate-800/80 p-8 flex flex-col justify-between transition-all duration-300 hover:border-purple-500/30 relative overflow-hidden group">
            <div className="flex justify-between items-start">
              <div>
                <span className="px-3 py-1 rounded-md text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">Elite 🥈</span>
                <h2 className="text-3xl font-extrabold mt-3 text-white">{tools[1].name}</h2>
                <p className="text-slate-400 text-sm">{tools[1].type}</p>
              </div>
              <div className="text-3xl font-bold text-purple-400">{tools[1].score}</div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed my-4">{tools[1].description}</p>
            <div className="border-t border-slate-800/60 pt-4">
              <div className="flex justify-between text-sm mb-1"><span className="text-slate-500">Reddit Sentiment</span><span className="text-purple-400 font-bold">{tools[1].redditSentiment}%</span></div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden"><div className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full" style={{ width: `${tools[1].redditSentiment}%` }} /></div>
            </div>
          </div>

          {/* 小卡片 UI 修复：p-5 和紧凑的间距 */}
          {tools.slice(2).map((tool, idx) => (
            <div key={tool.name} className={`md:col-span-3 lg:col-span-4 row-span-1 rounded-3xl bg-slate-900/30 border border-slate-800/60 p-5 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] ${tool.borderColor} hover:shadow-lg ${tool.glowColor} relative overflow-hidden group`}>
              <div className="flex justify-between items-start">
                <div><h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{tool.name}</h3><span className="text-[10px] text-slate-500 uppercase tracking-widest">{tool.type}</span></div>
                {/* 🚀 极其关键的修改：将排名 # 更改为高亮霓虹蓝发光字体，并在纯黑背景下极其醒目 */}
                <span className="text-2xl font-black text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] font-mono">
                  #{idx + 3}
                </span>
              </div>
              {/* 这里是修复关键：使用 mt-2 mb-1 缩减垂直占用，line-clamp-2 限制显示在2行内 */}
              <p className="text-slate-400 text-[11px] line-clamp-2 mt-2 mb-1 leading-relaxed">
                {tool.description}
              </p>
              <div className="flex items-center justify-between text-[11px] mt-auto border-t border-slate-800/40 pt-3">
                <div><span className="text-slate-500 block">综合打分</span><span className="font-bold text-white">{tool.score}</span></div>
                <div><span className="text-slate-500 block">Stars</span><span className="font-bold text-slate-300">{tool.githubStars > 0 ? `${(tool.githubStars/1000).toFixed(1)}k` : 'N/A'}</span></div>
                <div><span className="text-slate-500 block">口碑</span><span className="font-bold text-emerald-400">{tool.redditSentiment}%</span></div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
