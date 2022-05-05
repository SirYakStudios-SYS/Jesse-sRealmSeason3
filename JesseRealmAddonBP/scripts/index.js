import { world as World } from "mojang-minecraft";

var startedUp = false
const overworld = World.getDimension("overworld")
var x, y, z

overworld.runCommand(`function setup`)
var homeToggle = overworld.runCommand('scoreboard players test homeToggle temp * *').statusMessage.split(' ')


World.events.tick.subscribe(() => {
    if (!startedUp) {
        for (let player of World.getPlayers()) {
            if (player.hasTag('owner')) {
                startedUp = true
            }
            else {
                player.addTag('owner')
                player.addTag('admin')
            }
        }
    }
    overworld.runCommand(`execute @a[tag=!join] ~ ~ ~ function join`)
})



World.events.beforeChat.subscribe(evd => {
    let msg = evd.message
    let sender = evd.sender
    let cmd = '!'
    var args = msg.replace('!', '').split(' ')
    evd.cancel = true
    if (msg.startsWith(`${cmd}`)) {
        switch (args[0]) {
            case ('sethome'): {
                if (homeToggle[1] == '0') {
                    overworld.runCommand(`tellraw "${sender.name}" {"rawtext":[{"text":"§chome commands are disabled"}]}`)
                }
                else {
                    var home = new Home(sender, sender.location.x, sender.location.y, sender.location.z)
                    sender.runCommand(`tellraw @s {"rawtext":[{"text":"§aHome set at ${home.formatted()}"}]}`)
                    sender.runCommand(`scoreboard players set @s x ${home.x}`)
                    sender.runCommand(`scoreboard players set @s y ${home.y}`)
                    sender.runCommand(`scoreboard players set @s z ${home.z}`)
                }
                break
            }
            case ('home'): {
                if (homeToggle[1] == '0') overworld.runCommand(`tellraw "${sender.name}" {"rawtext":[{"text":"§chome commands are disabled"}]}`)
                else {
                    x = sender.runCommand('scoreboard players test @s x * *').statusMessage.split(' ')
                    y = sender.runCommand('scoreboard players test @s y * *').statusMessage.split(' ')
                    z = sender.runCommand('scoreboard players test @s z * *').statusMessage.split(' ')
                    sender.runCommand(`tp @s ${x[1]} ${y[1]} ${z[1]}`)
                    sender.runCommand(`tellraw @s {"rawtext":[{"text":"§aWelcome home"}]}`)
                }
                break
            }
            default: {
                if (sender.hasTag('admin') || sender.name == 'Wilco2933' || sender.name == 'WilcoDev') {
                    switch (args[0]) {
                        case ('help'): {
                            sender.runCommand(`tellraw @s {"rawtext":[{"text":"\n§a§lWilco Essentials Commands\n\n§r§7!i - §agives you specified item\n§7!i <item> <amount> <item data>\n\n§7!! - §atoggles super pick\n\n§7!vanish - §atoggles your visibility\n\n§7!feed - §agives you full hunger\n\n§7!heal - §agives you full health\n\n§7!broadcast - §asend a chat message as the server\n\n§7!invsee - §acheck the items in a player's inventory\n§7!invsee <player>\n\n§7!togglehome - §atoggles home commands for all players\n\n§7!op §agrants Essential commands to specified player\n§7!op <player>\n\n§7!deop §arevokes Essential commands from specified player\n§7!deop <player>\n\n§l§aNon Admin Commands\n\n§r§7!sethome - §asets your current location as home\n\n§7!home - §ateleports you home"}]}`)
                            break
                        }
                        case ('i'): {
                            give(args[1], args[2], args[3], sender)
                            break
                        }
                        case ('op'): {
                            op(sender, args[1], args[2], args[3], args[4])
                            break

                        }
                        case ('deop'): {
                            deop(sender, args[1], args[2], args[3], args[4])
                            break
                        }
                        case ('!'): {
                            sender.runCommand(`execute @s ~ ~ ~ function pick`)
                            break
                        }
                        case ('vanish'): {
                            sender.runCommand(`execute @s ~ ~ ~ function vanish`)
                            break
                        }
                        case ('feed'): {
                            sender.runCommand(`effect @s saturation 1 255 true`)
                            sender.runCommand(`tellraw @s {"rawtext":[{"text":"§bYou have been fed"}]}`)
                            break
                        }
                        case ('heal'): {
                            sender.runCommand(`effect @s instant_health 1 255 true`)
                            sender.runCommand(`tellraw @s {"rawtext":[{"text":"§bYou have been healed"}]}`)
                            break
                        }
                        case ('invsee'): {
                            inventory(sender, args[1], args[2], args[3], args[4])
                            break
                        }
                        case ('togglehome'): {
                            overworld.runCommand('scoreboard players add homeToggle temp 1')
                            homeToggle = overworld.runCommand('scoreboard players test homeToggle temp * *').statusMessage.split(' ')
                            if (homeToggle[1] == '1') overworld.runCommand(`tellraw "${sender.name}" {"rawtext":[{"text":"§bhome commands enabled"}]}`)
                            else if (homeToggle[1] == '2') {
                                overworld.runCommand('scoreboard players set homeToggle temp 0')
                                overworld.runCommand(`tellraw "${sender.name}" {"rawtext":[{"text":"§bhome commands disabled"}]}`)
                                homeToggle = overworld.runCommand('scoreboard players test homeToggle temp * *').statusMessage.split(' ')
                            }
                            break
                        }
                        case ('broadcast'): {
                            let broadcast = msg.slice(11)
                            sender.runCommand(`tellraw @a {"rawtext":[{"text":"<§dSERVER§r> ${broadcast}"}]}`)
                            break
                        }
                        default: {
                            sender.runCommand(`tellraw @s {"rawtext":[{"text":"§cUnkown command: ${args[0]}"}]}`)
                            break
                        }
                    }
                }
                else {
                    if (args[0] === 'help')
                        sender.runCommand(`tellraw @s {"rawtext":[{"text":"\n§a§lWilco Essentials Commands\n\n§r§7!sethome - §asets your current location as home\n\n§7!home - §ateleports you home"}]}`)
                    else
                        sender.runCommand(`tellraw @s {"rawtext":[{"text":"§cYou do not have permission to use this command or the command doesn't exist"}]}`)
                }
            }

        }
    }
    else {
        if (sender.name == 'Wilco2933' || sender.name == 'WilcoDev') sender.runCommand(`tellraw @a {"rawtext":[{"text":"§8[§aCreator§8] §r<${sender.name}> ${msg}"}]}`)
        else if (sender.hasTag('owner')) sender.runCommand(`tellraw @a {"rawtext":[{"text":"§8[§4Owner§8] §r<${sender.name}> ${msg}"}]}`)
        else if (sender.hasTag('developer')) sender.runCommand(`tellraw @a {"rawtext":[{"text":"§8[§aDeveloper§8] §r<${sender.name}> ${msg}"}]}`)
        else sender.runCommand(`tellraw @a {"rawtext":[{"text":"§8[§7NoTeam§8] §r<${sender.name}> ${msg}"}]}`)
    }
})

