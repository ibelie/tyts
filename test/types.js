// Generated for tyts by tygo.  DO NOT EDIT!

goog.provide('types.Fighter');
goog.provide('types.Fighter_Part1');
goog.provide('types.Fighter_Part2');
goog.provide('types.Vector2');

goog.require('ibelie.tyts.Bool');
goog.require('ibelie.tyts.Bytes');
goog.require('ibelie.tyts.Dict');
goog.require('ibelie.tyts.Extension');
goog.require('ibelie.tyts.FixedPoint');
goog.require('ibelie.tyts.Float32');
goog.require('ibelie.tyts.Float64');
goog.require('ibelie.tyts.Integer');
goog.require('ibelie.tyts.List');
goog.require('ibelie.tyts.Method');
goog.require('ibelie.tyts.Object');
goog.require('ibelie.tyts.String');
goog.require('ibelie.tyts.Symbol');
goog.require('ibelie.tyts.Variant');

goog.require('GoType');

var FixedPoint_1_s10 = new ibelie.tyts.FixedPoint(-10, 1)

var GoTypeDelegate = new ibelie.tyts.Extension(GoType)

var Vector2 = new ibelie.tyts.Object(127, [
	{name: 'X', tag: 13, tagsize: 1, type: ibelie.tyts.Float32},
	{name: 'Y', tag: 16, tagsize: 1, type: FixedPoint_1_s10},
	{name: 'B', tag: 26, tagsize: 1, type: ibelie.tyts.Bytes},
	{name: 'S', tag: 34, tagsize: 1, type: ibelie.tyts.String},
	{name: 'M', tag: 42, tagsize: 1, type: ibelie.tyts.Symbol},
	{name: 'E', tag: 48, tagsize: 1, type: ibelie.tyts.Integer},
	{name: 'P', tag: 58, tagsize: 1, type: GoTypeDelegate}
], [
]);
types.Vector2 = Vector2.Type;

var DiVector2 = new ibelie.tyts.Dict(ibelie.tyts.Integer, Vector2)

var Dif = new ibelie.tyts.Dict(ibelie.tyts.Integer, ibelie.tyts.Float32)

var LVector2 = new ibelie.tyts.List(Vector2)

var LLVector2 = new ibelie.tyts.List(LVector2)

var LGoType = new ibelie.tyts.List(GoTypeDelegate)

var DiGoType = new ibelie.tyts.Dict(ibelie.tyts.Integer, GoTypeDelegate)

var VGoTypei = new ibelie.tyts.Variant(127, [
	{tag: 8, tagsize: 1, type: ibelie.tyts.Integer},
	{tag: 18, tagsize: 1, type: GoTypeDelegate}
])

var Lf = new ibelie.tyts.List(ibelie.tyts.Float32)

var Lby = new ibelie.tyts.List(ibelie.tyts.Bytes)

var Ls = new ibelie.tyts.List(ibelie.tyts.String)

var Dsby = new ibelie.tyts.Dict(ibelie.tyts.String, ibelie.tyts.Bytes)

var Dis = new ibelie.tyts.Dict(ibelie.tyts.Integer, ibelie.tyts.String)

var Lsy = new ibelie.tyts.List(ibelie.tyts.Symbol)

var Dsyby = new ibelie.tyts.Dict(ibelie.tyts.Symbol, ibelie.tyts.Bytes)

var Disy = new ibelie.tyts.Dict(ibelie.tyts.Integer, ibelie.tyts.Symbol)

var LCorpus = new ibelie.tyts.List(ibelie.tyts.Integer)

var DiCorpus = new ibelie.tyts.Dict(ibelie.tyts.Integer, ibelie.tyts.Integer)

var LLf = new ibelie.tyts.List(Lf)

