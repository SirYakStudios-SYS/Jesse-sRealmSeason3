import { BlockLocation } from 'mojang-minecraft';
import { Server } from './../../library/Minecraft.js';
import { RawText } from './rawtext.js';
import { Regions } from './regions.js';
import { Vector } from './vector.js';
import { canPlaceBlock } from '../util.js';
export function assertPermission(player, perm) {
    if (!Server.player.hasPermission(player, perm)) {
        throw 'commands.generic.wedit:noPermission';
    }
}
export function assertCanBuildWithin(dim, min, max) {
    const minChunk = Vector.from(min).mul(1 / 16).floor().mul(16);
    const maxChunk = Vector.from(max).mul(1 / 16).ceil().mul(16);
    for (let z = minChunk.z; z < maxChunk.z; z += 16)
        for (let x = minChunk.x; x < maxChunk.x; x += 16) {
            if (!canPlaceBlock(new BlockLocation(x, 0, z), dim)) {
                throw RawText.translate('commands.generic.wedit:outsideWorld');
            }
        }
}
export function assertClipboard(player) {
    if (!Regions.has('clipboard', player)) {
        throw RawText.translate('commands.generic.wedit:noClipboard');
    }
}
export function assertSelection(session) {
    if (session.getSelectedBlockCount() == 0) {
        throw RawText.translate('commands.generic.wedit:noSelection');
    }
}
export function assertCuboidSelection(session) {
    if (session.getSelectedBlockCount() == 0 || (session.selectionMode != 'cuboid' && session.selectionMode != 'extend')) {
        throw RawText.translate('commands.generic.wedit:noCuboidSelection');
    }
}
