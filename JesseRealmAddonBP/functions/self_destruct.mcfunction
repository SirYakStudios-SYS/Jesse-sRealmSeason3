particle minecraft:flash ~~~
particle minecraft:huge_explosion_emitter ~~~
playsound random.explode
particle minecraft:flash ~~~
playsound mob.wither.break_block
particle minecraft:flash ~~~
scoreboard players reset @s Countdown
clear @s m:francium_ingot
clear @s m:explosivs_core
damage @e[r=4] 1000 block_explosion