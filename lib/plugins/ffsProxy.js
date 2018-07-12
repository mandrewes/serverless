const HttpsProxyAgent = require('https-proxy-agent');
const https = require('https');
var Agent = require('agent-base');
var inherits = require('util').inherits;
const url = require('url');

module.exports = FfsProxy;

function FfsProxy(opts) {
    console.log("new FFS here");
    if (!(this instanceof FfsProxy)) return new FfsProxy(opts);
    console.log('creating new FfsProxy instance: %o', opts);
    Agent.call(this, connect);

}
inherits(FfsProxy, Agent);

function connect(req, opts, fn) {
 const proxy = process.env.proxy
      || process.env.HTTP_PROXY
      || process.env.http_proxy
      || process.env.HTTPS_PROXY
      || process.env.https_proxy;

    console.log("FFS PROXY IS " + proxy);
    
    console.log("FFS Connect Opts " + JSON.stringify(opts, 0, 4));
    if (opts && opts.host.indexOf("s3") < 0) {
        console.log("FFS Using proxy " + proxy + " for host " + opts.host);
        var agent = new HttpsProxyAgent(url.parse(proxy));
    }
    else {
        console.log("FFS Not Using proxy " + proxy + " for host " + opts.host);
        var agent = new https.Agent({ rejectUnauthorized: true });
    }
    agent.addRequest(req, opts);
}
