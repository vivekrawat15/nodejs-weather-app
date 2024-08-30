const axios = require('axios');

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
    console.error("OpenAI API key is missing");
    process.exit(1);
}

const analyzeCode = async () => {
    try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: "gpt-4",
            prompt: "Test prompt",
            max_tokens: 10
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        console.log(response.data);
    } catch (error) {
        console.error('Error analyzing code with OpenAI:', error.response.data || error.message);
    }
};

analyzeCode();
