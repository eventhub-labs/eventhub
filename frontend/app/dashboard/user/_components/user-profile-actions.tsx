import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { KeySquare, Pen } from "lucide-react";
import UserProfileEditForm from "./user-profile-edit-form";
import ChangePasswordForm from "./change-password-form";

export function UserProfileActionsSkeleton() {
  return (
    <div className="flex w-75 flex-col">
      <Skeleton className="h-15" />
      <Skeleton className="h-15" />
    </div>
  );
}

type UserProfileActionsProps = {
  name: string;
  surname: string;
  username: string;
  email: string;
  phone?: string;
};

export default function UserProfileActions({
  name,
  surname,
  username,
  email,
  phone,
}: UserProfileActionsProps) {
  return (
    <Accordion className="border-muted h-min w-75 shrink-0 border-2 bg-transparent">
      <AccordionItem>
        <AccordionTrigger className="gap-x-3 px-3 hover:decoration-0">
          <Pen height={20} />
          <span>Edit Profile</span>
        </AccordionTrigger>
        <AccordionContent>
          <UserProfileEditForm
            name={name}
            surname={surname}
            phone={phone}
            username={username}
          />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem>
        <AccordionTrigger className="gap-x-3 px-3">
          <KeySquare height={20} />
          <span>Change Password</span>
        </AccordionTrigger>
        <AccordionContent>
          <ChangePasswordForm />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
