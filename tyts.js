// Copyright 2017-2018 ibelie, Chen Jie, Joungtao. All rights reserved.
// Use of this source code is governed by The MIT License
// that can be found in the LICENSE file.

goog.provide('ibelie.tyts.Integer');
goog.provide('ibelie.tyts.FixedPoint');
goog.provide('ibelie.tyts.Float64');
goog.provide('ibelie.tyts.Float32');
goog.provide('ibelie.tyts.Bool');
goog.provide('ibelie.tyts.Bytes');
goog.provide('ibelie.tyts.String');
goog.provide('ibelie.tyts.Symbol');
goog.provide('ibelie.tyts.Object');
goog.provide('ibelie.tyts.Method');
goog.provide('ibelie.tyts.Variant');
goog.provide('ibelie.tyts.List');
goog.provide('ibelie.tyts.Dict');
goog.provide('ibelie.tyts.Extension');

goog.require('ibelie.tyts.ProtoBuf');
goog.require('ibelie.tyts.SizeVarint');
goog.require('ibelie.tyts.WireTypeBits');
goog.require('ibelie.tyts.WireTypeMask');
goog.require('ibelie.tyts.WireVarint');
goog.require('ibelie.tyts.WireFixed64');
goog.require('ibelie.tyts.WireBytes');
goog.require('ibelie.tyts.WireFixed32');


TYPE_INTEGER    =  0;
TYPE_FIXEDPOINT =  1;
TYPE_FLOAT64    =  2;
TYPE_FLOAT32    =  3;
TYPE_BOOL       =  4;
TYPE_BYTES      =  5;
TYPE_STRING     =  6;
TYPE_SYMBOL     =  7;
TYPE_OBJECT     =  8;
TYPE_VARIANT    =  9;
TYPE_LIST       = 10;
TYPE_DICT       = 11;
TYPE_EXTENSION  = 12;

//=============================================================================

ibelie.tyts.Integer = new function() {
	this.$ = TYPE_INTEGER;
	this.isPrimitive = true;
	this.isIterative = false;
	this.wiretype = ibelie.tyts.WireVarint;
	this.Default = function() {
		return 0;
	};
	this.Check = function(value) {
		return value === parseInt(value);
	};
	this.ByteSize = function(value, tagsize, ignore) {
		if (!ignore || value != 0) {
			return tagsize + ibelie.tyts.SizeVarint(value);
		} else {
			return 0;
		}
	};
	this.Serialize = function(value, tag, ignore, protobuf) {
		if (!ignore || value != 0) {
			if (tag != 0) {
				protobuf.WriteVarint(tag);
			}
			protobuf.WriteVarint(value);
		}
	};
	this.Deserialize = function(value, protobuf) {
		return protobuf.ReadVarint();
	};
}();

//=============================================================================

ibelie.tyts.FixedPoint = function(floor, precision) {
	this.floor = floor;
	this.precision = Math.pow(10, precision);
};

ibelie.tyts.FixedPoint.prototype.$ = TYPE_FIXEDPOINT;
ibelie.tyts.FixedPoint.prototype.isPrimitive = true;
ibelie.tyts.FixedPoint.prototype.isIterative = false;
ibelie.tyts.FixedPoint.prototype.wiretype = ibelie.tyts.WireVarint;

ibelie.tyts.FixedPoint.prototype.Default = function() {
	return 0;
};

ibelie.tyts.FixedPoint.prototype.Check = function(value) {
	return value === parseFloat(value);
};

ibelie.tyts.FixedPoint.prototype.ByteSize = function(value, tagsize, ignore) {
	if (!ignore || value != this.floor) {
		return tagsize + ibelie.tyts.SizeVarint(Math.floor((value - this.floor) * this.precision));
	} else {
		return 0;
	}
};

ibelie.tyts.FixedPoint.prototype.Serialize = function(value, tag, ignore, protobuf) {
	if (!ignore || value != this.floor) {
		if (tag != 0) {
			protobuf.WriteVarint(tag);
		}
		protobuf.WriteVarint(Math.floor((value - this.floor) * this.precision));
	}
};

ibelie.tyts.FixedPoint.prototype.Deserialize = function(value, protobuf) {
	return protobuf.ReadVarint() / this.precision + this.floor;
};

//=============================================================================

