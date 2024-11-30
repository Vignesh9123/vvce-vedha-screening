import { CourseGrid } from "@/components/courses/CourseGrid";
import { userCourses } from "./data";

export default function CoursesPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Completed Courses</h1>
        <p className="text-muted-foreground mt-2">
          View your completed courses and take mock tests to practice for
          interviews
        </p>
      </div>
      <CourseGrid courses={userCourses} />
    </div>
  );
}
