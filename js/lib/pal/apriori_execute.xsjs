/*eslint no-console: 0, no-unused-vars: 0, dot-notation: 0*/
/*eslint-env node, es6 */
function close(o) {
  try {
    if (o) {
      o.close();
    }
  } catch (e) { /* do nothing */ }
}

function methodNotAllowed() {
  $.response.status = $.net.http.METHOD_NOT_ALLOWED;
  $.response.setBody(JSON.stringify({
    message: "Method Not Allowed"
  }));
}

function doPost() {
  var connection = null;
  var preparedStatement = null;
  try {
    // Build the SQL Query with the parameters
    var params = {};
    if (typeof $.request.body !== "undefined") {
      // Get the request body
      var requestBody = JSON.parse($.request.body.asString());
      if (typeof requestBody.MIN_SUPPORT !== "undefined") {
        params.MIN_SUPPORT = requestBody.MIN_SUPPORT;
      }
      if (typeof requestBody.MIN_CONFIDENCE !== "undefined") {
        params.MIN_CONFIDENCE =  requestBody.MIN_CONFIDENCE ;
      }
      if (typeof requestBody.MIN_LIFT !== "undefined") {
        params.MIN_LIFT = requestBody.MIN_LIFT;
      }
      if (typeof requestBody.UBIQUITOUS !== "undefined") {
        params.UBIQUITOUS =  requestBody.UBIQUITOUS ;
      }
    }

    var start = Date.now();
    connection = $.hdb.getConnection();
    var algorithm = connection.loadProcedure(null, "MovieLens.db.hdb.pal.procedures::apriori_execute");
    var results = algorithm(params);
    $.response.status = $.net.http.OK;
    $.response.setBody(JSON.stringify({
      results: results,
      message: "Process completed in : " + (Date.now() - start) + " ms"
    }));
  } catch (e) {
    $.response.setBody(JSON.stringify({
      message: e.message
    }));
    $.response.status = $.net.http.BAD_REQUEST;
  } finally {
    close(preparedStatement);
    close(connection);
  }
}
$.response.contentType = "application/json; charset=utf-16le";
switch ($.request.method) {
  case $.net.http.POST:
    doPost();
    break;
  default:
    methodNotAllowed();
    break;
}
