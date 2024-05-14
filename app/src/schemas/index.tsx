import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("O e-mail é obrigatório !"),
  password: z
    .string()
    .min(1, "A senha é obrigatória!"),
});

export type TLoginFormValue = z.infer<typeof LoginSchema>;