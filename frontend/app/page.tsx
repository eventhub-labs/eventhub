import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-background flex flex-col gap-3 justify-center items-center">
      <h1 className="text-4xl font-bold text-foreground">BUTTON</h1>
      <Button variant="default" size="lg">
        Click me
      </Button>
    </div>
  );
}
