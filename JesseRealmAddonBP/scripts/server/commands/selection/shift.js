import { commandList } from '../command_list.js';
import { Cardinal } from './../../modules/directions.js';
import { assertSelection } from './../../modules/assert.js';
import { Vector } from './../../modules/vector.js';
const registerInformation = {
    name: 'shift',
    description: 'commands.wedit:shift.description',
    permission: 'worldedit.selection.shift',
    usage: [
        {
            name: 'amount',
            type: 'int'
        },
        {
            name: 'direction',
            type: 'Direction',
            default: new Cardinal(Cardinal.Dir.FORWARD)
        }
    ]
};
commandList['shift'] = [registerInformation, (session, builder, args) => {
        assertSelection(session);
        let points = session.getSelectionPoints().map(block => Vector.from(block));
        const dir = args.get('direction').getDirection(builder).mul(args.get('amount'));
        session.clearSelectionPoints();
        points.forEach((point, idx) => {
            session.setSelectionPoint(idx ? 1 : 0, point.add(dir).toBlock());
        });
        return 'commands.wedit:shift.explain';
    }];
