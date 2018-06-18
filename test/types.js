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
	{get: (o) => { return o.X; }, set: (o, v) => { o.X = v; }, handle: (o) => { return o.OnXChanged}, tag: 13, tagsize: 1, type: ibelie.tyts.Float32},
	{get: (o) => { return o.Y; }, set: (o, v) => { o.Y = v; }, handle: (o) => { return o.OnYChanged}, tag: 16, tagsize: 1, type: FixedPoint_1_s10},
	{get: (o) => { return o.B; }, set: (o, v) => { o.B = v; }, handle: (o) => { return o.OnBChanged}, tag: 26, tagsize: 1, type: ibelie.tyts.Bytes},
	{get: (o) => { return o.S; }, set: (o, v) => { o.S = v; }, handle: (o) => { return o.OnSChanged}, tag: 34, tagsize: 1, type: ibelie.tyts.String},
	{get: (o) => { return o.M; }, set: (o, v) => { o.M = v; }, handle: (o) => { return o.OnMChanged}, tag: 42, tagsize: 1, type: ibelie.tyts.Symbol},
	{get: (o) => { return o.E; }, set: (o, v) => { o.E = v; }, handle: (o) => { return o.OnEChanged}, tag: 48, tagsize: 1, type: ibelie.tyts.Integer},
	{get: (o) => { return o.P; }, set: (o, v) => { o.P = v; }, handle: (o) => { return o.OnPChanged}, tag: 58, tagsize: 1, type: GoTypeDelegate}
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
	{get: (o) => { return o.Pos; }, set: (o, v) => { o.Pos = v; }, handle: (o) => { return o.OnPosChanged}, tag: 10, tagsize: 1, type: Vector2},
	{get: (o) => { return o.IsAwake; }, set: (o, v) => { o.IsAwake = v; }, handle: (o) => { return o.OnIsAwakeChanged}, tag: 16, tagsize: 1, type: ibelie.tyts.Bool},
	{get: (o) => { return o.Hp; }, set: (o, v) => { o.Hp = v; }, handle: (o) => { return o.OnHpChanged}, tag: 29, tagsize: 1, type: ibelie.tyts.Float32},
	{get: (o) => { return o.Poss; }, set: (o, v) => { o.Poss = v; }, handle: (o) => { return o.OnPossChanged}, tag: 34, tagsize: 1, type: DiVector2},
	{get: (o) => { return o.Posi; }, set: (o, v) => { o.Posi = v; }, handle: (o) => { return o.OnPosiChanged}, tag: 42, tagsize: 1, type: Dif},
	{get: (o) => { return o.Posl; }, set: (o, v) => { o.Posl = v; }, handle: (o) => { return o.OnPoslChanged}, tag: 50, tagsize: 1, type: LVector2},
	{get: (o) => { return o.Posll; }, set: (o, v) => { o.Posll = v; }, handle: (o) => { return o.OnPosllChanged}, tag: 58, tagsize: 1, type: LLVector2},
	{get: (o) => { return o.Pyl; }, set: (o, v) => { o.Pyl = v; }, handle: (o) => { return o.OnPylChanged}, tag: 66, tagsize: 1, type: LGoType},
	{get: (o) => { return o.Pyd; }, set: (o, v) => { o.Pyd = v; }, handle: (o) => { return o.OnPydChanged}, tag: 74, tagsize: 1, type: DiGoType},
	{get: (o) => { return o.Pyv1; }, set: (o, v) => { o.Pyv1 = v; }, handle: (o) => { return o.OnPyv1Changed}, tag: 82, tagsize: 1, type: VGoTypei},
	{get: (o) => { return o.Pyv2; }, set: (o, v) => { o.Pyv2 = v; }, handle: (o) => { return o.OnPyv2Changed}, tag: 90, tagsize: 1, type: VGoTypei},
	{get: (o) => { return o.Fl; }, set: (o, v) => { o.Fl = v; }, handle: (o) => { return o.OnFlChanged}, tag: 98, tagsize: 1, type: Lf},
	{get: (o) => { return o.Bl; }, set: (o, v) => { o.Bl = v; }, handle: (o) => { return o.OnBlChanged}, tag: 106, tagsize: 1, type: Lby},
	{get: (o) => { return o.Sl; }, set: (o, v) => { o.Sl = v; }, handle: (o) => { return o.OnSlChanged}, tag: 114, tagsize: 1, type: Ls},
	{get: (o) => { return o.Bd; }, set: (o, v) => { o.Bd = v; }, handle: (o) => { return o.OnBdChanged}, tag: 122, tagsize: 1, type: Dsby},
	{get: (o) => { return o.Sd; }, set: (o, v) => { o.Sd = v; }, handle: (o) => { return o.OnSdChanged}, tag: 130, tagsize: 2, type: Dis},
	{get: (o) => { return o.Ml; }, set: (o, v) => { o.Ml = v; }, handle: (o) => { return o.OnMlChanged}, tag: 138, tagsize: 2, type: Lsy},
	{get: (o) => { return o.Mbd; }, set: (o, v) => { o.Mbd = v; }, handle: (o) => { return o.OnMbdChanged}, tag: 146, tagsize: 2, type: Dsyby},
	{get: (o) => { return o.Md; }, set: (o, v) => { o.Md = v; }, handle: (o) => { return o.OnMdChanged}, tag: 154, tagsize: 2, type: Disy},
	{get: (o) => { return o.El; }, set: (o, v) => { o.El = v; }, handle: (o) => { return o.OnElChanged}, tag: 162, tagsize: 2, type: LCorpus},
	{get: (o) => { return o.Ed; }, set: (o, v) => { o.Ed = v; }, handle: (o) => { return o.OnEdChanged}, tag: 170, tagsize: 2, type: DiCorpus},
	{get: (o) => { return o.Ll; }, set: (o, v) => { o.Ll = v; }, handle: (o) => { return o.OnLlChanged}, tag: 178, tagsize: 2, type: LLf},
	{get: (o) => { return o.V0; }, set: (o, v) => { o.V0 = v; }, handle: (o) => { return o.OnV0Changed}, tag: 186, tagsize: 2, type: VVector2byfi},
	{get: (o) => { return o.V1; }, set: (o, v) => { o.V1 = v; }, handle: (o) => { return o.OnV1Changed}, tag: 194, tagsize: 2, type: VVector2byfi},
	{get: (o) => { return o.V2; }, set: (o, v) => { o.V2 = v; }, handle: (o) => { return o.OnV2Changed}, tag: 202, tagsize: 2, type: VVector2byfi},
	{get: (o) => { return o.V3; }, set: (o, v) => { o.V3 = v; }, handle: (o) => { return o.OnV3Changed}, tag: 210, tagsize: 2, type: VVector2byfi},
	{get: (o) => { return o.V4; }, set: (o, v) => { o.V4 = v; }, handle: (o) => { return o.OnV4Changed}, tag: 218, tagsize: 2, type: VVector2byfi},
	{get: (o) => { return o.Vl; }, set: (o, v) => { o.Vl = v; }, handle: (o) => { return o.OnVlChanged}, tag: 226, tagsize: 2, type: LVFixedPoint_3_0Vector2is},
	{get: (o) => { return o.Vd; }, set: (o, v) => { o.Vd = v; }, handle: (o) => { return o.OnVdChanged}, tag: 234, tagsize: 2, type: DiVCorpusVector2ds},
	{get: (o) => { return o.Ld; }, set: (o, v) => { o.Ld = v; }, handle: (o) => { return o.OnLdChanged}, tag: 242, tagsize: 2, type: DiLVCorpusVector2ds},
	{get: (o) => { return o.Fld; }, set: (o, v) => { o.Fld = v; }, handle: (o) => { return o.OnFldChanged}, tag: 250, tagsize: 2, type: DiLf},
	{get: (o) => { return o.Dd; }, set: (o, v) => { o.Dd = v; }, handle: (o) => { return o.OnDdChanged}, tag: 258, tagsize: 2, type: DiDiVCorpusVector2dis},
	{get: (o) => { return o.Fdd; }, set: (o, v) => { o.Fdd = v; }, handle: (o) => { return o.OnFddChanged}, tag: 266, tagsize: 2, type: DiDif},
	{get: (o) => { return o.Nv; }, set: (o, v) => { o.Nv = v; }, handle: (o) => { return o.OnNvChanged}, tag: 274, tagsize: 2, type: Vin},
	{get: (o) => { return o.Lv; }, set: (o, v) => { o.Lv = v; }, handle: (o) => { return o.OnLvChanged}, tag: 282, tagsize: 2, type: VLVfsi},
	{get: (o) => { return o.Flv; }, set: (o, v) => { o.Flv = v; }, handle: (o) => { return o.OnFlvChanged}, tag: 290, tagsize: 2, type: VLfi},
	{get: (o) => { return o.Dv; }, set: (o, v) => { o.Dv = v; }, handle: (o) => { return o.OnDvChanged}, tag: 298, tagsize: 2, type: VDiVfsi},
	{get: (o) => { return o.Fdv; }, set: (o, v) => { o.Fdv = v; }, handle: (o) => { return o.OnFdvChanged}, tag: 306, tagsize: 2, type: VDifi},
	{get: (o) => { return o.Poslll; }, set: (o, v) => { o.Poslll = v; }, handle: (o) => { return o.OnPoslllChanged}, tag: 314, tagsize: 2, type: LLLVector2},
	{get: (o) => { return o.Posdl; }, set: (o, v) => { o.Posdl = v; }, handle: (o) => { return o.OnPosdlChanged}, tag: 322, tagsize: 2, type: LDsVector2}
], [
	{S: (t, f) => { t.S_RPGParam = f; }, D: (t, f) => { t.D_RPGParam = f; }, type: null},
	{S: (t, f) => { t.S_RPGResult = f; }, D: (t, f) => { t.D_RPGResult = f; }, type: null},
	{S: (t, f) => { t.S_GPRParam = f; }, D: (t, f) => { t.D_GPRParam = f; }, type: null},
	{S: (t, f) => { t.S_GPRResult = f; }, D: (t, f) => { t.D_GPRResult = f; }, type: null}
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
	{get: (o) => { return o.Pos; }, set: (o, v) => { o.Pos = v; }, handle: (o) => { return o.OnPosChanged}, tag: 10, tagsize: 1, type: Vector2},
	{get: (o) => { return o.IsAwake; }, set: (o, v) => { o.IsAwake = v; }, handle: (o) => { return o.OnIsAwakeChanged}, tag: 16, tagsize: 1, type: ibelie.tyts.Bool},
	{get: (o) => { return o.Hp; }, set: (o, v) => { o.Hp = v; }, handle: (o) => { return o.OnHpChanged}, tag: 29, tagsize: 1, type: ibelie.tyts.Float32},
	{get: (o) => { return o.Poss; }, set: (o, v) => { o.Poss = v; }, handle: (o) => { return o.OnPossChanged}, tag: 34, tagsize: 1, type: DiVector2},
	{get: (o) => { return o.Posi; }, set: (o, v) => { o.Posi = v; }, handle: (o) => { return o.OnPosiChanged}, tag: 42, tagsize: 1, type: Dif},
	{get: (o) => { return o.Posl; }, set: (o, v) => { o.Posl = v; }, handle: (o) => { return o.OnPoslChanged}, tag: 50, tagsize: 1, type: LVector2},
	{get: (o) => { return o.Posll; }, set: (o, v) => { o.Posll = v; }, handle: (o) => { return o.OnPosllChanged}, tag: 58, tagsize: 1, type: LLVector2},
	{get: (o) => { return o.Pyl; }, set: (o, v) => { o.Pyl = v; }, handle: (o) => { return o.OnPylChanged}, tag: 66, tagsize: 1, type: LGoType},
	{get: (o) => { return o.Pyd; }, set: (o, v) => { o.Pyd = v; }, handle: (o) => { return o.OnPydChanged}, tag: 74, tagsize: 1, type: DiGoType},
	{get: (o) => { return o.Pyv1; }, set: (o, v) => { o.Pyv1 = v; }, handle: (o) => { return o.OnPyv1Changed}, tag: 82, tagsize: 1, type: VGoTypei},
	{get: (o) => { return o.Pyv2; }, set: (o, v) => { o.Pyv2 = v; }, handle: (o) => { return o.OnPyv2Changed}, tag: 90, tagsize: 1, type: VGoTypei}
], [
]);
types.Fighter_Part1 = Fighter_Part1.Type;

