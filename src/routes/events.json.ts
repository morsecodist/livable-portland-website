import { google } from 'googleapis';

async function listEvents() {
    const credentials = JSON.parse(Buffer.from(process.env.GOOGLE_CALENDAR_KEY, 'base64').toString('utf-8'));
    credentials.type = 'authorized_user';
    const auth = google.auth.fromJSON(credentials);
    const calendar = google.calendar({version: 'v3', auth});
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
