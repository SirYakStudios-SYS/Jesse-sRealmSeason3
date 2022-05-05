import { Server } from './../../library/Minecraft.js';
import { assertPermission } from './../modules/assert.js';
import { printToActionBar } from './register_commands.js';
export let commandList = {};
/**
 * Calls a WorldEdit command as a player.
 * @remark This function also causes commands to print to the action bar.
 * @param player The player the command will be called from
 * @param command The name of the command to call
 * @param args Arguments that the command may take
 */
export function callCommand(player, command, args = []) {
    const registration = Server.command.getRegistration(command);
    assertPermission(player, registration.permission);
    printToActionBar();
    registration.callback({
        cancel: true,
        sender: player,
        message: `;${command} ${args.join(' ')}`
    }, Server.command.parseArgs(command, args));
}
