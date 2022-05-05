#Create a Thunder Shrine
summon bt:thunder_shrine
tellraw @a { "rawtext" : [ { "text" : "§eThe Thunder Shrine has been created" } ] }
particle minecraft:totem_particle ~ ~ ~
playsound block.end_portal.spawn @a