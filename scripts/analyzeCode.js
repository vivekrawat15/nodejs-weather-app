const axios = require('axios');

const analyzeCode = async (code) => {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
        console.error("OpenAI API key is missing");
        process.exit(1);
    }

    try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: "gpt-4",
            prompt: `Review the following code:\n\n${code}\n\nProvide feedback and suggestions:`,
            max_tokens: 150
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        console.log(response.data.choices[0].text);
    } catch (error) {
        console.error('Error analyzing code with OpenAI:', error.response?.data || error.message);
        process.exit(1);
    }
};

analyzeCode();
