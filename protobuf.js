// Copyright 2017 ibelie, Chen Jie, Joungtao. All rights reserved.
// Use of this source code is governed by The MIT License
// that can be found in the LICENSE file.

goog.provide('tyts.ProtoBuf');
goog.provide('tyts.SizeVarint');
goog.provide('tyts.SizeSymbol');
goog.provide('tyts.SymbolEncodedLen');
goog.provide('tyts.WireTypeBits');
goog.provide('tyts.WireTypeMask');
goog.provide('tyts.WireVarint')
goog.provide('tyts.WireFixed64')
goog.provide('tyts.WireBytes')
goog.provide('tyts.WireStart')
goog.provide('tyts.WireEnd')
goog.provide('tyts.WireFixed32')

tyts.WireTypeBits   = 3;
tyts.WireTypeMask   = (1 << tyts.WireTypeBits) - 1;

tyts.WireVarint  = 0;
tyts.WireFixed64 = 1;
tyts.WireBytes   = 2;
tyts.WireStart   = 3;
tyts.WireEnd     = 4;
tyts.WireFixed32 = 5;

tyts.SizeVarint = function(x) {
	var n = 0;
	do { n++; x >>>= 7; } while (x);
	return n;
};

tyts.SymbolEncodedLen = function(data) {
	return Math.floor((data.length * 6 + 7) / 8);
};

tyts.SizeSymbol = function(data) {
	var x = Math.floor((data.length * 6 + 7) / 8);
	var n = x;
	do { n++; x >>>= 7; } while (x);
	return n;
};

tyts.ProtoBuf = function(buffer) {
	this.offset = 0;
	this.buffer = buffer;
};

tyts.ProtoBuf.prototype.End = function() {
	return this.offset >= this.buffer.length;
};

tyts.ProtoBuf.prototype.Bytes = function() {
	return this.buffer.subarray(this.offset);
};

tyts.ProtoBuf.prototype.WriteBytes = function(bytes) {
	this.buffer.set(bytes, this.offset);
	this.offset += bytes.length;
};

tyts.ProtoBuf.prototype.ReadBytes = function() {
	var n = this.ReadVarint();
	var slice = this.buffer.subarray(this.offset, this.offset + n);
	this.offset += n;
	return slice;
};

tyts.ProtoBuf.prototype.ReadBuffer = function() {
	var n = this.ReadVarint();
	var buffer = this.buffer.subarray(this.offset, this.offset + n);
	this.offset += n;
	return buffer;
};

tyts.ProtoBuf.prototype.WriteVarint = function(x) {
	while (x >= 0x80) {
		this.buffer[this.offset++] = (x & 0x7F) | 0x80;
		x >>>= 7;
	}
	this.buffer[this.offset++] = x & 0x7F;
};

tyts.ProtoBuf.prototype.ReadVarint = function() {
	var x = 0, s = 0;
	while (s < 64) {
		var b = this.buffer[this.offset++];
		if (b < 0x80) {
			return x | ((b & 0x7F) << s);
		}
		x |= ((b & 0x7F) << s);
		s += 7;
	}
	return x;
};

tyts.ProtoBuf.prototype.WriteByte = function() {
	for (var i = 0; i < arguments.length; i++) {
		this.buffer[this.offset++] = arguments[i] & 0xFF;
	}
};

tyts.ProtoBuf.prototype.ReadByte = function() {
	return this.buffer[this.offset++];
};

tyts.ProtoBuf.prototype.WriteUint32 = function(x) {
	this.buffer[this.offset++] = (x >>>  0) & 0xFF;
	this.buffer[this.offset++] = (x >>>  8) & 0xFF;
	this.buffer[this.offset++] = (x >>> 16) & 0xFF;
	this.buffer[this.offset++] = (x >>> 24) & 0xFF;
};

tyts.ProtoBuf.prototype.ReadUint32 = function() {
	var a = this.buffer[this.offset++];
	var b = this.buffer[this.offset++];
	var c = this.buffer[this.offset++];
	var d = this.buffer[this.offset++];
	return ((a << 0) | (b << 8) | (c << 16) | (d << 24)) >>> 0;
};

