export let NumberUtil = class NumberUtil {
    get _random() {
        return (Math.random() / (this._constructed || new Date().getTime())).toString(36).slice(-7);
    }
};

export let TimeUtil = class TimeUtil {
    get _timestamp() {
        return new Date().getTime();
    }
    get _localTimeString() {
        return new Date().toLocaleString();
    }
};

export let AsyncUtil = class AsyncUtil {
    _validate(fn) {
        return new Promise((resolve, reject) => {
            try {
                resolve(fn());
            } catch (e) {
                (this.log || console.log)(e);
                reject(e);
            }
        });
    }
    _closurize(fn, ctx, ...args) {
        return new Promise((resolve, reject) => {
            this._validate(fn.bind(ctx, ...args)).then((...args) => {
                if (args[0] && typeof args[0].then === "function") {
                    args[0].then(resolve.bind(ctx)).catch(reject.bind(ctx));
                } else {
                    if (args.length > 1 || args[0] && !(args[0] instanceof Error)) {
                        resolve.call(ctx, ...args);
                    } else {
                        reject.call(ctx, ...(args || null));
                    }
                }
            });
        });
    }
};

export let TypeCheckUtil = class TypeCheckUtil {
    _isVoid(foo) {
        return typeof foo === "undefined" || foo === null;
    }
    _isFunction(foo) {
        return typeof foo === "function";
    }
    _isPromise(foo) {
        return !this._isVoid(foo) && this._isFunction(foo.then);
    }
    _isFalsy(foo) {
        return foo == false || foo instanceof Error;
    }
};

export let ArrayUtil = class ArrayUtil {
    setArray(srcProp, arr, measureO) {
        let _arr = arr.filter(newItem => {
            return !this[srcProp].filter(currentItem => {
                let truthy = true;
                Object.keys(measureO).forEach(prop => {
                    truthy &= newItem[prop] === currentItem[prop];
                });
                return !!truthy;
            }).length;
        });
        this[srcProp].concat(_arr);
        return !!_arr.length;
    }
};

//# sourceMappingURL=umd_module.js.map