"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import login from "@/features/auth/login";
import { useUser } from "@/store/user";
import { IResponseUser } from "@/types";
import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { redirect } from "next/navigation";
import z from "zod";

const loginFormSchema = z.object({
  email: z.email(),
  password: z.string().nonempty("Password field cannot be empty"),
});

export default function LoginForm() {
  const { setUser } = useUser();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginFormSchema,
    },
    onSubmit: async ({ value }) => {
      const formData = new FormData();
      formData.set("email", value.email);
      formData.set("password", value.password);
      const user = (await login(formData)) as IResponseUser | null;

      console.log(user);

      if (!user) {
        return;
      }

      setUser(user);
      redirect("/dashboard");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      id="login-form"
    >
      <div className="flex flex-col gap-6">
        <FieldGroup>
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
                    placeholder="example@mail.com"
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
        <div className="grid gap-1">
          <FieldGroup>
            <form.Field
              name="password"
              // eslint-disable-next-line react/no-children-prop
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid} className="gap-0.5">
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="*********"
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
          <Link
            href="#"
            className="mt-2 ml-auto inline-block text-xs underline-offset-4 hover:underline"
          >
            Forgot your password?
          </Link>
        </div>
        <Button type="submit" disabled={form.state.isSubmitting}>
          <span className="text-sm font-bold">Log In</span>
        </Button>
      </div>
    </form>
  );
}
