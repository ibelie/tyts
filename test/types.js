// Generated for tyts by tygo.  DO NOT EDIT!

goog.provide('tyts.tygo.Fighter');
goog.provide('tyts.tygo.Fighter_Part1');
goog.provide('tyts.tygo.Fighter_Part2');
goog.provide('tyts.tygo.Vector2');

goog.require('tyts.Bool');
goog.require('tyts.Bytes');
goog.require('tyts.Dict');
goog.require('tyts.Extension');
goog.require('tyts.FixedPoint');
goog.require('tyts.Float32');
goog.require('tyts.Float64');
goog.require('tyts.Integer');
goog.require('tyts.List');
goog.require('tyts.Object');
goog.require('tyts.String');
goog.require('tyts.Variant');

goog.require('GoType');

FixedPoint_1_s10 = tyts.FixedPoint(-10, 1)

GoTypeDelegate = tyts.Extension('GoTypeDelegate', GoType)

tyts.tygo.Vector2 = tyts.Object('Vector2', 127, [
	{name: X, tag: 13, tagsize: 1, type: tyts.Float32},
	{name: Y, tag: 16, tagsize: 1, type: FixedPoint_1_s10},
	{name: B, tag: 26, tagsize: 1, type: tyts.Bytes},
	{name: S, tag: 34, tagsize: 1, type: tyts.String},
	{name: E, tag: 40, tagsize: 1, type: tyts.Integer},
	{name: P, tag: 50, tagsize: 1, type: GoTypeDelegate}
]);

DiVector2 = tyts.Dict('DiVector2', tyts.Integer, Vector2)

Dif = tyts.Dict('Dif', tyts.Integer, tyts.Float32)

LVector2 = tyts.List('LVector2', Vector2)

LLVector2 = tyts.List('LLVector2', LVector2)

LGoType = tyts.List('LGoType', GoTypeDelegate)

DiGoType = tyts.Dict('DiGoType', tyts.Integer, GoTypeDelegate)

VGoTypei = tyts.Variant('VGoTypei', [
	{tag: 8, tagsize: 1, type: tyts.Integer},
	{tag: 18, tagsize: 1, type: GoTypeDelegate}
])

Lf = tyts.List('Lf', tyts.Float32)

Lby = tyts.List('Lby', tyts.Bytes)

Ls = tyts.List('Ls', tyts.String)

Dsby = tyts.Dict('Dsby', tyts.String, tyts.Bytes)

Dis = tyts.Dict('Dis', tyts.Integer, tyts.String)

LCorpus = tyts.List('LCorpus', tyts.Integer)

DiCorpus = tyts.Dict('DiCorpus', tyts.Integer, tyts.Integer)

LLf = tyts.List('LLf', Lf)

VVector2byfi = tyts.Variant('VVector2byfi', [
	{tag: 8, tagsize: 1, type: tyts.Integer},
	{tag: 21, tagsize: 1, type: tyts.Float32},
	{tag: 26, tagsize: 1, type: tyts.Bytes},
	{tag: 34, tagsize: 1, type: Vector2}
])

FixedPoint_3_0 = tyts.FixedPoint(0, 3)

VFixedPoint_3_0Vector2is = tyts.Variant('VFixedPoint_3_0Vector2is', [
	{tag: 8, tagsize: 1, type: tyts.Integer},
	{tag: 16, tagsize: 1, type: FixedPoint_3_0},
	{tag: 26, tagsize: 1, type: tyts.String},
	{tag: 34, tagsize: 1, type: Vector2}
])

LVFixedPoint_3_0Vector2is = tyts.List('LVFixedPoint_3_0Vector2is', VFixedPoint_3_0Vector2is)

VCorpusVector2ds = tyts.Variant('VCorpusVector2ds', [
	{tag: 8, tagsize: 1, type: tyts.Integer},
	{tag: 17, tagsize: 1, type: tyts.Float64},
	{tag: 26, tagsize: 1, type: tyts.String},
	{tag: 34, tagsize: 1, type: Vector2}
])

