import fs from "fs";
import matter from "gray-matter";
import { resolve, join } from "path";

function readFile(path: fs.PathLike): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    fs.readFile(path, (err, contents) => {
      if (err) reject(err)
      else resolve(contents)
    });
  });
}

export async function get({ params }) {
    const { slug } = params;
    const file = join(resolve(), `content/policy/${slug}.md`);
    const obj = matter(await readFile(file));

    return {
        body: obj,
    };
}
