import { callCommand } from '../commands/command_list.js';
import { Tool } from './base_tool.js';
import { Tools } from './tool_manager.js';
class SelectionTool extends Tool {
    constructor() {
        super(...arguments);
        this.permission = 'worldedit.selection.pos';
        this.useOn = (player, session, loc) => {
            callCommand(player, player.isSneaking ? 'pos1' : 'pos2', [`${loc.x}`, `${loc.y}`, `${loc.z}`]);
        };
    }
}
Tools.register(SelectionTool, 'selection_wand');
class FarSelectionTool extends Tool {
    constructor() {
        super(...arguments);
        this.permission = 'worldedit.selection.hpos';
        this.use = (player, session) => {
            callCommand(player, player.isSneaking ? 'hpos1' : 'hpos2');
        };
    }
}
Tools.register(FarSelectionTool, 'far_selection_wand');
