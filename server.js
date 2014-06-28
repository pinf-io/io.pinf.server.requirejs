
const ASSERT = require("assert");
const PATH = require("path");
const FS = require("fs-extra");
const SEND = require("send");


require("io.pinf.server.www").for(module, __dirname, null, function(app) {

    app.get("/lib/require.js", function (req, res, next) {
		return SEND(req, "/require.js")
			.root(PATH.join(__dirname, "node_modules/requirejs"))
			.on('error', next)
			.pipe(res);
    });

});
