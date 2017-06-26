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
        return 0;
    };
    GoType.prototype.Serialize = function () {
        return new Uint8Array(0);
    };
    GoType.prototype.Deserialize = function (data) {
    };
    return GoType;
}());
