import { commandList } from '../command_list.js';
const registerInformation = {
    name: 'hpyramid',
    permission: 'worldedit.generation.pyramid',
    description: 'commands.wedit:hpyramid.description',
    usage: [
        {
            name: 'pattern',
            type: 'Pattern'
        }, {
            name: 'size',
            type: 'int',
            range: [1, null]
        }
    ]
};
commandList['hpyramid'] = [registerInformation, (session, builder, args) => {
        args.set('h', true);
        return commandList['pyramid'][1](session, builder, args);
    }];
