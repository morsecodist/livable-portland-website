import type { RequestEvent } from "@sveltejs/kit";
import { v4 as uuidv4 } from 'uuid';

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export async function post({ request }: RequestEvent) {
    const obj = await request.json()    
    obj["timestamp"] = (new Date()).toISOString();
    const client = new S3Client({
        endpoint: process.env.ENDPOINT,
        region: "nyc3"
    });
    client.send(new PutObjectCommand({
        Bucket: "morsecodist-backups",
        Key: `form-submissions/${uuidv4()}.json`,
        Body: JSON.stringify(obj),
    }));

    return {
        status: 200,
    }
}
