"use strict";
// Copyright 2017 - 2018 ibelie, Chen Jie, Joungtao. All rights reserved.
// Use of this source code is governed by The MIT License
// that can be found in the LICENSE file.
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="typings/node/node.d.ts"/>
/// <reference path="types_test.ts"/>
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
goog.require('TestVector2');
goog.require('TestFighter');
TestVector2();
TestFighter();
