async function shuffleTitleWithOpenAI(title, apiKey, style) {
    try {
        // Retrieve the selected model from the dropdown
        const model = document.getElementById('modelSelect').value;
        const description = document.getElementById('description-input').value;

        // Define the style prompts for each category
        const stylePrompts = {
            'Positive': 'rewrite the following title in a positive way while keeping a similar or shorter length:',
            'Outrageous': 'rewrite the following title in an outrageous way while keeping a similar or shorter length:',
            'Dramatic': 'rewrite the following title in a dramatic way while keeping a similar or shorter length:',
            'Challenging Assumption': 'rewrite the following title to challenge assumptions while keeping a similar or shorter length:',
            'Refuting Objections': 'rewrite the following title in a way that refutes objections while keeping a similar or shorter length:',
            'Assertive': 'rewrite the following title in a assertive way while keeping a similar or shorter length:',
            'Clever': 'rewrite the following title in a clever way while keeping a similar or shorter length:',
            'Open Loop': 'rewrite the following title in an open loop way while keeping a similar or shorter length:',
            'Alliteration': 'rewrite the following title but use alliteration while keeping a similar or shorter length:',
            'Listicle': 'rewrite the following title into a listicle format while keeping a similar or shorter length:',
            'FOMO': 'rewrite the following title with fomo while keeping a similar or shorter length:',
            'Truth': 'rewrite the following title in a "truth" way while keeping a similar or shorter length:'
        };

        let messageContent = `${stylePrompts[style]} "${title}"`;

        // Append the description to the message if it's not empty
        if (description.trim().length > 0) {
            messageContent += ` - ONLY respond with the title, but to give some context the title is about ${description}`;
        }

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: model, // Use the selected model here
                messages: [{ role: "user", content: messageContent }],
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