import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI, Content } from "@google/generative-ai";
import { generateReport } from "@/utils/reportUtils";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  const body = (await req.json()) as {
    text: string;
    history: Content[];
    username: string;
    course: string;
  };
  const { text: userText, history, course, username } = body;

  if (!userText) {
    return NextResponse.json(
      { message: "Invalid user response" },
      { status: 400 }
    );
  }

  const chatModel = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    systemInstruction: {
      role: "model",
      parts: [
        {
          text: `You are a Interviewer name SkillConnect AI and interviewing ${username}. You are given task to asses ${username} for the roles for ${course} in a maximum of 10 questions one by one after the user has answered the previous question excluding greetings and final remarks and at last you need to generate a report on how the person did in a detailed format and provide a rating to the candidate according to his experience in each skill.\nYou have to behave like a human, and talk to the person in the interview, you are HR of Samsung R&D India. After 10 Questions make sure to end chat by saying "Thanks for Giving the Interview.". And do not use any special characters while giving the response and keep in mind that the response will be read out by browser speech api. Act as an human and ask one by one and ask counter questions`,
        },
      ],
    },
    generationConfig: {
      maxOutputTokens: 100,
    },
  });

  try {
    const chat = await chatModel.startChat({
      history,
      generationConfig: {
        maxOutputTokens: 100,
      },
    });

    const result = await chat.sendMessage(userText);
    const response = await result.response;
    const responseText = response.text();

    let report = "";
    if (history.length >= 19) {
      // 10 questions + 9 answers + current message
      report = generateReport([
        ...history,
        { role: "user", parts: [{ text: userText }] },
        { role: "model", parts: [{ text: responseText }] },
      ]);
    }

    return NextResponse.json({
      data: {
        user: userText,
        model: responseText,
        count: response.promptFeedback,
        report,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "AI completion failed" },
      { status: 500 }
    );
  }
}
