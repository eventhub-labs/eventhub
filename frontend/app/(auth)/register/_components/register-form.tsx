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
import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import z from "zod";

const registerFormSchema = z.object({
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
  password: z
    .string()
    .min(8, "Min password length is 8 symbols")
    .max(255, "Max password length is 255 numbers")
    .regex(/[A-Z]/, "Need uppercase")
    .regex(/[0-9]/, "Need number")
    .regex(/[^A-Za-z0-9]/, "Need special char"),
  confirmPassword: z.string().min(8).max(255),
});

export default function RegisterForm() {
  const form = useForm({
    defaultValues: {
      email: "",
      userName: "",
      name: "",
      surname: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: registerFormSchema,
    },
    onSubmit: async ({ value }) => {},
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      id="register-form"
    >
      <div className="grid grid-cols-2 gap-3">
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
                    placeholder="Your Surname"
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
                  <FieldLabel htmlFor={field.name}>Nickname</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="user"
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
                  <FieldLabel htmlFor={field.name}>
                    Phone{" "}
                    <span className="text-muted-foreground text-[10px]">
                      (not required)
                    </span>
                  </FieldLabel>
                  <PhoneInput
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      console.log(e);
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
              onChangeListenTo: ["password"],
              onChange: ({ value, fieldApi }) => {
                if (value !== fieldApi.form.getFieldValue("password")) {
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
      </div>
      <Button type="submit" className="mt-5 w-full">
        <span className="text-sm font-bold">Register</span>
      </Button>
      <div className="mt-3 text-center">
        <span className="text-muted-foreground mr-2 text-xs">
          Already have an account?
        </span>
        <Link
          href="/login"
          className="mt-2 ml-auto inline-block text-xs underline-offset-4 hover:underline"
        >
          Log in
        </Link>
      </div>
    </form>
  );
}
