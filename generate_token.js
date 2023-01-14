import { OAuth2Client } from 'google-auth-library';
import http from 'http';
import url from 'url';
import open from 'open';
import destroyer from 'server-destroy';

function generateToken() {
  return new Promise((_, reject) => {
    const oAuth2Client = new OAuth2Client(
      process.env.GOOGLE_AUTH_CLIENT_ID,
      process.env.GOOGLE_AUTH_CLIENT_SECRET,
      'http://localhost:3000'
    );

    // Generate the url that will be used for the consent dialog.
    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: 'https://www.googleapis.com/auth/calendar.events.owned',
    });

    const server = http
      .createServer(async (req, res) => {
        try {
          // acquire the code from the querystring, and close the web server.
          const qs = new url.URL(req.url, 'http://localhost:3000')
            .searchParams;
          const code = qs.get('code');
          res.end('Authentication successful! Please return to the console.');
          server.destroy();

          // Now that we have the code, use that to acquire tokens.
          const r = await oAuth2Client.getToken(code);
          oAuth2Client.setCredentials(r.tokens);
          console.log(Buffer.from(JSON.stringify(oAuth2Client.credentials)).toString('base64'));
        } catch (e) {
          reject(e);
        }
      })
      .listen(3000, () => {
        // open the browser to the authorize url to start the workflow
        open(authorizeUrl, {wait: false}).then(cp => cp.unref());
      });
    destroyer(server);
  });
}

generateToken().catch(console.error);
