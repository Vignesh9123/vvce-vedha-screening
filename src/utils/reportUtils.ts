import { Content } from "@google/generative-ai";

export function generateReport(history: Content[]): string {
  const userResponses = history.filter((item) => item.role === "user");
  const aiResponses = history.filter((item) => item.role === "model");

  let report = "Interview Report\n\n";

  // Analyze question-answer pairs
  for (let i = 1; i < Math.min(userResponses.length, aiResponses.length); i++) {
    const question = aiResponses[i - 1].parts[0].text;
    const answer = userResponses[i].parts[0].text;

    report += `Question ${i}: ${question}\n`;
    report += `Answer: ${answer}\n\n`;

    // Simple sentiment analysis (this is a basic example, you might want to use a more sophisticated approach)
    const sentiment = analyzeSentiment(answer || "");
    report += `Sentiment: ${sentiment}\n\n`;
  }

  // Overall assessment
  report += "Overall Assessment:\n";
  report += assessSkills(userResponses);

  return report;
}

function analyzeSentiment(text: string): string {
  const positiveWords = [
    "good",
    "great",
    "excellent",
    "yes",
    "experience",
    "familiar",
    "understand",
  ];
  const negativeWords = [
    "no",
    "not",
    "never",
    "unsure",
    "difficult",
    "struggle",
  ];

  const lowerText = text.toLowerCase();
  const positiveCount = positiveWords.filter((word) =>
    lowerText.includes(word)
  ).length;
  const negativeCount = negativeWords.filter((word) =>
    lowerText.includes(word)
  ).length;

  if (positiveCount > negativeCount) return "Positive";
  if (negativeCount > positiveCount) return "Negative";
  return "Neutral";
}

function assessSkills(responses: Content[]): string {
  const skills = ["React", "JavaScript", "CSS", "HTML", "Frontend"];
  let assessment = "";

  skills.forEach((skill) => {
    const relevantResponses = responses.filter((response) =>
      response.parts[0].text?.toLowerCase().includes(skill.toLowerCase())
    );
    const skillLevel = calculateSkillLevel(
      relevantResponses.length,
      responses.length
    );
    assessment += `${skill}: ${skillLevel}\n`;
  });

  return assessment;
}

function calculateSkillLevel(
  mentionCount: number,
  totalResponses: number
): string {
  const percentage = (mentionCount / totalResponses) * 100;
  if (percentage > 75) return "Expert";
  if (percentage > 50) return "Proficient";
  if (percentage > 25) return "Intermediate";
  return "Beginner";
}

import axios from "axios";

export const generateInterviewReport = async (history: Content[]) => {
  try {
    const response = await axios.post('http://localhost:3000/api/report', { history });
    console.log("report" , response);
    
    return response.data.data.report;
  } catch (error) {
    console.error('Failed to generate report:', error);
    throw error;
  }
};
