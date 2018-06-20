// Copyright 2017-2018 ibelie, Chen Jie, Joungtao. All rights reserved.
// Use of this source code is governed by The MIT License
// that can be found in the LICENSE file.

goog.provide('ibelie.tyts.ProtoBuf');
goog.provide('ibelie.tyts.SizeVarint');
goog.provide('ibelie.tyts.SizeSymbol');
goog.provide('ibelie.tyts.SymbolEncodedLen');
goog.provide('ibelie.tyts.WireTypeBits');
goog.provide('ibelie.tyts.WireTypeMask');
goog.provide('ibelie.tyts.WireVarint')
goog.provide('ibelie.tyts.WireFixed64')
goog.provide('ibelie.tyts.WireBytes')
goog.provide('ibelie.tyts.WireStart')
goog.provide('ibelie.tyts.WireEnd')
goog.provide('ibelie.tyts.WireFixed32')

ibelie.tyts.WireTypeBits   = 3;
ibelie.tyts.WireTypeMask   = (1 << ibelie.tyts.WireTypeBits) - 1;

ibelie.tyts.WireVarint  = 0;
ibelie.tyts.WireFixed64 = 1;
ibelie.tyts.WireBytes   = 2;
ibelie.tyts.WireStart   = 3;
ibelie.tyts.WireEnd     = 4;
ibelie.tyts.WireFixed32 = 5;

ibelie.tyts.SizeVarint = function(x) {
	var n = 0;
	do { n++; x >>>= 7; } while (x);
	return n;
};

ibelie.tyts.SymbolEncodedLen = function(data) {
	return Math.floor((data.length * 6 + 7) / 8);
};

ibelie.tyts.SizeSymbol = function(data) {
	var x = Math.floor((data.length * 6 + 7) / 8);
	var n = x;
	do { n++; x >>>= 7; } while (x);
	return n;
};

ibelie.tyts.ProtoBuf = function(buffer) {
	this.offset = 0;
	this.buffer = buffer;
};

ibelie.tyts.ProtoBuf.prototype.End = function() {
	return this.offset >= this.buffer.length;
};

ibelie.tyts.ProtoBuf.prototype.Bytes = function() {
	return this.buffer.subarray(this.offset);
};

ibelie.tyts.ProtoBuf.prototype.WriteBytes = function(bytes) {
	this.buffer.set(bytes, this.offset);
	this.offset += bytes.length;
};

ibelie.tyts.ProtoBuf.prototype.ReadBytes = function() {
	var n = this.ReadVarint();
	var slice = this.buffer.subarray(this.offset, this.offset + n);
	this.offset += n;
	return slice;
};

ibelie.tyts.ProtoBuf.prototype.ReadBuffer = function() {
	var n = this.ReadVarint();
	var buffer = this.buffer.subarray(this.offset, this.offset + n);
	this.offset += n;
	return buffer;
};

ibelie.tyts.ProtoBuf.prototype.WriteVarint = function(x) {
	while (x >= 0x80) {
		this.buffer[this.offset++] = (x & 0x7F) | 0x80;
		x >>>= 7;
	}
	this.buffer[this.offset++] = x & 0x7F;
};

