
((function(global) {

	var loader = null;

	var ensureLoader_pending = null;
	function ensureLoader(callback) {
		if (loader) {
			return callback(null, loader);
		}
		if (ensureLoader_pending !== null) {
			ensureLoader_pending.push(callback);
			return;
		}
		ensureLoader_pending = [
			callback
		];
		function error(err) {
			var callbacks = ensureLoader_pending;
			ensureLoader_pending = null;
			callbacks.forEach(function(callback) {
				return callback(err);
			});
		}
		function ready() {
			var callbacks = ensureLoader_pending;
			ensureLoader_pending = null;
			callbacks.forEach(function(callback) {
				return callback(null, loader);
			});
		}
		try {
			require([
				"/config"
			], function(config) {
				requirejs.config(config);
				loader = function(uri, callback) {
					try {
						require([uri], function(api) {
							return callback(null, api);
						});
					} catch(err) {
						return callback(err);
					}
				}
				return ready();
			});
		} catch(err) {
			return error(err);
		}
	}

	global.io_pinf_server_requirejs = {
		load: function(uri, callback) {
			return ensureLoader(function(err, loader) {
				if (err) return callback(err);
				return loader(uri, callback);
			});
		}
	};

})(this));
