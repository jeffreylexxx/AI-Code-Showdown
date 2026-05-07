import React, { useState } from 'react';
import RAW_TOOLS_DATA from './data/tools.json';
import { calculateScores } from './utils/scoring';

// 维度定义
const DIMENSIONS = [
  "核心智力", "响应速度", "成本模式", "仓库上下文", "协同安全"
];

// 带刻度线的 SVG 雷达图组件
const RadarChart = ({ scores }) => {
  const size = 140;
  const center = size / 2;
  const radius = size * 0.4;
  const angleStep = (Math.PI * 2) / 5;

  // 生成刻度背景网格线
  const gridLines = [0.25, 0.5, 0.75, 1].map(r => {
    const points = Array.from({ length: 5 }).map((_, i) => {
      const x = center + radius * r * Math.cos(i * angleStep - Math.PI / 2);
      const y = center + radius * r * Math.sin(i * angleStep - Math.PI / 2);
      return `${x},${y}`;
    }).join(' ');
    return <polygon key={r} points={points} className="fill-none stroke-slate-700 stroke-[0.5]" />;
  });

  // 生成分数区域
  const scorePoints = scores.map((s, i) => {
    const r = (s / 100) * radius;
    const x = center + r * Math.cos(i * angleStep - Math.PI / 2);
    const y = center + r * Math.sin(i * angleStep - Math.PI / 2);
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={size} height={size} className="overflow-visible drop-shadow-[0_0_10px_rgba(34,211,238,0.2)]">
      {/* 轴线 */}
      {Array.from({ length: 5 }).map((_, i) => {
        const x = center + radius * Math.cos(i * angleStep - Math.PI / 2);
        const y = center + radius * Math.sin(i * angleStep - Math.PI / 2);
        return <line key={i} x1={center} y1={center} x2={x} y2={y} className="stroke-slate-700 stroke-[0.5]" />;
      })}
      {/* 刻度背景 */}
      {gridLines}
      {/* 数据多边形 */}
      <polygon points={scorePoints} className="fill-cyan-500/20 stroke-cyan-400 stroke-2" />
      {/* 数据顶点 */}
      {scores.map((s, i) => {
        const r = (s / 100) * radius;
        const x = center + r * Math.cos(i * angleStep - Math.PI / 2);
        const y = center + r * Math.sin(i * angleStep - Math.PI / 2);
        return <circle key={i} cx={x} cy={y} r="2" className="fill-cyan-400" />;
      })}
    </svg>
  );
};

// 带数值和标签的线条图组件
const BarChart = ({ scores }) => (
  <div className="flex flex-col gap-2.5 w-full">
    {scores.map((s, i) => (
      <div key={i} className="flex flex-col gap-1">
        <div className="flex justify-between text-[10px] font-bold">
          <span className="text-slate-400 uppercase tracking-tighter">{DIMENSIONS[i]}</span>
          <span className="text-cyan-400">{s}%</span>
        </div>
        <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden border border-white/5">
          <div className="bg-gradient-to-r from-cyan-600 to-cyan-400 h-full shadow-[0_0_10px_rgba(34,211,238,0.5)]" style={{ width: `${s}%` }} />
        </div>
      </div>
    ))}
  </div>
);

export default function App() {
  const calculatedTools = calculateScores(RAW_TOOLS_DATA);
  const [tools] = useState([...calculatedTools].sort((a, b) => b.score - a.score));
  const [chartType, setChartType] = useState('radar');

  return (
    <div className="min-h-screen bg-[#05060a] text-slate-100 font-sans pb-32">
      {/* 环境光晕 */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-purple-900/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-cyan-900/20 blur-[150px] rounded-full" />
      </div>

      <header className="max-w-7xl mx-auto px-6 pt-20 pb-16 text-center relative z-10">
        <h1 className="text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500 mb-6 italic">
          AI CODE SHOWDOWN
        </h1>
        <button 
          onClick={() => setChartType(chartType === 'radar' ? 'bar' : 'radar')}
          className="px-8 py-3 bg-slate-900 border border-cyan-500/40 rounded-full text-xs font-black text-cyan-400 hover:scale-105 hover:bg-cyan-500 hover:text-black transition-all shadow-[0_0_20px_rgba(34,211,238,0.15)] uppercase tracking-widest"
        >
          {chartType === 'radar' ? '📊 切换至 线条图' : '🕸️ 切换至 蜘蛛图'}
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-8 auto-rows-[360px] relative z-10">
        {tools.map((tool, idx) => (
          <div key={tool.name} className={`${idx < 2 ? 'md:col-span-6 lg:col-span-6 row-span-2' : 'md:col-span-3 lg:col-span-4 row-span-1'} rounded-[2.5rem] bg-gradient-to-b from-slate-900/80 to-slate-950/90 border border-slate-800/60 p-8 flex flex-col justify-between hover:border-cyan-500/40 transition-all group backdrop-blur-xl`}>
            
            <div className="flex justify-between items-start mb-2">
              <div className="flex flex-col gap-1">
                <h3 className="text-3xl font-black text-white group-hover:text-cyan-400 transition-colors uppercase italic">{tool.name}</h3>
                <span className="text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase">{tool.type} / {tool.status}</span>
              </div>
              {/* 🚀 极其显眼的霓虹排行数字 */}
              <span className="text-4xl font-black text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.9)] italic font-mono">
                #{idx + 1}
              </span>
            </div>

            <p className="text-slate-400 text-[13px] leading-relaxed opacity-90 border-l-2 border-cyan-500/30 pl-4 my-4">
              {tool.description}
            </p>

            {/* 图表与关键词布局区 */}
            <div className="flex flex-col sm:flex-row items-center gap-6 py-2 flex-grow">
              {/* 左侧图表 */}
              <div className="flex-shrink-0 w-[150px] flex items-center justify-center">
                {chartType === 'radar' ? <RadarChart scores={tool.scores} /> : <BarChart scores={tool.scores} />}
              </div>
              
              {/* 右侧关键词网格 */}
              <div className="flex flex-wrap gap-2 content-center">
                {tool.keywords.map(k => (
                  <span key={k} className="text-[10px] px-2.5 py-1 bg-white/5 text-slate-300 border border-white/10 rounded-lg hover:border-cyan-500/50 hover:text-cyan-400 transition-colors cursor-default">
                    {k}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-2">
              <div className="flex flex-col">
                 <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Index 得分</span>
                 <span className="font-black text-white text-4xl tracking-tighter">{tool.score}</span>
              </div>
              <div className="flex gap-6 text-right">
                <div>
                   <span className="text-[10px] text-slate-500 block font-bold mb-1">STARS</span>
                   <span className="font-black text-slate-300 text-xl">{tool.githubStars > 0 ? `${(tool.githubStars/1000).toFixed(1)}k` : 'N/A'}</span>
                </div>
                <div>
                   <span className="text-[10px] text-slate-500 block font-bold mb-1">REPUTATION</span>
                   <span className="font-black text-emerald-400 text-xl">{tool.redditSentiment}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}