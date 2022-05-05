effect @e[type=nether:glowbeetle] slow_falling 1 0 true
effect @e[type=nether:glowbeetle] jump_boost 1 1 true

execute @e[type=item] ~~~ tp @s @e[type=nether:rotten_boomerang,r=2.5,c=1]
execute @e[type=xp_orb] ~~~ tp @s @e[type=nether:rotten_boomerang,r=2.5,c=1] 

title @a[tag=glow_staff] actionbar §6<<Glow Staff Is Used>>
