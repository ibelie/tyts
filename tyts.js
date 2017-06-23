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
goog.require('tyts.WireTypeBits');
goog.require('tyts.WireTypeMask');
goog.require('tyts.WireVarint')
goog.require('tyts.WireFixed64')
goog.require('tyts.WireBytes')
goog.require('tyts.WireFixed32')


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

TYPE_PRIMITIVE  = 4;


//=============================================================================

tyts.Integer = new function() {
	this.$ = TYPE_INTEGER;
	this.wiretype = tyts.WireVarint;
	this.Default = function() {
		return 0;
	};
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
tyts.FixedPoint.prototype.wiretype = tyts.WireBytes;

tyts.FixedPoint.prototype.Default = function() {
	return 0;
};

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
	this.wiretype = tyts.WireFixed64;
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
	this.wiretype = tyts.WireFixed32;
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

tyts.Bool = new function() {
	this.$ = TYPE_BOOL;
	this.wiretype = tyts.WireVarint;
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

tyts.Bytes = new function() {
	this.$ = TYPE_BYTES;
	this.wiretype = tyts.WireBytes;
	this.Default = function() {
		return new Uint8Array(0);
	};
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
	this.wiretype = tyts.WireBytes;
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

tyts.Object = function(name, cutoff, fields) {
	var type = this;
	type.name = name;
	type.cutoff = cutoff;
	type.fields = fields;

	type.Type = function() {
		for (var i = 0; i < type.fields.length; i++) {
			var field = type.fields[i];
			var fieldname = '_' + field.name;
			Object.defineProperty(this, field.name, {
				get: function() {
					if (this[fieldname] == undefined) {
						this[fieldname] = field.type.Default();
					}
					return this[fieldname];
				},
				set: function(value) {
					this[fieldname] = value;
				}
			});
		}
	};

	type.Type.prototype.__class__ = name;
	type.Type.prototype.ByteSize = function() {
		return type.ByteSize(this, 0, true);
	};
	type.Type.prototype.Serialize = function() {
		var protobuf = new tyts.ProtoBuf(new Uint8Array(this.ByteSize()));
		type.Serialize(this, 0, true, protobuf);
		return protobuf.buffer;
	};
	type.Type.prototype.Deserialize = function(buffer) {
		type.DeserializeInplace(this, new tyts.ProtoBuf(buffer));
	};
	type.Type.Deserialize = function(buffer) {
		var object = new type.Type();
		type.DeserializeInplace(object, new tyts.ProtoBuf(buffer));
		return object;
	};
};

tyts.Object.prototype.$ = TYPE_OBJECT;
tyts.Object.prototype.wiretype = tyts.WireBytes;

tyts.Object.prototype.Default = function() {
	return null;
};

tyts.Object.prototype.Check = function(value) {
	return value instanceof type.Type;
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
	var buffer = protobuf.ReadBuffer(protobuf.ReadVarint());
	if (!value) {
		value = new this.Type();
	}
	if (buffer.length > 0) {
		this.DeserializeInplace(value, new tyts.ProtoBuf(buffer));
	}
	return value;
};

tyts.Object.prototype.DeserializeInplace = function(value, protobuf) {
	while (!protobuf.End()) {
		var tag_cutoff = protobuf.ReadTag(this.cutoff);
		var i = (tag_cutoff[0] >> tyts.WireTypeBits) - 1;
		if (tag_cutoff[1] && i >= 0 && i < this.fields.length) {
			var field = this.fields[i].type;
			var fieldname = '_' + this.fields[i].name;
			var wiretype = tag_cutoff[0] & tyts.WireTypeMask;
			if (field.wiretype == wiretype) {
				value[fieldname] = field.Deserialize(value[fieldname], protobuf);
				continue;
			} else if (field.$ == TYPE_LIST && field.element.wiretype == wiretype) {
				value[fieldname] = field.DeserializeRepeat(value[fieldname], protobuf);
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

tyts.Variant = function(name, types) {
	this.name = name;
	this.types = types;
};

tyts.Variant.prototype.$ = TYPE_VARIANT;
tyts.Variant.prototype.wiretype = tyts.WireBytes;

tyts.Variant.prototype.Default = function() {
	return null;
};

tyts.Variant.prototype.Check = function(value) {
	return false;
};

tyts.Variant.prototype.ByteSize = function(value, tagsize, ignore) {
	if (value == null) {
		return ignore ? 0 : tagsize + 1;
	}
	for (var i = 0; i < this.types.length; i++) {
		var variant = this.types[i];
		if (variant.type.Check(value)) {
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
		if (variant.type.Check(value)) {
			protobuf.WriteVarint(variant.type.ByteSize(value, variant.tagsize, true));
			variant.type.Serialize(value, variant.tag, true, protobuf);
			return;
		}
	}
	protobuf.WriteByte(0);
};

tyts.Variant.prototype.Deserialize = function(value, protobuf) {
	protobuf = new tyts.ProtoBuf(protobuf.ReadBuffer(protobuf.ReadVarint()));
	while (!protobuf.End()) {
		var tag_cutoff = protobuf.ReadTag(this.cutoff);
		var i = (tag_cutoff[0] >> tyts.WireTypeBits) - 1;
		if (tag_cutoff[1] && i >= 0 && i < this.types.length) {
			var variant = this.types[i].type;
			var wiretype = tag_cutoff[0] & tyts.WireTypeMask;
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

tyts.List = function(name, element) {
	this.name = name;
	this.element = element;
};

tyts.List.prototype.$ = TYPE_LIST;
tyts.List.prototype.wiretype = tyts.WireBytes;

tyts.List.prototype.Default = function() {
	return [];
};

tyts.List.prototype.Check = function(value) {
	return value instanceof Array;
};

tyts.List.prototype.ByteSize = function(value, tagsize, ignore) {
	if (!value.length && ignore) {
		return 0;
	}
	var element = this.element;
	if (element.$ == TYPE_LIST && element.element.$ > TYPE_PRIMITIVE) {
		var total = 0;
		for (var i = 0; i < value.length; i++) {
			var size = element.ByteSize(value[i], 0, false);
			total += tagsize + tyts.SizeVarint(size) + size;
		}
		return total;
	} else if (element.$ > TYPE_PRIMITIVE) {
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
		return tagsize + tyts.SizeVarint(size) + size;
	}
};

tyts.List.prototype.Serialize = function(value, tag, ignore, protobuf) {
	if (!value.length && ignore) {
		return;
	}
	var element = this.element;
	if (element.$ == TYPE_LIST && element.element.$ > TYPE_PRIMITIVE) {
		for (var i = 0; i < value.length; i++) {
			if (tag != 0) {
				protobuf.WriteVarint(tag);
			}
			var size = element.ByteSize(value[i], 0, false);
			protobuf.WriteVarint(size);
			element.Serialize(value[i], 0, false, protobuf);
		}
	} else if (element.$ > TYPE_PRIMITIVE) {
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

tyts.List.prototype.Deserialize = function(value, protobuf) {
	if (!value) {
		value = [];
	}
	var element = this.element;
	if (element.$ == TYPE_LIST && element.element.$ > TYPE_PRIMITIVE) {
		protobuf = new tyts.ProtoBuf(protobuf.ReadBuffer(protobuf.ReadVarint()));
		var list;
		while (!protobuf.End()) {
			list = element.Deserialize(list, protobuf);
		}
		value.push(list);
	} else if (element.$ > TYPE_PRIMITIVE) {
		value.push(element.Deserialize(undefined, protobuf));
	} else {
		protobuf = new tyts.ProtoBuf(protobuf.ReadBuffer(protobuf.ReadVarint()));
		while (!protobuf.End()) {
			value.push(element.Deserialize(undefined, protobuf));
		}
	}
	return value;
};

tyts.List.prototype.DeserializeRepeat = function(value, protobuf) {
	if (!value) {
		value = [];
	}
	value.push(element.Deserialize(undefined, protobuf));
	return value;
};

//=============================================================================

tyts.Dict = function(name, key, value) {
	this.name = name;
	this.key = key;
	this.value = value;
};

tyts.Dict.prototype.$ = TYPE_DICT;
tyts.Dict.prototype.wiretype = tyts.WireBytes;

tyts.Dict.prototype.Default = function() {
	return {};
};

tyts.Dict.prototype.Check = function(value) {
	return (value instanceof Object) && !(value instanceof Array) && !value.__class__;
};

tyts.Dict.prototype.ByteSize = function(value, tagsize, ignore) {
	var total = 0;
	for (var k in value) {
		var size = this.key.ByteSize(k, 1, true);
		size += this.value.ByteSize(value[k], 1, true);
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
		var size = this.key.ByteSize(k, 1, true);
		size += this.value.ByteSize(v, 1, true);
		protobuf.WriteVarint(size);
		this.key.Serialize(k, (1 << tyts.WireTypeBits) | this.key.wiretype, true, protobuf);
		this.value.Serialize(v, (2 << tyts.WireTypeBits) | this.value.wiretype, true, protobuf);
	}
};

tyts.Dict.prototype.Deserialize = function(value, protobuf) {
	protobuf = new tyts.ProtoBuf(protobuf.ReadBuffer(protobuf.ReadVarint()));
	var v, k = this.key.Default();
	while (!protobuf.End()) {
		var tag_cutoff = protobuf.ReadTag(this.cutoff);
		var i = tag_cutoff[0] >> tyts.WireTypeBits;
		if (tag_cutoff[1] && (i == 1 || i == 2)) {
			var field = (i == 1 ? this.key : this.value);
			var wiretype = tag_cutoff[0] & tyts.WireTypeMask;
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

tyts.Extension = function(name, type) {
	this.name = name;
	this.type = type;
};

tyts.Extension.prototype.$ = TYPE_EXTENSION;
tyts.Extension.prototype.wiretype = tyts.WireBytes;

tyts.Extension.prototype.Default = function() {
	return null;
};

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
		protobuf.WriteBytes(value.Serialize());
	}
};

tyts.Extension.prototype.Deserialize = function(value, protobuf) {
	if (!value) {
		value = new this.type();
	}
	value.Deserialize(protobuf.ReadBytes(protobuf.ReadVarint()));
	return value;
};
