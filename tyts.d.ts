// Copyright 2017 ibelie, Chen Jie, Joungtao. All rights reserved.
// Use of this source code is governed by The MIT License
// that can be found in the LICENSE file.

declare module tyts {
	class Object {
		constructor(data: Uint8Array);
		readMessage(obj: any, reader: (obj: any, reader: number) => void): void;
	}

	class ProtoBuf {
		offset: number;
		buffer: Uint8Array;
		constructor(buffer: Uint8Array);
		End(): boolean;
		Reset(): void;
		ReadByte(): number;
		ReadBytes(n: number): Uint8Array;
		ReadString(): string;
		ReadVarint(): number;
		ReadUint32(): number;
		ReadTag(cutoff: number): number[];
		WriteByte(b: number): void;
		WriteBytes(bytes: Uint8Array): void;
		WriteString(s: string): void;
		WriteVarint(x: number): void;
		WriteUint32(x: number): void;
		SkipField(tag: number): void;
	}
}
