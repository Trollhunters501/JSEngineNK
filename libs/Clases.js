load("https://cdnjs.cloudflare.com/ajax/libs/es6-shim/0.35.5/es6-sham.min.js");
load("https://cdn.jsdelivr.net/npm/unorm@1.6.0/lib/unorm.min.js");
const Class = function ($superclass, config, configStatic) {
    // All classes have a superclass with the root 
    // of this $class hierarchy being Object.
    let self = function (config) {
        // Object.assign or $.extend or ...
        config && Object.assign(this, config);
        Object.getOwnPropertyNames($superclass.prototype).forEach(function(methodName){ 
            if (typeof this.$super[methodName] === 'function') { 
                this.$super[methodName] = this.$super[methodName].bind(this);
            }else if(this.$super[methodName] != this[methodName]){
                this.$super[methodName] = this[methodName];
            }
        }.bind(this));
        this.$constructor && this.$constructor(config);
    };
    Object.assign(self, $superclass);
    configStatic && Object.assign(self, configStatic);
    self.prototype = Object.create($superclass.prototype);
    config && Object.assign(self.prototype, config);
    self.prototype.constructor = self;
    self.prototype.$super = $superclass.prototype;
    return self;
};