var VVector2byfi = new ibelie.tyts.Variant(127, [
	{tag: 8, tagsize: 1, type: ibelie.tyts.Integer},
	{tag: 21, tagsize: 1, type: ibelie.tyts.Float32},
	{tag: 26, tagsize: 1, type: ibelie.tyts.Bytes},
	{tag: 34, tagsize: 1, type: Vector2}
])

var FixedPoint_3_0 = new ibelie.tyts.FixedPoint(0, 3)

var VFixedPoint_3_0Vector2is = new ibelie.tyts.Variant(127, [
	{tag: 8, tagsize: 1, type: ibelie.tyts.Integer},
	{tag: 16, tagsize: 1, type: FixedPoint_3_0},
	{tag: 26, tagsize: 1, type: ibelie.tyts.String},
	{tag: 34, tagsize: 1, type: Vector2}
])

var LVFixedPoint_3_0Vector2is = new ibelie.tyts.List(VFixedPoint_3_0Vector2is)

var VCorpusVector2ds = new ibelie.tyts.Variant(127, [
	{tag: 8, tagsize: 1, type: ibelie.tyts.Integer},
	{tag: 17, tagsize: 1, type: ibelie.tyts.Float64},
	{tag: 26, tagsize: 1, type: ibelie.tyts.String},
	{tag: 34, tagsize: 1, type: Vector2}
])

var DiVCorpusVector2ds = new ibelie.tyts.Dict(ibelie.tyts.Integer, VCorpusVector2ds)

var LVCorpusVector2ds = new ibelie.tyts.List(VCorpusVector2ds)

var DiLVCorpusVector2ds = new ibelie.tyts.Dict(ibelie.tyts.Integer, LVCorpusVector2ds)

var DiLf = new ibelie.tyts.Dict(ibelie.tyts.Integer, Lf)

var VCorpusVector2dis = new ibelie.tyts.Variant(127, [
	{tag: 8, tagsize: 1, type: ibelie.tyts.Integer},
	{tag: 16, tagsize: 1, type: ibelie.tyts.Integer},
	{tag: 25, tagsize: 1, type: ibelie.tyts.Float64},
	{tag: 34, tagsize: 1, type: ibelie.tyts.String},
	{tag: 42, tagsize: 1, type: Vector2}
])

var DiVCorpusVector2dis = new ibelie.tyts.Dict(ibelie.tyts.Integer, VCorpusVector2dis)

var DiDiVCorpusVector2dis = new ibelie.tyts.Dict(ibelie.tyts.Integer, DiVCorpusVector2dis)

var DiDif = new ibelie.tyts.Dict(ibelie.tyts.Integer, Dif)

var Vin = new ibelie.tyts.Variant(127, [
	{tag: 8, tagsize: 1, type: ibelie.tyts.Integer}
])

var Vfs = new ibelie.tyts.Variant(127, [
	{tag: 13, tagsize: 1, type: ibelie.tyts.Float32},
	{tag: 18, tagsize: 1, type: ibelie.tyts.String}
])

var LVfs = new ibelie.tyts.List(Vfs)

var VLVfsi = new ibelie.tyts.Variant(127, [
	{tag: 8, tagsize: 1, type: ibelie.tyts.Integer},
	{tag: 18, tagsize: 1, type: LVfs}
])

var VLfi = new ibelie.tyts.Variant(127, [
	{tag: 8, tagsize: 1, type: ibelie.tyts.Integer},
	{tag: 18, tagsize: 1, type: Lf}
])

var DiVfs = new ibelie.tyts.Dict(ibelie.tyts.Integer, Vfs)

var VDiVfsi = new ibelie.tyts.Variant(127, [
	{tag: 8, tagsize: 1, type: ibelie.tyts.Integer},
	{tag: 18, tagsize: 1, type: DiVfs}
])

var VDifi = new ibelie.tyts.Variant(127, [
	{tag: 8, tagsize: 1, type: ibelie.tyts.Integer},
	{tag: 18, tagsize: 1, type: Dif}
])

var LLLVector2 = new ibelie.tyts.List(LLVector2)

