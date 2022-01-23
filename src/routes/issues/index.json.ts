import fs from "fs";
import matter from "gray-matter";

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
    const files = await listDir(`${__dirname}/content/issues`);
    const posts = await Promise.all(files.map(async filename => {
        const fileData = await readFile(`${__dirname}/content/issues/${filename}`);
        const obj = matter(fileData).data;
        obj.slug = filename.substr(0, filename.length - 3);
        return obj;
    }));

    return {
        body: posts,
    };
}
