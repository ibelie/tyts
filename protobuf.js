// Copyright 2017 ibelie, Chen Jie, Joungtao. All rights reserved.
// Use of this source code is governed by The MIT License
// that can be found in the LICENSE file.

goog.provide('tyts.ProtoBuf');

tyts.ProtoBuf = function(buffer) {
	this.offset = 0;
	this.buffer = buffer;
};

tyts.ProtoBuf.WireTypeBits   = 3;
tyts.ProtoBuf.WireTypeMask   = (1 << WireTypeBits) - 1;
tyts.ProtoBuf.WireVarint     = 0;
tyts.ProtoBuf.WireFixed64    = 1;
tyts.ProtoBuf.WireBytes      = 2;
tyts.ProtoBuf.WireStartGroup = 3;
tyts.ProtoBuf.WireEndGroup   = 4;
tyts.ProtoBuf.WireFixed32    = 5;

tyts.ProtoBuf.SizeVarint = function(x) {
	var n = 0;
	do { n++; x >>>= 7; } while (x);
	return n;
};

tyts.ProtoBuf.SizeString = function(s) {
	var n = 0;
	for (var i = 0; i < s.length; i++) {
		var c = s.charCodeAt(i);
		if (c < 128) {
			n++;
		} else if (c < 2048) {
			n += 2;
		} else {
			n += 3;
		}
	}
	return n;
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
	return this.buffer.slice(this.offset, this.offset + n);
}

tyts.ProtoBuf.prototype.WriteString = function(s) {
	this.WriteVarint(tyts.ProtoBuf.SizeString(s));
	// UTF16 to UTF8 conversion loop
	for (var i = 0; i < s.length; i++) {
		var c = s.charCodeAt(i);
		if (c < 128) {
			this.buffer[this.offset++] = c;
		} else if (c < 2048) {
			this.buffer[this.offset++] = (c >> 6) | 192;
			this.buffer[this.offset++] = (c & 63) | 128;
		} else {
			this.buffer[this.offset++] = (c >> 12) | 224;
			this.buffer[this.offset++] = ((c >> 6) & 63) | 128;
			this.buffer[this.offset++] = (c & 63) | 128;
		}
	}
}

tyts.ProtoBuf.prototype.ReadString = function() {
	var bytes = this.ReadBytes(this.ReadVarint());
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
	while (this.offset < 10) {
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
	this.buffer[this.offset++] = (value >>>  0) & 0xFF;
	this.buffer[this.offset++] = (value >>>  8) & 0xFF;
	this.buffer[this.offset++] = (value >>> 16) & 0xFF;
	this.buffer[this.offset++] = (value >>> 24) & 0xFF;
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
	case tyts.ProtoBuf.WireVarint:
		this.ReadVarint();
		break;
	case tyts.ProtoBuf.WireFixed64:
		this.ReadUint32();
		this.ReadUint32();
		break;
	case tyts.ProtoBuf.WireBytes:
		this.ReadBytes(this.ReadVarint());
		break;
	case tyts.ProtoBuf.WireFixed32:
		this.ReadUint32();
		break;
	}
}
