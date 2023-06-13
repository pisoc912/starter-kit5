import {
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
  ChatPromptTemplate,
} from "langchain/prompts";
import { ChatOpenAI } from "langchain/chat_models/openai";


const api_key = "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";

const model = new ChatOpenAI({
  openAIApiKey: api_key,
  temperature: 0.9
})

const response = await chat.call([
  new SystemChatMessage(
    `You are a ${role}`
  ),
  new HumanChatMessage("Translate: I love programming."),
]);

console.log(response);


// const template = "what would be a good company name for a company that makes {product}?";

// const promptTemplate = new PromptTemplate({
//   template: template,
//   inputVariables: ["product"],
// })

// const model = new OpenAI({
//   openAIApiKey: api_key,
//   temperature: 0.9
// })

// const chain = new LLMChain({
//   llm: model,
//   prompt: promptTemplate
// })

// const res = await chain.call({
//   product: "api key"
// })

// console.log(res);


