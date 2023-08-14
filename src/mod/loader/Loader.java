package mod.loader;

import cn.nukkit.Player;
import java.io.*;
import java.lang.reflect.*;
import cn.nukkit.command.Command;
import cn.nukkit.command.CommandSender;
import cn.nukkit.event.Event;
import cn.nukkit.event.EventHandler;
import cn.nukkit.event.Listener;
import cn.nukkit.plugin.PluginBase;
import cn.nukkit.scheduler.Task;
import cn.nukkit.utils.TextFormat;
import mod.loader.script.FunctionManager;

import javax.script.*;
import jdk.nashorn.api.scripting.*;
import java.util.Objects;
import java.util.function.Consumer;

public class Loader extends PluginBase implements Listener {

    private ScriptEngine engine;

    @Override
    public void onEnable() {
        final NashornScriptEngineFactory manager = new NashornScriptEngineFactory();
        engine = manager.getScriptEngine("--language=es6");
        if (engine == null) {
            getLogger().error("No JavaScript engine was found!");
            getServer().getPluginManager().disablePlugin(this);
            return;
        }
        if (!(engine instanceof Invocable)) {
            getLogger().error("JavaScript engine does not support the Invocable API!");
            engine = null;
            getServer().getPluginManager().disablePlugin(this);
            return;
        }

        getLogger().info(TextFormat.WHITE + "Javascript engine: " + engine.getFactory().getEngineName() + " " + engine.getFactory().getEngineVersion());

        engine.put("server", getServer());
        engine.put("plugin", this);
        engine.put("manager", new FunctionManager(this));
        engine.put("logger", getLogger());
        engine.put("console", getLogger());
        engine.put("window", getLogger());
        engine.put("global", this);
        engine.put("self", this);
        engine.put("process", "{env: {}}");
        engine.put("Object.assign", "function (t) { for (var s, i = 1, n = arguments.length; i < n; i++) { s = arguments[i]; for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]; } return t; }");
        getDataFolder().mkdir();
        saveResource("example.js");
        try{
            engine.eval("var script = {}; script.$__getScript__$ = []; script.getScriptByName = function(name){ for(var i in script.$__getScript__$){ if(script.$__getScript__$[i].name == name){ return true; } if(i == script.$__getScript__$.length){ return false; } } }; script.$__getScriptNum__$ = 0; script.registerScript = function(plugin_yml){ if(script.$__getScriptNum__$ == 0){ script.$__getScriptNum__$ = 1; } script.$__getScript__$[script.$__getScriptNum__$] = plugin_yml; script.$__getScriptNum__$++; }; script.$__PlayerJoinEvent__$ = []; script.$__PlayerJoinEventNum__$ = 0; script.$__ServerCommandEvent__$ = []; script.$__ServerCommandEventNum__$ = 0; script.$__PlayerPreLoginEvent__$ = []; script.$__PlayerPreLoginEventNum__$ = 0; script.$__BlockBreakEvent__$ = []; script.$__BlockBreakEventNum__$ = 0; script.$__PlayerMoveEvent__$ = []; script.$__PlayerMoveEventNum__$ = 0; script.$__PlayerQuitEvent__$ = []; script.$__PlayerQuitEventNum__$ = 0; script.$__BlockPlaceEvent__$ = []; script.$__BlockPlaceEventNum__$ = 0; script.$__PlayerCommandPreprocessEvent__$ = []; script.$__PlayerCommandPreprocessEventNum__$ = 0; script.$__InventoryTransactionEvent__$ = []; script.$__InventoryTransactionEventNum__$ = 0; script.$__PlayerInteractEvent__$ = []; script.$__PlayerInteractEventNum__$ = 0; script.$__EntitySpawnEvent__$ = []; script.$__EntitySpawnEventNum__$ = 0; script.addEventListener = function(event, callback){ switch(event){ case 'PlayerJoinEvent': script.$__PlayerJoinEvent__$[script.$__PlayerJoinEventNum__$] = function(event){ callback(event); }; script.$__PlayerJoinEventNum__$++; break; case 'PlayerPreLoginEvent': script.$__PlayerPreLoginEvent__$[script.$__PlayerPreLoginEventNum__$] = function(event){ callback(event); }; script.$__PlayerPreLoginEventNum__$++; break; case 'PlayerQuitEvent': script.$__PlayerQuitEvent__$[script.$__PlayerQuitEventNum__$] = function(event){ callback(event); }; script.$__PlayerQuitEventNum__$++; break; case 'BlockBreakEvent': script.$__BlockBreakEvent__$[script.$__BlockBreakEventNum__$] = function(event){ callback(event); }; $__BlockBreakEventNum__$++; break; case 'BlockPlaceEvent': script.$__BlockPlaceEvent__$[script.$__BlockPlaceEventNum__$] = function(event){ callback(event); }; $__BlockPlaceEventNum__$++; break; case 'PlayerCommandPreprocessEvent': script.$__PlayerCommandPreprocessEvent__$[script.$__PlayerCommandPreprocessEventNum__$] = function(event){ callback(event); }; $__PlayerCommandPreprocessEvent__$++; break; case 'InventoryTransactionEvent': script.$__InventoryTransactionEvent__$[$__InventoryTransactionEventNum__$] = function(event){ callback(event); }; script.$__InventoryTransactionEvent__$++; break; case 'PlayerInteractEvent': script.$__PlayerInteractEvent__$[$__PlayerInteractEventNum__$] = function(event){ callback(event); }; script.$__PlayerInteractEventNum++; break; case 'ServerCommandEvent': script.$__ServerCommandEvent__$[script.$__ServerCommandEventNum__$] = function(event){ callback(event); }; script.$__ServerCommandEventNum__$++; break; case 'PlayerMoveEvent': script.$__PlayerMoveEvent__$[script.$__PlayerMoveEventNum__$] = function (event){ callback(event); }; script.$__PlayerMoveEventNum__$++; break; case 'EntitySpawnEvent': script.$__EntitySpawnEvent__$[script.$__EntitySpawnEventNum__$] = function (event){ callback(event); }; script.$__EntitySpawnEventNum++; break; } };");
        }catch(final Exception e){
            getLogger().error("Error!: ", e);
        }

        for (File file : Objects.requireNonNull(getDataFolder().listFiles())) {
            if(file.isDirectory()) continue;
            if(file.getName().contains(".js")){
                try (final Reader reader = new InputStreamReader(new FileInputStream(file))) {
                    engine.eval(reader);
                    getLogger().info("Loaded Script: " + file.getName());
                } catch (final Exception e) {
                    getLogger().error("Could not load " + file.getName(), e);
                }
            }
        }




        this.getServer().getScheduler().scheduleDelayedRepeatingTask(new Task() {
            @Override
            public void onRun(int i) {
                engine.put("players", getServer().getOnlinePlayers().values());
            }
        }, 20, 20, true);

        this.getServer().getPluginManager().registerEvents(this, this);

        new EventLoader(this);
    }

