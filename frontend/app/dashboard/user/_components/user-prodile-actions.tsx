import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { KeySquare, Pen } from "lucide-react";

export function UserProfileActionsSkeleton() {
  return (
    <div className="flex w-75 flex-col">
      <Skeleton className="h-15" />
      <Skeleton className="h-15" />
    </div>
  );
}

export default function UserProfileActions() {
  return (
    <Accordion className="border-muted h-min w-75 shrink-0 border-2 bg-transparent">
      <AccordionItem>
        <AccordionTrigger className="gap-x-3 px-3">
          <Pen height={20} />
          <span>Edit Profile</span>
        </AccordionTrigger>
        <AccordionContent></AccordionContent>
      </AccordionItem>

      <AccordionItem>
        <AccordionTrigger className="gap-x-3 px-3">
          <KeySquare height={20} />
          <span>Change Password</span>
        </AccordionTrigger>
        <AccordionContent></AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
