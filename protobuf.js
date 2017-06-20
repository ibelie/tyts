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

tyts.ProtoBuf.MAKE_TAG = function(fieldNum, wireType) {
	return (fieldNum << tyts.ProtoBuf.WireTypeBits) | wireType;
};

tyts.ProtoBuf.MAKE_CUTOFF = function(fieldNum) {
	var max_tag = tyts.ProtoBuf.MAKE_TAG(fieldNum, tyts.ProtoBuf.WireTypeMask);
	if (max_tag <= 0x7F) {
		return 0x7F;
	} else if (max_tag <= 0x3FFF) {
		return 0x3FF;
	} else {
		return max_tag;
	}
};

tyts.ProtoBuf.TAG_FIELD = function(tag) {
	return tag >> WireTypeBits;
};

tyts.ProtoBuf.TAG_WIRE = function(tag) {
	return tag & WireTypeMask;
};

tyts.ProtoBuf.TAG_SIZE = function(fieldNum) {
	return tyts.ProtoBuf.SizeVarint(fieldNum << WireTypeBits);
};

tyts.ProtoBuf.SizeVarint = function(x) {
	var n = 0;
	do { n++; x >>= 7; } while (x);
	return n;
};

tyts.ProtoBuf.prototype.Reset = function() {
	this.offset = 0;
};

tyts.ProtoBuf.prototype.WriteBytes = function(bytes) {
	this.buffer.set(bytes, this.offset);
	this.offset += bytes.length;
}

tyts.ProtoBuf.prototype.Read = function(n) {
	return this.buffer.slice(this.offset, this.offset + n);
}

tyts.ProtoBuf.prototype.WriteVarint = function(x uint64) {
	for x >= 0x80 {
		this.buffer[this.offset] = byte(x) | 0x80
		x >>= 7
		this.offset++
	}
	this.buffer[this.offset] = byte(x)
	this.offset++
}

tyts.ProtoBuf.prototype.ReadVarint = function() (uint64, error) {
	var x uint64
	var s uint
	for i, b := range this.buffer[this.offset:] {
		if b < 0x80 {
			if i > 9 || i == 9 && b > 1 {
				return 0, fmt.Errorf("[Tygo][ProtoBuf] ReadVarint overflow: %v", this.buffer[this.offset:this.offset+i+1])
			}
			this.offset += i + 1
			return x | uint64(b)<<s, nil
		}
		x |= uint64(b & 0x7f) << s
		s += 7
	}
	return 0, io.EOF
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

tyts.ProtoBuf.prototype.ReadTag = function(cutoff int) (int, bool, error) {
	if this.offset >= len(this.buffer) {
		return 0, false, io.EOF
	}
	b1 := int(this.buffer[this.offset])
	if b1 < 0x80 {
		this.offset++
		return b1, cutoff >= 0x7F || b1 <= cutoff, nil
	}
	if this.offset+1 >= len(this.buffer) {
		return 0, false, io.EOF
	}
	b2 := int(this.buffer[this.offset+1])
	if cutoff >= 0x80 && b2 < 0x80 {
		this.offset += 2
		b1 = (b2 << 7) + (b1 - 0x80)
		return b1, cutoff >= 0x3FFF || b1 <= cutoff, nil
	}
	x, err := this.ReadVarint()
	return int(x), int(x) <= cutoff, err
}

tyts.ProtoBuf.prototype.ExpectTag = function(fieldNum int, wireType WireType) bool {
	if this.offset >= len(this.buffer) {
		return false
	}
	offset := this.offset
	tag := _MAKE_TAG(fieldNum, wireType)
	for tag >= 0x80 {
		if this.buffer[offset] != byte(tag)|0x80 {
			return false
		}
		tag >>= 7
		offset++
		if offset >= len(this.buffer) {
			return false
		}
	}
	if this.buffer[offset] != byte(tag) {
		return false
	}
	this.offset = offset + 1
	return true
}

tyts.ProtoBuf.prototype.ExpectEnd = function() bool {
	return this.offset >= len(this.buffer)
}

tyts.ProtoBuf.prototype.SkipField = function(tag int) (err error) {
	switch _TAG_WIRE(tag) {
	case WireVarint:
		_, err = this.ReadVarint()
	case WireFixed64:
		_, err = this.ReadFixed64()
	case WireBytes:
		_, err = this.ReadBuf()
	case WireFixed32:
		_, err = this.ReadFixed32()
	default:
		err = fmt.Errorf("[Tygo][WireType] Unexpect field type to skip: %d", tag)
	}
	return
}