var Fighter_Part2 = new ibelie.tyts.Object(1023, [
	{get: (o) => { return o.Pos; }, set: (o, v) => { o.Pos = v; }, handle: (o) => { return o.OnPosChanged}, tag: 10, tagsize: 1, type: Vector2},
	{get: (o) => { return o.IsAwake; }, set: (o, v) => { o.IsAwake = v; }, handle: (o) => { return o.OnIsAwakeChanged}, tag: 16, tagsize: 1, type: ibelie.tyts.Bool},
	{get: (o) => { return o.Hp; }, set: (o, v) => { o.Hp = v; }, handle: (o) => { return o.OnHpChanged}, tag: 29, tagsize: 1, type: ibelie.tyts.Float32},
	{get: (o) => { return o.Poss; }, set: (o, v) => { o.Poss = v; }, handle: (o) => { return o.OnPossChanged}, tag: 34, tagsize: 1, type: DiVector2},
	{get: (o) => { return o.Posi; }, set: (o, v) => { o.Posi = v; }, handle: (o) => { return o.OnPosiChanged}, tag: 42, tagsize: 1, type: Dif},
	{get: (o) => { return o.Posl; }, set: (o, v) => { o.Posl = v; }, handle: (o) => { return o.OnPoslChanged}, tag: 50, tagsize: 1, type: LVector2},
	{get: (o) => { return o.Posll; }, set: (o, v) => { o.Posll = v; }, handle: (o) => { return o.OnPosllChanged}, tag: 58, tagsize: 1, type: LLVector2},
	{get: (o) => { return o.Pyl; }, set: (o, v) => { o.Pyl = v; }, handle: (o) => { return o.OnPylChanged}, tag: 66, tagsize: 1, type: LGoType},
	{get: (o) => { return o.Pyd; }, set: (o, v) => { o.Pyd = v; }, handle: (o) => { return o.OnPydChanged}, tag: 74, tagsize: 1, type: DiGoType},
	{get: (o) => { return o.Pyv1; }, set: (o, v) => { o.Pyv1 = v; }, handle: (o) => { return o.OnPyv1Changed}, tag: 82, tagsize: 1, type: VGoTypei},
	{get: (o) => { return o.Pyv2; }, set: (o, v) => { o.Pyv2 = v; }, handle: (o) => { return o.OnPyv2Changed}, tag: 90, tagsize: 1, type: VGoTypei},
	{get: (o) => { return o.Fl; }, set: (o, v) => { o.Fl = v; }, handle: (o) => { return o.OnFlChanged}, tag: 98, tagsize: 1, type: Lf},
	{get: (o) => { return o.Bl; }, set: (o, v) => { o.Bl = v; }, handle: (o) => { return o.OnBlChanged}, tag: 106, tagsize: 1, type: Lby},
	{get: (o) => { return o.Sl; }, set: (o, v) => { o.Sl = v; }, handle: (o) => { return o.OnSlChanged}, tag: 114, tagsize: 1, type: Ls},
	{get: (o) => { return o.Bd; }, set: (o, v) => { o.Bd = v; }, handle: (o) => { return o.OnBdChanged}, tag: 122, tagsize: 1, type: Dsby},
	{get: (o) => { return o.Sd; }, set: (o, v) => { o.Sd = v; }, handle: (o) => { return o.OnSdChanged}, tag: 130, tagsize: 2, type: Dis},
	{get: (o) => { return o.Ml; }, set: (o, v) => { o.Ml = v; }, handle: (o) => { return o.OnMlChanged}, tag: 138, tagsize: 2, type: Lsy},
	{get: (o) => { return o.Mbd; }, set: (o, v) => { o.Mbd = v; }, handle: (o) => { return o.OnMbdChanged}, tag: 146, tagsize: 2, type: Dsyby},
	{get: (o) => { return o.Md; }, set: (o, v) => { o.Md = v; }, handle: (o) => { return o.OnMdChanged}, tag: 154, tagsize: 2, type: Disy},
	{get: (o) => { return o.El; }, set: (o, v) => { o.El = v; }, handle: (o) => { return o.OnElChanged}, tag: 162, tagsize: 2, type: LCorpus},
	{get: (o) => { return o.Ed; }, set: (o, v) => { o.Ed = v; }, handle: (o) => { return o.OnEdChanged}, tag: 170, tagsize: 2, type: DiCorpus},
	{get: (o) => { return o.Ll; }, set: (o, v) => { o.Ll = v; }, handle: (o) => { return o.OnLlChanged}, tag: 178, tagsize: 2, type: LLf}
], [
]);
types.Fighter_Part2 = Fighter_Part2.Type;
