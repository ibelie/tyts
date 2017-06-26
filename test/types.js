// Generated for tyts by tygo.  DO NOT EDIT!

goog.provide('types.Fighter');
goog.provide('types.Fighter_Part1');
goog.provide('types.Fighter_Part2');
goog.provide('types.Vector2');

goog.require('tyts.Bool');
goog.require('tyts.Bytes');
goog.require('tyts.Dict');
goog.require('tyts.Extension');
goog.require('tyts.FixedPoint');
goog.require('tyts.Float32');
goog.require('tyts.Float64');
goog.require('tyts.Integer');
goog.require('tyts.List');
goog.require('tyts.Method');
goog.require('tyts.Object');
goog.require('tyts.String');
goog.require('tyts.Variant');

goog.require('GoType');

var FixedPoint_1_s10 = new tyts.FixedPoint(-10, 1)

var GoTypeDelegate = new tyts.Extension('GoTypeDelegate', GoType)

var Vector2 = new tyts.Object('Vector2', 127, [
	{name: 'X', tag: 13, tagsize: 1, type: tyts.Float32},
	{name: 'Y', tag: 16, tagsize: 1, type: FixedPoint_1_s10},
	{name: 'B', tag: 26, tagsize: 1, type: tyts.Bytes},
	{name: 'S', tag: 34, tagsize: 1, type: tyts.String},
	{name: 'E', tag: 40, tagsize: 1, type: tyts.Integer},
	{name: 'P', tag: 50, tagsize: 1, type: GoTypeDelegate}
], [
]);
types.Vector2 = Vector2.Type;

var DiVector2 = new tyts.Dict('DiVector2', tyts.Integer, Vector2)

var Dif = new tyts.Dict('Dif', tyts.Integer, tyts.Float32)

var LVector2 = new tyts.List('LVector2', Vector2)

var LLVector2 = new tyts.List('LLVector2', LVector2)

var LGoType = new tyts.List('LGoType', GoTypeDelegate)

var DiGoType = new tyts.Dict('DiGoType', tyts.Integer, GoTypeDelegate)

var VGoTypei = new tyts.Variant('VGoTypei', 127, [
	{tag: 8, tagsize: 1, type: tyts.Integer},
	{tag: 18, tagsize: 1, type: GoTypeDelegate}
])

var Lf = new tyts.List('Lf', tyts.Float32)

var Lby = new tyts.List('Lby', tyts.Bytes)

var Ls = new tyts.List('Ls', tyts.String)

var Dsby = new tyts.Dict('Dsby', tyts.String, tyts.Bytes)

var Dis = new tyts.Dict('Dis', tyts.Integer, tyts.String)

var LCorpus = new tyts.List('LCorpus', tyts.Integer)

var DiCorpus = new tyts.Dict('DiCorpus', tyts.Integer, tyts.Integer)

var LLf = new tyts.List('LLf', Lf)

var VVector2byfi = new tyts.Variant('VVector2byfi', 127, [
	{tag: 8, tagsize: 1, type: tyts.Integer},
	{tag: 21, tagsize: 1, type: tyts.Float32},
	{tag: 26, tagsize: 1, type: tyts.Bytes},
	{tag: 34, tagsize: 1, type: Vector2}
])

var FixedPoint_3_0 = new tyts.FixedPoint(0, 3)

var VFixedPoint_3_0Vector2is = new tyts.Variant('VFixedPoint_3_0Vector2is', 127, [
	{tag: 8, tagsize: 1, type: tyts.Integer},
	{tag: 16, tagsize: 1, type: FixedPoint_3_0},
	{tag: 26, tagsize: 1, type: tyts.String},
	{tag: 34, tagsize: 1, type: Vector2}
])

var LVFixedPoint_3_0Vector2is = new tyts.List('LVFixedPoint_3_0Vector2is', VFixedPoint_3_0Vector2is)

var VCorpusVector2ds = new tyts.Variant('VCorpusVector2ds', 127, [
	{tag: 8, tagsize: 1, type: tyts.Integer},
	{tag: 17, tagsize: 1, type: tyts.Float64},
	{tag: 26, tagsize: 1, type: tyts.String},
	{tag: 34, tagsize: 1, type: Vector2}
])

var DiVCorpusVector2ds = new tyts.Dict('DiVCorpusVector2ds', tyts.Integer, VCorpusVector2ds)

var LVCorpusVector2ds = new tyts.List('LVCorpusVector2ds', VCorpusVector2ds)

var DiLVCorpusVector2ds = new tyts.Dict('DiLVCorpusVector2ds', tyts.Integer, LVCorpusVector2ds)

var DiLf = new tyts.Dict('DiLf', tyts.Integer, Lf)

var VCorpusVector2dis = new tyts.Variant('VCorpusVector2dis', 127, [
	{tag: 8, tagsize: 1, type: tyts.Integer},
	{tag: 16, tagsize: 1, type: tyts.Integer},
	{tag: 25, tagsize: 1, type: tyts.Float64},
	{tag: 34, tagsize: 1, type: tyts.String},
	{tag: 42, tagsize: 1, type: Vector2}
])

var DiVCorpusVector2dis = new tyts.Dict('DiVCorpusVector2dis', tyts.Integer, VCorpusVector2dis)

var DiDiVCorpusVector2dis = new tyts.Dict('DiDiVCorpusVector2dis', tyts.Integer, DiVCorpusVector2dis)

var DiDif = new tyts.Dict('DiDif', tyts.Integer, Dif)

var Vin = new tyts.Variant('Vin', 127, [
	{tag: 16, tagsize: 1, type: tyts.Integer}
])

