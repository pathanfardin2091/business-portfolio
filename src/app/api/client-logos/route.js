import { readdir } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif", ".svg"]);

function getAltText(filename) {
  return filename
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w+\b/g, (word) => {
      if (word === word.toUpperCase()) {
        return word;
      }

      if (word.length <= 3 && word === word.toLowerCase()) {
        return word.toUpperCase();
      }

      return word[0].toUpperCase() + word.slice(1);
    });
}

export async function GET() {
  const clientsDirectory = path.join(process.cwd(), "public", "clients");
  const monochromeDirectory = path.join(clientsDirectory, "monochrome");
  const [clientEntries, monochromeEntries] = await Promise.all([
    readdir(clientsDirectory, { withFileTypes: true }),
    readdir(monochromeDirectory, { withFileTypes: true }),
  ]);

  const monochromeFiles = new Set(
    monochromeEntries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name),
  );

  const logos = clientEntries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((filename) => IMAGE_EXTENSIONS.has(path.extname(filename).toLowerCase()))
    .filter((filename) => monochromeFiles.has(filename))
    .sort((first, second) => first.localeCompare(second, undefined, { sensitivity: "base" }))
    .map((filename) => ({
      src: `/clients/${filename}`,
      monochromeSrc: `/clients/monochrome/${filename}`,
      alt: getAltText(filename),
    }));

  return NextResponse.json(logos);
}
