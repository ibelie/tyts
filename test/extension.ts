// Copyright 2017 ibelie, Chen Jie, Joungtao. All rights reserved.
// Use of this source code is governed by The MIT License
// that can be found in the LICENSE file.

declare var goog;

goog.provide('GoType');

class GoType {
	__class__: string;
	PP: number;
	AP: string;

	ByteSize(): number {
		return 0;
	}

	Serialize(): Uint8Array {
		return new Uint8Array(0);
	}

	Deserialize(data: Uint8Array): void {

	}
}
