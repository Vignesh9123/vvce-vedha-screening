import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";

export default function CompletionPage() {
  return (
    <div className="container mx-auto p-4 h-screen flex items-center justify-center">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="flex flex-col items-center gap-2">
          <CardTitle>Interview Completed</CardTitle>
          <CardDescription>
            Thank you for participating in our AI interview screening process.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-lg mb-4">
            We appreciate your time and effort in completing the interview. Our
            team will carefully review your responses and get back to you with
            the next steps in the hiring process.
          </p>
          <p className="text-center text-sm text-muted-foreground">
            If you have any questions or concerns, please don&apos;t hesitate to
            contact our HR department.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/" passHref>
            <Button>Return to Home</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
