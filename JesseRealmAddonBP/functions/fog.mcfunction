gamerule commandblockoutput false
gamerule sendcommandfeedback false

execute @e[type=nether:flesh_biome_fog_entity] ~-30 ~ ~-30 tag @a[x=~, y=0, z=~, dx=60, dy=59, dz=60] add flesh_fog
execute @e[type=nether:firelands_fog_entity] ~-30 ~ ~-30 tag @a[x=~, y=60, z=~, dx=60, dy=256, dz=60] add fire_fog
execute @e[type=nether:lava_swamp_fog_entity] ~-30 ~ ~-30 tag @a[x=~, y=0, z=~, dx=60, dy=50, dz=60] add lswamp_fog

execute @e[type=nether:flesh_biome_fog_entity] ~ ~ ~ fog @a[tag=flesh_fog] push nether:flesh_biome_fog flesh
execute @e[type=nether:firelands_fog_entity] ~ ~ ~ fog @a[tag=fire_fog] push nether:firelands_fog fire
execute @e[type=nether:lava_swamp_fog_entity] ~ ~ ~ fog @a[tag=lswamp_fog] push nether:lava_swamp_fog lava_swamp

fog @a[tag=!flesh_fog] pop flesh
fog @a[tag=!fire_fog] pop fire
fog @a[tag=!lswamp_fog] pop lava_swamp

tag @a remove flesh_fog
tag @a remove fire_fog
tag @a remove lswamp_fog