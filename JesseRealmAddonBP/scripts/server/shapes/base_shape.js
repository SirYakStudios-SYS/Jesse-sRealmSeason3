import { Mask } from './../modules/mask.js';
import { Vector } from './../modules/vector.js';
import { assertCanBuildWithin } from './../modules/assert.js';
import { getWorldMinY, getWorldMaxY } from '../util.js';
/**
 * A base shape class for generating blocks in a variety of formations.
 */
export class Shape {
    constructor() {
        /**
        * Whether the shape is being used in a brush.
        * Shapes used in a brush may handle history recording differently from other cases.
        */
        this.usedInBrush = false;
    }
    /**
    * Generates a block formation at a certain location.
    * @param loc The location the shape will be generated at
    * @param pattern The pattern that the shape will be made with
    * @param mask The mask to decide where the shape will generate blocks
    * @param session The session that's using this shape
    * @param options A group of options that can change how the shape is generated
    */
    generate(loc, pattern, mask, session, options) {
        const [min, max] = this.getRegion(loc);
        const dimension = session.getPlayer().dimension;
        const minY = getWorldMinY(session.getPlayer());
        min.y = Math.max(minY, min.y);
        const maxY = getWorldMaxY(session.getPlayer());
        max.y = Math.min(maxY, max.y);
        let canGenerate = max.y >= min.y;
        assertCanBuildWithin(dimension, min, max);
        const blocksAffected = [];
        mask = mask ?? new Mask();
        if (canGenerate) {
            this.genVars = {};
            this.prepGeneration(this.genVars, options);
            for (const block of min.blocksBetween(max)) {
                if (!session.globalMask.matchesBlock(block, dimension) || !mask.matchesBlock(block, dimension)) {
                    continue;
                }
                if (this.inShape(Vector.sub(block, loc).toBlock(), this.genVars)) {
                    blocksAffected.push(block);
                }
            }
        }
        const history = session.getHistory();
        history.record(this.usedInBrush);
        let count = 0;
        if (canGenerate) {
            history.addUndoStructure(min, max, blocksAffected);
            for (const block of blocksAffected) {
                if (!pattern.setBlock(block, dimension)) {
                    count++;
                }
            }
            history.addRedoStructure(min, max, blocksAffected);
        }
        history.commit();
        return count;
    }
}
