/*global module:false */

var log = require('./log');
var Cookie = require('tiny-cookie');

var COOKIE_NAME = 'cid';

/**
 * The Auth class holds 'token' and 'secret'
 * values, plus exports the interface to the client
 * UUID (or 'vid') value that should be unique
 * to this client.
 */

var localCid = '';

var Auth = function(token, secret) {
  this.token = token;
  this.secret = secret;
};

/**
 * True if the client will let us set cookies.
 * This value is 
 */

Auth._cookiesEnabled = Cookie.enabled();
Auth.cookiesEnabled = function() {
  return Auth._cookiesEnabled;
};

/**
 * Persist client UUID as a cookie and save it for signed
 * requests.
 */

Auth.setClientUUID = function(cid) {
  if (Auth.cookiesEnabled()) {
    log('cookies are enabled, so setting cookie "' + COOKIE_NAME + '"="' + cid + '"');

    Cookie.set(COOKIE_NAME, cid, { expires: 3650, path: '/' });

  } else {
    log('cookies are not enabled, so saving cid to global value ="' + cid + '"');

    localCid = cid;
  }
};

Auth.getClientUUID = function() {
  if (Auth.cookiesEnabled()) {
    return Cookie.get(COOKIE_NAME);
  } else {
    return localCid;
  }
};

/**
 * Delete the persisted UUID cookie
 */

Auth.deleteClientUUID = function() {
  if (Auth.cookiesEnabled()) {
    Cookie.remove(COOKIE_NAME);
  } else {
    localCid = null;
  }
};

module.exports = Auth;
