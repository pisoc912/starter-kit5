import { OpenAI } from "langchain/llms/openai";
import { BufferMemory, ConversationSummaryMemory } from "langchain/memory";
import { ConversationChain, LLMChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";

export const run = async () => {
  const model = new OpenAI({ openAIApiKey: "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", });

  const memory = new ConversationSummaryMemory({
    memoryKey: "chat_history",
    llm: new OpenAI({ modelName: "gpt-3.5-turbo", temperature: 0 }),
  });;

  const prompt = PromptTemplate.fromTemplate(`
Current conversation:
${chat_history}
Human: ${input}
AI:` )
  const chain = new LLMChain({ llm: model, prompt, memory: memory });
  const res1 = await chain.call({ input: "Hi! I'm Jim." });
  console.log({ res1 });

  const res2 = await chain.call({ input: "What's my name?" });
  console.log({ res2 });
}
