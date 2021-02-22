const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondXML = (request, response, status, string) => {
  response.writeHead(status, { 'Content-Type': 'text/xml' });
  response.write(string);
  response.end();
};

const success = (request, response, type) => {
  if (type === 'application/json' || type === 'text/html') {
    const responseJSON = {
      message: 'This is a successful response',
    };

    return respondJSON(request, response, 200, responseJSON);
  }
  if (type === 'text/xml') {
    const responseXML = '<response><message>This is a successful response</message></response>';

    return respondXML(request, response, 200, responseXML);
  }

  throw new Error('Invalid request type');
};

const badRequest = (request, response, type, params) => {
  if (type === 'application/json' || type === 'text/html') {
    if (params.valid === 'true') {
      const responseJSON = {
        message: 'This request has the required parameters',
      };

      return respondJSON(request, response, 200, responseJSON);
    }
    const responseJSON = {
      id: 'badRequest',
      message: 'Missing valid query parameter set to true',
    };

    return respondJSON(request, response, 400, responseJSON);
  }
  if (type === 'text/xml') {
    if (params.valid === 'true') {
      const responseXML = '<response><message>This request has the required parameter</message></response>';

      return respondXML(request, response, 200, responseXML);
    }

    const responseXML = '<response><id>badRequest</id><message>This request has the required parameter</message></response>';
    return respondXML(request, response, 400, responseXML);
  }

  throw new Error('Invalid request type');
};

const unauthorized = (request, response, type, params) => {
  if (type === 'application/json' || type === 'text/html') {
    if (params.loggedIn === 'yes') {
      const responseJSON = {
        message: 'This request has the required parameters',
      };

      return respondJSON(request, response, 200, responseJSON);
    }
    const responseJSON = {
      id: 'unauthorized',
      message: 'Missing loggIn query paramter set to yes',
    };

    return respondJSON(request, response, 401, responseJSON);
  }
  if (type === 'text/xml') {
    if (params.loggedIn === 'yes') {
      const responseXML = '<response><message>This request has the required parameters</message></response>';

      return respondXML(request, response, 200, responseXML);
    }

    const responseXML = '<response><id>unauthorized</id><message>Missing loggIn query paramter set to yes</message></response>';
    return respondXML(request, response, 401, responseXML);
  }

  throw new Error('Invalid request type');
};

const forbidden = (request, response, type) => {
  if (type === 'application/json' || type === 'text/html') {
    const responseJSON = {
      message: 'You do not have access to this content',
      id: 'forbidden',
    };

    return respondJSON(request, response, 403, responseJSON);
  }
  if (type === 'text/xml') {
    const responseXML = '<response><id>forbidden</id><message>You do not have access to this content</message></response>';
    return respondXML(request, response, 403, responseXML);
  }

  throw new Error('Invalid request type');
};

const internalError = (request, response, type) => {
  if (type === 'application/json' || type === 'text/html') {
    const responseJSON = {
      message: 'Internal Server Error. Something went wrong.',
      id: 'internalError',
    };

    return respondJSON(request, response, 500, responseJSON);
  }
  if (type === 'text/xml') {
    const responseXML = '<response><id>internalError</id><message>Internal Server Error. Something went wrong.</message></response>';
    return respondXML(request, response, 500, responseXML);
  }

  throw new Error('Invalid request type');
};

const notImplemented = (request, response, type) => {
  if (type === 'application/json' || type === 'text/html') {
    const responseJSON = {
      message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
      id: 'notImplemented',
    };

    return respondJSON(request, response, 501, responseJSON);
  }
  if (type === 'text/xml') {
    const responseXML = '<response><id>notImplemented</id><message>A get request for this page has not been implemented yet. Check again later for updated content.</message></response>';
    return respondXML(request, response, 501, responseXML);
  }

  throw new Error('Invalid request type');
};

const notFound = (request, response, type) => {
  if (type === 'application/json' || type === 'text/html') {
    const responseJSON = {
      message: 'The page you are looking for was not found.',
      id: 'notFound',
    };

    return respondJSON(request, response, 404, responseJSON);
  }
  if (type === 'text/xml') {
    const responseXML = '<response><id>notFound</id><message>The page you are looking for was not found.</message></response>';
    return respondXML(request, response, 404, responseXML);
  }

  throw new Error('Invalid request type');
};

module.exports = {
  success,
  badRequest,
  notFound,
  unauthorized,
  forbidden,
  internalError,
  notImplemented,
};
