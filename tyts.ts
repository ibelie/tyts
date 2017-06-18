// Copyright 2017 ibelie, Chen Jie, Joungtao. All rights reserved.
// Use of this source code is governed by The MIT License
// that can be found in the LICENSE file.

declare module ibelie.tyts {
	class TEST {
		constructor(data: Uint8Array);
		readMessage(obj: any, reader: (obj: any, reader: number) => void): void;
	}
}
