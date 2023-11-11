# JSEngineNK
![JavaScript](https://img.shields.io/badge/JAVASCRIPT-grey?logo=Javascript) ![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)

Nukkit plugin, enable to load javascript! very simple create systems!!

With the Power of the Nashorn Engine!

Nukkit plugin - Allows you to load Javascript modules!

Runs ES6 version of partial JavaScript since it doesn't have Class and some stuff

Credits to the Original Plugin: https://cloudburstmc.org/resources/modloader.108/

# How to use?
- Create javascript archive, example: mod.js
- Drop archive in plugins/JSEngineNK/mod.js
- Create your code!
- Start your server! Instantly run

- examples can be found [here](https://github.com/Trollhunters501/JSEngineNK/tree/master/examples)

# Basic JavaScript API loaded!
- Global Variables:
```javascript
var server; return getServer();
var plugin; return JSEngineNK Plugin MainClass;
var global; return JSEngineNK Plugin MainClass;
var self; return JSEngineNK Plugin MainClass;
var manager; return FunctionManager Class, Using to create Commands e Loops
var script; return A class that registers scripts and events
var logger; return Console Logger Input
var console; return Console Logger Input
var window; return Console Logher Input


var players; return All Online Players
```

- Create Basic Command:
```javascript
manager.createCommand("name", "description", "functionUsed");


function functionUsed(sender, args){
    if(args.length < 1){ // see args exists
        sender.sendMessage('You used incorrect!');
        return;
    }
    let name = args[0];
    sender.sendMessage("You writer: " + name); // send Message to sender
    // sender.sendMessage(manager.format("You writer: %s", name)); format your message
}
```

- Create Basic Tasks:
```javascript
manager.createTask("tasknormal", 20);

manager.createLoopTask("taskloop", 20);

function tasknormal(currentTick){
    print('I tasknormal!');
}

function taskloop(currentTick){
    print('I taskloop');
}
```

- Run Events:
```javascript
script.addEventListener("PlayerJoinEvent", function(event){
    let player = event.getPlayer();
    player.sendMessage("welcome to Server!");
});
// ready, start your server and test!
```
See the list of supported Events: https://github.com/Trollhunters501/JSEngineNK/blob/master/Events%20Soported/Events.md
- Create Config
```javascript
var config = manager.createConfig(manager.getFile("folder", "archive"), 2); // 2 = Config.YAML

config.set("key", "value");
config.save();
```

- Register Script
```javascript
script.registerScript({
    name: "TestScript",
    version: "1.0",
    description: "The Test!",
    website: "https://github.com/Trollhunters501/JSEngineNK/",
    authors: ["Creadores Program & RedstoneAlmeida"]
});
//You can register your script so that it appears in the list of scripts with the command /scripts or also with the command /version script or /ver script
//The mandatory parameters are: author or authors, name, version and description optional: website
```

- Using Packages from nukkit and Java Vanila
```javascript
var playertest = Java.type("cn.nukkit.Player");
//The Player file you can see the Nukkit API in their official documentation on how to use the files! (I recommend using hard to replicate variables as another script may use the same variable)
var IOExeptionTest = Java.type("java.io.IOException");
//java vanilla
var ContentType = Packages.org.apache.http.entity.ContentType;
//Packages which are not in Java Vanila or Nukkit (Necessary to install the Packages )
```

View scripts by name:(I recommend using when finished loading all the scripts!)
```javascript
script.getScriptByName("here the name of the script!");
```

isolated or private function
```javascript
//These are isolated functions that means that the variables and functions inside it cannot be executed and neither can events nor tasks be registered!
(function(){
  //code...
})();
```

Import external libraries from java by Maven:
```javascript
//import libraries from java by Maven:
// Define Maven dependencies for the script
var MAVEN_DEPENDENCIES = ['com.h2database:h2:1.4.192', 'org.apache.commons:commons-dbcp2:2.1.1'];
// Create class loader instance.
var L = new NnClassLoader({ maven: MAVEN_DEPENDENCIES });
// Look at the actual list of jars resolved by the class loader.
for each(var url in L.getUrls()) print(url);
// Import class similarly to Java.type
var BasicDataSource = L.type('org.apache.commons.dbcp2.BasicDataSource');
// Work with imported classes as usual
var ds = new BasicDataSource();
// ...
```
Import external libraries by URL:
```javascript
//import libraries by URL
load("https://example.com/exam.js");
//Done!
```
To see all manager functions go to [https://github.com/Trollhunters501/JSEngineNK/blob/master/Manager info/ManagerFunc.md]

How to create JavaScript Classes:
```javascript
//You must create a const variable with the Class() function and with 2 parameters The name of the variable will be the name of your class!

//The first parameter is always Object except if you want to extend another JavaScript class In that case just change Object to the name of the class (The class should have already been established)
//The second parameter is the class functions!(If you extend any class, for no reason do you give your functions the same name as the extended classes (The JavaScript engine gets confused and crashes))
const Says = Class(Object, {
  say: function(){
      console.info('Hello');
   }
});
//Create a call to the class:
var Hey = new Says();
//Call the function:
Hey.say();
//Output: Hello


//Extend a Class:
//Extends the previous class
const Greeting = Class(Says, {
  //Respecting that the function is not repeated, in this case you cannot repeat say()
  hi: function(){
    //Call to the class that extends:
    this.say();
    //Plus extra code
    console.info('Console!');
  }
});
//We call the class the same as before
var HiCon = new Greeting();
HiCon.hi();
//Output: Hello
//Console!


//Done!
```

Default libraries in the plugin:
Fetch: https://raw.githubusercontent.com/Trollhunters501/Fetch-API-Nashorn/main/Creadores Program/Nashorn NK/Fetch API.js
UnderScoreJS: https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.13.6/underscore-min.js
Loadash: https://cdn.jsdelivr.net/npm/lodash@4/lodash.min.js
RequireAPI: https://raw.githubusercontent.com/walterhiggins/commonjs-modules-javax-script/master/require.js
Base64: https://raw.githubusercontent.com/Trollhunters501/JSEngineNK/master/libs/base64.js
Adder: https://raw.githubusercontent.com/maheshrajannan/java8Nashorn2/master/src/main/java/java8Group/java8Artifact/js/adder.js
NnClassLoader: https://cdn.rawgit.com/NashornTools/NnClassLoader/master/NnClassLoader.js
ES6 from Nashorn: https://raw.githubusercontent.com/aesteve/nashorn-es6/master/src/main/resources/es6-shim.js
Class from Nashorn: https://raw.githubusercontent.com/Trollhunters501/JSEngineNK/master/libs/Clases.js
Polyfills from Nashorn Extra: https://raw.githubusercontent.com/Trollhunters501/JSEngineNK/master/libs/NewPolifills.js

If you want to make plugins for your server, do not hesitate to Contact Us!
Discord: https://discord.gg/mrmHcwxXff
WhatsApp channel: https://whatsapp.com/channel/0029Va5bITcGZNCqyYkDYZ0F
