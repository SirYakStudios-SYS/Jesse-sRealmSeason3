import { PlayerUtil } from './../modules/player_util.js';
import { callCommand } from '../commands/command_list.js';
import { Tool } from './base_tool.js';
import { Tools } from './tool_manager.js';
class NavigationTool extends Tool {
    constructor() {
        super(...arguments);
        this.permission = 'worldedit.navigation';
        this.use = (player, session) => {
            if (!player.dimension.isEmpty(PlayerUtil.getBlockLocation(player).offset(0, 1, 0))) {
                callCommand(player, 'unstuck', []);
            }
            else if (player.isSneaking) {
                callCommand(player, 'thru', []);
            }
            else {
                callCommand(player, 'jumpto', []);
            }
        };
    }
}
Tools.register(NavigationTool, 'navigation_wand');
