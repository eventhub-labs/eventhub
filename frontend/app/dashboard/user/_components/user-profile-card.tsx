import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageUp } from "lucide-react";
import Image from "next/image";

const UserProfileField = ({
  fieldName,
  fieldValue,
}: {
  fieldName: string;
  fieldValue: string | number;
}) => {
  return (
    <div className="flex flex-col gap-y-1">
      <span className="text-muted-foreground text-sm">{fieldName}:</span>
      <p className="text-[16px]">{fieldValue}</p>
    </div>
  );
};

const UserProfileFieldSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-1">
      <Skeleton className="h-5 w-16" />
      <Skeleton className="h-6 w-50" />
    </div>
  );
};

export function UserProfileCardSkeleton() {
  return (
    <Card className="border-muted w-100 shrink-0 border-2 bg-transparent p-0">
      <CardHeader className="bg-accent flex flex-col items-center gap-y-2 border-b p-8">
        <Skeleton className="bg-accent-foreground h-25 w-25 rounded-full" />
        <Skeleton className="bg-accent-foreground h-5 w-32" />
        <Skeleton className="bg-accent-foreground h-4 w-16" />
      </CardHeader>

      <CardContent className="flex flex-col gap-y-4 pb-8">
        <UserProfileFieldSkeleton />

        <UserProfileFieldSkeleton />
      </CardContent>
    </Card>
  );
}

type UserProfileCardProps = {
  imgSrc: string | null;
  name: string;
  surname: string;
  username: string;
  email: string;
  phone?: string;
};

export default function UserProfileCard({
  email,
  name,
  surname,
  username,
  phone,
  imgSrc,
}: UserProfileCardProps) {
  return (
    <Card className="border-muted w-100 shrink-0 border-2 bg-transparent p-0">
      <CardHeader className="bg-accent flex flex-col items-center gap-y-1 border-b p-8">
        <div className="relative">
          <Image
            className="h-25 w-25"
            src={imgSrc || "/img/no-user.png"}
            alt="user image"
            width={100}
            height={100}
          />
          <Button
            variant="default"
            size="icon-xs"
            className="absolute right-0 bottom-0 rounded-full"
          >
            <ImageUp />
          </Button>
        </div>
        <h2 className="mt-3 text-2xl font-bold">
          {name} {surname}
        </h2>
        <h5 className="text-muted-foreground">@{username}</h5>
      </CardHeader>

      <CardContent className="flex flex-col gap-y-4 pb-8">
        <UserProfileField fieldName="Email" fieldValue={email} />

        <UserProfileField fieldName="Phone" fieldValue={phone || "Empty"} />
      </CardContent>
    </Card>
  );
}
