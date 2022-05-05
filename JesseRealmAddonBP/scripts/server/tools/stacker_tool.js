import { Regions } from './../modules/regions.js';
import { Cardinal } from './../modules/directions.js';
import { Tool } from './base_tool.js';
import { Tools } from './tool_manager.js';
class StackerTool extends Tool {
    constructor(range, mask) {
        super();
        this.permission = 'worldedit.region.stack';
        this.useOn = (player, session, loc) => {
            const dim = player.dimension;
            const dir = new Cardinal(Cardinal.Dir.BACK).getDirection(player);
            const start = loc.offset(dir.x, dir.y, dir.z);
            if (!this.mask.matchesBlock(start, dim)) {
                return;
            }
            let end = loc;
            for (var i = 0; i < this.range; i++) {
                end = end.offset(dir.x, dir.y, dir.z);
                if (!this.mask.matchesBlock(end.offset(dir.x, dir.y, dir.z), dim))
                    break;
            }
            const history = session.getHistory();
            history.record();
            history.addUndoStructure(start, end, 'any');
            Regions.save('tempStack', loc, loc, player);
            for (const pos of start.blocksBetween(end)) {
                Regions.load('tempStack', pos, player);
            }
            Regions.delete('tempStack', player);
            history.addRedoStructure(start, end, 'any');
            history.commit();
        };
        this.range = range;
        this.mask = mask;
    }
}
Tools.register(StackerTool, 'stacker_wand');