tyts.ProtoBuf.prototype.ReadTag = function(cutoff) {
	var b1 = this.buffer[this.offset++];
	if (b1 < 0x80) {
		return [b1 & 0x7F, cutoff >= 0x7F || b1 <= cutoff];
	}
	var b2 = this.buffer[this.offset++];
	if (cutoff >= 0x80 && b2 < 0x80) {
		b1 = ((b2 & 0x7F) << 7) + (b1 & 0x7F);
		return [b1, cutoff >= 0x3FFF || b1 <= cutoff];
	}
	var x = this.ReadVarint();
	return [x, x <= cutoff];
};

tyts.ProtoBuf.prototype.SkipField = function(tag) {
	switch (tag & tyts.WireTypeMask) {
	case tyts.WireVarint:
		this.ReadVarint();
		break;
	case tyts.WireFixed64:
		this.ReadUint32();
		this.ReadUint32();
		break;
	case tyts.WireBytes:
		this.ReadBytes();
		break;
	case tyts.WireFixed32:
		this.ReadUint32();
		break;
	}
};

tyts.ProtoBuf.C2BMap = {};
tyts.ProtoBuf.B2CMap = '-' + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
	'abcdefghijklmnopqrstuvwxyz' + '0123456789' + '_';

for (var i = 0; i < tyts.ProtoBuf.B2CMap.length; i++) {
	tyts.ProtoBuf.C2BMap[tyts.ProtoBuf.B2CMap.charAt(i)] = i;
}

tyts.ProtoBuf.prototype.WriteBase64 = function(data) {
	if (data.length < 1) {
		return;
	}

	var C2BMap = tyts.ProtoBuf.C2BMap;
	var n = Math.floor(data.length / 4) * 4;
	for (var i = 0; i < n;) {
		// Convert 4x 6bit source bytes into 3 bytes
		var val = (C2BMap[data.charAt(i++)] << 18) |
			(C2BMap[data.charAt(i++)] << 12) |
			(C2BMap[data.charAt(i++)] << 6) |
			C2BMap[data.charAt(i++)];

		this.buffer[this.offset++] = 0xFF & (val >>> 16);
		this.buffer[this.offset++] = 0xFF & (val >>> 8);
		this.buffer[this.offset++] = 0xFF & val;
	}

	switch (data.length - n) {
	case 2:
		this.buffer[this.offset++] = (C2BMap[data.charAt(n)] << 2) |
			(C2BMap[data.charAt(n + 1)] >>> 4);
		break;
	case 3:
		var val = (C2BMap[data.charAt(n)] << 10) |
			(C2BMap[data.charAt(n + 1)] << 4) |
			(C2BMap[data.charAt(n + 2)] >>> 2);
		this.buffer[this.offset++] = 0xFF & (val >>> 8);
		this.buffer[this.offset++] = 0xFF & val;
		break;
	}
};

tyts.ProtoBuf.prototype.ReadBase64 = function(count, start) {
	if (start !== undefined) {
		this.offset = start;
	} else if (count < 2) {
		return '';
	}

	var outLen = 0;
	var output = new Array(Math.ceil(count * 4 / 3));
	var B2CMap = tyts.ProtoBuf.B2CMap;
	var end = this.offset + count;
	var n = this.offset + Math.floor(count / 3) * 3;

	while (this.offset < n) {
		// Convert 3x 8bit source bytes into 4 bytes
		var val = (this.buffer[this.offset++] << 16) |
			(this.buffer[this.offset++] << 8) |
			this.buffer[this.offset++];

		output[outLen++] = B2CMap.charAt((val >>> 18) & 0x3F);
		output[outLen++] = B2CMap.charAt((val >>> 12) & 0x3F);
		output[outLen++] = B2CMap.charAt((val >>> 6)  & 0x3F);
		if (outLen < output.length) {
			output[outLen++] = B2CMap.charAt(val & 0x3F);
		}
	}

	if (this.offset < end) {
		var byte1 = this.buffer[this.offset++];
		output[outLen++] = B2CMap.charAt(byte1 >>> 2);
		if (this.offset < end) {
			var byte2 = this.buffer[this.offset++];
			output[outLen++] = B2CMap.charAt(((byte1 & 0x03) << 4) | (byte2 >>> 4));
			output[outLen++] = B2CMap.charAt((byte2 & 0x0F) << 2);
		} else {
			output[outLen++] = B2CMap.charAt((byte1 & 0x03) << 4);
		}
	}

	return output.join('');
};

