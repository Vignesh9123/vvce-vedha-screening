import { UserCourse } from "@/types";

export const userCourses: UserCourse[] = [
  {
    id: "1",
    title: "Advanced React Development",
    possibleRoles: ["Frontend Developer", "React Developer", "UI Engineer"],
    completedAt: "2024-03-15",
    progress: 100,
    username: "John Doe",
    certificateId: "REACT-2024-001",
    thumbnail:
      "https://t4.ftcdn.net/jpg/03/08/69/75/360_F_308697506_9dsBYHXm9FwuW0qcEqimAEXUvzTwfzwe.jpg",
  },
  {
    id: "2",
    title: "Full Stack JavaScript",
    possibleRoles: ["Full Stack Developer", "MERN Stack Developer"],
    completedAt: "2024-02-28",
    progress: 100,
    username: "John Doe",
    certificateId: "FSJS-2024-102",
    thumbnail:
      "https://t4.ftcdn.net/jpg/03/08/69/75/360_F_308697506_9dsBYHXm9FwuW0qcEqimAEXUvzTwfzwe.jpg",
  },
  {
    id: "3",
    title: "UI/UX Design Fundamentals",
    possibleRoles: ["UI Designer", "UX Designer", "Product Designer"],
    completedAt: "2024-01-20",
    progress: 100,
    username: "John Doe",
    certificateId: "UIUX-2024-045",
    thumbnail:
      "https://t4.ftcdn.net/jpg/03/08/69/75/360_F_308697506_9dsBYHXm9FwuW0qcEqimAEXUvzTwfzwe.jpg",
  },
];
