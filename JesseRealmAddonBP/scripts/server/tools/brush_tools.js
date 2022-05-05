import { PlayerUtil } from './../modules/player_util.js';
import { Tool } from './base_tool.js';
import { Tools } from './tool_manager.js';
class BrushTool extends Tool {
    constructor(brush, mask) {
        super();
        this.range = null;
        this.mask = null;
        this.traceMask = null;
        this.permission = 'worldedit.brush';
        this.use = (player, session) => {
            const hit = PlayerUtil.traceForBlock(player, this.range, this.traceMask);
            if (!hit) {
                throw 'commands.wedit:jumpto.none';
            }
            this.brush.apply(hit, session, this.mask);
        };
        this.brush = brush;
        this.mask = mask;
    }
    set size(value) {
        this.brush.resize(value);
    }
    set material(value) {
        this.brush.paintWith(value);
    }
}
Tools.register(BrushTool, 'brush');
