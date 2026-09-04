"use client";

import { PhoneInput } from "@/components/reui/phone-input";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import updateProfile from "@/features/user/update-profile";
import { useUser } from "@/store/user";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import z from "zod";

type UserProfileEditFormProps = {
  name: string;
  surname: string;
  username: string;
  email: string;
  phone?: string;
};

const editFormSchema = z.object({
  email: z.email().max(255, "Max name length is 255 symbols"),
  userName: z
    .string()
    .min(3, "Min username length is 3 symbols")
    .max(30, "Max name length is 30 symbols"),
  name: z
    .string()
    .nonempty("Field name cannot be empty")
    .max(50, "Max name length is 50 symbols"),
  surname: z
    .string()
    .nonempty("Field name cannot be empty")
    .max(50, "Max name length is 50 symbols"),
  phone: z.string().regex(/^\+[1-9]\d{7,14}$/, "Incorrect phone number"),
});

export default function UserProfileEditForm({
  name,
  surname,
  username,
  email,
  phone,
}: UserProfileEditFormProps) {
  const accessToken = useUser((state) => state.user?.accessToken);
  const setUser = useUser((state) => state.setUser);

  const form = useForm({
    defaultValues: {
      name: name,
      surname: surname,
      userName: username,
      email: email,
      phone: phone,
    },
    validators: {
      onSubmit: editFormSchema,
    },
    onSubmit: async ({ value }) => {
      if (!accessToken) {
        return;
      }
      const formData = new FormData();
      formData.set("name", value.name);
      formData.set("surname", value.surname);
      formData.set("username", value.userName);
      formData.set("email", value.email);
      formData.set("phone", value.phone || "");

      const res = await updateProfile(formData, accessToken);

      if (res?.status === 200) {
        setUser({ accessToken, ...res.data });
        toast.success("Profile data has been updated");
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      id="user-profile-edit-form"
    >
      <div className="flex flex-col gap-y-3 px-4 pt-4">
        <FieldGroup>
          <form.Field
            name="name"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid} className="gap-0.5">
                  <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Your name"
                    autoComplete="off"
                  />
                  {isInvalid && (
                    <FieldError
                      errors={field.state.meta.errors}
                      className="text-xs"
                    />
                  )}
                </Field>
              );
            }}
          />
        </FieldGroup>
        <FieldGroup>
          <form.Field
            name="surname"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid} className="gap-0.5">
                  <FieldLabel htmlFor={field.name}>Surname</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Your name"
                    autoComplete="off"
                  />
                  {isInvalid && (
                    <FieldError
                      errors={field.state.meta.errors}
                      className="text-xs"
                    />
                  )}
                </Field>
              );
            }}
          />
        </FieldGroup>
        <FieldGroup>
          <form.Field
            name="userName"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid} className="gap-0.5">
                  <FieldLabel htmlFor={field.name}>Username</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Your name"
                    autoComplete="off"
                  />
                  {isInvalid && (
                    <FieldError
                      errors={field.state.meta.errors}
                      className="text-xs"
                    />
                  )}
                </Field>
              );
            }}
          />
        </FieldGroup>
        <FieldGroup className="col-span-2">
          <form.Field
            name="email"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid} className="gap-0.5">
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="example@gmail.com"
                    autoComplete="off"
                  />
                  {isInvalid && (
                    <FieldError
                      errors={field.state.meta.errors}
                      className="text-xs"
                    />
                  )}
                </Field>
              );
            }}
          />
        </FieldGroup>
        <FieldGroup>
          <form.Field
            name="phone"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid} className="gap-0.5">
                  <FieldLabel htmlFor={field.name}>Phone </FieldLabel>
                  <PhoneInput
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      field.handleChange(e);
                    }}
                    aria-invalid={isInvalid}
                    placeholder=""
                    autoComplete="off"
                  />
                  {isInvalid && (
                    <FieldError
                      errors={field.state.meta.errors}
                      className="text-xs"
                    />
                  )}
                </Field>
              );
            }}
          />
        </FieldGroup>
        <Button
          type="submit"
          className="mt-3 w-full"
          disabled={form.state.isSubmitting}
        >
          <span className="text-sm font-bold">Edit</span>
        </Button>
      </div>
    </form>
  );
}
