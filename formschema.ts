// src/schemas/formSchema.ts
import { z } from "zod";

// Define the validation schema for resume form
export const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  fullName: z.string().min(1, "Full Name is required"),
  summary: z.string().min(1, "Summary is required"),
  experience: z.string().min(1, "Experience is required"),
  education: z.string().min(1, "Education is required"),
  skills: z.string().min(1, "Skills are required"),
});

export type ResumeFormValues = z.infer<typeof formSchema>;
