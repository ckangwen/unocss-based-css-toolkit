import { e, isAttributifySelector } from "@unocss/core";

export function getMatchedPositions(code: string, matched: string[]) {
  const result: [number, number, string][] = [];
  const attributify: RegExpMatchArray[] = [];
  const plain = new Set<string>();

  Array.from(matched).forEach((v) => {
    const match = isAttributifySelector(v);
    if (!match) {
      plain.add(v);
    } else if (!match[2]) {
      plain.add(match[1]);
    } else {
      attributify.push(match);
    }
  });

  // hightlight for plain classes
  let start = 0;
  code.split(/[\s"'`;<>]/g).forEach((i) => {
    const end = start + i.length;
    if (plain.has(i)) {
      result.push([start, end, i]);
    }
    start = end + 1;
  });

  // attributify values
  attributify.forEach(([, name, value]) => {
    const regex = new RegExp(
      `(${e(name)}=)(['"])[^\\2]*?${e(value)}[^\\2]*?\\2`,
      "g"
    );
    Array.from(code.matchAll(regex)).forEach((match) => {
      const escaped = match[1];
      const body = match[0].slice(escaped.length);
      const bodyIndex = body.indexOf(value);
      if (bodyIndex < 0) {
        return;
      }
      const start = match.index! + escaped.length + bodyIndex;
      const end = start + value.length;
      result.push([start, end, `[${name}="${value}"]`]);
    });
  });

  return result;
}
