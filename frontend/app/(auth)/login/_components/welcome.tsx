import { ShieldCheck } from "lucide-react";
import Logo from "@/components/ui/logo";

export default function Welcome() {
  return (
    <div className="flex w-60 flex-col">
      <Logo />

      <h1 className="mt-8 text-3xl font-semibold">
        Plan together. <br /> Make it happen.
      </h1>

      <p className="text-muted-foreground mt-6">
        EventHub helps teams and communities plan events, vote on dates, assign
        tasks and stay aligned
      </p>

      <div className="bg-muted/75 border-muted mt-auto flex gap-x-3 border p-3">
        <ShieldCheck size={36} className="shrink-0" />

        <div className="text-xs">
          <span className="font-semibold">EventHub requires an account</span>

          <p className="text-muted-foreground mt-3">
            All features are available{" "}
            <span className="font-semibold">after you log in.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
