manager.createTask("tasknormal", 20);
// tasknormal é a function, e 20 é o tempo = 20 tiks
manager.createLoopTask("taskloop", 20); // tempo de 20 ticks será executado
// taskloop é a function

function tasknormal(currentTick){
    print('sou tasknormal!');
}

function taskloop(currentTick){
    print('sou taskloop');
}
