export class TypeCheck {
  static isObject(value) {
    return value && (typeof value === 'object') && (value.constructor === Object);
  }

  static isNotObject(value) {
    return !this.isObject(value);
  }

  static isArray(value) {
    return value && Array.isArray(value);
  }

  static isNotArray(value) {
    return !this.isArray(value);
  }

  static isString(value) {
    return (typeof value === 'string') || (value instanceof String);
  }

  static isNotString(value) {
    return !this.isString(value);
  }

  static isNumber(value) {
    return (typeof value === 'number') && Number.isFinite(value);
  }

  static isNotNumber(value) {
    return !this.isNumber(value);
  }

  static isFunction(value) {
    return (typeof value === 'function');
  }

  static isNotFunction(value) {
    return !this.isFunction(value);
  }

  static isBoolean(value) {
    return (typeof value === 'boolean');
  }

  static isNotBoolean(value) {
    return !this.isBoolean(value);
  }
}
