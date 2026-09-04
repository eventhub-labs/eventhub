"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import z from "zod";

const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .nonempty("This field cannot be empty")
    .max(255, "Max password length is 255 numbers"),
  newPassword: z
    .string()
    .min(8, "Min password length is 8 symbols")
    .max(255, "Max password length is 255 numbers")
    .regex(/[A-Z]/, "Need uppercase")
    .regex(/[0-9]/, "Need number")
    .regex(/[^A-Za-z0-9]/, "Need special char"),
  confirmPassword: z.string().min(8).max(255),
});

export default function ChangePasswordForm() {
  const form = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: changePasswordSchema,
    },
    onSubmit: async ({ value }) => {},
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <div className="flex flex-col gap-y-3 px-4 pt-4">
        <FieldGroup>
          <form.Field
            name="currentPassword"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid} className="gap-0.5">
                  <FieldLabel htmlFor={field.name}>
                    Your current password
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="********"
                    autoComplete="off"
                    type="password"
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
            name="newPassword"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid} className="gap-0.5">
                  <FieldLabel htmlFor={field.name}>New password</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="********"
                    autoComplete="off"
                    type="password"
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
            name="confirmPassword"
            validators={{
              onChangeListenTo: ["newPassword"],
              onChange: ({ value, fieldApi }) => {
                if (value !== fieldApi.form.getFieldValue("newPassword")) {
                  return "Passwords do not match";
                }
                return undefined;
              },
            }}
            // eslint-disable-next-line react/no-children-prop
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid} className="gap-0.5">
                  <FieldLabel htmlFor={field.name}>Repeat Password</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="********"
                    autoComplete="off"
                    type="password"
                  />
                  {isInvalid && (
                    <FieldError
                      errors={field.state.meta.errors.map((err) => {
                        if (typeof err === "string") {
                          return {
                            message: err,
                          };
                        } else {
                          return undefined;
                        }
                      })}
                      className="text-xs"
                    />
                  )}
                </Field>
              );
            }}
          />
        </FieldGroup>
        <Button
          variant="destructive"
          type="submit"
          className="mt-3 w-full"
          disabled={form.state.isSubmitting}
        >
          <span className="text-sm font-bold">Change Password</span>
        </Button>
      </div>
    </form>
  );
}
