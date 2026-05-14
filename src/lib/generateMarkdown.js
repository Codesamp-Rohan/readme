export function generateMarkdown(blocks) {
  let markdown = "";

  blocks.forEach((block) => {
    switch (block.type) {
      case "hero":
        markdown += `# ${block.content.title}\n\n`;
        markdown += `${block.content.description}\n\n`;
        break;

      case "skills":
        markdown += `## Skills\n\n`;

        block.content.skills?.forEach((skill) => {
          markdown += `- ${skill}\n`;
        });

        markdown += "\n";

        break;
    }
  });

  return markdown;
}