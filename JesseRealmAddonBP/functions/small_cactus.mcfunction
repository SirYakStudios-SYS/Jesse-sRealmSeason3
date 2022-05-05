

execute @e ~~~ detect ~~~ bumble:small_cactus 0 tag @e[r=1] add cactusHurt
execute @e ~~~ detect ~~~ bumble:pot_small_cactus 0 tag @e[r=1] add cactusHurt
effect @e[tag=cactusHurt] poison 1 1 true
tag @e[tag=cactusHurt] remove cactusHurt