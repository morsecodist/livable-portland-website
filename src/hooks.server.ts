export async function handle({ event, resolve }) {
  const oldBase = 'https://livableportland.me';
  const newBase = 'https://urbanistportland.me';
  
  // Check if the request is for the old domain
  if (event.request.headers.host === oldBase) {
    // Redirect to the new domain while preserving the path and query
    const newUrl = newBase + event.request.path + (event.request.query ? '?' + event.request.query : '');
    return Response.redirect(newUrl, 301); // Permanent redirect
  }

  // Proceed with the regular request handling if the host doesn't match the old domain
  const response = await resolve(event);
  return response;
}
