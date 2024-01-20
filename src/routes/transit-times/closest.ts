import fs from "fs";
import type { RequestEvent } from "@sveltejs/kit";


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


export async function get({ request }: RequestEvent) {
    const url = new URL(request.url);
    const lat = parseFloat(url.searchParams.get("lat"));
    const lon = parseFloat(url.searchParams.get("lon"));
    const stops = await listDir("static/stops");
    const stopData = await Promise.all(stops.map(async filename => {
        const fileData = await readFile(`static/stops/${filename}`);
        return JSON.parse(fileData.toString());
    }));
    const closestStop = stopData.reduce((closest, stop) => {
        const distance = Math.sqrt(Math.pow(lat - stop.lat, 2) + Math.pow(lon - stop.lon, 2));
        console.log(distance, closest.distance);
        if (distance < closest.distance) {
            return { stop, distance };
        }
        return closest;
        }, { stop: null, distance: Infinity }
    );
    return {
        status: 302,
        headers: {
        location: `/transit-times/stops/${closestStop.stop.stpid}`,
            "cache-control": "no-cache",
        },
    };
}
