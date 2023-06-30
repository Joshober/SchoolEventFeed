

import {ok, notFound, serverError} from 'wix-http-functions';
import wixData from 'wix-data';
import {FillandClear} from 'backend/Together';

// URL looks like:
// https://www.mysite.com/_functions/myFunction/John/Doe
// or:
// https://user.wixsite.com/mysite/_functions/myFunction/John/Doe
export async function get_Events(request) {
  await FillandClear();
  let options = {
    "headers": {
      "Content-Type": "application/json"
    }
  };
  // query a collection to find matching items
  return wixData.query("Events")
    .eq("onPresnece",(!true))
    .find()
    .then( (results) => {
      // matching items were found
      if(results.items.length > 0) {
        options.body = {
          "items": results.items
        };
        return ok(options);
      }
      // no matching items found
      options.body = {
        "error": `'${request.path[0]} ${request.path[1]}' was not found`
      };
      return notFound(options);
    } )
    // something went wrong
    .catch( (error) => {
      options.body = {
        "error": error
      };
      return serverError(options);
    } );
}
