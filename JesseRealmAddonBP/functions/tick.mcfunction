#bridge-file-version: #33
scoreboard objectives add summon dummy
 
scoreboard players add @a summon 1
 
 
execute @a[scores={summon=1}] ~ ~ ~ summon ray:shield_luz
execute @a[scores={summon=5}] ~ ~ ~ event entity @e[type=ray:shield_luz] despawn
execute @a[scores={summon=5}] ~ ~ ~ scoreboard players reset @s summon
 
execute @e[type=ray:shield_luz] ~ ~ ~ execute @p ~ ~ ~ tp @e[type=ray:shield_luz,c=1,r=10] ~ ~7 ~
 
scoreboard objectives add luz2 dummy
scoreboard players add @a luz2 1
execute @a[scores={luz2=0..3}] ~ ~ ~ function luz
execute @a[scores={luz2=7..}] ~ ~ ~ fill ~10 ~10 ~10 ~-10 ~-8 ~-10 air 0 replace light_block 15
 
scoreboard objectives add tick dummy
 
scoreboard players add @e tick 1
 
 
execute @e[scores={tick=1}] ~ ~ ~ event entity @s sneak
execute @e[scores={tick=2}] ~ ~ ~ event entity @s slime
execute @e[scores={tick=3}] ~ ~ ~ event entity @s magma
execute @e[scores={tick=4}] ~ ~ ~ event entity @s shulker
execute @e[scores={tick=5}] ~ ~ ~ event entity @s evocation
execute @e[scores={tick=6}] ~ ~ ~ event entity @s amethyst
execute @e[scores={tick=7}] ~ ~ ~ event entity @s iron
execute @e[scores={tick=8}] ~ ~ ~ event entity @s cactus
execute @e[scores={tick=9}] ~ ~ ~ event entity @s copper
 
 
execute @e[scores={tick=9..}] ~ ~ ~ scoreboard players set @s tick 0
 
function pulsar