ibelie.tyts.Float64 = new function() {
	this.$ = TYPE_FLOAT64;
	this.isPrimitive = true;
	this.isIterative = false;
	this.wiretype = ibelie.tyts.WireFixed64;
	this.TWO_TO_20 = 1048576;
	this.TWO_TO_32 = 4294967296;
	this.TWO_TO_52 = 4503599627370496;
	this.FLOAT64_MIN = 2.2250738585072014e-308;
	this.FLOAT64_MAX = 1.7976931348623157e+308;
	this.Default = function() {
		return 0;
	};
	this.Check = function(value) {
		return value === parseFloat(value);
	};
	this.ByteSize = function(value, tagsize, ignore) {
		if (!ignore || value != 0) {
			return tagsize + 8;
		} else {
			return 0;
		}
	};
	this.Serialize = function(value, tag, ignore, protobuf) {
		if (!ignore || value != 0) {
			if (tag != 0) {
				protobuf.WriteVarint(tag);
			}
			var sign = (value < 0) ? 1 : 0;
			value = sign ? -value : value;
			var value_h32;
			var value_l32;

			if (value === 0) { // Handle zeros.
				if ((1 / value) > 0) {
					// Positive zero.
					value_h32 = 0x00000000;
					value_l32 = 0x00000000;
				} else {
					// Negative zero.
					value_h32 = 0x80000000;
					value_l32 = 0x00000000;
				}
			} else if (isNaN(value)) { // Handle nans.
				value_h32 = 0x7FFFFFFF;
				value_l32 = 0xFFFFFFFF;
			} else if (value > this.FLOAT64_MAX) { // Handle infinities.
				value_h32 = ((sign << 31) | (0x7FF00000)) >>> 0;
				value_l32 = 0;
			} else if (value < this.FLOAT64_MIN) { // Handle denormals.
				// Number is a denormal.
				var mant = value / Math.pow(2, -1074);
				var mantHigh = (mant / this.TWO_TO_32);
				value_h32 = ((sign << 31) | mantHigh) >>> 0;
				value_l32 = (mant >>> 0);
			} else {
				var exp = Math.floor(Math.log(value) / Math.LN2);
				if (exp == 1024) exp = 1023;
				var mant = value * Math.pow(2, -exp);

				var mantHigh = (mant * this.TWO_TO_20) & 0xFFFFF;
				var mantLow = (mant * this.TWO_TO_52) >>> 0;

				value_h32 = ((sign << 31) | ((exp + 1023) << 20) | mantHigh) >>> 0;
				value_l32 = mantLow;
			}

			protobuf.WriteUint32(value_l32);
			protobuf.WriteUint32(value_h32);
		}
	};
	this.Deserialize = function(value, protobuf) {
		var value_l32 = protobuf.ReadUint32();
		var value_h32 = protobuf.ReadUint32();
		var sign = ((value_h32 >> 31) * 2 + 1);
		var exp = (value_h32 >>> 20) & 0x7FF;
		var mant = this.TWO_TO_32 * (value_h32 & 0xFFFFF) + value_l32;

		if (exp == 0x7FF) {
			if (mant) {
				return NaN;
			} else {
				return sign * Infinity;
			}
		} else if (exp == 0) { // Denormal.
			return sign * Math.pow(2, -1074) * mant;
		} else {
			return sign * Math.pow(2, exp - 1075) * (mant + this.TWO_TO_52);
		}
	};
}();

//=============================================================================

