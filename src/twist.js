async function twistTitleWithOpenAI(title, apiKey) {
    try {
        // Retrieve the selected model from the dropdown
        const model = document.getElementById('modelSelect').value;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: model, // Use the selected model here
                messages: [{ role: "user", content: `Shorten the following in a super concise and snappy way: "${title}"` }],
                temperature: 1
            }),
        });

        const data = await response.json();

        // Check if the response has choices and it's not empty
        if (data.choices && data.choices.length > 0 && data.choices[0].message && data.choices[0].message.content) {
            return data.choices[0].message.content.trim();
        } else {
            console.error('Unexpected response format from OpenAI:', data);
            return null;
        }
    } catch (error) {
        console.error('Error while calling OpenAI API:', error);
        return null;
    }
}