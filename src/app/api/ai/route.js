import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const body = await req.json();

    const genAI =
        new GoogleGenerativeAI(
            body.apiKey
        );

    const model =
        genAI.getGenerativeModel({
          model: "gemini-2.5-flash",
        });

    const result =
        await model.generateContent(
            body.prompt
        );

    return Response.json({
      text: result.response.text(),
    });
  } catch (error) {
    return Response.json(
        {
          error: error.message,
        },
        {
          status: 500,
        }
    );
  }
}