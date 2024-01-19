import fs from "fs";
import YAML from "yaml";
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
    const file = join(resolve(), `content/campaigns/${slug}.yml`);
    const body = YAML.parse((await readFile(file)).toString());

    return {
        body,
    };
}
