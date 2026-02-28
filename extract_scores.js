
const fs = require('fs');
try {
    const data = fs.readFileSync('lighthouse_mobile_report.json', 'utf8');
    const json = JSON.parse(data);
    console.log('--- SCORES ---');
    console.log('Performance:', (json.categories.performance.score * 100).toFixed(0));
    console.log('Best Practices:', (json.categories['best-practices'].score * 100).toFixed(0));
    console.log('--- FAILURES ---');
    const audits = Object.values(json.audits)
        .filter(a => a.score !== null && a.score < 0.9)
        .sort((a, b) => a.score - b.score);

    audits.slice(0, 10).forEach(a => {
        console.log(`- ${a.title} (${a.id}): ${(a.score * 100).toFixed(0)}`);
    });
} catch (e) {
    console.error('Error parsing report:', e.message);
}
