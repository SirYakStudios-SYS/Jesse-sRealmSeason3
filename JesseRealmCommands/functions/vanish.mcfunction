scoreboard players add @s vanish 1
scoreboard players set @s[scores={vanish=2}] vanish 0
tellraw @s[scores={vanish=1}] {"rawtext":[{"text":"§bvanished..."}]}
effect @s[scores={vanish=1}] invisibility 9999999 255 true
effect @s[scores={vanish=0}] invisibility 0 0 true 
tellraw @s[scores={vanish=0}] {"rawtext":[{"text":"§byou are now visible"}]}