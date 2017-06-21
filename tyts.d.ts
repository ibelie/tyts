// Copyright 2017 ibelie, Chen Jie, Joungtao. All rights reserved.
// Use of this source code is governed by The MIT License
// that can be found in the LICENSE file.

declare module tyts {

	function SizeVarint(x: number): number;

	class ProtoBuf {
		offset: number;
		buffer: Uint8Array;
		constructor(buffer: Uint8Array);
		WriteBytes(bytes: Uint8Array): void;
		ReadBytes(n: number): Uint8Array;
		End(): boolean;
		Reset(): void;
		ReadByte(): number;
		ReadString(): string;
		ReadVarint(): number;
		ReadUint32(): number;
		WriteByte(b: number): void;
		WriteString(s: string): void;
		WriteVarint(x: number): void;
		WriteUint32(x: number): void;
		SkipField(tag: number): void;
		ReadTag(cutoff: number): number[];
	}

	interface Type {
		$: number;
		ByteSize(value: any, tagsize: number, ignore: boolean): number;
		Serialize(value: any, tag: number, ignore: boolean, protobuf: ProtoBuf): void;
		Deserialize(value: any, protobuf: ProtoBuf): any;
	}

	var Integer: Type;
	var Float64: Type;
	var Float32: Type;
	var Bool: Type;
	var Bytes: Type;
	var String: Type;
	var Extension: Type;

	class FixedPoint implements Type {
		$: number;
		constructor(floor: number, precision: number);
		ByteSize(value: any, tagsize: number, ignore: boolean): number;
		Serialize(value: any, tag: number, ignore: boolean, protobuf: ProtoBuf): void;
		Deserialize(value: any, protobuf: ProtoBuf): any;
	}

	class Object implements Type {
		$: number;
		constructor(name: string, fields: any);
		ByteSize(value: any, tagsize: number, ignore: boolean): number;
		Serialize(value: any, tag: number, ignore: boolean, protobuf: ProtoBuf): void;
		Deserialize(value: any, protobuf: ProtoBuf): any;
	}

	class Variant implements Type {
		$: number;
		constructor(name: string, types: any);
		ByteSize(value: any, tagsize: number, ignore: boolean): number;
		Serialize(value: any, tag: number, ignore: boolean, protobuf: ProtoBuf): void;
		Deserialize(value: any, protobuf: ProtoBuf): any;
	}

	class List implements Type {
		$: number;
		constructor(name: string, element: any);
		ByteSize(value: any, tagsize: number, ignore: boolean): number;
		Serialize(value: any, tag: number, ignore: boolean, protobuf: ProtoBuf): void;
		Deserialize(value: any, protobuf: ProtoBuf): any;
	}

	class Dict implements Type {
		$: number;
		constructor(name: string, key: any, value: any);
		ByteSize(value: any, tagsize: number, ignore: boolean): number;
		Serialize(value: any, tag: number, ignore: boolean, protobuf: ProtoBuf): void;
		Deserialize(value: any, protobuf: ProtoBuf): any;
	}
}
