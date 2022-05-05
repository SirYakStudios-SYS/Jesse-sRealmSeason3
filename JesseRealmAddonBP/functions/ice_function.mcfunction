#bridge-file-version: #1
# My Comment
tag @s add ice

execute @e[tag=!ice,type=!armor_stand,type=!item,type=!xp_orb,type=!falling_block,type=!snowball,r=15] ~ ~ ~ structure load snowigloo ~-2 ~ ~-2 0_degrees none true true
fill ~6 ~-1 ~6 ~-6 ~-1 ~-6 ice 0 replace water 0
effect @e[tag=!ice,type=!armor_stand,type=!item,type=!xp_orb,type=!falling_block,type=!snowball,r=45] slowness 1 15 true

particle minecraft:snowflake_particle ~1 ~ ~
particle minecraft:snowflake_particle ~ ~ ~1
particle minecraft:snowflake_particle ~ ~ ~-2
particle minecraft:snowflake_particle ~-2 ~ ~

particle minecraft:snowflake_particle ~ ~2 ~
particle minecraft:snowflake_particle ~1 ~2 ~
particle minecraft:snowflake_particle ~ ~2 ~1
particle minecraft:snowflake_particle ~-2 ~2 ~
particle minecraft:snowflake_particle ~ ~2 ~-2

particle minecraft:snowflake_particle ~2 ~1 ~
particle minecraft:snowflake_particle ~ ~1 ~2
particle minecraft:snowflake_particle ~ ~1 ~-2.5
particle minecraft:snowflake_particle ~-3 ~1 ~

particle minecraft:snowflake_particle ~1 ~-1 ~
particle minecraft:snowflake_particle ~ ~-1 ~1
particle minecraft:snowflake_particle ~ ~-1 ~-2
particle minecraft:snowflake_particle ~-2 ~-1 ~

particle minecraft:snowflake_particle ~-2 ~ ~2
particle minecraft:snowflake_particle ~-2 ~ ~-2
particle minecraft:snowflake_particle ~1 ~ ~-1
particle minecraft:snowflake_particle ~1 ~ ~1

particle minecraft:snowflake_particle ~-2.5 ~ ~2.5
particle minecraft:snowflake_particle ~-2.5 ~ ~-2.5
particle minecraft:snowflake_particle ~1.5 ~ ~-1.5
particle minecraft:snowflake_particle ~1.5 ~ ~1.5

particle minecraft:snowflake_particle ~0.5 ~ ~
particle minecraft:snowflake_particle ~ ~ ~0.5
particle minecraft:snowflake_particle ~ ~ ~-1.5
particle minecraft:snowflake_particle ~-1.5 ~ ~

particle minecraft:snowflake_particle ~1.5 ~0.5 ~
particle minecraft:snowflake_particle ~ ~0.5 ~1.5
particle minecraft:snowflake_particle ~ ~0.5 ~-2.5
particle minecraft:snowflake_particle ~-3 ~0.5 ~

particle minecraft:snowflake_particle ~0.5 ~-0.5 ~
particle minecraft:snowflake_particle ~ ~-0.5 ~0.5
particle minecraft:snowflake_particle ~ ~-0.5 ~-1.5
particle minecraft:snowflake_particle ~-1.5 ~-0.5 ~