    public synchronized void callEventHandler(final Event e, final String functionName) {
        if (engine.get(functionName) == null) {
            return;
        }
        try {
            ((Invocable) engine).invokeFunction(functionName, e);
        } catch (final Exception se) {
            getLogger().error("Error while calling " + functionName, se);
            se.printStackTrace();
        }
    }

    public synchronized void callCommand(CommandSender sender, String[] args, String functionName){
        if(engine.get(functionName) == null){
            return;
        }
        try {
            ((Invocable) engine).invokeFunction(functionName, sender, args);
        } catch (final Exception se) {
            getLogger().error("Error while calling " + functionName, se);
            se.printStackTrace();
        }
    }

    public synchronized void call(String functionName, Object... args){
        if(engine.get("$$_"+functionName+"_$$") == null){
            return;
        }
        try {
            ((Invocable) engine).invokeFunction("$$_"+functionName+"_$$", args);
        } catch (final Exception se) {
            getLogger().error("Error while calling " + functionName, se);
            se.printStackTrace();
        }
    }

    private synchronized Object eval(final CommandSender sender, final String expression) throws ScriptException {
        if (sender != null && sender.isPlayer()) {
            final Player player = (Player) sender;
            engine.put("me", player);
            engine.put("level", player.getPosition().level);
            engine.put("pos", player.getPosition());
        } else {
            engine.put("me", null);
            engine.put("level", getServer().getDefaultLevel());
            engine.put("pos", null);
        }
        return engine.eval(expression);
    }
}