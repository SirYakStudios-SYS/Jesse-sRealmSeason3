

execute @e ~~~ detect ~~~ bumble:briar_bush 0 tag @e[r=1] add briarHurt
execute @e ~~~ detect ~~~ bumble:briar_bush_2 0 tag @e[r=1] add briarHurt
execute @e ~~~ detect ~~~ bumble:pot_briar 0 tag @e[r=1] add briarHurt

effect @e[tag=briarHurt] slowness 1 5 true
effect @e[tag=briarHurt] poison 1 2 true
tag @e[tag=briarHurt] remove briarHurt