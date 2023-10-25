//Register Script:
script.registerScript({
    name: "TestScript",
    version: "1.0",
    description: "The Test!",
    website: "https://github.com/Trollhunters501/JSEngineNK/",
    authors: ["Creadores Program & RedstoneAlmeida"]
});
//You can register your script so that it appears in the list of scripts with the command /scripts or also with the command /version or /ver
//The mandatory parameters are: author or authors, name, version and description optional: website

//Use Java Packages:
var playertest = Java.type("cn.nukkit.Player");
//The Player file you can see the Nukkit API in their official documentation on how to use the files! (I recommend using hard to replicate variables as another script may use the same variable)
var IOExeptionTest = Java.type("java.io.IOException");
//java vanilla
var ContentTypeTest = Packages.org.apache.http.entity.ContentType;
//Java packages that are not in Nukkit or Java Vanila (Necessary to install)

//Commands:
manager.createCommand("name", "descricao do comando", "functiondele");
// o name = Nome do Comando, descrição do comando, functiondela é a função que será executada
// ao digitar o comando!

function functiondele(sender, args){
    if(args.length < 1){ // praticamente o isset do PHP
        sender.sendMessage('Você digitou incorretamente');
        return;
    }
    var name = args[0];
    sender.sendMessage("Você digitou: " + name); // formata para adicionar mensagens
    // sender.sendMessage(manager.format("Você digitou: %s", name)); outra forma de adicionar mensagens com {NAME}
}

//Configs:
var config = manager.createConfig(manager.getFile("test", "config.yml"), 2);

config.set("test", true);
config.save();

//Events:
script.addEventListener("Enable", function(){
    console.info("Hello World!");
});
script.addEventListener("ItemFrameDropItemEvent", function(event){
    console.info("Oki");
});
//When registering an event you will use this function! The first parameter is the event when it is executed and the second is the function that will be executed!
//Visit https://github.com/Trollhunters501/JSEngineNK/blob/master/Events%20Soported/Events.md to see Supported events

//Tasks:
manager.createTask("tasknormal", 20);
// atime is by minecraft ticks
manager.createLoopTask("taskloop", 20); // atime is by minecraft ticks 

function tasknormal(currentTick){
    print('sou tasknormal!');
}

function taskloop(currentTick){
    print('sou taskloop');
}
//know if there is any script with the name
script.getScriptByName("here the name of the script!");

//These are isolated functions that means that the variables and functions inside it cannot be executed and neither can events nor tasks be registered!
(function(){
  //code...
})();

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

//import libraries by URL
load("https://example.com/exam.js");
//Done!

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
