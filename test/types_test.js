/// <reference path="extension.ts"/>
/// <reference path="types.d.ts"/>
goog.require('types.Fighter');
goog.require('types.Fighter_Part1');
goog.require('types.Fighter_Part2');
goog.require('types.Vector2');
goog.require('GoType');
goog.provide('TestVector2');
goog.provide('TestFighter');
var v = new types.Vector2();
v.X = 123;
v.Y = 45.6;
v.B = new Uint8Array([1, 2, 3, 4]);
v.S = "哈哈哈哈";
v.E = 3 /* LOCAL */;
v.P = new GoType(123, "asdf");
var v2 = new types.Vector2();
v2.X = 1234;
v2.Y = 345.6;
v2.B = new Uint8Array([4, 3, 2, 1]);
v2.S = "哈哈 吼吼吼";
v2.E = 5 /* PRODUCTS */;
v2.P = new GoType(321, "qwer");
var fighter = new types.Fighter();
fighter.Pos = v;
fighter.Hp = 12;
fighter.IsAwake = true;
fighter.Poss = { 321: v, 320: null, 231: v2 };
fighter.Posi = { 123: 0.456 };
fighter.Posl = [v, new types.Vector2(), v2];
fighter.Posll = [[v, new types.Vector2(), v2], null, [v2, v]];
fighter.Pyl = [new GoType(123, "asdf"), new GoType(), new GoType(456, "xxxx")];
fighter.Pyd = { 321: new GoType(123, "asdf"), 654: new GoType(456, "xxxx"), 320: null };
fighter.Pyv1 = 123;
fighter.Pyv2 = new GoType(123, "asdf");
fighter.Fl = [0.123, 456, 7.89];
fighter.Sl = ["哈哈", "吼吼", "嘿嘿"];
fighter.Bl = [new Uint8Array([0, 1, 2, 3]), new Uint8Array([4, 5, 6]), new Uint8Array([7, 8, 9])];
fighter.Bd = { "哈哈": new Uint8Array([0, 1, 2, 3]), "asdf": new Uint8Array([4, 5, 6]) };
fighter.Sd = { 321: "哈哈 3", 231: "吼吼 2" };
fighter.El = [3 /* LOCAL */, 4 /* NEWS */, 6 /* VIDEO */];
fighter.Ed = { 789: 1 /* WEB */, 567: 2 /* IMAGES */ };
fighter.Ll = [[12.3, 1.23], [1.234, 12.34, 123.4]];
fighter.V1 = 98765;
fighter.V2 = new Uint8Array([5, 6, 7, 8]);
fighter.V3 = v;
fighter.V4 = 345.123;
fighter.Vl = [123, "adsf", null, v, 345.123, null];
fighter.Vd = { 0: null, 12: 2 /* IMAGES */, 23: "adsf", 34: v2, 45: 345.123 };
fighter.Ld = { 12: [2 /* IMAGES */, "adsf"], 34: [v2, 345.123] };
fighter.Fld = { 123: [222.111, 345.123] };
fighter.Dd = { 12: { 111: 2 /* IMAGES */, 222: "adsf" }, 34: { 333: v2, 444: 345.123 } };
fighter.Fdd = { 123: { 12: 222.111, 23: 345.123 } };
fighter.Nv = 123456;
fighter.Lv = [123, "adsf"];
fighter.Flv = [222.111, 345.123];
fighter.Dv = { 333: 123, 444: "adsf" };
fighter.Fdv = { 333: 222.111, 444: 345.123 };
fighter.Poslll = [[[v, new types.Vector2(), v2], null], null, [[v, new types.Vector2(), v2], [v2, v]]];
fighter.Posdl = [{ "231": v, "320": null, "321": v2 }, null, { "321": v, "320": null, "231": v2 }];
function compareGoType(g1, g2, prefix) {
}
function compareVector2(v1, v2, prefix) {
}
function compareFighter_Part1(f1, f2) {
}
function compareFighter_Part2(f1, f2) {
}
function compareFighter(f1, f2) {
}
var TestVector2 = function () {
    console.info('TestVector2 ok');
};
var TestFighter = function () {
    console.info('TestFighter ok');
};
