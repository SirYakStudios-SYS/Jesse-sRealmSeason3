scoreboard objectives add Countdown dummy Countdown
scoreboard players add @a Countdown 0
scoreboard players add @a[scores={Countdown=..599}] Countdown 40
scoreboard players remove @a[scores={Countdown=610..}] Countdown 5
scoreboard players remove @a[scores={Countdown=601..611}] Countdown 1
scoreboard players set @a[scores={Countdown=..0}, hasitem={item=m:francium_ingot, location=slot.hotbar}] Countdown 600
scoreboard players set @a[scores={Countdown=..0}, hasitem={item=m:francium_ingot, location=slot.inventory}] Countdown 600
scoreboard players set @a[scores={Countdown=..0}, hasitem={item=m:explosivs_core, location=slot.hotbar}] Countdown 600
scoreboard players set @a[scores={Countdown=..0}, hasitem={item=m:explosivs_core, location=slot.inventory}] Countdown 600
scoreboard players remove @a[scores={Countdown=0..}, hasitem={item=m:francium_ingot, location=slot.hotbar}] Countdown 41
scoreboard players remove @a[scores={Countdown=0..}, hasitem={item=m:francium_ingot, location=slot.inventory}] Countdown 41
scoreboard players remove @a[scores={Countdown=0..}, hasitem={item=m:explosivs_core, location=slot.hotbar}] Countdown 43
scoreboard players remove @a[scores={Countdown=0..}, hasitem={item=m:explosivs_core, location=slot.inventory}] Countdown 43
execute @a[scores={Countdown=-4}] ~~~ function self_destruct