ibelie.tyts.Float32 = new function() {
	this.$ = TYPE_FLOAT32;
	this.isPrimitive = true;
	this.isIterative = false;
	this.wiretype = ibelie.tyts.WireFixed32;
	this.TWO_TO_23 = 8388608;
	this.FLOAT32_MIN = 1.1754943508222875e-38;
	this.FLOAT32_MAX = 3.4028234663852886e+38;
	this.Default = function() {
		return 0;
	};
	this.Check = function(value) {
		return value === parseFloat(value);
	};
	this.ByteSize = function(value, tagsize, ignore) {
		if (!ignore || value != 0) {
			return tagsize + 4;
		} else {
			return 0;
		}
	};
	this.Serialize = function(value, tag, ignore, protobuf) {
		if (!ignore || value != 0) {
			if (tag != 0) {
				protobuf.WriteVarint(tag);
			}
			var sign = (value < 0) ? 1 : 0;
			value = sign ? -value : value;
			var value_i32;

			if (value === 0) { // Handle zeros.
				if ((1 / value) > 0) {
					// Positive zero.
					value_i32 = 0x00000000;
				} else {
					// Negative zero.
					value_i32 = 0x80000000;
				}
			} else if (isNaN(value)) { // Handle nans.
				value_i32 = 0x7FFFFFFF;
			} else if (value > this.FLOAT32_MAX) { // Handle infinities.
				value_i32 = ((sign << 31) | (0x7F800000)) >>> 0;
			} else if (value < this.FLOAT32_MIN) { // Handle denormals.
				// Number is a denormal.
				value_i32 = ((sign << 31) | Math.round(value / Math.pow(2, -149))) >>> 0;
			} else {
				var exp = Math.floor(Math.log(value) / Math.LN2);
				var mant = value * Math.pow(2, -exp);
				mant = Math.round(mant * this.TWO_TO_23) & 0x7FFFFF;
				value_i32 = ((sign << 31) | ((exp + 127) << 23) | mant) >>> 0;
			}

			protobuf.WriteUint32(value_i32);
		}
	};
	this.Deserialize = function(value, protobuf) {
		var value_i32 = protobuf.ReadUint32();
		var sign = ((value_i32 >> 31) * 2 + 1);
		var exp = (value_i32 >>> 23) & 0xFF;
		var mant = value_i32 & 0x7FFFFF;

		if (exp == 0xFF) {
			if (mant) {
				return NaN;
			} else {
				return sign * Infinity;
			}
		} else if (exp == 0) { // Denormal.
			return sign * Math.pow(2, -149) * mant;
		} else {
			return sign * Math.pow(2, exp - 150) * (mant + Math.pow(2, 23));
		}
	};
}();

//=============================================================================

ibelie.tyts.Bool = new function() {
	this.$ = TYPE_BOOL;
	this.isPrimitive = true;
	this.isIterative = false;
	this.wiretype = ibelie.tyts.WireVarint;
	this.Default = function() {
		return false;
	};
	this.Check = function(value) {
		return value === Boolean(value);
	};
	this.ByteSize = function(value, tagsize, ignore) {
		if (!ignore || value) {
			return tagsize + 1;
		} else {
			return 0;
		}
	};
	this.Serialize = function(value, tag, ignore, protobuf) {
		if (!ignore || value) {
			if (tag != 0) {
				protobuf.WriteVarint(tag);
			}
			protobuf.WriteByte(value ? 1 : 0);
		}
	};
	this.Deserialize = function(value, protobuf) {
		return protobuf.ReadByte() ? true : false;
	};
}();

//=============================================================================

ibelie.tyts.Bytes = new function() {
	this.$ = TYPE_BYTES;
	this.isPrimitive = false;
	this.isIterative = false;
	this.wiretype = ibelie.tyts.WireBytes;
	this.Default = function() {
		return new Uint8Array(0);
	};
	this.Check = function(value) {
		return value instanceof Uint8Array;
	};
	this.ByteSize = function(value, tagsize, ignore) {
		if (value.length > 0) {
			return tagsize + ibelie.tyts.SizeVarint(value.length) + value.length;
		} else if (!ignore) {
			return tagsize + 1;
		} else {
			return 0;
		}
	};
	this.Serialize = function(value, tag, ignore, protobuf) {
		if (value.length > 0) {
			if (tag != 0) {
				protobuf.WriteVarint(tag);
			}
			protobuf.WriteVarint(value.length);
			protobuf.WriteBytes(value);
		} else if (!ignore) {
			if (tag != 0) {
				protobuf.WriteVarint(tag);
			}
			protobuf.WriteByte(0);
		}
	};
	this.Deserialize = function(value, protobuf) {
		return protobuf.ReadBytes();
	};
}();

//=============================================================================