tyts.ProtoBuf.prototype.EncodeSymbol = function(data) {
	if (data.length < 1) {
		return;
	}

	var C2BMap = tyts.ProtoBuf.C2BMap;
	var n = Math.floor(data.length / 4) * 4;
	for (var i = 0; i < n;) {
		// Convert 4x 6bit source bytes into 3 bytes
		var val = (C2BMap[data.charAt(i++)] << 18) |
			(C2BMap[data.charAt(i++)] << 12) |
			(C2BMap[data.charAt(i++)] << 6) |
			C2BMap[data.charAt(i++)];

		this.buffer[this.offset++] = 0xFF & (val >>> 16);
		this.buffer[this.offset++] = 0xFF & (val >>> 8);
		this.buffer[this.offset++] = 0xFF & val;
	}

	var val = 0;
	var remain = data.length - n;
	for (var j = 0; j < remain; j++) {
		val |= C2BMap[data.charAt(n + j)] << (18 - j * 6);
	}
	for (var j = 0; j < remain; j++) {
		this.buffer[this.offset++] = 0xFF & (val >>> (16 - j * 8));
	}
};

tyts.ProtoBuf.prototype.DecodeSymbol = function(count, start) {
	if (start !== undefined) {
		this.offset = start;
	} else if (count === undefined) {
		count = this.buffer.length - this.offset;
	}
	if (count < 1) {
		return '';
	}

	var outLen = 0;
	var output = new Array(Math.floor(count * 4 / 3));
	var B2CMap = tyts.ProtoBuf.B2CMap;
	var end = this.offset + count;
	var n = this.offset + Math.floor(count / 3) * 3;

	while (this.offset < n) {
		// Convert 3x 8bit source bytes into 4 bytes
		var val = (this.buffer[this.offset++] << 16) |
			(this.buffer[this.offset++] << 8) |
			this.buffer[this.offset++];

		output[outLen++] = B2CMap.charAt((val >>> 18) & 0x3F);
		output[outLen++] = B2CMap.charAt((val >>> 12) & 0x3F);
		output[outLen++] = B2CMap.charAt((val >>> 6)  & 0x3F);
		output[outLen++] = B2CMap.charAt(val & 0x3F);
	}

	switch (end - this.offset) {
	case 1:
		output[outLen++] = B2CMap.charAt((val >>> 2) & 0x3F);
	case 2:
		var val = (this.buffer[this.offset++] << 8) | this.buffer[this.offset++];
		output[outLen++] = B2CMap.charAt((val >>> 10) & 0x3F);
		output[outLen++] = B2CMap.charAt((val >>> 4) & 0x3F);
	}

	if (output[output.length - 1] == '-') {
		output[output.length - 1] = undefined;
	}
	return output.join('');
};

tyts.ProtoBuf.prototype.WriteSymbol = function(data) {
	this.WriteVarint(Math.floor((data.length * 6 + 7) / 8));
	this.EncodeSymbol(data);
};

tyts.ProtoBuf.prototype.ReadSymbol = function() {
	return this.DecodeSymbol(this.ReadVarint());
};

tyts.ProtoBuf.prototype.ToBase64 = function() {
	return this.ReadBase64(this.buffer.length, 0);
};

tyts.ProtoBuf.FromBase64 = function(data) {
	var protobuf = new tyts.ProtoBuf(new Uint8Array(Math.ceil(data.length * 3 / 4)));
	protobuf.WriteBase64(data);
	protobuf.buffer = protobuf.buffer.subarray(0, protobuf.offset);
	protobuf.offset = 0;
	return protobuf;
};
