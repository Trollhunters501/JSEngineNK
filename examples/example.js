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

//Use Java files
var playertest = Java.type("cn.nukkit.Player");
//The Player file you can see the Nukkit API in their official documentation on how to use the files! (I recommend using hard to replicate variables as another script may use the same variable)
var IOExeptionTest = Java.type("java.io.IOException");
//java vanilla
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
