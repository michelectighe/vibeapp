export const analyzePeacefulness = async (floatArray, model, sounds) => {
  try {
    //console.log('analyze peace')
    // Calculate dB from floatArray
    const rms = Math.sqrt(floatArray.reduce((sum, val) => sum + val * val, 0) / floatArray.length);
    const db = 20 * Math.log10(rms);

    const output = await model.run([floatArray]);
    const outputArray = Array.from(output[0]);

    const topPredictions = outputArray
      .map((score, i) => ({
        label: sounds[i]?.label || 'Unknown',
        category: sounds[i]?.category || 'uncategorized',
        score,
      }))
      .filter(({ score }) => score > 0.03);

    const categoryScores = {};
    topPredictions.forEach(({ category, score }) => {
      categoryScores[category] = (categoryScores[category] || 0) + score;
    });

    const totalScore = Object.values(categoryScores).reduce((sum, s) => sum + s, 0);

    const goodCategories = ['peaceful', 'quiet', 'music', 'animal', 'laughter', 'talking', 'nature', 'neutral'];
    const badCategories = ['chaotic', 'loud', 'annoying', 'city', 'sadness'];

    let goodScore = 0;
    let badScore = 0;

    for (const [category, score] of Object.entries(categoryScores)) {
      if (goodCategories.includes(category)) goodScore += score;
      else if (badCategories.includes(category)) badScore += score;
    }

    const percentGood = totalScore > 0 ? (goodScore / totalScore) * 100 : 0;
    const percentBad = totalScore > 0 ? (badScore / totalScore) * 100 : 0;

    return {
      rankedCategories: Object.entries(categoryScores)
        .map(([category, score]) => ({ category, score }))
        .sort((a, b) => b.score - a.score),
      percentGood: Number(percentGood.toFixed(2)),
      percentBad: Number(percentBad.toFixed(2)),
      decibels: db.toFixed(2), // 🔊 include this!
    };

  } catch (err) {
    console.error("Sound classification failed:", err);
    return { rankedCategories: [], percentGood: 0.00, percentBad: 0.00, decibels: '-Infinity' };
  }
};
