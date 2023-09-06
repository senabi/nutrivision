import { productSchema } from "~/lib/validators";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import OpenAI from "openai";
import { env } from "~/env.mjs";

// function formatToScoreQuery(objectives: string, ingredients: string) {
//   const score_prompt = `dado el objetivo nutricional de una persona que es ${objectives} dame un score del 1 al 3 donde 1 significa que el producto perjudica al objetivo, 2 que no lo perjudica pero tampoco ayuda y 3 que si ayuda, retorna unicamente un JSON {'score': 'value'}`;
//   return score_prompt + peticion + ingredients;
// }
// const peticion =
//   ", usare tu respuesta para un programa que no tiene preprocesamiento. Aqui esta la informacion nutricional del producto: ";

// function formatToScoreQuery(objectives: string, ingredients: string) {
//   const score_prompt = `dado el objetivo nutricional de una persona que es ${objectives} dame un score del 1 al 3 donde 1 significa que el producto perjudica al objetivo, 2 que no lo perjudica pero tampoco ayuda y 3 que si ayuda, retorna unicamente un JSON {'score': 'value'}`;
//   return score_prompt + peticion + ingredients;
// }

export const openaiRouter = createTRPCRouter({
  getFamilyScore: publicProcedure
    .input(
      z.object({
        product: productSchema,
      }),
    )
    .query(async ({ input, ctx }) => {
      const openai = new OpenAI({
        apiKey: env.OPENAI_API_KEY,
      });
      const family = await ctx.prisma.familyMember.findMany();
      const content = `Estos son los valores nutricionales del producto ${JSON.stringify(
        input.product,
      )}. Para cada miembro de la familia estos son sus objetivos nutricionales: ${JSON.stringify(
        family.map(
          (member) =>
            `${member.name} tiene los siguientes objetivos: ${member.goals} ${
              member.diseases
                ? `y tiene las siguientes enfermedades: ${member.diseases}`
                : ""
            } responde con el nombre de la persona y un emoyi donde  😢 significa que el producto perjudica al objetivo, 👌 que no lo perjudica pero tampoco ayuda,  🤤que si ayuda y 😷 que no puede consumirlo por enfermedades. el formato en el que me daras la respuesta es el siguiente nombre : emoji, razon y un salto de linea"`,
        ),
      )}
            `;
      console.log('QUESTION: ',content);
      const res = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        stream: false,
        messages: [
          {
            role: "system",
            content: "Eres un nutricionista directo, responde de forma corta",
          },
          {
            role: "user",
            content,
          },
        ],
      });
      console.log("\n\n\n\n", res.choices.at(0)?.message.content);
      return res.choices.at(0)?.message.content;
    }),
  // getAll: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.example.findMany();
  // }),
});
