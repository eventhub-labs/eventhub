import { HexagonBackground } from "@/components/animate-ui/components/backgrounds/hexagon";
import { ModeToggle } from "@/components/mode-toggle";

export default async function Layout({ children }: LayoutProps<"/">) {
  return (
    <div className="relative flex h-screen max-h-screen w-screen items-center justify-center gap-x-12">
      {children}

      <HexagonBackground className="absolute inset-0" />
      <ModeToggle className="absolute right-8 bottom-8" />
    </div>
  );
}
