import { Server } from './../../library/Minecraft.js';
import { print, printerr } from '../util.js';
/**
 * The base tool class for handling tools that WorldEdit builder may use.
 */
export class Tool {
    constructor() {
        this.useOnTick = 0;
    }
    log(message) {
        print(message, this.currentPlayer, true);
    }
    process(session, tick, loc) {
        const player = session.getPlayer();
        if (!loc && !this.use || loc && !this.useOn) {
            return false;
        }
        this.currentPlayer = player;
        try {
            if (!Server.player.hasPermission(player, this.permission)) {
                throw 'worldedit.tool.noPerm';
            }
            if (!loc) {
                if (this.useOnTick != tick)
                    this.use(player, session);
            }
            else {
                this.useOnTick = tick;
                this.useOn(player, session, loc);
            }
        }
        catch (e) {
            const history = session.getHistory();
            if (history.isRecording()) {
                history.cancel();
            }
            printerr(e.message ? `${e.name}: ${e.message}` : e, player, true);
            if (e.stack) {
                printerr(e.stack, player, false);
            }
        }
        this.currentPlayer = null;
        return true;
    }
}
