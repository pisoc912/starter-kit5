import { chainPropTypes } from "@mui/utils";
import { OpenAI } from "langchain/llms/openai";
import { ConversationChain, LLMChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { BufferMemory, ConversationSummaryMemory } from "langchain/memory";
import { ChatPromptTemplate, HumanMessagePromptTemplate, MessagesPlaceholder, PromptTemplate, SystemMessagePromptTemplate } from "langchain/prompts";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";
import { Configuration, OpenAIApi } from "openai";



// pages/api/chat.js
export default async function handler(req, res) {

  const prompt = req.body.prompt;
  const role = req.body.role;
  const api_key = process.env.OPENAI_API_KEY; // 从环境变量获取你的 OpenAI API 密钥


  try {

    // const response = await fetch(
    //   "https://api.openai.com/v1/chat/completions",
    //   {
    //     method: "POST",
    //     headers: {
    //       Authorization: `Bearer ${api_key}`,
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       model: 'gpt-3.5-turbo',
    //       messages: [
    //         { role: "system", content: `You are a ${role}` },
    //         { role: 'user', content: prompt }
    //       ],
    //       max_tokens: 600,
    //     }),
    //   }
    // );

    // const data = await response.json();
    // res.status(200).json({ data: data.choices[0].message.content });
    const chatPrompt = ChatPromptTemplate.fromPromptMessages([
      SystemMessagePromptTemplate.fromTemplate(`The following is a friendly conversation between a human and an AI that act as ${role}. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know.`),
      new MessagesPlaceholder("history"),
      HumanMessagePromptTemplate.fromTemplate("{input}"),
    ])

    const chat = new ChatOpenAI({
      openAIApiKey: api_key,
      temperature: 0,
    })

    const chain = new ConversationChain(
      {
        memory: new BufferMemory({
          returnMessages: true,
          memoryKey: "history"
        }),
        prompt: chatPrompt,
        llm: chat,
      })

    const result = await chain.call(
      {
        input: prompt
      })
    res.status(200).json({ data: result.response })
  } catch (error) {
    res.status(500).json({ error: "An error occurred." + error });
  }
}
