scoreboard players add @s pick 1
scoreboard players set @s[scores={pick=2}] pick 0
tellraw @s[scores={pick=1}] {"rawtext":[{"text":"§bSuper pick enabled"}]}
tellraw @s[scores={pick=0}] {"rawtext":[{"text":"§bSuper pick disabled"}]}