import type { RequestEvent } from "@sveltejs/kit";
import { v4 as uuidv4 } from 'uuid';

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export async function post({ request }: RequestEvent) {
    const obj = await request.json()    
    if (Object.keys(obj).length !== 3) return { status: 400 };
    if (!obj["email"] || !obj["name"] || !obj["listName"]) return { status: 400 };

    const approvedLists = ["ucp-general", "reclaim-franklin"];
    if (!approvedLists.includes(obj["listName"])) return { status: 400 };

    const prefix = `mailing-list-signups/${obj["listName"]}`;
    
    const email_blocklist = process.env.EMAIL_BLOCKLIST ? process.env.EMAIL_BLOCKLIST.split(",") : [];
    const email_domain_blocklist = process.env.EMAIL_DOMAIN_BLOCKLIST ? process.env.EMAIL_DOMAIN_BLOCKLIST.split(",") : [];

    const email = obj["email"];
    const domain = email.split("@")[1];
    if (email_blocklist.includes(email) || email_domain_blocklist.includes(domain)) return { status: 400 };


    obj["timestamp"] = (new Date()).toISOString();
    const client = new S3Client({
        endpoint: process.env.ENDPOINT,
        region: "nyc3"
    });
    await client.send(new PutObjectCommand({
        Bucket: "morsecodist-backups",
        Key: `${prefix}/${uuidv4()}.json`,
        Body: JSON.stringify(obj),
    }));

    return {
        status: 200,
    }
}
