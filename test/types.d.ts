// Generated for tyts by tygo.  DO NOT EDIT!

declare module tyts.tygo {

	const enum Corpus {
		UNIVERSAL = 0,
		WEB = 1,
		IMAGES = 2,
		LOCAL = 3,
		NEWS = 4,
		PRODUCTS = 5,
		VIDEO = 6
	}

	class Vector2 {
		X: number;
		Y: number;
		B: Uint8Array;
		S: string;
		E: Corpus;
		P: GoType;
	}

	class Fighter_Part1 {
		Pos: Vector2;
		IsAwake: boolean;
		Hp: number;
		Poss: {[index: number]: Vector2};
		Posi: {[index: number]: number};
		Posl: Vector2[];
		Posll: Vector2[][];
		Pyl: GoType[];
		Pyd: {[index: number]: GoType};
		Pyv1: any;
		Pyv2: any;
	}

	class Fighter_Part2 {
		Fl: number[];
		Bl: Uint8Array[];
		Sl: string[];
		Bd: {[index: string]: Uint8Array};
		Sd: {[index: number]: string};
		El: Corpus[];
		Ed: {[index: number]: Corpus};
		Ll: number[][];
	}

	class Fighter {
		V0: any;
		V1: any;
		V2: any;
		V3: any;
		V4: any;
		Vl: any[];
		Vd: {[index: number]: any};
		Ld: {[index: number]: any[]};
		Fld: {[index: number]: number[]};
		Dd: {[index: number]: {[index: number]: any}};
		Fdd: {[index: number]: {[index: number]: number}};
		Nv: any;
		Lv: any;
		Flv: any;
		Dv: any;
		Fdv: any;
	}
}