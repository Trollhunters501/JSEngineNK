const Class = function ($superclass, config) {
    // All classes have a superclass with the root 
    // of this $class hierarchy being Object.
    var self = function (config) {
        // Object.assign or $.extend or ...
        config && Object.assign(this, config);
    };
    self.prototype = new $superclass(config);
    return self;
};
