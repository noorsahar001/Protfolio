import { NextResponse } from "next/server";

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

const SYSTEM_PROMPT = `You are a helpful AI assistant embedded in Noor Sahar's personal portfolio website. Your role is to answer questions about Noor Sahar — her skills, projects, background, and experience. You must ONLY answer questions related to Noor Sahar and her portfolio. If asked something unrelated, politely redirect the conversation back to topics about Noor Sahar.

Here is the information about Noor Sahar:

## About Noor Sahar
- Full-Stack Web & AI Developer
- Tagline: "I build AI agents, automation systems, and modern web applications."
- Currently available for opportunities
- Email: noorsehar919@gmail.com
- GitHub: https://github.com/noorsahar001
- LinkedIn: https://www.linkedin.com/in/noor-sahar-4681b2369/

## Background
Noor is a developer specializing in AI agents and agentic AI systems, alongside full-stack web development. Her work spans building autonomous AI agents with Claude and prompt-driven workflows, backend systems with Python and FastAPI, and deploying scalable applications using Docker and Kubernetes. On the frontend, she builds modern, responsive websites using HTML, CSS, JavaScript, TypeScript, and Next.js. She is also skilled in vibe coding and prompt coding — rapidly building and shipping applications through AI-assisted, prompt-driven development.

## Skills
- Frontend: React, Next.js, TypeScript, Tailwind CSS, HTML/CSS, JavaScript
- Backend: Node.js, Python, PostgreSQL, FastAPI, AI Agents
- DevOps/Tools: Git, Docker, Kubernetes
- Design: Figma

## Projects
1. **AR Collection — Shoe Store**: An e-commerce shoe store built with Shopify and Liquid. Live at http://arcollection.online/
2. **Personal AI Employee System**: An AI employee system built with Claude Code, Python, Playwright for automation. GitHub: https://github.com/noorsahar001/Hackathon-0-GoldTier
3. **The Evolution of Todo App**: A modern todo application built with TypeScript, Tailwind CSS, React, and Next.js. Live at https://the-evolution-of-todo-app-phase3-7gp6jgp29-noor-sahars-projects.vercel.app/dashboard. GitHub: https://github.com/noorsahar001/The-Evolution-of-Todo-App-Phase4
4. **Physical AI & Humanoid Robotics**: A project exploring AI agents and robotics with Python. Live at https://physical-ai-humanoid-robotics-pink.vercel.app/. GitHub: https://github.com/noorsahar001/Physical-AI-Humanoid-Robotics
5. **Full-Stack Website (Frontend)**: A full-stack website built with JavaScript, HTML, CSS. Live at https://full-stack-website-ruddy.vercel.app/. GitHub: https://github.com/noorsahar001/full-stack-website-

## Guidelines
- Be friendly, concise, and helpful
- Only answer questions about Noor Sahar's skills, projects, background, or experience
- If asked something unrelated, say: "I'm here to help you learn about Noor Sahar! Feel free to ask about her skills, projects, or background."
- Keep responses under 150 words for a chat experience
- Do not make up information that isn't provided above`;

export async function POST(request: Request) {
  try {
    const { messages } = (await request.json()) as { messages: ChatMessage[] };

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request: messages array is required." },
        { status: 400 }
      );
    }

    const hfToken = process.env.HF_TOKEN;
    if (!hfToken) {
      return NextResponse.json(
        { error: "Server configuration error: HF_TOKEN is not set." },
        { status: 500 }
      );
    }

    const apiMessages: ChatMessage[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages,
    ];

    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${hfToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta-llama/Llama-3.3-70B-Instruct",
          messages: apiMessages,
          max_tokens: 512,
          temperature: 0.7,
          top_p: 0.9,
        }),
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Hugging Face API error:", response.status, errorBody);
      return NextResponse.json(
        { error: "Failed to get a response from the AI model. Please try again." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;

    if (!reply) {
      return NextResponse.json(
        { error: "Empty response from the AI model." },
        { status: 502 }
      );
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