var DsVector2 = new ibelie.tyts.Dict(ibelie.tyts.String, Vector2)

var LDsVector2 = new ibelie.tyts.List(DsVector2)

var Fighter = new ibelie.tyts.Object(1023, [
	{name: 'Pos', tag: 10, tagsize: 1, type: Vector2},
	{name: 'IsAwake', tag: 16, tagsize: 1, type: ibelie.tyts.Bool},
	{name: 'Hp', tag: 29, tagsize: 1, type: ibelie.tyts.Float32},
	{name: 'Poss', tag: 34, tagsize: 1, type: DiVector2},
	{name: 'Posi', tag: 42, tagsize: 1, type: Dif},
	{name: 'Posl', tag: 50, tagsize: 1, type: LVector2},
	{name: 'Posll', tag: 58, tagsize: 1, type: LLVector2},
	{name: 'Pyl', tag: 66, tagsize: 1, type: LGoType},
	{name: 'Pyd', tag: 74, tagsize: 1, type: DiGoType},
	{name: 'Pyv1', tag: 82, tagsize: 1, type: VGoTypei},
	{name: 'Pyv2', tag: 90, tagsize: 1, type: VGoTypei},
	{name: 'Fl', tag: 98, tagsize: 1, type: Lf},
	{name: 'Bl', tag: 106, tagsize: 1, type: Lby},
	{name: 'Sl', tag: 114, tagsize: 1, type: Ls},
	{name: 'Bd', tag: 122, tagsize: 1, type: Dsby},
	{name: 'Sd', tag: 130, tagsize: 2, type: Dis},
	{name: 'Ml', tag: 138, tagsize: 2, type: Lsy},
	{name: 'Mbd', tag: 146, tagsize: 2, type: Dsyby},
	{name: 'Md', tag: 154, tagsize: 2, type: Disy},
	{name: 'El', tag: 162, tagsize: 2, type: LCorpus},
	{name: 'Ed', tag: 170, tagsize: 2, type: DiCorpus},
	{name: 'Ll', tag: 178, tagsize: 2, type: LLf},
	{name: 'V0', tag: 186, tagsize: 2, type: VVector2byfi},
	{name: 'V1', tag: 194, tagsize: 2, type: VVector2byfi},
	{name: 'V2', tag: 202, tagsize: 2, type: VVector2byfi},
	{name: 'V3', tag: 210, tagsize: 2, type: VVector2byfi},
	{name: 'V4', tag: 218, tagsize: 2, type: VVector2byfi},
	{name: 'Vl', tag: 226, tagsize: 2, type: LVFixedPoint_3_0Vector2is},
	{name: 'Vd', tag: 234, tagsize: 2, type: DiVCorpusVector2ds},
	{name: 'Ld', tag: 242, tagsize: 2, type: DiLVCorpusVector2ds},
	{name: 'Fld', tag: 250, tagsize: 2, type: DiLf},
	{name: 'Dd', tag: 258, tagsize: 2, type: DiDiVCorpusVector2dis},
	{name: 'Fdd', tag: 266, tagsize: 2, type: DiDif},
	{name: 'Nv', tag: 274, tagsize: 2, type: Vin},
	{name: 'Lv', tag: 282, tagsize: 2, type: VLVfsi},
	{name: 'Flv', tag: 290, tagsize: 2, type: VLfi},
	{name: 'Dv', tag: 298, tagsize: 2, type: VDiVfsi},
	{name: 'Fdv', tag: 306, tagsize: 2, type: VDifi},
	{name: 'Poslll', tag: 314, tagsize: 2, type: LLLVector2},
	{name: 'Posdl', tag: 322, tagsize: 2, type: LDsVector2}
], [
	{name: 'RPGParam', type: null},
	{name: 'RPGResult', type: null},
	{name: 'GPRParam', type: null},
	{name: 'GPRResult', type: null}
]);
Fighter.methods[0].type = new ibelie.tyts.Method(127, [
	{tag: 10, tagsize: 1, type: Fighter},
	{tag: 18, tagsize: 1, type: Vin},
	{tag: 24, tagsize: 1, type: FixedPoint_3_0}
]);

