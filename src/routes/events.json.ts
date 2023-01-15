import { google } from 'googleapis'
import { OAuth2Client } from 'google-auth-library'

async function listEvents() {
    const credentials = JSON.parse(Buffer.from(process.env.GOOGLE_CALENDAR_KEY, 'base64').toString('utf-8'));
    const client = new OAuth2Client(process.env.GOOGLE_AUTH_CLIENT_ID, process.env.GOOGLE_AUTH_CLIENT_SECRET)
    client.setCredentials({
        refresh_token: credentials.refresh_token,
    })
    const calendar = google.calendar({ version: 'v3', auth: client });
    const res = await calendar.events.list({
        calendarId: process.env.CALENDAR_ID,
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        showDeleted: false,
        orderBy: 'startTime',
    });
    return res.data.items || []
}
  

export async function get() {
    return {
        status: 200,
        body: await listEvents(),
    }
}
