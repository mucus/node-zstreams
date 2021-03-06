var Transform = require('./native').Transform;
var inherits = require('util').inherits;
var extend = require('extend');
var streamMixins = require('./mixins/_stream');
var readableMixins = require('./mixins/_readable');
var writableMixins = require('./mixins/_writable');

/**
 * ZTransform transforms input to the stream through the _transform function.
 *
 * @class ZTransform
 * @constructor
 * @extends Transform
 * @uses _Stream
 * @uses _Readable
 * @uses _Writable
 * @param {Object} [options] - Stream options
 */
function ZTransform(options) {
	if(options) {
		if(options.objectMode) {
			options.readableObjectMode = true;
			options.writableObjectMode = true;
		}
		if(options.readableObjectMode && options.writableObjectMode) {
			options.objectMode = true;
		}
		if(typeof options.transform === 'function') {
			this._transform = options.transform;
		}
		if(typeof options.flush === 'function') {
			this._flush = options.flush;
		}
	}
	Transform.call(this, options);
	// note: exclamation marks are used to convert to booleans
	if(options && !options.objectMode && (!options.readableObjectMode) !== (!options.writableObjectMode)) {
		this._writableState.objectMode = !!options.writableObjectMode;
		this._readableState.objectMode = !!options.readableObjectMode;
	}
	if(options && options.readableObjectMode) {
		this._readableState.highWaterMark = 16;
	}
	if(options && options.writableObjectMode) {
		this._writableState.highWaterMark = 16;
	}
	streamMixins.call(this, Transform.prototype, options);
	readableMixins.call(this, options);
	writableMixins.call(this, options);
}
inherits(ZTransform, Transform);
module.exports = ZTransform;

extend(ZTransform.prototype, streamMixins.prototype);
extend(ZTransform.prototype, readableMixins.prototype);
extend(ZTransform.prototype, writableMixins.prototype);
