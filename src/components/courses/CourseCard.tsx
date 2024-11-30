"use client";

import { UserCourse } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Trophy } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

interface CourseCardProps {
  course: UserCourse;
}

export function CourseCard({ course }: CourseCardProps) {
  const router = useRouter();
  const formattedDate = new Date(course.completedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold">{course.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Completed by {getCurrentUser()?.username ||  course.username}
            </p>
          </div>
          <Trophy className="text-yellow-500 h-6 w-6" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {course.possibleRoles.map((role) => (
            <Button key={role} variant="secondary">
              {role}
            </Button>
          ))}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-2 h-4 w-4" />
          Completed on {formattedDate}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full"
          onClick={() => router.push(`/screening?course=${course.title}`)}
        >
          Take Mock Test
        </Button>
      </CardFooter>
    </Card>
  );
}