// Copyright 2017 ibelie, Chen Jie, Joungtao. All rights reserved.
// Use of this source code is governed by The MIT License
// that can be found in the LICENSE file.

goog.provide('tyts.Integer');
goog.provide('tyts.FixedPoint');
goog.provide('tyts.Float64');
goog.provide('tyts.Float32');
goog.provide('tyts.Bool');
goog.provide('tyts.Bytes');
goog.provide('tyts.String');
goog.provide('tyts.Object');
goog.provide('tyts.Variant');
goog.provide('tyts.List');
goog.provide('tyts.Dict');
goog.provide('tyts.Extension');

goog.require('tyts.ProtoBuf');
goog.require('tyts.SizeVarint');


TYPE_INTEGER    =  0;
TYPE_FIXEDPOINT =  1;
TYPE_FLOAT64    =  2;
TYPE_FLOAT32    =  3;
TYPE_BOOL       =  4;
TYPE_BYTES      =  5;
TYPE_STRING     =  6;
TYPE_OBJECT     =  7;
TYPE_VARIANT    =  8;
TYPE_LIST       =  9;
TYPE_DICT       = 10;
TYPE_EXTENSION  = 11;


//=============================================================================

tyts.Integer = new function() {
	this.$ = TYPE_INTEGER;
	this.Check = function(value) {
		return value === parseInt(value);
	};
	this.ByteSize = function(value, tagsize, ignore) {
		if (!ignore || value != 0) {
			return tagsize + tyts.SizeVarint(value);
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

tyts.FixedPoint = function(floor, precision) {
	this.floor = floor;
	this.precision = Math.pow(10, precision);
};

tyts.FixedPoint.prototype.$ = TYPE_FIXEDPOINT;

tyts.FixedPoint.prototype.Check = function(value) {
	return value === parseFloat(value);
};

tyts.FixedPoint.prototype.ByteSize = function(value, tagsize, ignore) {
	if (!ignore || value != this.floor) {
		return tagsize + tyts.SizeVarint(Math.floor((value - this.floor) * this.precision));
	} else {
		return 0;
	}
};

tyts.FixedPoint.prototype.Serialize = function(value, tag, ignore, protobuf) {
	if (!ignore || value != this.floor) {
		if (tag != 0) {
			protobuf.WriteVarint(tag);
		}
		protobuf.WriteVarint(Math.floor((value - this.floor) * this.precision));
	}
};

tyts.FixedPoint.prototype.Deserialize = function(value, protobuf) {
	return protobuf.ReadVarint() / this.precision + this.floor;
};

//=============================================================================

tyts.Float64 = new function() {
	this.$ = TYPE_FLOAT64;
	this.TWO_TO_20 = 1048576;
	this.TWO_TO_32 = 4294967296;
	this.TWO_TO_52 = 4503599627370496;
	this.FLOAT64_MIN = 2.2250738585072014e-308;
	this.FLOAT64_MAX = 1.7976931348623157e+308;
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
		var mant = jspb.BinaryConstants.TWO_TO_32 * (value_h32 & 0xFFFFF) + value_l32;

		if (exp == 0x7FF) {
			if (mant) {
				return NaN;
			} else {
				return sign * Infinity;
			}
		} else if (exp == 0) { // Denormal.
			return sign * Math.pow(2, -1074) * mant;
		} else {
			return sign * Math.pow(2, exp - 1075) * (mant + jspb.BinaryConstants.TWO_TO_52);
		}
	};
}();

//=============================================================================

tyts.Float32 = new function() {
	this.$ = TYPE_FLOAT32;
	this.TWO_TO_23 = 8388608;
	this.FLOAT32_MIN = 1.1754943508222875e-38;
	this.FLOAT32_MAX = 3.4028234663852886e+38;
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

tyts.Bool = new function() {
	this.$ = TYPE_BOOL;
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

tyts.Bytes = new function() {
	this.$ = TYPE_BYTES;
	this.Check = function(value) {
		return value instanceof Uint8Array;
	};
	this.ByteSize = function(value, tagsize, ignore) {
		if (!ignore || value.length > 0) {
			return tagsize + tyts.SizeVarint(value.length) + value.length;
		} else {
			return 0;
		}
	};
	this.Serialize = function(value, tag, ignore, protobuf) {
		if (!ignore || value.length > 0) {
			if (tag != 0) {
				protobuf.WriteVarint(tag);
			}
			protobuf.WriteVarint(value.length);
			protobuf.WriteBytes(value);
		}
	};
	this.Deserialize = function(value, protobuf) {
		return protobuf.ReadBytes(protobuf.ReadVarint());
	};
}();

//=============================================================================

tyts.String = new function() {
	this.$ = TYPE_STRING;
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
	this.ByteSize = function(value, tagsize, ignore) {
		if (!ignore || value.length > 0) {
			var size = this.Size();
			return tagsize + tyts.SizeVarint(size) + size;
		} else {
			return 0;
		}
	};
	this.Serialize = function(value, tag, ignore, protobuf) {
		if (!ignore || value.length > 0) {
			if (tag != 0) {
				protobuf.WriteVarint(tag);
			}
			protobuf.WriteVarint(this.Size(value));
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
		}
	};
	this.Deserialize = function(value, protobuf) {
		var bytes = protobuf.ReadBytes(protobuf.ReadVarint());
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
}();

//=============================================================================

tyts.Object = function(name, fields) {
	var type = this;
	type.name = name;
	type.fields = fields;

	type.Instance = function() {
		for (var i = 0; i < type.fields.length; i++) {
			var field = type.fields[i];
			Object.defineProperty(this, field.name, {
				get: function() {
					var fieldname = '_' + field.name;
					if (this[fieldname] == undefined) {
						switch (field.type.$) {
						case TYPE_INTEGER:
						case TYPE_FIXEDPOINT:
						case TYPE_FLOAT64:
						case TYPE_FLOAT32:
							this[fieldname] = 0;
							break;
						case TYPE_BOOL:
							this[fieldname] = false;
							break;
						case TYPE_BYTES:
							this[fieldname] = [];
							break;
						case TYPE_STRING:
							this[fieldname] = "";
							break;
						case TYPE_OBJECT:
						case TYPE_VARIANT:
							this[fieldname] = null;
							break;
						case TYPE_LIST:
							this[fieldname] = [];
							break;
						case TYPE_DICT:
							this[fieldname] = {};
							break;
						}
					}
					return this[fieldname];
				},
				set: function(value) {
					this['_' + field.name] = value;
				}
			});
		}
	};

	type.Instance.prototype.__class__ = name;
	type.Instance.prototype.ByteSize = function() {
		return type.ByteSize(this, 0, true);
	};
	type.Instance.prototype.Serialize = function() {
		var protobuf = new tyts.ProtoBuf(new Uint8Array(this.ByteSize()));
		type.Serialize(this, 0, true, protobuf);
		return protobuf.buffer;
	};
	type.Instance.prototype.Deserialize = function(buffer) {
		return type.Deserialize(this, new tyts.ProtoBuf(buffer));
	};
	type.Instance.Deserialize = function(buffer) {
		var object = new type.Instance();
		object.Deserialize(buffer);
		return object;
	};
};

tyts.Object.prototype.$ = TYPE_OBJECT;

tyts.Object.prototype.Check = function(value) {
	return value instanceof type.Instance;
};

tyts.Object.prototype.ByteSize = function(value, tagsize, ignore) {
	if (!value) {
		return ignore ? 0 : tagsize + 1;
	}
	var size = 0;
	for (var i = 0; i < this.fields.length; i++) {
		var field = this.fields[i];
		var fieldname = '_' + field.name;
		if (value[fieldname] != undefined) {
			size += field.type.ByteSize(value[fieldname], field.tagsize, true);
		}
	}
	value.cached_size = size;
	return tagsize + tyts.SizeVarint(size) + size;
};

tyts.Object.prototype.Serialize = function(value, tag, ignore, protobuf) {
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
	for (var i = 0; i < this.fields.length; i++) {
		var field = this.fields[i];
		var fieldname = '_' + field.name;
		if (value[fieldname] != undefined) {
			field.type.Serialize(value[fieldname], field.tag, true, protobuf);
		}
	}
};

tyts.Object.prototype.Deserialize = function(value, protobuf) {

};

//=============================================================================

tyts.Variant = function(name, types) {
	this.name = name;
	this.types = types;
};

tyts.Variant.prototype.$ = TYPE_VARIANT;

tyts.Variant.prototype.Check = function(value) {
	return false;
};

tyts.Variant.prototype.ByteSize = function(value, tagsize, ignore) {
	if (value == null) {
		return ignore ? 0 : tagsize + 1;
	}
	for (var i = 0; i < this.types.length; i++) {
		var variant = this.types[i];
		if (variant.Check(value)) {
			var size = variant.type.ByteSize(value, variant.tagsize, true);
			return tagsize + tyts.SizeVarint(size) + size;
		}
	}
	return tagsize + 1;
};

tyts.Variant.prototype.Serialize = function(value, tag, ignore, protobuf) {
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
		if (variant.Check(value)) {
			protobuf.WriteVarint(variant.type.ByteSize(value, variant.tagsize, true));
			variant.type.Serialize(value, variant.tag, true, protobuf);
			return;
		}
	}
	protobuf.WriteByte(0);
};

tyts.Variant.prototype.Deserialize = function(value, protobuf) {

};

//=============================================================================

tyts.List = function(name, element) {
	this.name = name;
	this.element = element;
};

tyts.List.prototype.$ = TYPE_LIST;

tyts.List.prototype.Check = function(value) {
	return value instanceof Array;
};

tyts.List.prototype.ByteSize = function(value, tagsize, ignore) {
};

tyts.List.prototype.Serialize = function(value, tag, ignore, protobuf) {
};

tyts.List.prototype.Deserialize = function(value, protobuf) {

};

//=============================================================================

tyts.Dict = function(name, key, value) {
	this.name = name;
	this.key = key;
	this.value = value;
};

tyts.Dict.prototype.$ = TYPE_DICT;

tyts.Dict.prototype.Check = function(value) {
	return (value instanceof Object) && !(value instanceof Array) && !value.__class__;
};

tyts.Dict.prototype.ByteSize = function(value, tagsize, ignore) {
	var total = 0;
	for (var k in value) {
		var size = this.key.type.ByteSize(k, this.key.tagsize, true);
		size += this.value.type.ByteSize(value[k], this.value.tagsize, true);
		total += tagsize + tyts.SizeVarint(size) + size;
	}
	return total;
};

tyts.Dict.prototype.Serialize = function(value, tag, ignore, protobuf) {
	for (var k in value) {
		if (tag != 0) {
			protobuf.WriteVarint(tag);
		}
		var v = value[k];
		var size = this.key.type.ByteSize(k, this.key.tagsize, true);
		size += this.value.type.ByteSize(v, this.value.tagsize, true);
		protobuf.WriteVarint(size);
		this.key.type.Serialize(k, this.key.tag, true, protobuf);
		this.value.type.Serialize(v, this.value.tag, true, protobuf);
	}
};

tyts.Dict.prototype.Deserialize = function(value, protobuf) {

};

//=============================================================================

tyts.Extension = function(name, type) {
	this.name = name;
	this.type = type;
};

tyts.Extension.prototype.$ = TYPE_EXTENSION;

tyts.Extension.prototype.Check = function(value) {
	return value instanceof this.type;
};

tyts.Extension.prototype.ByteSize = function(value, tagsize, ignore) {
	if (!ignore || value) {
		var size = value.ByteSize();
		return tagsize + tyts.SizeVarint(size) + size;
	} else {
		return 0;
	}
};

tyts.Extension.prototype.Serialize = function(value, tag, ignore, protobuf) {
	if (!ignore || value) {
		if (tag != 0) {
			protobuf.WriteVarint(tag);
		}
		protobuf.WriteVarint(value.ByteSize());
		value.Serialize(protobuf);
	}
};

tyts.Extension.prototype.Deserialize = function(value, protobuf) {
	if (!value) {
		value = new this.type();
	}
	value.Deserialize(protobuf);
	return value;
};
