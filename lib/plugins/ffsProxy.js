const HttpsProxyAgent = require('https-proxy-agent');
const https = require('https');
var Agent = require('agent-base');
var inherits = require('util').inherits;

module.exports = ffs;

var ffs = function(opts) {
    // console.log("FFS Constructor " + JSON.stringify(opts,0,4));
    var connect = function(req, opts, fn) {
        // console.log("FFS Connect Req " + JSON.stringify(req,0,4));

        console.log("FFS Connect Opts " + JSON.stringify(opts, 0, 4));

        //agent = proxyFn(proxyOpts, opts.secureEndpoint);

        //     if (!proxyOpts) {
        //   agent.addRequest(req, opts);
        // } else {
        //   // XXX: agent.callback() is an agent-base-ism
        //   agent.callback(req, opts, fn);
        // }
        // var agent =  return https.globalAgent;
        if (opts && opts.host.indexOf("s3") < 0) {
            console.log("FFS Using proxy " + proxy + " for host " + opts.host);
            var agent = new HttpsProxyAgent(url.parse(proxy));
        }
        else {
            console.log("FFS Not Using proxy " + proxy + " for host " + opts.host);

            var agent = new https.Agent({ rejectUnauthorized: true });
        }
        agent.addRequest(req, opts);
    };
    Agent.call(this, connect);
}

inherits(ffs, Agent);
