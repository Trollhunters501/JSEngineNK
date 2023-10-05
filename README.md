# JSEngineNK
![JavaScript](https://img.shields.io/badge/JAVASCRIPT-grey?logo=Javascript) ![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white) <br/>
Nukkit plugin, enable to load javascript! very simple create systems!!
Nukkit plugin - Allows you to load Javascript modules!
Runs ES6 version of partial JavaScript since it doesn't have Class and some stuff 
# How to use?
- Create javascript archive, example: mod.js
- Drop archive in plugins/JSEngineNK/mod.js
- Create your code!
- Start your server! Instantly run

- examples can be found (here) [https://github.com/Trollhunters501/JSEngineNK/tree/master/examples]

# Basic JavaScript API loaded!
- Global Variables:
```javascript
var server; return getServer();
var plugin; return ModLoader Plugin MainClass;
var global; return ModLoader Plugin MainClass;
var self; return ModLoader Plugin MainClass;
Object.entries; it's a small polyfill
Object.assign; it's a small polyfill
var manager; return FunctionManager Class, Using to create Commands e Loops
var script; return A class that registers scripts and events
var logger; return Console Logger Input
var console; return Console Logger Input
var window; return Console Logher Input
var fetch; return Fetch API by Creadores Program


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
    var name = args[0];
    sender.sendMessage("You writer: " + name); // send Message to sender
    // sender.sendMessage(manager.format("You writer: %s", name)); format your message
}
```

- Create Basic Tasks:
```javascript
manager.createTask("tasknormal", 20 * 20);

manager.createLoopTask("taskloop", 20 * 20);

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
    var player = event.getPlayer();
    player.sendMessage("welcome to Server!");
});
// ready, start your server and test!
```

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
//You can register your script so that it appears in the list of scripts with the command /scripts or also with the command /version or /ver
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

Import external libraries from java by URL:
```javascript
//import libraries from java by URL:
LoadLib("https://github.com/MCFT-Server/Mskyblock/raw/master/Mskyblock.jar", "mskyblock.Main");
//first URL parameter where is the bookshop, second: class to import

//import library:
var test = Packages.mskyblock.Main;
```
Import external libraries by URL:
```javascript
//import libraries by URL
load("https://example.com/exam.js");
//Done!
```
