import { RawText } from './../../modules/rawtext.js';
import { PyramidShape } from '../../shapes/pyramid.js';
import { PlayerUtil } from './../../modules/player_util.js';
import { commandList } from '../command_list.js';
const registerInformation = {
    name: 'pyramid',
    permission: 'worldedit.generation.pyramid',
    description: 'commands.wedit:pyramid.description',
    usage: [
        {
            flag: 'h'
        }, {
            name: 'pattern',
            type: 'Pattern'
        }, {
            name: 'size',
            type: 'int',
            range: [1, null]
        }
    ]
};
commandList['pyramid'] = [registerInformation, (session, builder, args) => {
        let pattern = args.get('pattern');
        let isHollow = args.has('h');
        let size = args.get('size');
        const loc = PlayerUtil.getBlockLocation(builder);
        const pyramidShape = new PyramidShape(size);
        const count = pyramidShape.generate(loc, pattern, null, session, { 'hollow': isHollow });
        return RawText.translate('commands.blocks.wedit:created').with(`${count}`);
    }];
