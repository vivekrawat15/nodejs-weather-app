const axios = require('axios');
const { execSync } = require('child_process');
const fs = require('fs');

const openAIKey = process.env.OPENAI_API_KEY;

const getPRDiff = () => {
    try {
        // Fetch the main branch to make sure it's available locally
        execSync('git fetch origin main');

        // Check if the main branch exists locally
        try {
            const diff = execSync('git diff origin/main').toString();
            return diff;
        } catch {
            console.log("No main branch found, comparing with the base branch instead.");
            const diff = execSync('git diff HEAD~1').toString();
            return diff;
        }
    } catch (error) {
        console.error('Error getting PR diff:', error);
        process.exit(1);
    }
};
const analyzeCode = async (diff) => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                model: 'gpt-4o-turbo',
                prompt: `Review the following code changes and provide detailed feedback:\n\n${diff}`,
                max_tokens: 300,
                temperature: 0.7,
            },
            {
                headers: {
                    Authorization: `Bearer ${openAIKey}`,
                },
            }
        );

        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error('Error analyzing code with OpenAI:', error);
        process.exit(1);
    }
};

const main = async () => {
    const diff = getPRDiff();
    if (!diff) {
        console.log('No changes to review.');
        return;
    }

    const reviewComments = await analyzeCode(diff);
    fs.writeFileSync('scripts/reviewComments.txt', reviewComments);
};

main();