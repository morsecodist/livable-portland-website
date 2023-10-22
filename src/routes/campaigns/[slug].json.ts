import fs from "fs";
import { parse } from "yaml";
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
    const obj = parse((await readFile(file)).toString());

    // remap dateTime in each object to a Date object
    let body = obj.map((event: any) => {
      event.dateTime = new Date(event.dateTime);
      return event;
    });

    return {
        body,
    };
}
