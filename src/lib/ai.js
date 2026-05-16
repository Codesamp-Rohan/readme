export async function askAI(prompt) {
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "";

  const res = await fetch(`${baseUrl}/api/ai`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
    }),
  });

  return res.json();
}