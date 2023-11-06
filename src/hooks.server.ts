// src/hooks.server.js

export async function handle({ request, resolve }) {
  const oldBase = 'https://livableportland.me';
  const newBase = 'https://urbanistportland.me';
  
  // Check if the request is for the old domain
  if (request.headers.host === oldBase) {
    // Redirect to the new domain while preserving the path and query
    const newUrl = newBase + request.path + (request.query ? '?' + request.query : '');
    return Response.redirect(newUrl, 301); // Permanent redirect
  }

  // Proceed with the regular request handling if the host doesn't match the old domain
  const response = await resolve(request);
  return response;
}

