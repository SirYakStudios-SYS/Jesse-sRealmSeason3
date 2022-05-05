import './util.js';
import './commands/register_commands.js';
import { world } from 'mojang-minecraft';
import { Server } from './../library/Minecraft.js';
import { print, printDebug, printLog } from './util.js';
import { PlayerUtil } from './modules/player_util.js';
import { getSession, removeSession } from './sessions.js';
Server.setMaxListeners(256);
let activeBuilders = [];
let ready = false;
Server.on('ready', ev => {
    Server.runCommand(`gamerule showtags false`);
    // Server.runCommand(`gamerule sendcommandfeedback ${DEBUG}`);
    printDebug(`World has been loaded in ${ev.loadTime} ticks!`);
    ready = true;
});
Server.on('playerJoin', ev => {
    printDebug(`player ${ev.player.name} joined.`);
    makeBuilder(ev.player);
});
Server.on('playerLeave', ev => {
    printDebug(`player ${ev.playerName} left.`);
    removeBuilder(ev.playerName);
});
Server.on('tick', ev => {
    if (!ready)
        return;
    for (const entity of world.getPlayers()) {
        const player = entity;
        if (!activeBuilders.includes(player)) {
            if (PlayerUtil.isHotbarStashed(player)) {
                PlayerUtil.restoreHotbar(player);
            }
            if (!makeBuilder(player)) { // Attempt to make them a builder.
                print('worldedit.permission.granted', player);
                continue;
            }
        }
    }
    for (let i = activeBuilders.length - 1; i >= 0; i--) {
        try {
            let name = activeBuilders[i].name;
        }
        catch {
            printDebug('A builder no longer exists!');
            activeBuilders.splice(i, 1);
        }
        const builder = activeBuilders[i];
        let session;
        if (hasWorldEdit(builder)) {
            session = getSession(builder);
        }
        else {
            removeBuilder(builder.name);
            printLog(`${builder.name} has been revoked of their worldedit permissions.`);
            print('worldedit.permission.revoked', builder);
            continue;
        }
    }
});
function makeBuilder(player) {
    if (hasWorldEdit(player)) {
        getSession(player);
        activeBuilders.push(player);
        // remove any stray tags to prevent accidental item activation.
        for (const tag of player.getTags()) {
            if (tag.startsWith('wedit:')) {
                player.removeTag(tag);
            }
        }
        printLog(`${player.name} has been given worldedit permissions.`);
        return false;
    }
    return true;
}
function removeBuilder(player) {
    let i = -1;
    do {
        i = activeBuilders.findIndex(p => {
            try {
                return p.name == player;
            }
            catch (e) {
                return true;
            }
        });
        if (i != -1)
            activeBuilders.splice(i, 1);
    } while (i != -1);
    removeSession(player);
    printDebug('Removed player from world edit!');
}
function hasWorldEdit(player) {
    for (const tag of player.getTags()) {
        if (tag.startsWith('worldedit')) {
            return true;
        }
    }
    return false;
}
