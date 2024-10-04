// OpenAI APIキーを設定
const apiKey = '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';

// APIにPOSTリクエストを送信する関数
async function callChatGPT(prompt) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-4",  // 使用するモデル名
            messages: [
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ],
            max_tokens: 150
        })
    });

    const data = await response.json();
    return data.choices[0].message.content;
}

// フォームが送信されたときに処理を実行
document.getElementById('chat-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // フォームのデフォルト送信動作を防止

    const userInput = document.getElementById('user-input').value; // 入力値を取得
    const responseOutput = document.getElementById('response-output'); // 結果を表示する要素

    // APIコールを実行して結果を表示
    responseOutput.textContent = '応答を待っています...'; // 応答待ちのメッセージ
    try {
        const response = await callChatGPT(userInput); // ChatGPTからの応答
        responseOutput.textContent = response; // 応答を画面に表示
    } catch (error) {
        console.error('Error:', error);
        responseOutput.textContent = 'エラーが発生しました。';
    }
});
