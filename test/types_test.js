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
function compareBytes(b1, b2) {
    if (b1.length != b2.length) {
        return false;
    }
    for (var i = 0; i < b1.length; i++) {
        if (b1[i] != b2[i]) {
            return false;
        }
    }
    return true;
}
function compareGoType(g1, g2, prefix) {
    if (g1 == g2) {
        return;
    }
    else if (!g1 || !g2) {
        console.error(prefix, "GoType", g1, g2);
    }
    else if (g1.PP != g2.PP) {
        console.error(prefix, "GoType.PP:", g1.PP, g2.PP);
    }
    else if (g1.AP != g2.AP) {
        console.error(prefix, "GoType.AP:", g1.AP, g2.AP);
    }
}
function compareVector2(v1, v2, prefix) {
    if (v1 == v2) {
        return;
    }
    else if (!v1 || !v2) {
        console.error(prefix, "Vector2", v1, v2);
    }
    else if (v1.X != v2.X) {
        console.error(prefix, "Vector2.X:", v1.X, v2.X);
    }
    else if (v1.Y != v2.Y) {
        console.error(prefix, "Vector2.Y:", v1.Y, v2.Y);
    }
    else if (v1.S != v2.S) {
        console.error(prefix, "Vector2.S:", v1.S, v2.S);
    }
    else if (!compareBytes(v1.B, v2.B)) {
        console.error(prefix, "Vector2.B:", v1.B, v2.B);
    }
    else if (v1.E != v2.E) {
        console.error(prefix, "Vector2.E:", v1.E, v2.E);
    }
    else {
        compareGoType(v1.P, v2.P, prefix + ".P");
    }
}
function compareFighter_Part1(f1, f2) {
    if (f1 == f2) {
        return;
    }
    else if (!f1 || !f2) {
        console.error("Fighter_Part1", f1, f2);
        return;
    }
    compareVector2(f1.Pos, f2.Pos, "Fighter_Part1.Pos");
    if (f1.IsAwake != f2.IsAwake) {
        console.error("Fighter_Part1.IsAwake:", f1.IsAwake, f2.IsAwake);
    }
    if (f1.Hp != f2.Hp) {
        console.error("Fighter_Part1.Hp:", f1.Hp, f2.Hp);
    }
    if (Object.keys(f1.Poss).length != Object.keys(f2.Poss).length) {
        console.error("Fighter_Part1.Poss:", f1.Poss, f2.Poss);
    }
    else {
        for (var k in f1.Poss) {
            compareVector2(f1.Poss[k], f2.Poss[k], "Fighter_Part1.Poss[" + k + "]");
        }
    }
    if (Object.keys(f1.Posi).length != Object.keys(f2.Posi).length) {
        console.error("Fighter_Part1.Posi:", f1.Posi, f2.Posi);
    }
    else {
        for (var k in f1.Poss) {
            if (f1.Posi[k] != f2.Posi[k]) {
                console.error("Fighter_Part1.Posi:", k, f1.Posi[k], f2.Posi[k]);
            }
        }
    }
    if (f1.Posl.length != f2.Posl.length) {
        console.error("Fighter_Part1.Posl:", f1.Posl, f2.Posl);
    }
    else {
        for (var k = 0; k < f1.Posl.length; k++) {
            compareVector2(f1.Posl[k], f2.Posl[k], "Fighter_Part1.Posl[" + k + "]");
        }
    }
    if (f1.Posll.length != f2.Posll.length) {
        console.error("Fighter_Part1.Posll: %v %v", f1.Posll, f2.Posll);
    }
    else {
        for (var k1 = 0; k1 < f1.Posll.length; k1++) {
            var l1 = f1.Posll[k1];
            var l2 = f2.Posll[k1];
            if (l1.length != l2.length) {
                console.error("Fighter_Part1.Posll[", k1, "]:", l1, l2);
            }
            else {
                for (var k2 = 0; k2 < l1.length; k2++) {
                    compareVector2(l1[k2], l2[k2], "Fighter_Part1.Posll[" + k1 + "][" + k2 + "]");
                }
            }
        }
    }
    if (f1.Pyl.length != f2.Pyl.length) {
        console.error("Fighter_Part1.Pyl:", f1.Pyl, f2.Pyl);
    }
    else {
        for (var k = 0; k < f1.Pyl.length; k++) {
            compareGoType(f1.Pyl[k], f2.Pyl[k], "Fighter_Part1.Pyl[" + k + "]");
        }
    }
    if (Object.keys(f1.Pyd).length != Object.keys(f2.Pyd).length) {
        console.error("Fighter_Part1.Pyd:", f1.Pyd, f2.Pyd);
    }
    else {
        for (var k in f1.Pyd) {
            compareGoType(f1.Pyd[k], f2.Pyd[k], "Fighter_Part1.Pyd[" + k + "]");
        }
    }
    if (f1.Pyv1 != f2.Pyv1) {
        console.error("Fighter_Part1.Pyv1:", f1.Pyv1, f2.Pyv1);
    }
    compareGoType(f1.Pyv2, f2.Pyv2, "Fighter_Part1.Pyv1");
}
function compareFighter_Part2(f1, f2) {
    compareFighter_Part1(f1, f2);
}
function compareFighter(f1, f2) {
    compareFighter_Part2(f1, f2);
}
var TestVector2 = function () {
    console.info('TestVector2 start');
    compareVector2(v, types.Vector2.Deserialize(v.Serialize()), "");
    console.info('TestVector2 end');
};
var TestFighter = function () {
    console.info('TestFighter start');
    compareFighter(fighter, types.Fighter.Deserialize(fighter.Serialize()));
    console.info('TestFighter end');
};
