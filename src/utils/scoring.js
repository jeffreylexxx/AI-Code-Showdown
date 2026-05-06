export function calculateScores(tools) {
  // 获取列表中最大的 GitHub Star 数以进行相对标准化
  const maxStars = Math.max(...tools.map(t => t.githubStars));

  return tools.map(tool => {
    // 1. GitHub 活力得分 (0-100分)
    // 闭源且无公开库的 Copilot 直接赋予 75 分的市场占有率基准分
    let githubScore = 0;
    if (tool.name === 'GitHub Copilot') {
      githubScore = 75;
    } else {
      githubScore = maxStars > 0 ? Math.round((tool.githubStars / maxStars) * 100) : 0;
      githubScore = Math.max(githubScore, 30); // 赋予 30 分的基本活跃保底
    }

    // 2. Reddit 口碑得分 (0-100分)
    const redditScore = tool.redditSentiment;

    // 3. 硬核功能得分 (0-100分)
    let featureScore = 0;
    if (tool.features.byok) featureScore += 30;          // 支持自带 Key (+30分)
    if (tool.features.multiAgent) featureScore += 30;    // 支持多 Agent 协同 (+30分)
    if (tool.features.codebaseIndex) featureScore += 20; // 支持全库索引 (+20分)
    if (tool.features.openSource) featureScore += 20;    // 开源客户端 (+20分)

    // 4. 加权最终得分 (40% GitHub + 40% Reddit + 20% 功能)
    const finalScore = Math.round(
      (0.4 * githubScore) + 
      (0.4 * redditScore) + 
      (0.2 * featureScore)
    );

    return {
      ...tool,
      githubScore,
      featureScore,
      score: Math.min(finalScore, 100) // 上限 100 分
    };
  });
}