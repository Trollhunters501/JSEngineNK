load("https://cdnjs.cloudflare.com/ajax/libs/es6-shim/0.35.5/es6-sham.min.js");
load("https://cdn.jsdelivr.net/npm/unorm@1.6.0/lib/unorm.min.js");
const Class = function ($superclass, config) {
    // All classes have a superclass with the root 
    // of this $class hierarchy being Object.
    let self = function (config) {
        // Object.assign or $.extend or ...
        config && Object.assign(this, config);
    };
    self.prototype = new $superclass(config);
    return self;
};
