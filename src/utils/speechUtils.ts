export function speak(text: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => resolve();
    utterance.onerror = (error) => reject(error);
    speechSynthesis.speak(utterance);
  });
}


export const InitMessage = (username:string) => `Hello, I am SkillConnect AI, an HR representative from Samsung R and D India. I will be assessing you today, ${username}, for the role of Junior Frontend Developer. To get started, could you please introduce yourself?`
