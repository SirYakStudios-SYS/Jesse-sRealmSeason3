import { History } from './modules/history.js';
import { getWorldMaxY, getWorldMinY, printDebug, printLog, regionVolume } from './util.js';
import { Server, setTickTimeout } from './../library/Minecraft.js';
import { Pattern } from './modules/pattern.js';
import { Regions } from './modules/regions.js';
import { Vector } from './modules/vector.js';
import { SettingsHotbar } from './modules/settings_hotbar.js';
import { PlayerUtil } from './modules/player_util.js';
import { Mask } from './modules/mask.js';
import { RawText } from './modules/rawtext.js';
import { TICKS_TO_DELETE_SESSION, DRAW_SELECTION, WAND_ITEM, NAV_WAND_ITEM, DEFAULT_CHANGE_LIMIT } from '../config.js';
import { Tools } from './tools/tool_manager.js';
import './tools/register_tools.js';
const playerSessions = new Map();
const pendingDeletion = new Map();
PlayerUtil.on('playerChangeDimension', (player) => {
    playerSessions.get(player.name)?.clearSelectionPoints();
});
/**
 * Represents a WorldEdit user's current session with the addon.
 * It manages their selections, operation history, and other things related to WorldEdit per player.
 */
export class PlayerSession {
    constructor(player) {
        /**
        * Is true while a WorldEdit command is being called from an item; false otherwise.
        * @readonly
        */
        this.usingItem = false;
        /**
        * A pattern created by the pattern picker
        * It's used by custom commands that are called from items.
        */
        this.globalPattern = new Pattern();
        /**
        * A global mask created by the mask picker and ;gmask.
        * It's used by various commands and operation that are affected by masks such as the ;cyl command and brushes in combination of their own masks.
        */
        this.globalMask = new Mask();
        /**
        * Whether the copy and cut items should include entities in the clipboard.
        */
        this.includeEntities = false;
        /**
        * Whether the copy and cut items should include air in the clipboard.
        */
        this.includeAir = true;
        /**
         * The amount of blocks that can be changed in one operation.
         */
        this.changeLimit = DEFAULT_CHANGE_LIMIT == -1 ? Infinity : DEFAULT_CHANGE_LIMIT;
        this.currentTick = 0;
        this._selectionMode = 'cuboid';
        this._drawSelection = DRAW_SELECTION;
        this.drawPoints = [];
        this.drawTimer = 0;
        this.player = player;
        this.history = new History(this.player);
        this.selectionPoints = [];
        this.bindTool('selection_wand', WAND_ITEM);
        this.bindTool('navigation_wand', NAV_WAND_ITEM);
        if (PlayerUtil.isHotbarStashed(player)) {
            this.enterSettings();
        }
    }
    /**
    * @return The player that this session handles
    */
    getPlayer() {
        return this.player;
    }
    /**
    * @return The history handler that this session uses
    */
    getHistory() {
        return this.history;
    }
    /**
    * @internal
    */
    reassignPlayer(player) {
        this.player = player;
        this.history.reassignPlayer(player);
    }
    /**
    * Sets either the first or second selection point of a selection.
    * @remarks This will eventially be revamped once multiple selection modes are implemented.
    * @param index The first or second selection point
    * @param loc The location the selection point is being made
    */
    setSelectionPoint(index, loc) {
        if (index > 0 && this.selectionPoints.length == 0 && this.selectionMode != 'cuboid') {
            throw RawText.translate('worldedit.selection.noPrimary');
        }
        if (this.selectionPoints.length <= index) {
            this.selectionPoints.length = index + 1;
        }
        if (this.selectionMode == 'cuboid') {
            this.selectionPoints[index] = loc;
            if (this.selectionMode != 'cuboid') {
                this.selectionPoints.length = 1;
            }
        }
        else if (this.selectionMode == 'extend') {
            if (index == 0) {
                this.selectionPoints = [loc, loc.offset(0, 0, 0)];
            }
            else {
                this.selectionPoints[0] = Vector.min(this.selectionPoints[0], this.selectionPoints[1]).min(loc).toBlock();
                this.selectionPoints[1] = Vector.max(this.selectionPoints[0], this.selectionPoints[1]).max(loc).toBlock();
            }
        }
        const [min, max] = [getWorldMinY(this.player), getWorldMaxY(this.player)];
        this.selectionPoints.forEach(p => p.y = Math.min(Math.max(p.y, min), max));
        this.updateDrawSelection();
    }
    /**
    * @return An array of selection points
    */
    getSelectionPoints() {
        return this.selectionPoints.slice();
    }
    /**
    * Clears the selection points that have been made.
    */
    clearSelectionPoints() {
        this.selectionPoints = [];
        this.updateDrawSelection();
    }
    /**
    * @return The blocks within the current selection
    */
    getBlocksSelected() {
        let points = 0;
        for (const point of this.selectionPoints) {
            if (point)
                points++;
        }
        if (points == 0 || points == 1)
            return [];
        if (this.selectionMode == 'cuboid' || this.selectionMode == 'extend') {
            const min = Vector.min(this.selectionPoints[0], this.selectionPoints[1]);
            const max = Vector.max(this.selectionPoints[0], this.selectionPoints[1]);
            return min.toBlock().blocksBetween(max.toBlock());
        }
    }
    getSelectedBlockCount() {
        let points = 0;
        for (const point of this.selectionPoints) {
            if (point)
                points++;
        }
        if (points == 0 || points == 1)
            return 0;
        if (this.selectionMode == 'cuboid' || this.selectionMode == 'extend') {
            return regionVolume(this.selectionPoints[0], this.selectionPoints[1]);
        }
    }
    /**
    * @return The minimum and maximum points of the selection
    */
    getSelectionRange() {
        if (this.selectionMode == 'cuboid' || this.selectionMode == 'extend') {
            const [pos1, pos2] = this.selectionPoints.slice(0, 2);
            return [Vector.min(pos1, pos2).toBlock(), Vector.max(pos1, pos2).toBlock()];
        }
        return null;
    }
    /**
    * Binds a new tool to this session.
    * @param tool The id of the tool being made
    * @param item The id of the item to bind to (null defaults to held item)
    * @param args Optional parameters the tool uses during its construction.
    */
    bindTool(tool, item, ...args) {
        if (!item) {
            let stack = Server.player.getHeldItem(this.player);
            item = [stack.id, stack.data];
        }
        else if (typeof item == 'string') {
            item = [item, 0];
        }
        return Tools.bind(tool, item[0], item[1], this.player, ...args);
    }
    /**
    * Tests for a property of a tool in the session's player's main hand.
    * @param item The id of the item with the tool to test (null defaults to held item)
    * @param property The name of the tool's property
    */
    hasToolProperty(item, property) {
        if (!item) {
            let stack = Server.player.getHeldItem(this.player);
            item = [stack.id, stack.data];
        }
        else if (typeof item == 'string') {
            item = [item, 0];
        }
        return Tools.hasProperty(item[0], item[1], this.player, property);
    }
    /**
    * Sets a property of a tool in the session's player's main hand.
    * @param item The id of the item with the tool to set the property of (null defaults to held item)
    * @param property The name of the tool's property
    * @param value The new value of the tool's property
    */
    setToolProperty(item, property, value) {
        if (!item) {
            let stack = Server.player.getHeldItem(this.player);
            item = [stack.id, stack.data];
        }
        else if (typeof item == 'string') {
            item = [item, 0];
        }
        return Tools.setProperty(item[0], item[1], this.player, property, value);
    }
    /**
    * @param item The id of the item to test (null defaults to held item)
    * @return Whether the session has a tool binded to the player's hand.
    */
    hasTool(item) {
        if (!item) {
            let stack = Server.player.getHeldItem(this.player);
            item = [stack.id, stack.data];
        }
        else if (typeof item == 'string') {
            item = [item, 0];
        }
        return Tools.hasBinding(item[0], item[1], this.player);
    }
    /**
    * @param item The id of the item to unbinf from (null defaults to held item)
    * Unbinds a tool from this session's player's hand.
    */
    unbindTool(item) {
        if (!item) {
            let stack = Server.player.getHeldItem(this.player);
            item = [stack.id, stack.data];
        }
        else if (typeof item == 'string') {
            item = [item, 0];
        }
        return Tools.unbind(item[0], item[1], this.player);
    }
    /**
    * Triggers the hotbar setting menu to appear.
    */
    enterSettings() {
        this.settingsHotbar = new SettingsHotbar(this);
    }
    /**
    * Triggers the hotbar settings menu to disappear.
    */
    exitSettings() {
        this.settingsHotbar.exit();
        this.settingsHotbar = null;
    }
    delete() {
        Regions.deletePlayer(this.player);
        Tools.deleteBindings(this.player);
        this.history = null;
    }
    updateDrawSelection() {
        this.drawPoints.length = 0;
        if (this.selectionMode == 'cuboid' || this.selectionMode == 'extend') {
            if (this.selectionPoints.length != 2 || this.selectionPoints[0] === undefined) {
                return;
            }
            const min = Vector.min(this.selectionPoints[0], this.selectionPoints[1]).add(Vector.ZERO);
            const max = Vector.max(this.selectionPoints[0], this.selectionPoints[1]).add(Vector.ONE);
            const corners = [
                new Vector(min.x, min.y, min.z),
                new Vector(max.x, min.y, min.z),
                new Vector(min.x, max.y, min.z),
                new Vector(max.x, max.y, min.z),
                new Vector(min.x, min.y, max.z),
                new Vector(max.x, min.y, max.z),
                new Vector(min.x, max.y, max.z),
                new Vector(max.x, max.y, max.z)
            ];
            const edgeData = [
                [0, 1], [2, 3], [4, 5], [6, 7],
                [0, 2], [1, 3], [4, 6], [5, 7],
                [0, 4], [1, 5], [2, 6], [3, 7]
            ];
            const edgePoints = [];
            for (const edge of edgeData) {
                const [a, b] = [corners[edge[0]], corners[edge[1]]];
                const pointCount = Math.min(Math.floor(b.sub(a).length), 16);
                for (let i = 1; i < pointCount; i++) {
                    let t = i / pointCount;
                    edgePoints.push(a.lerp(b, t));
                }
            }
            this.drawPoints = corners.concat(edgePoints);
        }
        // A slight offset is made since exact integers snap the particles to the center of blocks.
        for (const point of this.drawPoints) {
            point.x += 0.001;
            point.z += 0.001;
        }
        this.drawTimer = 0;
    }
    onTick(tick) {
        this.currentTick = tick.currentTick;
        // Process settingsHotbar
        if (this.settingsHotbar) {
            this.settingsHotbar.onTick(tick);
        }
        else if (PlayerUtil.isHotbarStashed(this.player)) {
            this.enterSettings();
        }
        // Draw Selection
        if (!this.drawSelection)
            return;
        if (this.drawTimer <= 0) {
            this.drawTimer = 10;
            const dimension = this.player.dimension;
            for (const point of this.drawPoints) {
                Server.runCommand(`particle wedit:selection_draw ${point.print()}`, dimension);
            }
        }
        this.drawTimer--;
    }
    onItemUse(ev) {
        if (this.settingsHotbar) {
            this.settingsHotbar.onItemUse(ev);
        }
    }
    /**
    * Getter selectionMode
    * @return {selectMode}
    */
    get selectionMode() {
        return this._selectionMode;
    }
    /**
    * Setter selectionMode
    * @param {selectMode} value
    */
    set selectionMode(value) {
        if (!(['cuboid', 'extend'].includes(this.selectionMode) && ['cuboid', 'extend'].includes(value))) {
            this.clearSelectionPoints();
        }
        this._selectionMode = value;
    }
    /**
    * Getter drawSelection
    * @return {boolean}
    */
    get drawSelection() {
        return this._drawSelection;
    }
    /**
    * Setter drawSelection
    * @param {boolean} value
    */
    set drawSelection(value) {
        this._drawSelection = value;
        this.drawTimer = 0;
    }
}
export function getSession(player) {
    const name = player.name;
    if (!playerSessions.has(name)) {
        let session;
        if (pendingDeletion.has(name)) {
            session = pendingDeletion.get(name)[1];
            session.reassignPlayer(player);
            pendingDeletion.delete(name);
        }
        playerSessions.set(name, session ?? new PlayerSession(player));
        printDebug(playerSessions.get(name)?.getPlayer()?.name);
        printDebug(`new Session?: ${!session}`);
    }
    return playerSessions.get(name);
}
export function removeSession(player) {
    if (!playerSessions.has(player))
        return;
    playerSessions.get(player).clearSelectionPoints();
    playerSessions.get(player).globalPattern.clear();
    pendingDeletion.set(player, [TICKS_TO_DELETE_SESSION, playerSessions.get(player)]);
    playerSessions.delete(player);
}
export function hasSession(player) {
    return playerSessions.has(player);
}
// Delayed a tick so that it's processed before other listeners
setTickTimeout(() => {
    Server.prependListener('tick', ev => {
        for (const player of pendingDeletion.keys()) {
            const session = pendingDeletion.get(player);
            session[0]--;
            if (session[0] < 0) {
                session[1].delete();
                pendingDeletion.delete(player);
                printLog(`${player}'s session has been deleted.`);
            }
        }
        for (const session of playerSessions.values()) {
            session.onTick(ev);
        }
    });
    Server.prependListener('beforeItemUse', ev => {
        if (ev.source.id == 'minecraft:player') {
            const name = ev.source.name;
            playerSessions.get(name)?.onItemUse(ev);
        }
    });
}, 1);
