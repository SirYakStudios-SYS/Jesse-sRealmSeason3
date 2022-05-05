import { Server } from './../../library/Minecraft.js';
import { callCommand } from '../commands/command_list.js';
import { Tool } from './base_tool.js';
import { Tools } from './tool_manager.js';
import { RawText } from './../modules/rawtext.js';
class CommandButton extends Tool {
    constructor() {
        super(...arguments);
        this.use = (player, session) => {
            session.usingItem = true;
            if (typeof this.command == 'string') {
                callCommand(player, this.command);
            }
            else {
                callCommand(player, this.command[0], this.command.slice(1));
            }
            session.usingItem = false;
        };
    }
}
class CutTool extends CommandButton {
    constructor() {
        super(...arguments);
        this.command = 'cut';
        this.permission = 'worldedit.clipboard.cut';
    }
}
Tools.register(CutTool, 'cut', 'wedit:cut_button');
class CopyTool extends CommandButton {
    constructor() {
        super(...arguments);
        this.command = 'copy';
        this.permission = 'worldedit.clipboard.copy';
    }
}
Tools.register(CopyTool, 'copy', 'wedit:copy_button');
class PasteTool extends CommandButton {
    constructor() {
        super(...arguments);
        this.command = ['paste', '-s'];
        this.permission = 'worldedit.clipboard.paste';
    }
}
Tools.register(PasteTool, 'paste', 'wedit:paste_button');
class UndoTool extends CommandButton {
    constructor() {
        super(...arguments);
        this.command = 'undo';
        this.permission = 'worldedit.history.undo';
    }
}
Tools.register(UndoTool, 'undo', 'wedit:undo_button');
class RedoTool extends CommandButton {
    constructor() {
        super(...arguments);
        this.command = 'redo';
        this.permission = 'worldedit.history.redo';
    }
}
Tools.register(RedoTool, 'redo', 'wedit:redo_button');
class RotateCWTool extends Tool {
    constructor() {
        super(...arguments);
        this.permission = 'worldedit.region.rotate';
        this.use = (player, session) => {
            session.usingItem = true;
            const args = ['90', '-s'];
            if (player.isSneaking) {
                args.push('-o');
            }
            callCommand(player, 'rotate', args);
            session.usingItem = false;
        };
    }
}
Tools.register(RotateCWTool, 'rotate_cw', 'wedit:rotate_cw_button');
class RotateCCWTool extends Tool {
    constructor() {
        super(...arguments);
        this.permission = 'worldedit.region.rotate';
        this.use = (player, session) => {
            session.usingItem = true;
            const args = ['-90', '-s'];
            if (player.isSneaking) {
                args.push('-o');
            }
            callCommand(player, 'rotate', args);
            session.usingItem = false;
        };
    }
}
Tools.register(RotateCCWTool, 'rotate_ccw', 'wedit:rotate_ccw_button');
class FlipTool extends Tool {
    constructor() {
        super(...arguments);
        this.permission = 'worldedit.region.flip';
        this.use = (player, session) => {
            session.usingItem = true;
            const args = ['-s'];
            if (player.isSneaking) {
                args.push('-o');
            }
            callCommand(player, 'flip', args);
            session.usingItem = false;
        };
    }
}
Tools.register(FlipTool, 'flip', 'wedit:flip_button');
class SpawnGlassTool extends Tool {
    constructor() {
        super(...arguments);
        this.use = (player, session) => {
            if (Server.runCommand(`execute "${player.nameTag}" ~~~ setblock ~~~ glass`).error) {
                throw RawText.translate('worldedit.spawnGlass.error');
            }
        };
    }
}
Tools.register(SpawnGlassTool, 'spawn_glass', 'wedit:spawn_glass');
class SelectionFillTool extends Tool {
    constructor() {
        super(...arguments);
        this.permission = 'worldedit.region.replace';
        this.use = (player, session) => {
            session.usingItem = true;
            if (session.globalMask.empty()) {
                callCommand(player, 'set', ['air']);
            }
            else {
                callCommand(player, 'replace', ['air', 'air']);
            }
            session.usingItem = false;
        };
    }
}
Tools.register(SelectionFillTool, 'selection_fill', 'wedit:selection_fill');
class SelectionWallTool extends CommandButton {
    constructor() {
        super(...arguments);
        this.permission = 'worldedit.region.walls';
        this.command = ['walls', 'air'];
    }
}
Tools.register(SelectionWallTool, 'selection_wall', 'wedit:selection_wall');
class SelectionOutlineTool extends CommandButton {
    constructor() {
        super(...arguments);
        this.permission = 'worldedit.region.faces';
        this.command = ['faces', 'air'];
    }
}
Tools.register(SelectionOutlineTool, 'selection_outline', 'wedit:selection_outline');
class DrawLineTool extends CommandButton {
    constructor() {
        super(...arguments);
        this.permission = 'worldedit.region.line';
        this.command = ['line', 'air'];
    }
}
Tools.register(DrawLineTool, 'draw_line', 'wedit:draw_line');
class ConfigTool extends Tool {
    constructor() {
        super(...arguments);
        this.use = (player, session) => {
            session.enterSettings();
        };
    }
}
Tools.register(ConfigTool, 'config', 'wedit:config_button');