DiVCorpusVector2ds = tyts.Dict('DiVCorpusVector2ds', tyts.Integer, VCorpusVector2ds)

LVCorpusVector2ds = tyts.List('LVCorpusVector2ds', VCorpusVector2ds)

DiLVCorpusVector2ds = tyts.Dict('DiLVCorpusVector2ds', tyts.Integer, LVCorpusVector2ds)

DiLf = tyts.Dict('DiLf', tyts.Integer, Lf)

VCorpusVector2dis = tyts.Variant('VCorpusVector2dis', [
	{tag: 8, tagsize: 1, type: tyts.Integer},
	{tag: 16, tagsize: 1, type: tyts.Integer},
	{tag: 25, tagsize: 1, type: tyts.Float64},
	{tag: 34, tagsize: 1, type: tyts.String},
	{tag: 42, tagsize: 1, type: Vector2}
])

DiVCorpusVector2dis = tyts.Dict('DiVCorpusVector2dis', tyts.Integer, VCorpusVector2dis)

DiDiVCorpusVector2dis = tyts.Dict('DiDiVCorpusVector2dis', tyts.Integer, DiVCorpusVector2dis)

DiDif = tyts.Dict('DiDif', tyts.Integer, Dif)

Vin = tyts.Variant('Vin', [
	{tag: 16, tagsize: 1, type: tyts.Integer}
])

Vfs = tyts.Variant('Vfs', [
	{tag: 13, tagsize: 1, type: tyts.Float32},
	{tag: 18, tagsize: 1, type: tyts.String}
])

LVfs = tyts.List('LVfs', Vfs)

VLVfsi = tyts.Variant('VLVfsi', [
	{tag: 8, tagsize: 1, type: tyts.Integer},
	{tag: 18, tagsize: 1, type: LVfs}
])

VLfi = tyts.Variant('VLfi', [
	{tag: 8, tagsize: 1, type: tyts.Integer},
	{tag: 18, tagsize: 1, type: Lf}
])

DiVfs = tyts.Dict('DiVfs', tyts.Integer, Vfs)

VDiVfsi = tyts.Variant('VDiVfsi', [
	{tag: 8, tagsize: 1, type: tyts.Integer},
	{tag: 18, tagsize: 1, type: DiVfs}
])

VDifi = tyts.Variant('VDifi', [
	{tag: 8, tagsize: 1, type: tyts.Integer},
	{tag: 18, tagsize: 1, type: Dif}
])

tyts.tygo.Fighter = tyts.Object('Fighter', 1023, [
	{name: Pos, tag: 10, tagsize: 1, type: Vector2},
	{name: IsAwake, tag: 16, tagsize: 1, type: tyts.Bool},
	{name: Hp, tag: 29, tagsize: 1, type: tyts.Float32},
	{name: Poss, tag: 34, tagsize: 1, type: DiVector2},
	{name: Posi, tag: 42, tagsize: 1, type: Dif},
	{name: Posl, tag: 50, tagsize: 1, type: LVector2},
	{name: Posll, tag: 58, tagsize: 1, type: LLVector2},
	{name: Pyl, tag: 66, tagsize: 1, type: LGoType},
	{name: Pyd, tag: 74, tagsize: 1, type: DiGoType},
	{name: Pyv1, tag: 82, tagsize: 1, type: VGoTypei},
	{name: Pyv2, tag: 90, tagsize: 1, type: VGoTypei},
	{name: Fl, tag: 98, tagsize: 1, type: Lf},
	{name: Bl, tag: 106, tagsize: 1, type: Lby},
	{name: Sl, tag: 114, tagsize: 1, type: Ls},
	{name: Bd, tag: 122, tagsize: 1, type: Dsby},
	{name: Sd, tag: 130, tagsize: 2, type: Dis},
	{name: El, tag: 138, tagsize: 2, type: LCorpus},
	{name: Ed, tag: 146, tagsize: 2, type: DiCorpus},
	{name: Ll, tag: 154, tagsize: 2, type: LLf},
	{name: V0, tag: 162, tagsize: 2, type: VVector2byfi},
	{name: V1, tag: 170, tagsize: 2, type: VVector2byfi},
	{name: V2, tag: 178, tagsize: 2, type: VVector2byfi},
	{name: V3, tag: 186, tagsize: 2, type: VVector2byfi},
	{name: V4, tag: 194, tagsize: 2, type: VVector2byfi},
	{name: Vl, tag: 202, tagsize: 2, type: LVFixedPoint_3_0Vector2is},
	{name: Vd, tag: 210, tagsize: 2, type: DiVCorpusVector2ds},
	{name: Ld, tag: 218, tagsize: 2, type: DiLVCorpusVector2ds},
	{name: Fld, tag: 226, tagsize: 2, type: DiLf},
	{name: Dd, tag: 234, tagsize: 2, type: DiDiVCorpusVector2dis},
	{name: Fdd, tag: 242, tagsize: 2, type: DiDif},
	{name: Nv, tag: 250, tagsize: 2, type: Vin},
	{name: Lv, tag: 258, tagsize: 2, type: VLVfsi},
	{name: Flv, tag: 266, tagsize: 2, type: VLfi},
	{name: Dv, tag: 274, tagsize: 2, type: VDiVfsi},
	{name: Fdv, tag: 282, tagsize: 2, type: VDifi}
]);

