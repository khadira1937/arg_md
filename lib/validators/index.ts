import { z } from "zod";

export const emailSchema = z.string().email("Enter a valid email address");

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(100)
  .regex(/[a-z]/, "Include a lowercase letter")
  .regex(/[A-Z]/, "Include an uppercase letter")
  .regex(/[0-9]/, "Include a number");

export const registerSchema = z
  .object({
    name: z.string().min(2, "Enter your name").max(80),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Enter your password"),
});

export const forgotPasswordSchema = z.object({ email: emailSchema });

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const billingCycleEnum = z.enum([
  "MONTHLY",
  "QUARTERLY",
  "SEMIANNUAL",
  "ANNUAL",
  "BIENNIAL",
]);

export const addToCartSchema = z.object({
  planId: z.string().min(1),
  billingCycle: billingCycleEnum,
  locationId: z.string().optional().nullable(),
  quantity: z.coerce.number().int().min(1).max(20).default(1),
  addonIds: z.array(z.string()).optional().default([]),
});

export const profileSchema = z.object({
  name: z.string().min(2).max(80),
  company: z.string().max(120).optional().or(z.literal("")),
  phone: z.string().max(40).optional().or(z.literal("")),
  address: z.string().max(160).optional().or(z.literal("")),
  city: z.string().max(80).optional().or(z.literal("")),
  state: z.string().max(80).optional().or(z.literal("")),
  country: z.string().max(80).optional().or(z.literal("")),
  postalCode: z.string().max(20).optional().or(z.literal("")),
  taxId: z.string().max(40).optional().or(z.literal("")),
});

export const ticketSchema = z.object({
  subject: z.string().min(4, "Add a subject").max(160),
  category: z.string().min(1).default("general"),
  priority: z.enum(["LOW", "NORMAL", "HIGH", "URGENT"]).default("NORMAL"),
  message: z.string().min(10, "Describe your issue").max(5000),
  serviceInstanceId: z.string().optional().nullable(),
});

export const ticketReplySchema = z.object({
  ticketId: z.string().min(1),
  body: z.string().min(1, "Write a reply").max(5000),
});

export const contactSchema = z.object({
  name: z.string().min(2).max(80),
  email: emailSchema,
  subject: z.string().min(2).max(160),
  message: z.string().min(10).max(5000),
});

export const couponSchema = z.object({
  code: z.string().min(2).max(40),
});

export const inquirySchema = z.object({
  name: z.string().min(2).max(80),
  email: emailSchema,
  company: z.string().max(120).optional().or(z.literal("")),
  productSlug: z.string().min(1),
  message: z.string().min(10).max(5000),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
