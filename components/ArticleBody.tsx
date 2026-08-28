function isBulletBlock(block: string) {
  const lines = block.split("\n").filter((l) => l.trim() !== "");
  return lines.length > 0 && lines.every((l) => l.trim().startsWith("- "));
}

export function ArticleBody({ text }: { text: string }) {
  const blocks = text.split(/\n\n+/).filter((b) => b.trim() !== "");

  return (
    <div className="space-y-4">
      {blocks.map((block, i) => {
        if (isBulletBlock(block)) {
          const items = block
            .split("\n")
            .map((l) => l.trim())
            .filter((l) => l !== "")
            .map((l) => l.replace(/^-\s*/, ""));
          return (
            <ul key={i} className="list-disc space-y-1.5 rounded-xl bg-[#f5f6f6] p-4 pl-9 text-[14.5px] leading-relaxed text-[#374151] sm:p-5 sm:pl-10">
              {items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="whitespace-pre-line text-[15px] leading-[1.9] text-[#40444d]">
            {block}
          </p>
        );
      })}
    </div>
  );
}
