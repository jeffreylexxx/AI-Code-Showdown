import React, { useState } from 'react';
import RAW_TOOLS_DATA from './data/tools.json';
import { calculateScores } from './utils/scoring';

// 维度定义
const DIMENSIONS = [
  "智力与质量", "响应与速度", "成本与模式", "理解与上下文", "协同与安全"
];

// SVG 雷达图组件
const RadarChart = ({ scores, colorClass }) => {
  const size = 120;
  const center = size / 2;
  const radius = size * 0.4;
  const angleStep = (Math.PI * 2) / DIMENSIONS.length;

  const points = scores.map((s, i) => {
    const r = (s / 100) * radius;
    const x = center + r * Math.cos(i * angleStep - Math.PI / 2);
    const y = center + r * Math.sin(i * angleStep - Math.PI / 2);
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={size} height={size} className="overflow-visible">
      <circle cx={center} cy={center} r={radius} fill="none" stroke="white" strokeOpacity="0.05" />
      <polygon points={points} className={`fill-current text-cyan-400 fill-cyan-500/20 stroke-cyan-400 stroke-2`} />
    </svg>
  );
};

// 线条图组件
const BarChart = ({ scores }) => (
  <div className="flex flex-col gap-1 w-full mt-2">
    {scores.map((s, i) => (
      <div key={i} className="flex flex-col">
        <div className="flex justify-between text-[8px] text-slate-500 uppercase">
          <span>{DIMENSIONS[i].slice(0, 2)}</span>
          <span>{s}</span>
        </div>
        <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
          <div className="bg-cyan-500 h-full" style={{ width: `${s}%` }} />
        </div>
      </div>
    ))}
  </div>
);

export default function App() {
  const calculatedTools = calculateScores(RAW_TOOLS_DATA);
  const [tools, setTools] = useState([...calculatedTools].sort((a, b) => b.score - a.score));
  const [chartType, setChartType] = useState('radar'); // radar or bar

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 font-sans pb-20">
      <header className="max-w-7xl mx-auto px-6 pt-16 pb-8 text-center relative z-10">
        <h1 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
          AI CODE SHOWDOWN
        </h1>
        <div className="mt-8 flex justify-center gap-4">
          <button 
            onClick={() => setChartType(chartType === 'radar' ? 'bar' : 'radar')}
            className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs hover:border-cyan-500 transition-colors"
          >
            📊 切换图表模式: {chartType === 'radar' ? '蜘蛛图' : '线条图'}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-5 auto-rows-[300px]">
        {/* 这里的高度提升到了 300px 以承载新图表 */}
        {tools.map((tool, idx) => (
          <div key={tool.name} className={`${idx < 2 ? 'md:col-span-6 lg:col-span-6 row-span-2' : 'md:col-span-3 lg:col-span-4 row-span-1'} rounded-3xl bg-slate-900/40 border border-slate-800 p-6 flex flex-col justify-between hover:border-cyan-500/50 transition-all group overflow-hidden`}>
            
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400">{tool.name}</h3>
                <div className="flex gap-1">
                  {tool.keywords.map(k => (
                    <span key={k} className="text-[9px] px-1.5 py-0.5 bg-slate-800 text-slate-400 rounded-md">#{k}</span>
                  ))}
                </div>
              </div>
              <span className="text-2xl font-black text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">#{idx + 1}</span>
            </div>

            <p className="text-slate-400 text-xs line-clamp-2 my-2 leading-relaxed italic">"{tool.description}"</p>

            {/* 核心打分可视化区 */}
            <div className="flex-grow flex items-center justify-center p-2">
              {chartType === 'radar' ? (
                <div className="flex gap-4 items-center">
                   <RadarChart scores={tool.scores} />
                   {idx < 2 && (
                     <div className="hidden lg:flex flex-col gap-1">
                        {DIMENSIONS.map((d, i) => (
                          <div key={d} className="text-[10px] text-slate-500"><span className="text-cyan-400 mr-1">•</span>{d}: {tool.scores[i]}</div>
                        ))}
                     </div>
                   )}
                </div>
              ) : (
                <BarChart scores={tool.scores} />
              )}
            </div>

            <div className="flex items-center justify-between text-[10px] mt-auto border-t border-slate-800/40 pt-3">
              <div className="flex flex-col">
                 <span className="text-slate-500 uppercase">综合评价</span>
                 <span className="font-bold text-white text-lg leading-none">{tool.score}</span>
              </div>
              <div className="flex gap-4">
                <div className="text-right">
                   <span className="text-slate-500 block">GITHUB</span>
                   <span className="font-bold text-slate-300">{tool.githubStars > 0 ? `${(tool.githubStars/1000).toFixed(1)}k` : 'N/A'}</span>
                </div>
                <div className="text-right">
                   <span className="text-slate-500 block">口 碑</span>
                   <span className="font-bold text-emerald-400">{tool.redditSentiment}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}