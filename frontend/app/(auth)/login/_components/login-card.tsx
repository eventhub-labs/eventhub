import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";
import LoginForm from "./login-form";

type LoginFormProps = {
  className?: string;
};

export default function LoginCard({ className }: LoginFormProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-center text-xl font-bold">
          Welcome back!
        </CardTitle>
        <CardDescription className="text-center">
          Login into your EventHub account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <LoginForm />
        <div className="mt-1 text-center">
          <span className="text-muted-foreground mr-2 text-xs">
            Don&apos;t have an account?
          </span>
          <Link
            href="#"
            className="mt-2 ml-auto inline-block text-xs underline-offset-4 hover:underline"
          >
            Create account
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
