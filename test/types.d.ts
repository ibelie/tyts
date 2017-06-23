// Generated for tyts by tygo.  DO NOT EDIT!

declare module tyts {
	interface Type {
		__class__: string;
		ByteSize(): number;
		Serialize(): Uint8Array;
		Deserialize(data: Uint8Array): void;
	}
}

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
		__class__: string;
		ByteSize(): number;
		Serialize(): Uint8Array;
		Deserialize(data: Uint8Array): void;
		X: number;
		Y: number;
		B: Uint8Array;
		S: string;
		E: Corpus;
		P: tyts.Type;
	}

	namespace Vector2 {
		function Deserialize(data: Uint8Array): Vector2;
	}

	class Fighter_Part1 {
		__class__: string;
		ByteSize(): number;
		Serialize(): Uint8Array;
		Deserialize(data: Uint8Array): void;
		Pos: Vector2;
		IsAwake: boolean;
		Hp: number;
		Poss: {[index: number]: Vector2};
		Posi: {[index: number]: number};
		Posl: Vector2[];
		Posll: Vector2[][];
		Pyl: tyts.Type[];
		Pyd: {[index: number]: tyts.Type};
		Pyv1: any;
		Pyv2: any;
	}

	namespace Fighter_Part1 {
		function Deserialize(data: Uint8Array): Fighter_Part1;
	}

	class Fighter_Part2 {
		__class__: string;
		ByteSize(): number;
		Serialize(): Uint8Array;
		Deserialize(data: Uint8Array): void;
		Fl: number[];
		Bl: Uint8Array[];
		Sl: string[];
		Bd: {[index: string]: Uint8Array};
		Sd: {[index: number]: string};
		El: Corpus[];
		Ed: {[index: number]: Corpus};
		Ll: number[][];
	}

	namespace Fighter_Part2 {
		function Deserialize(data: Uint8Array): Fighter_Part2;
	}

	class Fighter {
		__class__: string;
		ByteSize(): number;
		Serialize(): Uint8Array;
		Deserialize(data: Uint8Array): void;
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

	namespace Fighter {
		function Deserialize(data: Uint8Array): Fighter;
	}
}