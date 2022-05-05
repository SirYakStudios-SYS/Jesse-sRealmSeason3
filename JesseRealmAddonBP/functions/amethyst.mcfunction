#bridge-file-version: #0
playsound break.amethyst_cluster
 
 
scoreboard objectives add a dummy
scoreboard players add @s a 1
 
execute @s[scores={a=2..}] ~ ~ ~ effect @s speed 10 1 true
execute @s[scores={a=2..}] ~ ~ ~ playsound block.bell.hit @s ~ ~ ~ 0.5 1.5
execute @s[scores={a=2..}] ~ ~ ~ effect @e[r=5,type=!player,family=mob] slowness 5 255 true
execute @s[scores={a=2..}] ~ ~ ~ scoreboard players set @s a 0
 