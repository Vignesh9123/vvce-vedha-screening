import { User, LoginCredentials } from "@/types";

// Simulated user data
const DEMO_USER: User = {
  id: "1",
  username: "harsha",
  email: "harshavasu463@gmail.com",
};

export async function login(credentials: LoginCredentials): Promise<User> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Demo credentials check
  if (credentials.email === "harshavasu463@gmail.com" && credentials.password === "harsha") {
    localStorage.setItem("user", JSON.stringify(DEMO_USER));
    return DEMO_USER;
  }

  throw new Error("Invalid credentials");
}

export function logout(): void {
  localStorage.removeItem("user");
}

export function getCurrentUser(): User | null {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
}