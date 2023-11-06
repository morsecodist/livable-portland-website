export async function handle({ event, resolve }) {
  const oldBase = 'livableportland.me';
  const newBase = 'urbanistportland.me';
  
  // Check if the request is for the old domain
  if (event.url.host === oldBase) {
    event.url.host = newBase;
    return Response.redirect(event.url.href, 301); // Permanent redirect
  }

  // Proceed with the regular request handling if the host doesn't match the old domain
  const response = await resolve(event);
  return response;
}
