import { ModeToggle } from "@/components/mode-toggle";
import Welcome from "./_components/welcome";
import LoginForm from "./_components/login-form";

export default async function LoginPage() {
  return (
    <div className="relative flex h-screen max-h-screen w-screen items-center justify-center">
      <div className="flex gap-x-12">
        <Welcome />

        <LoginForm className="w-80" />
      </div>
      <ModeToggle className="absolute right-8 bottom-8" />
    </div>
  );
}
