import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'
 
export const runtime = 'edge'
 
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!
})


const peticion = ", usare tu respuesta para un programa que no tiene preprocesamiento. Aqui esta la informacion nutricional del producto: "


function formatToScoreQuery(objectives: string, ingredients: string){
  const score_prompt = `dado el objetivo nutricional de una persona que es ${objectives} dame un score del 1 al 3 donde 1 significa que el producto perjudica al objetivo, 2 que no lo perjudica pero tampoco ayuda y 3 que si ayuda, retorna unicamente un JSON {'score': 'value'}`
  return  score_prompt + peticion + ingredients
}

function formatToDiaseaseQuery(diseases: string, ingredients: string){
const disease_prompt = `dadas las enfermedades de una persona las cuales son:\n ${diseases}`+
  "dame un el valor de una variable llamada 'eatable' donde el valor sea true si la persona con las enfermedades puede comer el product y false si no deberia, "
  return disease_prompt+ ingredients;
}

type GptInput = {
  role: string,
  content: string
}

const persona = {
  role: "system",
  content: "you are a nutritionist"
}

const estados = ['🤤','👌','😢','😷'];
 
export default async function handler(req: Request, res: Response) {
  const {messages} = await req.json();
  const messages2 = messages as GptInput[];
  console.log("los mensaje sons", messages);

  const other_content = messages2.map( (item) => {
    const formatted = formatToScoreQuery("bajar de peso", item.content);
    return {...item, content: formatted}
  });

  let formattedMessages = [persona, ...other_content];
  
  formattedMessages =  formattedMessages
  console.log(formattedMessages);
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: formattedMessages,
  })
  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
}