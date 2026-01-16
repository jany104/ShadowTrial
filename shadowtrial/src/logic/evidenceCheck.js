import rules from '../data/evidenceRules.json';

export const calculateEvidenceScore = (text) => {
    let score = 0;
    const lowerText = text.toLowerCase();

    Object.keys(rules).forEach(category => {
        const { weight, keywords } = rules[category];
        const hasKeyword = keywords.some(k => lowerText.includes(k));
        if (hasKeyword) {
            score += weight;
        }
    });

    // Baseline if text is long enough
    if (text.length > 200) score += 5;

    return Math.min(score, 100);
};
