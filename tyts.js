// Copyright 2017 ibelie, Chen Jie, Joungtao. All rights reserved.
// Use of this source code is governed by The MIT License
// that can be found in the LICENSE file.

goog.provide('ibelie.tyts.Object');
goog.provide('ibelie.tyts.Variant');
goog.provide('ibelie.tyts.Enum');
goog.provide('ibelie.tyts.List');
goog.provide('ibelie.tyts.Dict');
goog.provide('ibelie.tyts.Python');
goog.provide('ibelie.tyts.FixedPoint');

ibelie.tyts.Object = function(name, fields) {
	this.name = name;
	this.fields = fields;
	this.New = function() {
		for (var i = this.fields.length - 1; i >= 0; i--) {
			var field = this.fields[i];
			Object.defineProperty(this, field.name, {
				get: function() {
					if (this[field.name] == undefined) {
						if (field.type instanceof ibelie.tyts.List) {
							this[field.name] = []
						} else if (field.type instanceof ibelie.tyts.Dict) {
							this[field.name] = {}
						} else if (field.type instanceof ibelie.tyts.Object || field.type instanceof ibelie.tyts.Variant) {
							this[field.name] = null
						} else {
							this[field.name] = 0
						}
					}
					return this[field.name]
				},
				set: function(value) {
					this[field.name] = value;
				}
			});
		}
	}
};

ibelie.tyts.Variant = function(name, fields) {
	this.name = name;
	this.fields = fields;
};

ibelie.tyts.Enum = function(name, fields) {
	this.name = name;
	this.fields = fields;
};

ibelie.tyts.List = function(name, fields) {
	this.name = name;
	this.fields = fields;
};

ibelie.tyts.Dict = function(name, fields) {
	this.name = name;
	this.fields = fields;
};

ibelie.tyts.Object = function(name, fields) {
	this.name = name;
	this.fields = fields;
};

ibelie.tyts.FixedPoint = function(floor, precision) {
	this.floor = floor;
	this.precision = Math.pow(10, precision);
};
