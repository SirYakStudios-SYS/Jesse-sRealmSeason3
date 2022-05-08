import { world as World } from "mojang-minecraft";

const overworld = World.getDimension("overworld")
var x, y, z

overworld.runCommand(`function setup`)
var homeToggle = overworld.runCommand('scoreboard players test homeToggle temp * *').statusMessage.split(' ')



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
                if (sender.hasTag('staff') || sender.name == 'Wilco2933' || sender.name == 'WilcoDev') {
                    switch (args[0]) {
                        case ('i'): {
                            give(args[1], args[2], args[3], sender)
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
                        sender.runCommand(`tellraw @s {"rawtext":[{"text":"\n§a§lJesse's Realm Season 3\n\n§r§7!sethome - §asets your current location as home\n\n§7!home - §ateleports you home"}]}`)
                    else
                        sender.runCommand(`tellraw @s {"rawtext":[{"text":"§cYou do not have permission to use this command or the command doesn't exist"}]}`)
                }
            }

        }
    }
    else {
        if (sender.hasTag('owner')) sender.runCommand(`tellraw @a {"rawtext":[{"text":"§8[§4Owner§8] §r<${sender.name}> ${msg}"}]}`)
        else if (sender.hasTag('yaguers')) sender.runCommand(`tellraw @a {"rawtext":[{"text":"§g§l[§2YAGUERS§g] §r${sender.name} §g>§2>§r ${msg}"}]}`)
        else if (sender.hasTag('anarchy')) sender.runCommand(`tellraw @a {"rawtext":[{"text":"§5§l[§bAnarchy§5] §r${sender.name} §5>§b>§r ${msg}"}]}`)
        else if (sender.hasTag('ttc')) sender.runCommand(`tellraw @a {"rawtext":[{"text":"§f§l[§eTTC§f] §r${sender.name} §f>§e>§r ${msg}"}]}`)
        else if (sender.hasTag('kingofskeletors')) sender.runCommand(`tellraw @a {"rawtext":[{"text":"§a§l[§bKingOfSkeletors§a] §r${sender.name} §a>§b>§r ${msg}"}]}`)
        else if (sender.hasTag('estate')) sender.runCommand(`tellraw @a {"rawtext":[{"text":"§6§l[§5Estate§6] §r${sender.name} §6>§5>§r ${msg}"}]}`)
        else if (sender.hasTag('rosealliance')) sender.runCommand(`tellraw @a {"rawtext":[{"text":"§0§l[§cRosé Alliance§0] §r${sender.name} §0>§c>§r ${msg}"}]}`)
        else if (sender.hasTag('theoutcasts')) sender.runCommand(`tellraw @a {"rawtext":[{"text":"§4§l[§6The Outcasts§4] §r${sender.name} §4>§6>§r ${msg}"}]}`)
        else sender.runCommand(`tellraw @a {"rawtext":[{"text":"§l§8[§7TeamLess§8] §r${sender.name}>> ${msg}"}]}`)
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
