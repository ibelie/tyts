// Copyright 2017 ibelie, Chen Jie, Joungtao. All rights reserved.
// Use of this source code is governed by The MIT License
// that can be found in the LICENSE file.
goog.provide('GoType');
var GoType = (function () {
    function GoType(PP, AP) {
        this.__class__ = 'GoType';
        this.PP = PP;
        this.AP = AP;
    }
    GoType.prototype.ByteSize = function () {
        var n = 0;
        var x = this.PP;
        do {
            n++;
            x >>>= 7;
        } while (x);
        return n + this.AP.length;
    };
    GoType.prototype.Serialize = function () {
        var buffer = new Uint8Array(this.ByteSize());
        var x = this.PP, i = 0;
        while (x >= 0x80) {
            buffer[i++] = (x & 0x7F) | 0x80;
            x >>>= 7;
        }
        buffer[i++] = x & 0x7F;
        for (var j = 0; j < this.AP.length; j++) {
            buffer[i++] = this.AP.charCodeAt(j);
        }
        return buffer;
    };
    GoType.prototype.Deserialize = function (data) {
        var s = 0, i = 0;
        this.PP = 0;
        while (s < 64) {
            var b = data[i++];
            if (b < 0x80) {
                this.PP |= (b & 0x7F) << s;
                break;
            }
            this.PP |= (b & 0x7F) << s;
            s += 7;
        }
        this.AP = String.fromCharCode.apply(null, data.slice(i));
    };
    return GoType;
}());
