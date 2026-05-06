import fs from 'fs';
import path from 'path';

// 开源项目的 GitHub 仓库映射表
const REPO_MAP = {
  'Cursor': 'getcursor/cursor',
  'Claude Code': 'anthropics/claude-cli', // 映射到官方 CLI 仓库
  'OpenAI Codex': 'openai/openai-cookbook', // 映射到 OpenAI 开发者手册活跃度作为代理指标
  'Gemini CLI': 'google/gemini-cli',
};

const JSON_PATH = path.resolve('src/data/tools.json');

// 1. 获取 GitHub Stars
async function getGithubStars(repo) {
  if (!repo) return null;
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (AI-Showdown-Bot)' }
    });
    if (res.ok) {
      const data = await res.json();
      return data.stargazers_count;
    }
  } catch (e) {
    console.error(`❌ 获取 GitHub 失败 [${repo}]:`, e.message);
  }
  return null;
}

// 2. 爬取 Reddit 进行极简情感分析计算口碑分
async function getRedditSentiment(toolName) {
  try {
    const query = encodeURIComponent(`${toolName} AI`);
    // 获取 Reddit 关于该工具的最新搜索 JSON
    const res = await fetch(`https://www.reddit.com/search.json?q=${query}&sort=relevance&t=week`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AI-Showdown/1.0' }
    });
    
    if (res.ok) {
      const data = await res.json();
      const posts = data.data?.children || [];
      if (posts.length === 0) return null;

      let positive = 0;
      let negative = 0;
      const posWords = ['good', 'love', 'amazing', 'fast', 'best', 'game changer', 'great', 'awesome', 'helper', 'smooth'];
      const negWords = ['bad', 'trash', 'slow', 'fail', 'expensive', 'bug', 'hate', 'worse', 'useless', 'hallucinate'];

      posts.forEach(post => {
        const text = ((post.data.title || "") + " " + (post.data.selftext || "")).toLowerCase();
        posWords.forEach(w => { if (text.includes(w)) positive++; });
        negWords.forEach(w => { if (text.includes(w)) negative++; });
      });

      // 算法公式：在 80% 基准分上进行上下波动，限制在 65% - 98% 之间
      let score = 80 + (positive - negative) * 2;
      return Math.max(65, Math.min(98, score));
    }
  } catch (e) {
    console.error(`❌ 获取 Reddit 失败 [${toolName}]:`, e.message);
  }
  return null;
}

// 3. 执行主更新流程
async function main() {
  console.log('🚀 开始自动化抓取 2026 最新数据...');
  const tools = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));

  for (let tool of tools) {
    console.log(`\n正在更新 [${tool.name}]...`);
    
    // 更新 GitHub
    const stars = await getGithubStars(REPO_MAP[tool.name]);
    if (stars !== null) {
      console.log(` -> 真实 GitHub Stars: ${stars}`);
      tool.githubStars = stars;
    }

    // 更新 Reddit Sentiment
    const sentiment = await getRedditSentiment(tool.name);
    if (sentiment !== null) {
      console.log(` -> 动态 Reddit 好评率: ${sentiment}%`);
      tool.redditSentiment = sentiment;
    }
  }

  // 写回 JSON 文件
  fs.writeFileSync(JSON_PATH, JSON.stringify(tools, null, 2));
  console.log('\n✅ 数据更新成功，并已同步写入 tools.json！');
}

main();