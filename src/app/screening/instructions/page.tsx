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
import PermissionCheck from "@/components/screening/PermissionCheck";

export default function InstructionsPage() {
  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>AI Interview Screening Instructions</CardTitle>
          <CardDescription>
            Please read carefully and grant the necessary permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2">
            <li>Ensure you are in a quiet environment</li>
            <li>Make sure your camera and microphone are working</li>
            <li>Be prepared to share your screen if required</li>
            <li>Answer questions clearly and concisely</li>
            <li>The interview will be recorded for review purposes</li>
            <li>The screening will be conducted in full-screen mode</li>
            <li>
              Excessive tab switching may be flagged as suspicious behavior
            </li>
          </ol>
          <PermissionCheck />
        </CardContent>
        <CardFooter>
          <Link href="/screening" passHref>
            <Button>Start Screening</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
