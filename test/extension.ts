// Copyright 2017-2018 ibelie, Chen Jie, Joungtao. All rights reserved.
// Use of this source code is governed by The MIT License
// that can be found in the LICENSE file.

declare var goog;
goog.provide('GoType');

class GoType {
	isObject: true;
	PP: number;
	AP: string;

	constructor(PP?: number, AP?: string) {
		this.isObject = true;
		this.PP = PP;
		this.AP = AP;
	}

	ByteSize(): number {
		let n = 0;
		if (this.PP != undefined) {
			let x = this.PP;
			do { n++; x >>>= 7; } while (x);
		}
		if (this.AP != undefined) {
			n += this.AP.length;
		}
		return n;
	}

	Serialize(): Uint8Array {
		let i = 0;
		let buffer = new Uint8Array(this.ByteSize());
		if (this.PP != undefined) {
			let x = this.PP;
			while (x >= 0x80) {
				buffer[i++] = (x & 0x7F) | 0x80;
				x >>>= 7;
			}
			buffer[i++] = x & 0x7F;
		}
		if (this.AP != undefined) {
			for (let j = 0; j < this.AP.length; j++) {
				buffer[i++] = this.AP.charCodeAt(j);
			}
		}
		return buffer;
	}

	Deserialize(data: Uint8Array): void {
		let s = 0, i = 0;
		if (data.length > 0) {
			this.PP = 0;
			while (s < 64) {
				let b = data[i++];
				if (b < 0x80) {
					this.PP |= (b & 0x7F) << s;
					break;
				}
				this.PP |= (b & 0x7F) << s;
				s += 7;
			}
		}
		if (data.length > i) {
			this.AP = String.fromCharCode.apply(null, data.slice(i));
		}
	}
}