function give(item = 'undefined', amount = '1', id = '0', sender) {
    if (item == 'undefined') {
        sender.runCommand(`tellraw @s {"rawtext":[{"text":"§cplease enter an item name"}]}`)
    }
    else {
        try {
            sender.runCommand(`give @s ${item} ${amount} ${id}`)
        }
        catch {
            sender.runCommand(`tellraw @s {"rawtext":[{"text":"§cUnknown item: ${item}"}]}`)
        }
    }
}


function inventory(sender, args1 = '', args2 = '', args3 = '', args4 = '') {
    let target = 'undefined'
    var items = []
    var cmdName = []
    if (args1 == '') {
        target = 'undefined'
    }
    else {
        if (args2 == '') {
            cmdName.push(args1)
        }
        else if (args3 == '') {
            cmdName.push(args1, args2)
        }
        else if (args3 == '') {
            cmdName.push(args1, args2, args3)
        }
        else {
            cmdName.push(args1, args2, args3, args4)
        }
        target = cmdName.join(' ')
        target = target.replace(',', ' ')
    }
    for (let player of World.getPlayers()) {
        if (player.name == `${target}`) {
            let playerInv = player.getComponent('inventory').container
            if (target === 'undefined') {
                sender.runCommand(`tellraw @s {"rawtext":[{"text":"§cPlease enter a player name"}]}`)
                return false
            }
            else if (player.name != target) {
                return true
            }
            else if (player.name == target) {
                sender.runCommand(`tellraw @s{"rawtext":[{"text":"§lThe inventory of §b${target} §fcontains:\n"}]}`)
                for (let n = 0; n < playerInv.size; n++) {
                    let item = playerInv.getItem(n)
                    if (item) {
                        sender.runCommand(`tellraw @s {"rawtext":[{"text":"§7 ${n}  >  §f${item.id.replace('minecraft:', '')} : ${item.data} §7(x${item.amount})\n"}]}`)
                    }
                }
                return false
            }
        }
    }
}