ibelie.tyts.String = new function() {
	this.$ = TYPE_STRING;
	this.isPrimitive = false;
	this.isIterative = false;
	this.wiretype = ibelie.tyts.WireBytes;
	this.Default = function() {
		return "";
	};
	this.Check = function(value) {
		return value === String(value);
	};
	this.Size = function(value) {
		var size = 0;
		for (var i = 0; i < value.length; i++) {
			var c = value.charCodeAt(i);
			if (c < 128) {
				size++;
			} else if (c < 2048) {
				size += 2;
			} else {
				size += 3;
			}
		}
		return size;
	};
	this.Write = function(value, protobuf) {
		// UTF16 to UTF8 conversion loop
		for (var i = 0; i < value.length; i++) {
			var c = value.charCodeAt(i);
			if (c < 128) {
				protobuf.buffer[protobuf.offset++] = c;
			} else if (c < 2048) {
				protobuf.buffer[protobuf.offset++] = (c >> 6) | 192;
				protobuf.buffer[protobuf.offset++] = (c & 63) | 128;
			} else {
				protobuf.buffer[protobuf.offset++] = (c >> 12) | 224;
				protobuf.buffer[protobuf.offset++] = ((c >> 6) & 63) | 128;
				protobuf.buffer[protobuf.offset++] = (c & 63) | 128;
			}
		}
	};
	this.Decode = function(bytes) {
		var chars = [];
		for (var i = 0; i < bytes.length;) {
			var c = bytes[i++];
			if (c < 128) { // Regular 7-bit ASCII.
				chars.push(c);
			} else if (c < 192) {
				// UTF-8 continuation mark. We are out of sync. This
				// might happen if we attempted to read a character
				// with more than three bytes.
				continue;
			} else if (c < 224) { // UTF-8 with two bytes.
				var c2 = bytes[i++];
				chars.push(((c & 31) << 6) | (c2 & 63));
			} else if (c < 240) { // UTF-8 with three bytes.
				var c2 = bytes[i++];
				var c3 = bytes[i++];
				chars.push(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
			}
		}

		// String.fromCharCode.apply is faster than manually appending characters on
		// Chrome 25+, and generates no additional cons string garbage.
		return String.fromCharCode.apply(null, chars);
	};
	this.ByteSize = function(value, tagsize, ignore) {
		if (value.length > 0) {
			var size = this.Size(value);
			return tagsize + ibelie.tyts.SizeVarint(size) + size;
		} else if (!ignore) {
			return tagsize + 1;
		} else {
			return 0;
		}
	};
	this.Serialize = function(value, tag, ignore, protobuf) {
		if (value.length > 0) {
			if (tag != 0) {
				protobuf.WriteVarint(tag);
			}
			protobuf.WriteVarint(this.Size(value));
			this.Write(value, protobuf)
		} else if (!ignore) {
			if (tag != 0) {
				protobuf.WriteVarint(tag);
			}
			protobuf.WriteByte(0);
		}
	};
	this.Deserialize = function(value, protobuf) {
		return this.Decode(protobuf.ReadBytes());
	};
}();

//=============================================================================

ibelie.tyts.Symbol = new function() {
	this.$ = TYPE_SYMBOL;
	this.isPrimitive = false;
	this.isIterative = false;
	this.wiretype = ibelie.tyts.WireBytes;
	this.Default = function() {
		return "";
	};
	this.Check = function(value) {
		return value === String(value);
	};
	this.ByteSize = function(value, tagsize, ignore) {
		if (value.length > 0) {
			return tagsize + ibelie.tyts.SizeSymbol(value);
		} else if (!ignore) {
			return tagsize + 1;
		} else {
			return 0;
		}
	};
	this.Serialize = function(value, tag, ignore, protobuf) {
		if (value.length > 0) {
			if (tag != 0) {
				protobuf.WriteVarint(tag);
			}
			protobuf.WriteSymbol(value);
		} else if (!ignore) {
			if (tag != 0) {
				protobuf.WriteVarint(tag);
			}
			protobuf.WriteByte(0);
		}
	};
	this.Deserialize = function(value, protobuf) {
		return protobuf.ReadSymbol();
	};
}();

//=============================================================================

function registerMethod(type, i) {
	var method = type.methods[i];
	method.S(type.Type, function() {
		var buffer = new Uint8Array(method.type.ByteSize(arguments));
		method.type.Serialize(arguments, new ibelie.tyts.ProtoBuf(buffer));
		return buffer;
	});
	method.D(type.Type, function(buffer) {
		return method.type.Deserialize(new ibelie.tyts.ProtoBuf(buffer));
	});
}

ibelie.tyts.Object = function(cutoff, fields, methods) {
	var type = this;
	type.cutoff = cutoff;
	type.fields = fields;
	type.methods = methods;

	type.Type = function() {
		for (var i = 0, n = fields.length; i < n; i++) {
			var field = fields[i];
			field.set(this, field.type.Default());
		}
	};

	for (var i = 0, n = methods.length; i < n; i++) {
		registerMethod(type, i);
	}

	type.Type.prototype.isObject = true;
	type.Type.prototype.ByteSize = function() {
		return type.ByteSizeUnsealed(this);
	};
	type.Type.prototype.Serialize = function() {
		var protobuf = new ibelie.tyts.ProtoBuf(new Uint8Array(this.ByteSize()));
		type.SerializeUnsealed(this, protobuf);
		return protobuf.buffer;
	};
	type.Type.prototype.Deserialize = function(buffer) {
		type.DeserializeUnsealed(this, new ibelie.tyts.ProtoBuf(buffer));
	};
	type.Type.Deserialize = function(buffer) {
		var object = new type.Type();
		type.DeserializeUnsealed(object, new ibelie.tyts.ProtoBuf(buffer));
		return object;
	};
};

ibelie.tyts.Object.prototype.$ = TYPE_OBJECT;
ibelie.tyts.Object.prototype.isPrimitive = false;
ibelie.tyts.Object.prototype.isIterative = false;
ibelie.tyts.Object.prototype.wiretype = ibelie.tyts.WireBytes;

ibelie.tyts.Object.prototype.Default = function() {
	return null;
};

ibelie.tyts.Object.prototype.Check = function(value) {
	return value instanceof this.Type;
};

ibelie.tyts.Object.prototype.ByteSize = function(value, tagsize, ignore) {
	if (!value) {
		return ignore ? 0 : tagsize + 1;
	}
	var size = this.ByteSizeUnsealed(value);
	return tagsize + ibelie.tyts.SizeVarint(size) + size;
};

ibelie.tyts.Object.prototype.Serialize = function(value, tag, ignore, protobuf) {
	if (!value) {
		if (!ignore) {
			if (tag != 0) {
				protobuf.WriteVarint(tag);
			}
			protobuf.WriteByte(0);
		}
		return;
	}
	if (tag != 0) {
		protobuf.WriteVarint(tag);
	}
	protobuf.WriteVarint(value.cached_size);
	this.SerializeUnsealed(value, protobuf);
};

ibelie.tyts.Object.prototype.Deserialize = function(value, protobuf) {
	var buffer = protobuf.ReadBuffer();
	if (!value) {
		value = new this.Type();
	}
	if (buffer.length > 0) {
		this.DeserializeUnsealed(value, new ibelie.tyts.ProtoBuf(buffer));
	}
	return value;
};

ibelie.tyts.Object.prototype.ByteSizeUnsealed = function(value) {
	var size = 0;
	for (var i = 0; i < this.fields.length; i++) {
		var field = this.fields[i];
		var fieldvalue = field.get(value);
		if (fieldvalue != undefined) {
			size += field.type.ByteSize(fieldvalue, field.tagsize, true);
		}
	}
	value.cached_size = size;
	return size;
};

ibelie.tyts.Object.prototype.SerializeUnsealed = function(value, protobuf) {
	for (var i = 0; i < this.fields.length; i++) {
		var field = this.fields[i];
		var fieldvalue = field.get(value);
		if (fieldvalue != undefined) {
			field.type.Serialize(fieldvalue, field.tag, true, protobuf);
		}
	}
};

ibelie.tyts.Object.prototype.DeserializeUnsealed = function(value, protobuf) {
	while (!protobuf.End()) {
		var tag_cutoff = protobuf.ReadTag(this.cutoff);
		var i = (tag_cutoff[0] >> ibelie.tyts.WireTypeBits) - 1;
		if (tag_cutoff[1] && i >= 0 && i < this.fields.length) {
			var field = this.fields[i];
			var type = field.type;
			var handler = field.handle(value);
			var fieldvalue = field.get(value)
			var wiretype = tag_cutoff[0] & ibelie.tyts.WireTypeMask;
			if (type.wiretype == wiretype) {
				if (handler == undefined) {
					field.set(value, type.Deserialize(fieldvalue, protobuf));
				} else {
					var old_value = fieldvalue;
					var new_value = type.Deserialize(fieldvalue, protobuf);
					field.set(value, new_value);
					handler(old_value, new_value);
				}
				continue;
			} else if (type.$ == TYPE_LIST && type.element.wiretype == wiretype) {
				if (handler == undefined) {
					field.set(value, type.DeserializeRepeat(fieldvalue, protobuf));
				} else {
					var new_value = type.DeserializeRepeat(fieldvalue, protobuf);
					field.set(value, new_value);
					handler(new_value, new_value[new_value.length - 1]);
				}
				continue;
			}
		}
		if (!tag_cutoff[0]) {
			break;
		}
		protobuf.SkipField(tag_cutoff[0]);
	}
};

//=============================================================================

ibelie.tyts.Method = function(cutoff, params) {
	this.cutoff = cutoff;
	this.params = params;
};

ibelie.tyts.Method.prototype.$ = TYPE_OBJECT;
ibelie.tyts.Method.prototype.isPrimitive = false;
ibelie.tyts.Method.prototype.isIterative = false;
ibelie.tyts.Method.prototype.wiretype = ibelie.tyts.WireBytes;

ibelie.tyts.Method.prototype.Default = function() {
	return undefined;
};

ibelie.tyts.Method.prototype.Check = function(value) {
	return false;
};

ibelie.tyts.Method.prototype.ByteSize = function(args) {
	if (!args) {
		return 0;
	}
	var size = 0;
	for (var i = 0; i < this.params.length; i++) {
		var param = this.params[i];
		if (args[i] != undefined) {
			size += param.type.ByteSize(args[i], param.tagsize, true);
		}
	}
	return size;
};

ibelie.tyts.Method.prototype.Serialize = function(args, protobuf) {
	if (!args) {
		return;
	}
	for (var i = 0; i < this.params.length; i++) {
		var param = this.params[i];
		if (args[i] != undefined) {
			param.type.Serialize(args[i], param.tag, true, protobuf);
		}
	}
};

ibelie.tyts.Method.prototype.Deserialize = function(protobuf) {
	var args = new Array(this.params.length);
	while (!protobuf.End()) {
		var tag_cutoff = protobuf.ReadTag(this.cutoff);
		var i = (tag_cutoff[0] >> ibelie.tyts.WireTypeBits) - 1;
		if (tag_cutoff[1] && i >= 0 && i < this.params.length) {
			var param = this.params[i].type;
			var wiretype = tag_cutoff[0] & ibelie.tyts.WireTypeMask;
			if (param.wiretype == wiretype) {
				args[i] = param.Deserialize(args[i], protobuf);
				continue;
			} else if (param.$ == TYPE_LIST && param.element.wiretype == wiretype) {
				args[i] = param.DeserializeRepeat(args[i], protobuf);
				continue;
			}
		}
		if (!tag_cutoff[0]) {
			break;
		}
		protobuf.SkipField(tag_cutoff[0]);
	}
	return args;
};

//=============================================================================

ibelie.tyts.Variant = function(cutoff, types) {
	this.cutoff = cutoff;
	this.types = types;
};

ibelie.tyts.Variant.prototype.$ = TYPE_VARIANT;
ibelie.tyts.Variant.prototype.isPrimitive = false;
ibelie.tyts.Variant.prototype.isIterative = false;
ibelie.tyts.Variant.prototype.wiretype = ibelie.tyts.WireBytes;

ibelie.tyts.Variant.prototype.Default = function() {
	return null;
};

ibelie.tyts.Variant.prototype.Check = function(value) {
	return false;
};

ibelie.tyts.Variant.prototype.ByteSize = function(value, tagsize, ignore) {
	if (value == null) {
		return ignore ? 0 : tagsize + 1;
	}
	for (var i = 0; i < this.types.length; i++) {
		var variant = this.types[i];
		if (variant.type.Check(value)) {
			var size = variant.type.ByteSize(value, variant.tagsize, true);
			return tagsize + ibelie.tyts.SizeVarint(size) + size;
		}
	}
	return tagsize + 1;
};

ibelie.tyts.Variant.prototype.Serialize = function(value, tag, ignore, protobuf) {
	if (value == null) {
		if (!ignore) {
			if (tag != 0) {
				protobuf.WriteVarint(tag);
			}
			protobuf.WriteByte(0);
		}
		return;
	}
	if (tag != 0) {
		protobuf.WriteVarint(tag);
	}
	for (var i = 0; i < this.types.length; i++) {
		var variant = this.types[i];
		if (variant.type.Check(value)) {
			protobuf.WriteVarint(variant.type.ByteSize(value, variant.tagsize, true));
			variant.type.Serialize(value, variant.tag, true, protobuf);
			return;
		}
	}
	protobuf.WriteByte(0);
};

ibelie.tyts.Variant.prototype.Deserialize = function(value, protobuf) {
	protobuf = new ibelie.tyts.ProtoBuf(protobuf.ReadBuffer());
	while (!protobuf.End()) {
		var tag_cutoff = protobuf.ReadTag(this.cutoff);
		var i = (tag_cutoff[0] >> ibelie.tyts.WireTypeBits) - 1;
		if (tag_cutoff[1] && i >= 0 && i < this.types.length) {
			var variant = this.types[i].type;
			var wiretype = tag_cutoff[0] & ibelie.tyts.WireTypeMask;
			if (variant.wiretype == wiretype) {
				value = variant.Deserialize(value, protobuf);
				continue;
			} else if (variant.$ == TYPE_LIST && variant.element.wiretype == wiretype) {
				value = variant.DeserializeRepeat(value, protobuf);
				continue;
			}
		}
		if (!tag_cutoff[0]) {
			break;
		}
		protobuf.SkipField(tag_cutoff[0]);
	}
	return value;
};

//=============================================================================

ibelie.tyts.List = function(element) {
	this.element = element;
	this.isIterative = !this.element.isPrimitive;
};

ibelie.tyts.List.prototype.$ = TYPE_LIST;
ibelie.tyts.List.prototype.isPrimitive = false;
ibelie.tyts.List.prototype.wiretype = ibelie.tyts.WireBytes;

ibelie.tyts.List.prototype.Default = function() {
	return [];
};

ibelie.tyts.List.prototype.Check = function(value) {
	return value instanceof Array;
};

ibelie.tyts.List.prototype.ByteSize = function(value, tagsize, ignore) {
	if (!value || !value.length) {
		return 0;
	}
	var element = this.element;
	if (element.isIterative) {
		var total = 0;
		for (var i = 0; i < value.length; i++) {
			var size = element.ByteSize(value[i], 0, false);
			total += tagsize + ibelie.tyts.SizeVarint(size) + size;
		}
		return total;
	} else if (!element.isPrimitive) {
		var size = 0;
		for (var i = 0; i < value.length; i++) {
			size += element.ByteSize(value[i], tagsize, false);
		}
		return size;
	} else {
		var size = 0;
		for (var i = 0; i < value.length; i++) {
			size += element.ByteSize(value[i], 0, false);
		}
		return tagsize + ibelie.tyts.SizeVarint(size) + size;
	}
};

ibelie.tyts.List.prototype.Serialize = function(value, tag, ignore, protobuf) {
	if (!value || !value.length) {
		return;
	}
	var element = this.element;
	if (element.isIterative) {
		for (var i = 0; i < value.length; i++) {
			if (tag != 0) {
				protobuf.WriteVarint(tag);
			}
			var size = element.ByteSize(value[i], 0, false);
			protobuf.WriteVarint(size);
			element.Serialize(value[i], 0, false, protobuf);
		}
	} else if (!element.isPrimitive) {
		for (var i = 0; i < value.length; i++) {
			element.Serialize(value[i], tag, false, protobuf);
		}
	} else {
		var size = 0;
		for (var i = 0; i < value.length; i++) {
			size += element.ByteSize(value[i], 0, false);
		}
		if (tag != 0) {
			protobuf.WriteVarint(tag);
		}
		protobuf.WriteVarint(size);
		for (var i = 0; i < value.length; i++) {
			element.Serialize(value[i], 0, false, protobuf);
		}
	}
};

ibelie.tyts.List.prototype.Deserialize = function(value, protobuf) {
	if (!value) {
		value = [];
	}
	var element = this.element;
	if (element.isIterative) {
		protobuf = new ibelie.tyts.ProtoBuf(protobuf.ReadBuffer());
		var list;
		while (!protobuf.End()) {
			list = element.Deserialize(list, protobuf);
		}
		value.push(list);
	} else if (!element.isPrimitive) {
		value.push(element.Deserialize(undefined, protobuf));
	} else {
		protobuf = new ibelie.tyts.ProtoBuf(protobuf.ReadBuffer());
		while (!protobuf.End()) {
			value.push(element.Deserialize(undefined, protobuf));
		}
	}
	return value;
};

ibelie.tyts.List.prototype.DeserializeRepeat = function(value, protobuf) {
	if (!value) {
		value = [];
	}
	value.push(element.Deserialize(undefined, protobuf));
	return value;
};

//=============================================================================

ibelie.tyts.Dict = function(key, value) {
	this.key = key;
	this.value = value;
};

ibelie.tyts.Dict.prototype.$ = TYPE_DICT;
ibelie.tyts.Dict.prototype.isPrimitive = false;
ibelie.tyts.Dict.prototype.isIterative = true;
ibelie.tyts.Dict.prototype.wiretype = ibelie.tyts.WireBytes;

ibelie.tyts.Dict.prototype.Default = function() {
	return {};
};

ibelie.tyts.Dict.prototype.Check = function(value) {
	return (value instanceof Object) && !(value instanceof Array) && !value.isObject;
};

ibelie.tyts.Dict.prototype.ByteSize = function(value, tagsize, ignore) {
	var total = 0;
	for (var k in value) {
		var size = this.key.ByteSize(k, 1, true);
		size += this.value.ByteSize(value[k], 1, true);
		total += tagsize + ibelie.tyts.SizeVarint(size) + size;
	}
	return total;
};

ibelie.tyts.Dict.prototype.Serialize = function(value, tag, ignore, protobuf) {
	for (var k in value) {
		if (tag != 0) {
			protobuf.WriteVarint(tag);
		}
		var v = value[k];
		var size = this.key.ByteSize(k, 1, true);
		size += this.value.ByteSize(v, 1, true);
		protobuf.WriteVarint(size);
		this.key.Serialize(k, (1 << ibelie.tyts.WireTypeBits) | this.key.wiretype, true, protobuf);
		this.value.Serialize(v, (2 << ibelie.tyts.WireTypeBits) | this.value.wiretype, true, protobuf);
	}
};

ibelie.tyts.Dict.prototype.Deserialize = function(value, protobuf) {
	protobuf = new ibelie.tyts.ProtoBuf(protobuf.ReadBuffer());
	var v, k = this.key.Default();
	while (!protobuf.End()) {
		var tag_cutoff = protobuf.ReadTag(0x7F);
		var i = tag_cutoff[0] >> ibelie.tyts.WireTypeBits;
		if (tag_cutoff[1] && (i == 1 || i == 2)) {
			var field = (i == 1 ? this.key : this.value);
			var wiretype = tag_cutoff[0] & ibelie.tyts.WireTypeMask;
			if (field.wiretype == wiretype) {
				if (i == 1) {
					k = field.Deserialize(k, protobuf);
				} else {
					v = field.Deserialize(v, protobuf);
				}
				continue;
			} else if (field.$ == TYPE_LIST && field.element.wiretype == wiretype) {
				if (i == 1) {
					k = field.DeserializeRepeat(k, protobuf);
				} else {
					v = field.DeserializeRepeat(v, protobuf);
				}
				continue;
			}
		}
		if (!tag_cutoff[0]) {
			break;
		}
		protobuf.SkipField(tag_cutoff[0]);
	}
	if (!value) {
		value = {};
	}
	value[k] = v;
	return value;
};

//=============================================================================

ibelie.tyts.Extension = function(type) {
	this.type = type;
};

ibelie.tyts.Extension.prototype.$ = TYPE_EXTENSION;
ibelie.tyts.Extension.prototype.isPrimitive = false;
ibelie.tyts.Extension.prototype.isIterative = false;
ibelie.tyts.Extension.prototype.wiretype = ibelie.tyts.WireBytes;

ibelie.tyts.Extension.prototype.Default = function() {
	return null;
};

ibelie.tyts.Extension.prototype.Check = function(value) {
	return value instanceof this.type;
};

ibelie.tyts.Extension.prototype.ByteSize = function(value, tagsize, ignore) {
	if (value) {
		var size = value.ByteSize();
		return tagsize + ibelie.tyts.SizeVarint(size) + size;
	} else if (!ignore) {
		return tagsize + 1;
	} else {
		return 0;
	}
};

ibelie.tyts.Extension.prototype.Serialize = function(value, tag, ignore, protobuf) {
	if (value) {
		if (tag != 0) {
			protobuf.WriteVarint(tag);
		}
		protobuf.WriteVarint(value.ByteSize());
		protobuf.WriteBytes(value.Serialize());
	} else if (!ignore) {
		if (tag != 0) {
			protobuf.WriteVarint(tag);
		}
		protobuf.WriteByte(0);
	}
};

ibelie.tyts.Extension.prototype.Deserialize = function(value, protobuf) {
	if (!value) {
		value = new this.type();
	}
	value.Deserialize(protobuf.ReadBytes());
	return value;
};