ibelie.tyts.ProtoBuf.prototype.ReadVarint = function() {
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

ibelie.tyts.ProtoBuf.prototype.WriteByte = function() {
	for (var i = 0; i < arguments.length; i++) {
		this.buffer[this.offset++] = arguments[i] & 0xFF;
	}
};

ibelie.tyts.ProtoBuf.prototype.ReadByte = function() {
	return this.buffer[this.offset++];
};

ibelie.tyts.ProtoBuf.prototype.WriteUint32 = function(x) {
	this.buffer[this.offset++] = (x >>>  0) & 0xFF;
	this.buffer[this.offset++] = (x >>>  8) & 0xFF;
	this.buffer[this.offset++] = (x >>> 16) & 0xFF;
	this.buffer[this.offset++] = (x >>> 24) & 0xFF;
};

ibelie.tyts.ProtoBuf.prototype.ReadUint32 = function() {
	var a = this.buffer[this.offset++];
	var b = this.buffer[this.offset++];
	var c = this.buffer[this.offset++];
	var d = this.buffer[this.offset++];
	return ((a << 0) | (b << 8) | (c << 16) | (d << 24)) >>> 0;
};

ibelie.tyts.ProtoBuf.prototype.ReadTag = function(cutoff) {
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

ibelie.tyts.ProtoBuf.prototype.SkipField = function(tag) {
	switch (tag & ibelie.tyts.WireTypeMask) {
	case ibelie.tyts.WireVarint:
		this.ReadVarint();
		break;
	case ibelie.tyts.WireFixed64:
		this.ReadUint32();
		this.ReadUint32();
		break;
	case ibelie.tyts.WireBytes:
		this.ReadBytes();
		break;
	case ibelie.tyts.WireFixed32:
		this.ReadUint32();
		break;
	}
};

ibelie.tyts.ProtoBuf.C2BMap = {};
ibelie.tyts.ProtoBuf.B2CMap = '-' + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
	'abcdefghijklmnopqrstuvwxyz' + '0123456789' + '_';

for (var i = 0; i < ibelie.tyts.ProtoBuf.B2CMap.length; i++) {
	ibelie.tyts.ProtoBuf.C2BMap[ibelie.tyts.ProtoBuf.B2CMap.charAt(i)] = i;
}

ibelie.tyts.ProtoBuf.prototype.WriteBase64 = function(data) {
	if (data.length < 1) {
		return;
	}

	var v;
	var C2BMap = ibelie.tyts.ProtoBuf.C2BMap;
	var n = Math.floor(data.length / 4) * 4;
	for (var i = 0; i < n;) {
		// Convert 4x 6bit source bytes into 3 bytes
		v = (C2BMap[data.charAt(i++)] << 18) |
			(C2BMap[data.charAt(i++)] << 12) |
			(C2BMap[data.charAt(i++)] << 6) |
			(C2BMap[data.charAt(i++)] << 0);

		this.buffer[this.offset++] = 0xFF & (v >>> 16);
		this.buffer[this.offset++] = 0xFF & (v >>> 8);
		this.buffer[this.offset++] = 0xFF & (v >>> 0);
	}

	switch (data.length - n) {
	case 2:
		this.buffer[this.offset++] = (C2BMap[data.charAt(n + 0)] << 2) |
									(C2BMap[data.charAt(n + 1)] >>> 4);
		break;
	case 3:
		v = (C2BMap[data.charAt(n + 0)] << 10) |
			(C2BMap[data.charAt(n + 1)] << 4) |
			(C2BMap[data.charAt(n + 2)] >>> 2);
		this.buffer[this.offset++] = 0xFF & (v >>> 8);
		this.buffer[this.offset++] = 0xFF & (v >>> 0);
		break;
	}
};

ibelie.tyts.ProtoBuf.prototype.ReadBase64 = function(count, start) {
	if (start !== undefined) {
		this.offset = start;
	} else if (count < 2) {
		return '';
	}

	var outLen = 0;
	var output = new Array(Math.ceil(count * 4 / 3));
	var B2CMap = ibelie.tyts.ProtoBuf.B2CMap;
	var end = this.offset + count;
	var n = this.offset + Math.floor(count / 3) * 3;

	var v;
	while (this.offset < n) {
		// Convert 3x 8bit source bytes into 4 bytes
		v = (this.buffer[this.offset++] << 16) |
			(this.buffer[this.offset++] << 8) |
			(this.buffer[this.offset++] << 0);

		output[outLen++] = B2CMap.charAt(0x3F & (v >>> 18));
		output[outLen++] = B2CMap.charAt(0x3F & (v >>> 12));
		output[outLen++] = B2CMap.charAt(0x3F & (v >>> 6));
		output[outLen++] = B2CMap.charAt(0x3F & (v >>> 0));
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

ibelie.tyts.ProtoBuf.prototype.EncodeSymbol = function(data) {
	if (data.length < 1) {
		return;
	}

	var v;
	var C2BMap = ibelie.tyts.ProtoBuf.C2BMap;
	var n = Math.floor(data.length / 4) * 4;
	for (var i = 0; i < n;) {
		// Convert 4x 6bit source bytes into 3 bytes
		v = (C2BMap[data.charAt(i++)] << 18) |
			(C2BMap[data.charAt(i++)] << 12) |
			(C2BMap[data.charAt(i++)] << 6) |
			(C2BMap[data.charAt(i++)] << 0);

		this.buffer[this.offset++] = 0xFF & (v >>> 16);
		this.buffer[this.offset++] = 0xFF & (v >>> 8);
		this.buffer[this.offset++] = 0xFF & (v >>> 0);
	}

	v = 0;
	var remain = data.length - n;
	for (var j = 0; j < remain; j++) {
		v |= C2BMap[data.charAt(n + j)] << (18 - j * 6);
	}
	for (var j = 0; j < remain; j++) {
		this.buffer[this.offset++] = 0xFF & (v >>> (16 - j * 8));
	}
};

ibelie.tyts.ProtoBuf.prototype.DecodeSymbol = function(count, start) {
	if (start !== undefined) {
		this.offset = start;
	} else if (count === undefined) {
		count = this.buffer.length - this.offset;
	}
	if (count < 1) {
		return '';
	}

	var v;
	var outLen = 0;
	var output = new Array(Math.floor(count * 4 / 3));
	var B2CMap = ibelie.tyts.ProtoBuf.B2CMap;
	var end = this.offset + count;
	var n = this.offset + Math.floor(count / 3) * 3;

	while (this.offset < n) {
		// Convert 3x 8bit source bytes into 4 bytes
		v = (this.buffer[this.offset++] << 16) |
			(this.buffer[this.offset++] << 8) |
			(this.buffer[this.offset++] << 0);

		output[outLen++] = B2CMap.charAt(0x3F & (v >>> 18));
		output[outLen++] = B2CMap.charAt(0x3F & (v >>> 12));
		output[outLen++] = B2CMap.charAt(0x3F & (v >>> 6));
		output[outLen++] = B2CMap.charAt(0x3F & (v >>> 0));
	}

	switch (end - this.offset) {
	case 1:
		output[outLen++] = B2CMap.charAt(0x3F & (this.buffer[this.offset++] >>> 2));
		break;
	case 2:
		v = (this.buffer[this.offset++] << 8) |
			(this.buffer[this.offset++] << 0);
		output[outLen++] = B2CMap.charAt(0x3F & (v >>> 10));
		output[outLen++] = B2CMap.charAt(0x3F & (v >>> 4));
		break;
	}

	if (output[outLen - 1] == '-') {
		output[outLen - 1] = undefined;
	}
	return output.join('');
};

ibelie.tyts.ProtoBuf.prototype.WriteSymbol = function(data) {
	this.WriteVarint(Math.floor((data.length * 6 + 7) / 8));
	this.EncodeSymbol(data);
};

ibelie.tyts.ProtoBuf.prototype.ReadSymbol = function() {
	return this.DecodeSymbol(this.ReadVarint());
};

ibelie.tyts.ProtoBuf.prototype.ToBase64 = function() {
	return this.ReadBase64(this.buffer.length, 0);
};

ibelie.tyts.ProtoBuf.FromBase64 = function(data) {
	var protobuf = new ibelie.tyts.ProtoBuf(new Uint8Array(Math.ceil(data.length * 3 / 4)));
	protobuf.WriteBase64(data);
	protobuf.buffer = protobuf.buffer.subarray(0, protobuf.offset);
	protobuf.offset = 0;
	return protobuf;
};
