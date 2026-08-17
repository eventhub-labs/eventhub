import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import RegisterForm from "./register-form";

type RegisterCardProps = {
  className?: string;
};

export default function RegisterCard({ className }: RegisterCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-center text-xl font-bold">
          Create your account
        </CardTitle>
        <CardDescription className="text-center">
          Join EventHub to start planning
        </CardDescription>
      </CardHeader>

      <CardContent>
        <RegisterForm />
      </CardContent>
    </Card>
  );
}
