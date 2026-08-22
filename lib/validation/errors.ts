import { z } from "zod";

export class ContentValidationError extends Error {
  readonly file_path: string;
  readonly issues: z.core.$ZodIssue[];

  constructor(file_path: string, issues: z.core.$ZodIssue[]) {
    super(formatValidationIssues(file_path, issues));
    this.name = "ContentValidationError";
    this.file_path = file_path;
    this.issues = issues;
  }
}

export function formatValidationIssues(file_path: string, issues: z.core.$ZodIssue[]): string {
  const details = issues
    .map((issue) => {
      const path = issue.path.length > 0 ? issue.path.join(".") : "document";
      return `- ${path}: ${issue.message}`;
    })
    .join("\n");

  return `Contenu invalide dans ${file_path}:\n${details}`;
}
