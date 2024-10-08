import { ChatOpenAI } from "@langchain/openai";
import { ConversationChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";
import { ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate } from "@langchain/core/prompts";

const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  throw new Error("Missing OpenAI API Key");
}

// Define interfaces for issues and contractors
interface Issue {
  id: number;
  description: string;
  category: string;
  raisedBy: string;
}

interface Contractor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  cost: string;
}

let issues: Issue[] = [];
let contractors: Contractor[] = [];

// Function to fetch data
export async function fetchData() {
  try {
    const issuesResponse = await fetch('/api/issues');
    const contractorsResponse = await fetch('/api/contractors');
    
    if (!issuesResponse.ok || !contractorsResponse.ok) {
      throw new Error(`HTTP error! status: ${issuesResponse.status}, ${contractorsResponse.status}`);
    }
    
    const issuesText = await issuesResponse.text();
    const contractorsText = await contractorsResponse.text();
    
    console.log('Issues response:', issuesText);
    console.log('Contractors response:', contractorsText);
    
    issues = JSON.parse(issuesText);
    contractors = JSON.parse(contractorsText);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Call fetchData when the module is imported
fetchData();

const model = new ChatOpenAI({ 
  openAIApiKey: OPENAI_API_KEY, 
  modelName: "gpt-4o-mini", 
  temperature: 0.7,
});

const memory = new BufferMemory();

const chatPrompt = ChatPromptTemplate.fromMessages([
  SystemMessagePromptTemplate.fromTemplate(
    `You are an AI assistant for a home repair platform. Your role is to help homeowners manage repair issues, find contractors, and facilitate communication. Be friendly and conversational.

    Important: Only use information provided in the context. Do not make up or assume any information.

    Available commands:
    - View issues: Respond ONLY with "Viewing issues..."
    - Find contractors: Respond ONLY with "Finding contractors..."
    - Contact contractor: Respond ONLY with "Contacting contractor..."

    For any other user requests, provide helpful responses based solely on the information available in the context. If you're asked about specific issues or contractors, use the information provided in the previous messages or context.

    Remember, for the commands above, your response should consist of ONLY the specified phrase and nothing else. For other queries, provide detailed and helpful responses.`
  ),
  HumanMessagePromptTemplate.fromTemplate("{input}")
]);

export const chain = new ConversationChain({
  llm: model,
  memory: memory,
  prompt: chatPrompt
});

export async function getAIResponse(input: string) {
  const response = await chain.call({ input });
  return response.response;
}

// Update the return type of these functions
export function getIssues(): Issue[] {
  return issues;
}

export function getContractors(): Contractor[] {
  return contractors;
}

// If you're not using these functions, you can remove them
// export function findContractorsBySpecialty(specialty: string) { ... }
// export function contactContractor(contractorId: number, issueId: number) { ... }

// New function to demonstrate tool calling
import { z } from "zod"; // Make sure to install and import zod

const GetWeather = z.object({
  location: z.string().describe("The city and state, e.g. San Francisco, CA")
});

export const modelWithTools = model.bind({
  tools: [{ schema: GetWeather, name: "GetWeather", description: "Get the current weather in a given location" }],
  tool_choice: "auto"
});

export async function getWeatherResponse(input: string) {
  const response = await modelWithTools.invoke(input);
  return response;
}