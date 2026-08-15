import { ModeToggle } from "@/components/mode-toggle";
import RegisterCard from "./_components/register-card";

export default async function RegisterPage() {
  return (
    <div className="relative flex h-screen max-h-screen w-screen items-center justify-center">
      <RegisterCard className="w-96" />

      <ModeToggle className="absolute right-8 bottom-8" />
    </div>
  );
}
