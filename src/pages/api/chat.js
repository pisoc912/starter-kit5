// pages/api/chat.js
export default async function handler(req, res) {
  const prompt = req.body.prompt;
  const api_key = process.env.OPENAI_API_KEY; // 从环境变量获取你的 OpenAI API 密钥

  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${api_key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 60,
        }),
      }
    );

    const data = await response.json();
    res.status(200).json({ data: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: "An error occurred." + error });
  }
}