Fighter.methods[1].type = new ibelie.tyts.Method(127, [
	{tag: 10, tagsize: 1, type: Vector2}
]);

Fighter.methods[2].type = new ibelie.tyts.Method(127, [
	{tag: 10, tagsize: 1, type: DiVCorpusVector2ds}
]);

Fighter.methods[3].type = new ibelie.tyts.Method(127, [
	{tag: 10, tagsize: 1, type: Fighter},
	{tag: 16, tagsize: 1, type: ibelie.tyts.Integer}
]);

types.Fighter = Fighter.Type;

var Fighter_Part1 = new ibelie.tyts.Object(127, [
	{name: 'Pos', tag: 10, tagsize: 1, type: Vector2},
	{name: 'IsAwake', tag: 16, tagsize: 1, type: ibelie.tyts.Bool},
	{name: 'Hp', tag: 29, tagsize: 1, type: ibelie.tyts.Float32},
	{name: 'Poss', tag: 34, tagsize: 1, type: DiVector2},
	{name: 'Posi', tag: 42, tagsize: 1, type: Dif},
	{name: 'Posl', tag: 50, tagsize: 1, type: LVector2},
	{name: 'Posll', tag: 58, tagsize: 1, type: LLVector2},
	{name: 'Pyl', tag: 66, tagsize: 1, type: LGoType},
	{name: 'Pyd', tag: 74, tagsize: 1, type: DiGoType},
	{name: 'Pyv1', tag: 82, tagsize: 1, type: VGoTypei},
	{name: 'Pyv2', tag: 90, tagsize: 1, type: VGoTypei}
], [
]);
types.Fighter_Part1 = Fighter_Part1.Type;

var Fighter_Part2 = new ibelie.tyts.Object(1023, [
	{name: 'Pos', tag: 10, tagsize: 1, type: Vector2},
	{name: 'IsAwake', tag: 16, tagsize: 1, type: ibelie.tyts.Bool},
	{name: 'Hp', tag: 29, tagsize: 1, type: ibelie.tyts.Float32},
	{name: 'Poss', tag: 34, tagsize: 1, type: DiVector2},
	{name: 'Posi', tag: 42, tagsize: 1, type: Dif},
	{name: 'Posl', tag: 50, tagsize: 1, type: LVector2},
	{name: 'Posll', tag: 58, tagsize: 1, type: LLVector2},
	{name: 'Pyl', tag: 66, tagsize: 1, type: LGoType},
	{name: 'Pyd', tag: 74, tagsize: 1, type: DiGoType},
	{name: 'Pyv1', tag: 82, tagsize: 1, type: VGoTypei},
	{name: 'Pyv2', tag: 90, tagsize: 1, type: VGoTypei},
	{name: 'Fl', tag: 98, tagsize: 1, type: Lf},
	{name: 'Bl', tag: 106, tagsize: 1, type: Lby},
	{name: 'Sl', tag: 114, tagsize: 1, type: Ls},
	{name: 'Bd', tag: 122, tagsize: 1, type: Dsby},
	{name: 'Sd', tag: 130, tagsize: 2, type: Dis},
	{name: 'Ml', tag: 138, tagsize: 2, type: Lsy},
	{name: 'Mbd', tag: 146, tagsize: 2, type: Dsyby},
	{name: 'Md', tag: 154, tagsize: 2, type: Disy},
	{name: 'El', tag: 162, tagsize: 2, type: LCorpus},
	{name: 'Ed', tag: 170, tagsize: 2, type: DiCorpus},
	{name: 'Ll', tag: 178, tagsize: 2, type: LLf}
], [
]);
types.Fighter_Part2 = Fighter_Part2.Type;
