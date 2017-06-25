// Copyright 2017 ibelie, Chen Jie, Joungtao. All rights reserved.
// Use of this source code is governed by The MIT License
// that can be found in the LICENSE file.

goog.provide('tyts.ProtoBuf');
goog.provide('tyts.SizeVarint');
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

tyts.ProtoBuf = function(buffer) {
	this.offset = 0;
	this.buffer = buffer;
};

tyts.ProtoBuf.prototype.Reset = function() {
	this.offset = 0;
};

tyts.ProtoBuf.prototype.End = function() {
	return this.offset >= this.buffer.length;
}

tyts.ProtoBuf.prototype.WriteBytes = function(bytes) {
	this.buffer.set(bytes, this.offset);
	this.offset += bytes.length;
}

tyts.ProtoBuf.prototype.ReadBytes = function(n) {
	var slice = this.buffer.slice(this.offset, this.offset + n);
	this.offset += n;
	return slice;
}

tyts.ProtoBuf.prototype.ReadBuffer = function(n) {
	var buffer = this.buffer.subarray(this.offset, this.offset + n);
	this.offset += n;
	return buffer;
}

tyts.ProtoBuf.prototype.WriteVarint = function(x) {
	while (x >= 0x80) {
		this.buffer[this.offset++] = (x & 0x7F) | 0x80;
		x >>>= 7;
	}
	this.buffer[this.offset++] = (x & 0x7F) | 0x80;
}

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
}

tyts.ProtoBuf.prototype.WriteByte = function() {
	this.WriteBytes(arguments);
}

tyts.ProtoBuf.prototype.ReadByte = function() {
	return this.buffer[this.offset++];
}

tyts.ProtoBuf.prototype.WriteUint32 = function(x) {
	this.buffer[this.offset++] = (x >>>  0) & 0xFF;
	this.buffer[this.offset++] = (x >>>  8) & 0xFF;
	this.buffer[this.offset++] = (x >>> 16) & 0xFF;
	this.buffer[this.offset++] = (x >>> 24) & 0xFF;
}

tyts.ProtoBuf.prototype.ReadUint32 = function() {
	var a = this.buffer[this.offset++];
	var b = this.buffer[this.offset++];
	var c = this.buffer[this.offset++];
	var d = this.buffer[this.offset++];
	return ((a << 0) | (b << 8) | (c << 16) | (d << 24)) >>> 0;
}

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
}

tyts.ProtoBuf.prototype.SkipField = function(tag) {
	switch (tag & WireTypeMask) {
	case tyts.WireVarint:
		this.ReadVarint();
		break;
	case tyts.WireFixed64:
		this.ReadUint32();
		this.ReadUint32();
		break;
	case tyts.WireBytes:
		this.ReadBytes(this.ReadVarint());
		break;
	case tyts.WireFixed32:
		this.ReadUint32();
		break;
	}
}
