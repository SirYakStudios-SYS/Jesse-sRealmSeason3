
execute @s ~~~ detect ~1~~ deny -1 tag @s add tag1
execute @s ~~~ detect ~-1~~ deny -1 tag @s add tag2
execute @s ~~~ detect ~~1~ deny -1 tag @s add tag3
execute @s ~~~ detect ~~-1~ deny -1 tag @s add tag4
execute @s ~~~ detect ~1~1~ deny -1 tag @s add tag5
execute @s ~~~ detect ~-1~1~ deny -1 tag @s add tag6
execute @s ~~~ detect ~1~-1~ deny -1 tag @s add tag7
execute @s ~~~ detect ~-1~-1~ deny -1 tag @s add tag8

execute @s ~~~ detect ~1~~ border_block -1 tag @s add tag1
execute @s ~~~ detect ~-1~~ border_block -1 tag @s add tag2
execute @s ~~~ detect ~~1~ border_block -1 tag @s add tag3
execute @s ~~~ detect ~~-1~ border_block -1 tag @s add tag4
execute @s ~~~ detect ~1~1~ border_block -1 tag @s add tag5
execute @s ~~~ detect ~-1~1~ border_block -1 tag @s add tag6
execute @s ~~~ detect ~1~-1~ border_block -1 tag @s add tag7
execute @s ~~~ detect ~-1~-1~ border_block -1 tag @s add tag8

execute @s ~~~ detect ~1~~ bedrock 0 tag @s add tag1
execute @s ~~~ detect ~-1~~ bedrock 0 tag @s add tag2
execute @s ~~~ detect ~~1~ bedrock 0 tag @s add tag3
execute @s ~~~ detect ~~-1~ bedrock 0 tag @s add tag4
execute @s ~~~ detect ~1~1~ bedrock 0 tag @s add tag5
execute @s ~~~ detect ~-1~1~ bedrock 0 tag @s add tag6
execute @s ~~~ detect ~1~-1~ bedrock 0 tag @s add tag7
execute @s ~~~ detect ~-1~-1~ bedrock 0 tag @s add tag8

execute @s[tag=!tag1] ~~~ setblock ~1~~ air -1 destroy
execute @s[tag=!tag2] ~~~ setblock ~-1~~ air -1 destroy
execute @s[tag=!tag3] ~~~ setblock ~~1~ air -1 destroy
execute @s[tag=!tag4] ~~~ setblock ~~-1~ air -1 destroy
execute @s[tag=!tag5] ~~~ setblock ~1~1~ air -1 destroy
execute @s[tag=!tag6] ~~~ setblock ~-1~1~ air -1 destroy
execute @s[tag=!tag7] ~~~ setblock ~1~-1~ air -1 destroy
execute @s[tag=!tag8] ~~~ setblock ~-1~-1~ air -1 destroy