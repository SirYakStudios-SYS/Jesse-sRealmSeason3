#bridge-file-version: #10
execute @s[tag=slime] ~ ~ ~ summon ray:slime
execute @s[tag=slime] ~ ~ ~ playsound fall.slime @p
execute @s[tag=magma] ~ ~ ~ summon minecraft:small_fireball
execute @s[tag=shulker] ~ ~ ~ effect @s levitation 10 1
execute @s[tag=shulker] ~ ~ ~ playsound mob.shulker.shoot @p
execute @s[tag=evocation] ~ ~ ~ summon evocation_fang
execute @s[tag=amethyst] ~ ~ ~ execute @p ~ ~ ~ function amethyst
execute @s[tag=iron] ~ ~ ~ damage @s 3
execute @s[tag=iron] ~ ~ ~ playsound item.trident.hit_ground @p ~ ~ ~ 1 0.5
execute @s[tag=cactus] ~ ~ ~ damage @s 2
execute @s[tag=copper] ~ ~ ~ effect @p resistance 1 255
 
execute @s[tag=copper] ~ ~ ~ summon lightning_bolt
 