import fs from "fs";
import matter from "gray-matter";
import { resolve, join } from "path";

function listDir(path: fs.PathLike): Promise<string[]> {
  return new Promise<string[]>((resolve, reject) => {
    fs.readdir(path, (err, contents) => {
      if (err) reject(err)
      else resolve(contents)
    });
  });
}

function readFile(path: fs.PathLike): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    fs.readFile(path, (err, contents) => {
      if (err) reject(err)
      else resolve(contents)
    });
  });
}


export async function get() {
    const files = await listDir(join(resolve(), "content/ideas"));
    const posts = await Promise.all(files.map(async filename => {
        const fileData = await readFile(join(resolve(), `content/ideas/${filename}`));
        const obj = matter(fileData).data;
        obj.slug = filename.substring(0, filename.length - 3);
        return obj;
    }));

    return {
        body: posts,
    };
}
