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
	this.ByteSize = function(value, tagsize, ignore) {
		if (!ignore || value != 0) {
			return tagsize + tyts.ProtoBuf.SizeVarint(value);
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

tyts.FixedPoint.prototype.ByteSize = function(value, tagsize, ignore) {
	if (!ignore || value != this.floor) {
		return tagsize + tyts.ProtoBuf.SizeVarint(Math.floor((value - this.floor) * this.precision));
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
}();

//=============================================================================

tyts.String = new function() {
	this.$ = TYPE_STRING;
}();

//=============================================================================

tyts.Object = function(name, fields) {
	var type = this;
	type.name = name;
	type.fields = fields;

	type.Instance = function() {
		for (var i = type.fields.length - 1; i >= 0; i--) {
			var field = type.fields[i];
			Object.defineProperty(this, field.name, {
				get: function() {
					if (this[field.name] == undefined) {
						switch (field.type.$) {
						case TYPE_INTEGER:
						case TYPE_FIXEDPOINT:
						case TYPE_FLOAT64:
						case TYPE_FLOAT32:
							this[field.name] = 0;
							break;
						case TYPE_BOOL:
							this[field.name] = false;
							break;
						case TYPE_BYTES:
							this[field.name] = [];
							break;
						case TYPE_STRING:
							this[field.name] = "";
							break;
						case TYPE_OBJECT:
						case TYPE_VARIANT:
							this[field.name] = null;
							break;
						case TYPE_LIST:
							this[field.name] = [];
							break;
						case TYPE_DICT:
							this[field.name] = {};
							break;
						}
					}
					return this[field.name];
				},
				set: function(value) {
					this[field.name] = value;
				}
			});
		}
	};

	type.Instance.prototype.ByteSize = function() {
		return type.ByteSize(this, 0, true);
	};
	type.Instance.prototype.Serialize = function(protobuf) {
		type.Serialize(this, 0, true, protobuf);
	};
	type.Instance.prototype.Deserialize = function(protobuf) {
		return type.Deserialize(this, protobuf);
	};
};

tyts.Object.prototype.$ = TYPE_OBJECT;

tyts.Object.prototype.ByteSize = function(value, tagsize, ignore) {

};

tyts.Object.prototype.Serialize = function(value, tag, ignore, protobuf) {

};

tyts.Object.prototype.Deserialize = function(value, protobuf) {

};

//=============================================================================

tyts.Variant = function(name, fields) {
	this.name = name;
	this.fields = fields;
};

tyts.Variant.prototype.$ = TYPE_VARIANT;

//=============================================================================

tyts.List = function(name, fields) {
	this.name = name;
	this.fields = fields;
};

tyts.List.prototype.$ = TYPE_LIST;

//=============================================================================

tyts.Dict = function(name, fields) {
	this.name = name;
	this.fields = fields;
};

tyts.Dict.prototype.$ = TYPE_DICT;

//=============================================================================

tyts.Extension = new function() {
	this.$ = TYPE_EXTENSION;
}();
