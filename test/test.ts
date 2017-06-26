/// <reference path="../../typings/node/node.d.ts"/>
/// <reference path="extension.ts"/>

// Copyright 2017 ibelie, Chen Jie, Joungtao. All rights reserved.
// Use of this source code is governed by The MIT License
// that can be found in the LICENSE file.

import * as vm from "vm";
import * as fs from "fs";

function execfile(path) {
	let data = fs.readFileSync(path, "utf-8");
	vm.runInThisContext(data, path);
}

declare var goog;
let base_basedir = "../../closure/lib/closure/goog/";
execfile(base_basedir + "base.js");
execfile("deps.js");
goog.global.CLOSURE_IMPORT_SCRIPT = function(path) {
	execfile(base_basedir + path);
	return true;
};

import * as types from "./types";

let v = new types.Vector2();
v.P = new GoType();
v.X = 123;
v.Y = 123.4;
let d = v.Serialize();
console.log(d)
let v2 = types.Vector2.Deserialize(d);
console.log(v2);
