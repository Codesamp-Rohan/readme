export async function askAI(
    prompt,
    apiKey
) {
  const res = await fetch("/api/ai", {
    method: "POST",
    headers: {
      "Content-Type":
          "application/json",
    },
    body: JSON.stringify({
      prompt,
      apiKey,
    }),
  });

  return res.json();
}