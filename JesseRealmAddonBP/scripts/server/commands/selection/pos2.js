import { printLocation } from '../../util.js';
import { CommandPosition } from './../../../library/build/classes/commandBuilder.js';
import { commandList } from '../command_list.js';
import { RawText } from './../../modules/rawtext.js';
const registerInformation = {
    name: 'pos2',
    permission: 'worldedit.selection.pos',
    description: 'commands.wedit:pos2.description',
    usage: [
        {
            name: 'coordinates',
            type: 'xyz',
            default: new CommandPosition()
        }
    ],
    aliases: ['2']
};
export function setPos2(session, loc) {
    const prevPoints = session.getSelectionPoints();
    session.setSelectionPoint(1, loc);
    if (session.getSelectionPoints().some((loc, idx) => !loc || !prevPoints[idx] || !loc.equals(prevPoints[idx]))) {
        let translate;
        if (session.getSelectedBlockCount() == 0) {
            translate = `worldedit.selection.${session.selectionMode}.secondary`;
        }
        else {
            translate = `worldedit.selection.${session.selectionMode}.secondaryArea`;
        }
        return RawText.translate(translate)
            .with(printLocation(session.getSelectionPoints()[1]))
            .with(`${session.getSelectedBlockCount()}`);
    }
    return '';
}
commandList['pos2'] = [registerInformation, (session, builder, args) => {
        return setPos2(session, args.get('coordinates').relativeTo(builder, true));
    }];
