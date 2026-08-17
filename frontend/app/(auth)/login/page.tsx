import Welcome from "./_components/welcome";
import LoginCard from "./_components/login-card";

export default async function LoginPage() {
  return (
    <div className="pointer-events-none relative z-10 flex gap-x-12">
      <Welcome />

      <LoginCard className="pointer-events-auto w-80" />
    </div>
  );
}
