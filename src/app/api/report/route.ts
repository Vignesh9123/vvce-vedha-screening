import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI, Content } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  const body = (await req.json()) as { history: Content[] };
  const { history } = body;

  if (!history || history.length === 0) {
    return NextResponse.json(
      { message: "No interview history provided" },
      { status: 400 }
    );
  }

  const chatModel = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    generationConfig: {
      maxOutputTokens: 1000,
    },
  });

  try {
    const chat = await chatModel.startChat();
    const result = await chat.sendMessage(`
      Based on the following interview conversation, generate a detailed assessment report in plain text and give the overall rating on top.
      Include the following sections:
      1. Technical Skills Assessment
      2. Communication Skills
      3. Problem-Solving Ability
      4. Areas of Improvement
      5. Overall Rating (out of 10)
      
      Interview History:
      ${history.map((item) => `${item.role}: ${item.parts[0].text}`).join("\n")}
    `);

    const response = await result.response;
    const report = response.text();

    return NextResponse.json({
      data: {
        report,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Report generation failed" },
      { status: 500 }
    );
  }
}
