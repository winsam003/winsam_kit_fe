// Colors follow named objects/arrays; anonymous array entries retain their DTO color.
export function getJsonHighlightLines(formatted: string) {
  const colors = new Map<string, number>();
  const stack: (number | undefined)[] = [];

  return formatted.split("\n").map((text) => {
    const trimmed = text.trim();
    const closing = /^[}\]]/.test(trimmed);
    let color = stack.at(-1);
    const property = trimmed.match(/^("(?:[^"\\]|\\.)*"):\s*(.*)$/);

    if (property) {
      const key: string = JSON.parse(property[1]);
      if (/^[{\[]/.test(property[2]) || /dto/i.test(key)) {
        if (!colors.has(key)) colors.set(key, colors.size);
        color = colors.get(key);
      }
    }

    if (closing) stack.pop();
    if (/[{\[]$/.test(trimmed)) stack.push(color);

    return { text, color, keyLength: property?.[1].length ?? 0 };
  });
}
