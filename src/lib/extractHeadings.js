export function extractHeadings(markdown) {
  const lines = markdown.split("\n");

  const headings = lines
    .filter((line) => /^#{1,6}\s/.test(line))
    .map((line) => {
      const level = line.match(/^#+/)[0].length;

      return {
        level,
        text: line.replace(/^#+\s*/, ""),
        children: [],
      };
    });

  const tree = [];
  const stack = [];

  for (const heading of headings) {
    while (
      stack.length &&
      stack[stack.length - 1].level >= heading.level
    ) {
      stack.pop();
    }

    if (stack.length === 0) {
      tree.push(heading);
    } else {
      stack[stack.length - 1].children.push(heading);
    }

    stack.push(heading);
  }

  return tree;
}