var Vfs = new tyts.Variant('Vfs', 127, [
	{tag: 13, tagsize: 1, type: tyts.Float32},
	{tag: 18, tagsize: 1, type: tyts.String}
])

var LVfs = new tyts.List('LVfs', Vfs)

var VLVfsi = new tyts.Variant('VLVfsi', 127, [
	{tag: 8, tagsize: 1, type: tyts.Integer},
	{tag: 18, tagsize: 1, type: LVfs}
])

var VLfi = new tyts.Variant('VLfi', 127, [
	{tag: 8, tagsize: 1, type: tyts.Integer},
	{tag: 18, tagsize: 1, type: Lf}
])

var DiVfs = new tyts.Dict('DiVfs', tyts.Integer, Vfs)

var VDiVfsi = new tyts.Variant('VDiVfsi', 127, [
	{tag: 8, tagsize: 1, type: tyts.Integer},
	{tag: 18, tagsize: 1, type: DiVfs}
])

var VDifi = new tyts.Variant('VDifi', 127, [
	{tag: 8, tagsize: 1, type: tyts.Integer},
	{tag: 18, tagsize: 1, type: Dif}
])

var LLLVector2 = new tyts.List('LLLVector2', LLVector2)

var DsVector2 = new tyts.Dict('DsVector2', tyts.String, Vector2)

var LDsVector2 = new tyts.List('LDsVector2', DsVector2)

var Fighter = new tyts.Object('Fighter', 1023, [
	{name: 'Pos', tag: 10, tagsize: 1, type: Vector2},
	{name: 'IsAwake', tag: 16, tagsize: 1, type: tyts.Bool},
	{name: 'Hp', tag: 29, tagsize: 1, type: tyts.Float32},
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
	{name: 'El', tag: 138, tagsize: 2, type: LCorpus},
	{name: 'Ed', tag: 146, tagsize: 2, type: DiCorpus},
	{name: 'Ll', tag: 154, tagsize: 2, type: LLf},
	{name: 'V0', tag: 162, tagsize: 2, type: VVector2byfi},
	{name: 'V1', tag: 170, tagsize: 2, type: VVector2byfi},
	{name: 'V2', tag: 178, tagsize: 2, type: VVector2byfi},
	{name: 'V3', tag: 186, tagsize: 2, type: VVector2byfi},
	{name: 'V4', tag: 194, tagsize: 2, type: VVector2byfi},
	{name: 'Vl', tag: 202, tagsize: 2, type: LVFixedPoint_3_0Vector2is},
	{name: 'Vd', tag: 210, tagsize: 2, type: DiVCorpusVector2ds},
	{name: 'Ld', tag: 218, tagsize: 2, type: DiLVCorpusVector2ds},
	{name: 'Fld', tag: 226, tagsize: 2, type: DiLf},
	{name: 'Dd', tag: 234, tagsize: 2, type: DiDiVCorpusVector2dis},
	{name: 'Fdd', tag: 242, tagsize: 2, type: DiDif},
	{name: 'Nv', tag: 250, tagsize: 2, type: Vin},
	{name: 'Lv', tag: 258, tagsize: 2, type: VLVfsi},
	{name: 'Flv', tag: 266, tagsize: 2, type: VLfi},
	{name: 'Dv', tag: 274, tagsize: 2, type: VDiVfsi},
	{name: 'Fdv', tag: 282, tagsize: 2, type: VDifi},
	{name: 'Poslll', tag: 290, tagsize: 2, type: LLLVector2},
	{name: 'Posdl', tag: 298, tagsize: 2, type: LDsVector2}
], [
	{name: 'RPGParam', type: null},
	{name: 'RPGResult', type: null},
	{name: 'GPRParam', type: null},
	{name: 'GPRResult', type: null}
]);
Fighter.methods[0].type = new tyts.Method('FighterRPGParam', 127, [
	{tag: 10, tagsize: 1, type: Fighter},
	{tag: 18, tagsize: 1, type: Vin},
	{tag: 24, tagsize: 1, type: FixedPoint_3_0}
]);

Fighter.methods[1].type = new tyts.Method('FighterRPGResult', 127, [
	{tag: 10, tagsize: 1, type: Vector2}
]);

Fighter.methods[2].type = new tyts.Method('FighterGPRParam', 127, [
	{tag: 10, tagsize: 1, type: DiVCorpusVector2ds}
]);

Fighter.methods[3].type = new tyts.Method('FighterGPRResult', 127, [
	{tag: 10, tagsize: 1, type: Fighter},
	{tag: 16, tagsize: 1, type: tyts.Integer}
]);

types.Fighter = Fighter.Type;

var Fighter_Part1 = new tyts.Object('Fighter_Part1', 127, [
	{name: 'Pos', tag: 10, tagsize: 1, type: Vector2},
	{name: 'IsAwake', tag: 16, tagsize: 1, type: tyts.Bool},
	{name: 'Hp', tag: 29, tagsize: 1, type: tyts.Float32},
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

var Fighter_Part2 = new tyts.Object('Fighter_Part2', 1023, [
	{name: 'Pos', tag: 10, tagsize: 1, type: Vector2},
	{name: 'IsAwake', tag: 16, tagsize: 1, type: tyts.Bool},
	{name: 'Hp', tag: 29, tagsize: 1, type: tyts.Float32},
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
	{name: 'El', tag: 138, tagsize: 2, type: LCorpus},
	{name: 'Ed', tag: 146, tagsize: 2, type: DiCorpus},
	{name: 'Ll', tag: 154, tagsize: 2, type: LLf}
], [
]);
types.Fighter_Part2 = Fighter_Part2.Type;
