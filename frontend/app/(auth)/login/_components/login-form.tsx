import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

type LoginFormProps = {
  className?: string;
};

export default function LoginForm({ className }: LoginFormProps) {
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
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-1">
              <div className="flex items-center">
                <Label htmlFor="password" className="mt-2">
                  Password
                </Label>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="●●●●●●●●●●"
                required
              />
              <Link
                href="#"
                className="mt-2 ml-auto inline-block text-xs underline-offset-4 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Button type="submit">
              <span className="text-sm font-bold">Log In</span>
            </Button>
          </div>
        </form>
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
