import { Content, UsageMetadata } from "@google/generative-ai";

export type ApiResponse<T = any> = {
  message: string;
  data: T;
};

export type Generate = {
  user: string;
  model: string;
  count?: UsageMetadata;
  history: Content[];
};

export interface Course {
  id: string;
  title: string;
  possibleRoles: string[];
  completedAt: string;
  progress: number;
  thumbnail: string;
}

export interface UserCourse extends Course {
  username: string;
  certificateId: string;
}


export interface User {
  id: string;
  username: string;
  email: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}