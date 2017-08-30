// Copyright 2017 ibelie, Chen Jie, Joungtao. All rights reserved.
// Use of this source code is governed by The MIT License
// that can be found in the LICENSE file.
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
v.M = "Symbol_AB";
v.E = 3 /* LOCAL */;
v.P = new GoType(123, "asdf");
var v2 = new types.Vector2();
v2.X = 1234;
v2.Y = 345.6;
v2.B = new Uint8Array([4, 3, 2, 1]);
v2.S = "哈哈 吼吼吼";
v.M = "Symbol_ABC";
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
fighter.Ml = ["Symbol_ABCD", "", "Sym"];
fighter.Mbd = { "Symbol_aaa": new Uint8Array([0, 1, 2, 3]), "Symbol_bbb": new Uint8Array([4, 5, 6]) };
fighter.Md = { 321: "Symbol_321", 231: "Symbol_231" };
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
    else if (v1.M != v2.M) {
        console.error(prefix, "Vector2.M:", v1.M, v2.M);
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
                console.error("Fighter_Part1.Posi[", k, "]:", f1.Posi[k], f2.Posi[k]);
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
        console.error("Fighter_Part1.Posll:", f1.Posll, f2.Posll);
    }
    else {
        for (var k1 = 0; k1 < f1.Posll.length; k1++) {
            var l1 = f1.Posll[k1];
            var l2 = f2.Posll[k1];
            if (!l1 && !l2) {
            }
            else if ((!l1 && l2) || (l1 && !l2) || l1.length != l2.length) {
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
    if (f1 == f2) {
        return;
    }
    else if (!f1 || !f2) {
        console.error("Fighter_Part2", f1, f2);
        return;
    }
    compareFighter_Part1(f1, f2);
    if (f1.Fl.length != f2.Fl.length) {
        console.error("Fighter_Part2.Fl:", f1.Fl, f2.Fl);
    }
    else {
        for (var k = 0; k < f1.Fl.length; k++) {
            if (f1.Fl[k].toFixed(3) != f2.Fl[k].toFixed(3)) {
                console.error("Fighter_Part2.Fl[", k, "]:", f1.Fl[k], f2.Fl[k]);
            }
        }
    }
    if (f1.Bl.length != f2.Bl.length) {
        console.error("Fighter_Part2.Bl:", f1.Bl, f2.Bl);
    }
    else {
        for (var k = 0; k < f1.Bl.length; k++) {
            if (!compareBytes(f1.Bl[k], f2.Bl[k])) {
                console.error("Fighter_Part2.Bl[", k, "]:", f1.Bl[k], f2.Bl[k]);
            }
        }
    }
    if (f1.Sl.length != f2.Sl.length) {
        console.error("Fighter_Part2.Sl:", f1.Sl, f2.Sl);
    }
    else {
        for (var k = 0; k < f1.Sl.length; k++) {
            if (f1.Sl[k] != f2.Sl[k]) {
                console.error("Fighter_Part2.Sl[", k, "]:", f1.Sl[k], f2.Sl[k]);
            }
        }
    }
    if (Object.keys(f1.Bd).length != Object.keys(f2.Bd).length) {
        console.error("Fighter_Part2.Bd:", f1.Bd, f2.Bd);
    }
    else {
        for (var k in f1.Bd) {
            if (!compareBytes(f1.Bd[k], f2.Bd[k])) {
                console.error("Fighter_Part2.Bd[", k, "]:", f1.Bd[k], f2.Bd[k]);
            }
        }
    }
    if (Object.keys(f1.Sd).length != Object.keys(f2.Sd).length) {
        console.error("Fighter_Part2.Sd:", f1.Sd, f2.Sd);
    }
    else {
        for (var k in f1.Sd) {
            if (f1.Sd[k] != f2.Sd[k]) {
                console.error("Fighter_Part2.Sd[", k, "]:", f1.Sd[k], f2.Sd[k]);
            }
        }
    }
    if (f1.Ml.length != f2.Ml.length) {
        console.error("Fighter_Part2.Ml:", f1.Ml, f2.Ml);
    }
    else {
        for (var k = 0; k < f1.Ml.length; k++) {
            if (f1.Ml[k] != f2.Ml[k]) {
                console.error("Fighter_Part2.Ml[", k, "]:", f1.Ml[k], f2.Ml[k]);
            }
        }
    }
    if (Object.keys(f1.Mbd).length != Object.keys(f2.Mbd).length) {
        console.error("Fighter_Part2.Mbd:", f1.Mbd, f2.Mbd);
    }
    else {
        for (var k in f1.Mbd) {
            if (!compareBytes(f1.Mbd[k], f2.Mbd[k])) {
                console.error("Fighter_Part2.Mbd[", k, "]:", f1.Mbd[k], f2.Mbd[k]);
            }
        }
    }
    if (Object.keys(f1.Md).length != Object.keys(f2.Md).length) {
        console.error("Fighter_Part2.Md:", f1.Md, f2.Md);
    }
    else {
        for (var k in f1.Md) {
            if (f1.Md[k] != f2.Md[k]) {
                console.error("Fighter_Part2.Md[", k, "]:", f1.Md[k], f2.Md[k]);
            }
        }
    }
    if (f1.El.length != f2.El.length) {
        console.error("Fighter_Part2.El:", f1.El, f2.El);
    }
    else {
        for (var k = 0; k < f1.El.length; k++) {
            if (f1.El[k] != f2.El[k]) {
                console.error("Fighter_Part2.El[", k, "]:", f1.El[k], f2.El[k]);
            }
        }
    }
    if (Object.keys(f1.Ed).length != Object.keys(f2.Ed).length) {
        console.error("Fighter_Part2.Ed:", f1.Ed, f2.Ed);
    }
    else {
        for (var k in f1.Ed) {
            if (f1.Ed[k] != f2.Ed[k]) {
                console.error("Fighter_Part2.Ed[", k, "]:", f1.Ed[k], f2.Ed[k]);
            }
        }
    }
    if (f1.Ll.length != f2.Ll.length) {
        console.error("Fighter_Part2.Ll:", f1.Ll, f2.Ll);
    }
    else {
        for (var k1 = 0; k1 < f1.Ll.length; k1++) {
            var l1 = f1.Ll[k1];
            var l2 = f2.Ll[k1];
            if (!l1 && !l2) {
            }
            else if ((!l1 && l2) || (l1 && !l2) || l1.length != l2.length) {
                console.error("Fighter_Part2.Ll[", k1, "]:", l1, l2);
            }
            else {
                for (var k2 = 0; k2 < l1.length; k2++) {
                    if (l1[k2].toFixed(3) != l2[k2].toFixed(3)) {
                        console.error("Fighter_Part2.Ll[", k1, "][", k2, "]:", l1[k2], l2[k2]);
                    }
                }
            }
        }
    }
}
function compareFighter(f1, f2) {
    if (f1 == f2) {
        return;
    }
    else if (!f1 || !f2) {
        console.error("Fighter", f1, f2);
        return;
    }
    compareFighter_Part2(f1, f2);
    if (f1.V0 != f2.V0) {
        console.error("Fighter.V0:", f1.V0, f2.V0);
    }
    if (f1.V1 != f2.V1) {
        console.error("Fighter.V1:", f1.V1, f2.V1);
    }
    if (!compareBytes(f1.V2, f2.V2)) {
        console.error("Fighter.V2:", f1.V2, f2.V2);
    }
    compareVector2(f1.V3, f2.V3, "Fighter.V3");
    if (f1.V4.toFixed(3) != f2.V4.toFixed(3)) {
        console.error("Fighter.V4:", f1.V4, f2.V4);
    }
    if (f1.Vl.length != f2.Vl.length) {
        console.error("Fighter_Part2.Vl:", f1.Vl, f2.Vl);
    }
    else {
        if (f1.Vl[0] != f2.Vl[0]) {
            console.error("Fighter.Vl[0]:", f1.Vl[0], f2.Vl[0]);
        }
        if (f1.Vl[1] != f2.Vl[1]) {
            console.error("Fighter.Vl[1]:", f1.Vl[1], f2.Vl[1]);
        }
        if (f1.Vl[2] || f2.Vl[2]) {
            console.error("Fighter.Vl[2]:", f1.Vl[2], f2.Vl[2]);
        }
        compareVector2(f1.Vl[3], f2.Vl[3], "Fighter.Vl[3]");
        if (f1.Vl[4] != f2.Vl[4]) {
            console.error("Fighter.Vl[4]:", f1.Vl[4], f2.Vl[4]);
        }
        if (f1.Vl[5] || f2.Vl[5]) {
            console.error("Fighter.Vl[5]:", f1.Vl[5], f2.Vl[5]);
        }
    }
    if (Object.keys(f1.Vd).length != Object.keys(f2.Vd).length) {
        console.error("Fighter_Part2.Vd:", f1.Vd, f2.Vd);
    }
    else {
        if (f1.Vd[0] || f2.Vd[0]) {
            console.error("Fighter.Vd[0]:", f1.Vd[0], f2.Vd[0]);
        }
        if (f1.Vd[12] != f2.Vd[12]) {
            console.error("Fighter.Vd[12]:", f1.Vd[12], f2.Vd[12]);
        }
        if (f1.Vd[23] != f2.Vd[23]) {
            console.error("Fighter.Vd[23]:", f1.Vd[23], f2.Vd[23]);
        }
        compareVector2(f1.Vd[34], f2.Vd[34], "Fighter.Vd[34]");
        if (f1.Vd[45] != f2.Vd[45]) {
            console.error("Fighter.Vd[45]:", f1.Vd[45], f2.Vd[45]);
        }
    }
    if (Object.keys(f1.Ld).length != Object.keys(f2.Ld).length) {
        console.error("Fighter_Part2.Ld:", f1.Ld, f2.Ld);
    }
    else {
        for (var k1 in f1.Ld) {
            var l1 = f1.Ld[k1];
            var l2 = f2.Ld[k1];
            if (!l1 && !l2) {
            }
            else if ((!l1 && l2) || (l1 && !l2) || l1.length != l2.length) {
                console.error("Fighter_Part2.Ld[", k1, "]:", l1, l2);
            }
            else if (k1 == '12' && l1.length == 2 && l2.length == 2) {
                if (f1.Ld[12][0] != f2.Ld[12][0]) {
                    console.error("Fighter.Ld[12][0]:", f1.Ld[12][0], f2.Ld[12][0]);
                }
                if (f1.Ld[12][1] != f2.Ld[12][1]) {
                    console.error("Fighter.Ld[12][1]:", f1.Ld[12][1], f2.Ld[12][1]);
                }
            }
            else if (k1 == '34' && l1.length == 2 && l2.length == 2) {
                compareVector2(f1.Ld[34][0], f2.Ld[34][0], "Fighter.Ld[34][0]");
                if (f1.Ld[34][1] != f2.Ld[34][1]) {
                    console.error("Fighter.Ld[34][1]:", f1.Ld[34][1], f2.Ld[34][1]);
                }
            }
            else {
                console.error("Fighter_Part2.Ld[", k1, "]:", l1, l2);
            }
        }
    }
    if (Object.keys(f1.Fld).length != Object.keys(f2.Fld).length) {
        console.error("Fighter_Part2.Fld:", f1.Fld, f2.Fld);
    }
    else {
        for (var k1 in f1.Fld) {
            var l1 = f1.Fld[k1];
            var l2 = f2.Fld[k1];
            if (!l1 && !l2) {
            }
            else if ((!l1 && l2) || (l1 && !l2) || l1.length != l2.length) {
                console.error("Fighter_Part2.Fld[", k1, "]:", l1, l2);
            }
            else {
                for (var k2 = 0; k2 < l1.length; k2++) {
                    if (l1[k2].toFixed(3) != l2[k2].toFixed(3)) {
                        console.error("Fighter_Part2.Fld[", k1, "][", k2, "]:", l1[k2], l2[k2]);
                    }
                }
            }
        }
    }
    if (Object.keys(f1.Dd).length != Object.keys(f2.Dd).length) {
        console.error("Fighter_Part2.Dd:", f1.Dd, f2.Dd);
    }
    else {
        for (var k1 in f1.Dd) {
            var d1 = f1.Dd[k1];
            var d2 = f2.Dd[k1];
            if (!d1 && !d2) {
            }
            else if ((!d1 && d2) || (d1 && !d2) || Object.keys(d1).length != Object.keys(d2).length) {
                console.error("Fighter_Part2.Dd[", k1, "]:", d1, d2);
            }
            else if (k1 == '12' && Object.keys(d1).length == 2 && Object.keys(d2).length == 2) {
                if (f1.Dd[12][111] != f2.Dd[12][111]) {
                    console.error("Fighter.Dd[12][111]:", f1.Dd[12][111], f2.Dd[12][111]);
                }
                if (f1.Dd[12][222] != f2.Dd[12][222]) {
                    console.error("Fighter.Dd[12][222]:", f1.Dd[12][222], f2.Dd[12][222]);
                }
            }
            else if (k1 == '34' && Object.keys(d1).length == 2 && Object.keys(d2).length == 2) {
                compareVector2(f1.Dd[34][333], f2.Dd[34][333], "Fighter.Dd[34][333]");
                if (f1.Dd[34][444] != f2.Dd[34][444]) {
                    console.error("Fighter.Dd[34][444]:", f1.Dd[34][444], f2.Dd[34][444]);
                }
            }
            else {
                console.error("Fighter_Part2.Dd[", k1, "]:", d1, d2);
            }
        }
    }
    if (Object.keys(f1.Fdd).length != Object.keys(f2.Fdd).length) {
        console.error("Fighter_Part2.Fdd:", f1.Fdd, f2.Fdd);
    }
    else {
        for (var k1 in f1.Fdd) {
            var d1 = f1.Fdd[k1];
            var d2 = f2.Fdd[k1];
            if (!d1 && !d2) {
            }
            else if ((!d1 && d2) || (d1 && !d2) || Object.keys(d1).length != Object.keys(d2).length) {
                console.error("Fighter_Part2.Fdd[", k1, "]:", d1, d2);
            }
            else {
                for (var k2 in d1) {
                    if (d1[k2].toFixed(3) != d2[k2].toFixed(3)) {
                        console.error("Fighter_Part2.Fdd[", k1, "][", k2, "]:", d1[k2], d2[k2]);
                    }
                }
            }
        }
    }
    if (f1.Nv != f2.Nv) {
        console.error("Fighter.Nv:", f1.Nv, f2.Nv);
    }
    if (f1.Lv.length != f2.Lv.length || f1.Lv.length != 2) {
        console.error("Fighter_Part2.Lv:", f1.Lv, f2.Lv);
    }
    else {
        if (f1.Lv[0] != f2.Lv[0]) {
            console.error("Fighter.Lv[0]:", f1.Lv[0], f2.Lv[0]);
        }
        if (f1.Lv[1] != f2.Lv[1]) {
            console.error("Fighter.Lv[1]:", f1.Lv[1], f2.Lv[1]);
        }
    }
    if (f1.Flv.length != f2.Flv.length) {
        console.error("Fighter_Part2.Flv:", f1.Flv, f2.Flv);
    }
    else {
        for (var k = 0; k < f1.Flv.length; k++) {
            if (f1.Flv[k].toFixed(3) != f2.Flv[k].toFixed(3)) {
                console.error("Fighter.Flv[", k, "]:", f1.Flv[k], f2.Flv[k]);
            }
        }
    }
    if (Object.keys(f1.Dv).length != Object.keys(f2.Dv).length || Object.keys(f1.Dv).length != 2) {
        console.error("Fighter_Part2.Dv:", f1.Dv, f2.Dv);
    }
    else {
        if (f1.Dv[333] != f2.Dv[333]) {
            console.error("Fighter.Dv[333]:", f1.Dv[333], f2.Dv[333]);
        }
        if (f1.Dv[444] != f2.Dv[444]) {
            console.error("Fighter.Dv[444]:", f1.Dv[444], f2.Dv[444]);
        }
    }
    if (Object.keys(f1.Fdv).length != Object.keys(f2.Fdv).length) {
        console.error("Fighter_Part2.Fdv:", f1.Fdv, f2.Fdv);
    }
    else {
        for (var k in f1.Fdv) {
            if (f1.Fdv[k].toFixed(3) != f2.Fdv[k].toFixed(3)) {
                console.error("Fighter.Fdv[", k, "]:", f1.Fdv[k], f2.Fdv[k]);
            }
        }
    }
    if (f1.Poslll.length != f2.Poslll.length) {
        console.error("Fighter_Part1.Poslll:", f1.Poslll, f2.Poslll);
    }
    else {
        for (var k1 = 0; k1 < f1.Poslll.length; k1++) {
            var ll1 = f1.Poslll[k1];
            var ll2 = f2.Poslll[k1];
            if (!ll1 && !ll2) {
            }
            else if ((!ll1 && ll2) || (ll1 && !ll2) || ll1.length != ll2.length) {
                console.error("Fighter_Part1.Poslll[", k1, "]:", ll1, ll2);
            }
            else {
                for (var k2 = 0; k2 < ll1.length; k2++) {
                    var l1 = ll1[k2];
                    var l2 = ll2[k2];
                    if (!l1 && !l2) {
                    }
                    else if ((!l1 && l2) || (l1 && !l2) || l1.length != l2.length) {
                        console.error("Fighter_Part1.Poslll[", k1, "][", k2, "]:", l1, l2);
                    }
                    else {
                        for (var k3 = 0; k3 < l1.length; k3++) {
                            compareVector2(l1[k3], l2[k3], "Fighter_Part1.Poslll[" + k1 + "][" + k2 + "][" + k3 + "]");
                        }
                    }
                }
            }
        }
    }
    if (f1.Posdl.length != f2.Posdl.length) {
        console.error("Fighter_Part2.Posdl:", f1.Posdl, f2.Posdl);
    }
    else {
        for (var k1 = 0; k1 < f1.Posdl.length; k1++) {
            var d1 = f1.Posdl[k1];
            var d2 = f2.Posdl[k1];
            if (!d1 && !d2) {
            }
            else if ((!d1 && d2) || (d1 && !d2) || Object.keys(d1).length != Object.keys(d2).length) {
                console.error("Fighter_Part2.Posdl[", k1, "]:", d1, d2);
            }
            else {
                for (var k2 in d1) {
                    compareVector2(d1[k2], d2[k2], "Fighter_Part1.Posdl[" + k1 + "][" + k2 + "]");
                }
            }
        }
    }
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