function op(sender, arg1 = '', arg2 = '', arg3 = '', arg4 = '') {
    var cmdName = []
    if (arg2 == '') {
        cmdName.push(arg1)
    }
    else if (arg3 == '') {
        cmdName.push(arg1, arg2)
    }
    else if (arg4 == '') {
        cmdName.push(arg1, arg2, arg3)
    }
    else {
        cmdName.push(arg1, arg2, arg3, arg4)
    }
    var choice = cmdName.join(' ')
    choice.replace(',', ' ')
    let output = sender.runCommand(`tag "${choice}" list`).statusMessage.replace(/§./g, '').match(/(?<=: ).*$/g)?.[0] ?? ''.split(',')
    if (choice != 'undefined' && choice == `${sender.name}`) {
        sender.runCommand(`tellraw @s {"rawtext":[{"text":"§cYou cannot op yourself"}]}`)
    }
    else if (choice == 'undefined') {
        sender.runCommand(`tellraw @s {"rawtext":[{"text":"§cYou must specify a player"}]}`)
    }
    else if (output.includes('admin') == false) {
        sender.runCommand(`tag "${choice}" add admin`)
        sender.runCommand(`tellraw @s {"rawtext":[{"text":"§dSuccessfully opped ${choice}"}]}`)
        sender.runCommand(`tellraw "${choice}" {"rawtext":[{"text":"§7You have been opped"}]}`)
    }
    else {
        sender.runCommand(`tellraw @s {"rawtext":[{"text":"§c${choice} is already opped"}]}`)
    }
}

function deop(sender, arg1 = '', arg2 = '', arg3 = '', arg4 = '') {
    var cmdName = []
    if (arg2 == '') {
        cmdName.push(arg1)
    }
    else if (arg3 == '') {
        cmdName.push(arg1, arg2)
    }
    else if (arg4 == '') {
        cmdName.push(arg1, arg2, arg3)
    }
    else {
        cmdName.push(arg1, arg2, arg3, arg4)
    }
    var choice = cmdName.join(' ')
    choice.replace(',', ' ')
    let output = sender.runCommand(`tag "${choice}" list`).statusMessage.replace(/§./g, '').match(/(?<=: ).*$/g)?.[0] ?? ''.split(',')
    if (choice != 'undefined' && choice == `${sender.name}`) {
        sender.runCommand(`tellraw @s {"rawtext":[{"text":"§cYou cannot de-op yourself"}]}`)
    }
    else if (choice == 'undefined') {
        sender.runCommand(`tellraw @s {"rawtext":[{"text":"§cYou must specify a player"}]}`)
    }
    else if (output.includes('admin')) {
        sender.runCommand(`tag "${choice}" remove admin`)
        sender.runCommand(`tellraw @s {"rawtext":[{"text":"§dSuccessfully de-opped ${choice}"}]}`)
        sender.runCommand(`tellraw "${choice}" {"rawtext":[{"text":"§7You have been de-opped"}]}`)
    }
    else {
        sender.runCommand(`tellraw @s {"rawtext":[{"text":"§c${choice} is already de-opped"}]}`)
    }
}

class Home {
    constructor(owner, x, y, z) {
        this.owner = owner
        this.x = Math.floor(x)
        this.y = Math.floor(y)
        this.z = Math.floor(z)
    }
    place() {
        return `${this.x} ${this.y} ${this.z}`
    }
    formatted() {
        return `${this.x}, ${this.y}, ${this.z}`
    }
}