tyts.tygo.Fighter_Part1 = tyts.Object('Fighter_Part1', 127, [
	{name: Pos, tag: 10, tagsize: 1, type: Vector2},
	{name: IsAwake, tag: 16, tagsize: 1, type: tyts.Bool},
	{name: Hp, tag: 29, tagsize: 1, type: tyts.Float32},
	{name: Poss, tag: 34, tagsize: 1, type: DiVector2},
	{name: Posi, tag: 42, tagsize: 1, type: Dif},
	{name: Posl, tag: 50, tagsize: 1, type: LVector2},
	{name: Posll, tag: 58, tagsize: 1, type: LLVector2},
	{name: Pyl, tag: 66, tagsize: 1, type: LGoType},
	{name: Pyd, tag: 74, tagsize: 1, type: DiGoType},
	{name: Pyv1, tag: 82, tagsize: 1, type: VGoTypei},
	{name: Pyv2, tag: 90, tagsize: 1, type: VGoTypei}
]);

tyts.tygo.Fighter_Part2 = tyts.Object('Fighter_Part2', 1023, [
	{name: Pos, tag: 10, tagsize: 1, type: Vector2},
	{name: IsAwake, tag: 16, tagsize: 1, type: tyts.Bool},
	{name: Hp, tag: 29, tagsize: 1, type: tyts.Float32},
	{name: Poss, tag: 34, tagsize: 1, type: DiVector2},
	{name: Posi, tag: 42, tagsize: 1, type: Dif},
	{name: Posl, tag: 50, tagsize: 1, type: LVector2},
	{name: Posll, tag: 58, tagsize: 1, type: LLVector2},
	{name: Pyl, tag: 66, tagsize: 1, type: LGoType},
	{name: Pyd, tag: 74, tagsize: 1, type: DiGoType},
	{name: Pyv1, tag: 82, tagsize: 1, type: VGoTypei},
	{name: Pyv2, tag: 90, tagsize: 1, type: VGoTypei},
	{name: Fl, tag: 98, tagsize: 1, type: Lf},
	{name: Bl, tag: 106, tagsize: 1, type: Lby},
	{name: Sl, tag: 114, tagsize: 1, type: Ls},
	{name: Bd, tag: 122, tagsize: 1, type: Dsby},
	{name: Sd, tag: 130, tagsize: 2, type: Dis},
	{name: El, tag: 138, tagsize: 2, type: LCorpus},
	{name: Ed, tag: 146, tagsize: 2, type: DiCorpus},
	{name: Ll, tag: 154, tagsize: 2, type: LLf}
]);
