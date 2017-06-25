/// <reference path="../../typings/node/node.d.ts"/>
/// <reference path="extension.ts"/>
"use strict";
// Copyright 2017 ibelie, Chen Jie, Joungtao. All rights reserved.
// Use of this source code is governed by The MIT License
// that can be found in the LICENSE file.
var vm = require("vm");
var fs = require("fs");
function execfile(path) {
    var data = fs.readFileSync(path, "utf-8");
    vm.runInThisContext(data, path);
}
var base_basedir = "../../closure/lib/closure/goog/";
execfile(base_basedir + "base.js");
execfile("deps.js");
goog.global.CLOSURE_IMPORT_SCRIPT = function (path) {
    execfile(base_basedir + path);
    return true;
};
var types = require("./types");
console.log(types);
var v = new types.Vector2();
v.P = new GoType();
v.X = 123;
v.Y = 123.4;
var d = v.Serialize();
console.log(d);
var v2 = types.Vector2.Deserialize(d);
console.log(v2);
