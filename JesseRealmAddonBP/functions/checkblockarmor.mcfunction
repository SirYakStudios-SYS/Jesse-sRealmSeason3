gamerule sendcommandfeedback false

execute @s[hasitem={location=slot.armor.head,item=vatonage:bookshelf_helmet}] ~ ~ ~ xp 1 @s
execute @s[hasitem={location=slot.armor.chest,item=vatonage:bookshelf_chestplate}] ~ ~ ~ xp 1 @s
execute @s[hasitem={location=slot.armor.legs,item=vatonage:bookshelf_leggings}] ~ ~ ~ xp 1 @s
execute @s[hasitem={location=slot.armor.feet,item=vatonage:bookshelf_boots}] ~ ~ ~ xp 1 @s

execute @s[hasitem={location=slot.armor.head,item=vatonage:coal_block_helmet}] ~ ~ ~ effect @s fire_resistance 4 0 true
execute @s[hasitem={location=slot.armor.chest,item=vatonage:coal_block_chestplate}] ~ ~ ~ effect @s fire_resistance 4 0 true
execute @s[hasitem={location=slot.armor.legs,item=vatonage:coal_block_leggings}] ~ ~ ~ effect @s fire_resistance 4 0 true
execute @s[hasitem={location=slot.armor.feet,item=vatonage:coal_block_boots}] ~ ~ ~ effect @s fire_resistance 4 0 true
execute @s[hasitem={location=slot.armor.head,item=vatonage:coal_block_helmet}] ~ ~ ~ fill ~-1 ~-1 ~-1 ~1 ~1 ~1 fire 0 replace air
execute @s[hasitem={location=slot.armor.chest,item=vatonage:coal_block_chestplate}] ~ ~ ~ fill ~-1 ~-1 ~-1 ~1 ~1 ~1 fire 0 replace air
execute @s[hasitem={location=slot.armor.legs,item=vatonage:coal_block_leggings}] ~ ~ ~ fill ~-1 ~-1 ~-1 ~1 ~1 ~1 fire 0 replace air
execute @s[hasitem={location=slot.armor.feet,item=vatonage:coal_block_boots}] ~ ~ ~ fill ~-1 ~-1 ~-1 ~1 ~1 ~1 fire 0 replace air

scoreboard objectives add lightningarmor dummy lightningarmor
execute @s[hasitem={location=slot.armor.head,item=vatonage:copper_block_helmet}] ~ ~ ~ scoreboard players add @s lightningarmor 1
execute @s[hasitem={location=slot.armor.chest,item=vatonage:copper_block_chestplate}] ~ ~ ~ scoreboard players add @s lightningarmor 1
execute @s[hasitem={location=slot.armor.legs,item=vatonage:copper_block_leggings}] ~ ~ ~ scoreboard players add @s lightningarmor 1
execute @s[hasitem={location=slot.armor.feet,item=vatonage:copper_block_boots}] ~ ~ ~ scoreboard players add @s lightningarmor 1
execute @s[scores={lightningarmor=20..}] ~ ~ ~ summon lightning_bolt
execute @s[scores={lightningarmor=20..}] ~ ~ ~ scoreboard players set @s lightningarmor 0

effect @s[hasitem={location=slot.armor.head,item=vatonage:end_stone_helmet}] levitation 4 0 true
effect @s[hasitem={location=slot.armor.chest,item=vatonage:end_stone_chestplate}] levitation 4 0 true
effect @s[hasitem={location=slot.armor.legs,item=vatonage:end_stone_leggings}] levitation 4 0 true
effect @s[hasitem={location=slot.armor.feet,item=vatonage:end_stone_boots}]  levitation 4 0 true

execute @s[hasitem={location=slot.armor.head,item=vatonage:furnace_helmet}] ~ ~ ~ give @s[hasitem={item=raw_iron}] iron_ingot
execute @s[hasitem={location=slot.armor.head,item=vatonage:furnace_helmet}] ~ ~ ~ clear @s[hasitem={item=raw_iron}] raw_iron 0 1
execute @s[hasitem={location=slot.armor.head,item=vatonage:furnace_helmet}] ~ ~ ~ give @s[hasitem={item=raw_gold}] gold_ingot
execute @s[hasitem={location=slot.armor.head,item=vatonage:furnace_helmet}] ~ ~ ~ clear @s[hasitem={item=raw_gold}] raw_gold 0 1
execute @s[hasitem={location=slot.armor.head,item=vatonage:furnace_helmet}] ~ ~ ~ give @s[hasitem={item=raw_copper}] copper_ingot
execute @s[hasitem={location=slot.armor.head,item=vatonage:furnace_helmet}] ~ ~ ~ clear @s[hasitem={item=raw_copper}] raw_copper 0 1
execute @s[hasitem={location=slot.armor.chest,item=vatonage:furnace_chestplate}] ~ ~ ~ give @s[hasitem={item=raw_iron}] iron_ingot
execute @s[hasitem={location=slot.armor.chest,item=vatonage:furnace_chestplate}] ~ ~ ~ clear @s[hasitem={item=raw_iron}] raw_iron 0 1
execute @s[hasitem={location=slot.armor.chest,item=vatonage:furnace_chestplate}] ~ ~ ~ give @s[hasitem={item=raw_gold}] gold_ingot
execute @s[hasitem={location=slot.armor.chest,item=vatonage:furnace_chestplate}] ~ ~ ~ clear @s[hasitem={item=raw_gold}] raw_gold 0 1
execute @s[hasitem={location=slot.armor.chest,item=vatonage:furnace_chestplate}] ~ ~ ~ give @s[hasitem={item=raw_copper}] copper_ingot
execute @s[hasitem={location=slot.armor.chest,item=vatonage:furnace_chestplate}] ~ ~ ~ clear @s[hasitem={item=raw_copper}] raw_copper 0 1
execute @s[hasitem={location=slot.armor.legs,item=vatonage:furnace_leggings}] ~ ~ ~ give @s[hasitem={item=raw_iron}] iron_ingot
execute @s[hasitem={location=slot.armor.legs,item=vatonage:furnace_leggings}] ~ ~ ~ clear @s[hasitem={item=raw_iron}] raw_iron 0 1
execute @s[hasitem={location=slot.armor.legs,item=vatonage:furnace_leggings}] ~ ~ ~ give @s[hasitem={item=raw_gold}] gold_ingot
execute @s[hasitem={location=slot.armor.legs,item=vatonage:furnace_leggings}] ~ ~ ~ clear @s[hasitem={item=raw_gold}] raw_gold 0 1
execute @s[hasitem={location=slot.armor.legs,item=vatonage:furnace_leggings}] ~ ~ ~ give @s[hasitem={item=raw_copper}] copper_ingot
execute @s[hasitem={location=slot.armor.legs,item=vatonage:furnace_leggings}] ~ ~ ~ clear @s[hasitem={item=raw_copper}] raw_copper 0 1
execute @s[hasitem={location=slot.armor.feet,item=vatonage:furnace_boots}] ~ ~ ~ give @s[hasitem={item=raw_iron}] iron_ingot
execute @s[hasitem={location=slot.armor.feet,item=vatonage:furnace_boots}] ~ ~ ~ clear @s[hasitem={item=raw_iron}] raw_iron 0 1
execute @s[hasitem={location=slot.armor.feet,item=vatonage:furnace_boots}] ~ ~ ~ give @s[hasitem={item=raw_gold}] gold_ingot
execute @s[hasitem={location=slot.armor.feet,item=vatonage:furnace_boots}] ~ ~ ~ clear @s[hasitem={item=raw_gold}] raw_gold 0 1
execute @s[hasitem={location=slot.armor.feet,item=vatonage:furnace_boots}] ~ ~ ~ give @s[hasitem={item=raw_copper}] copper_ingot
execute @s[hasitem={location=slot.armor.feet,item=vatonage:furnace_boots}] ~ ~ ~ clear @s[hasitem={item=raw_copper}] raw_copper 0 1

effect @s[hasitem={location=slot.armor.head,item=vatonage:gold_block_helmet}] absorption 4 0 true
effect @s[hasitem={location=slot.armor.chest,item=vatonage:gold_block_chestplate}] absorption 4 0 true
effect @s[hasitem={location=slot.armor.legs,item=vatonage:gold_block_leggings}] absorption 4 0 true
effect @s[hasitem={location=slot.armor.feet,item=vatonage:gold_block_boots}]  absorption 4 0 true

execute @s[hasitem={location=slot.armor.head,item=vatonage:ice_helmet}] ~ ~ ~ effect @e[type=!player,r=6] slowness 4 1
execute @s[hasitem={location=slot.armor.chest,item=vatonage:ice_chestplate}] ~ ~ ~ effect @e[type=!player,r=6] slowness 4 1
execute @s[hasitem={location=slot.armor.legs,item=vatonage:ice_leggings}] ~ ~ ~ effect @e[type=!player,r=6] slowness 4 1
execute @s[hasitem={location=slot.armor.feet,item=vatonage:ice_boots}] ~ ~ ~ effect @e[type=!player,r=6] slowness 4 1

execute @s[hasitem={location=slot.armor.head,item=vatonage:lapis_block_helmet}] ~ ~ ~ effect @s[lm=1] saturation 4 0 true
execute @s[hasitem={location=slot.armor.chest,item=vatonage:lapis_block_chestplate}] ~ ~ ~ effect @s[lm=1] saturation 4 0 true
execute @s[hasitem={location=slot.armor.legs,item=vatonage:lapis_block_leggings}] ~ ~ ~ effect @s[lm=1] saturation 4 0 true
execute @s[hasitem={location=slot.armor.feet,item=vatonage:lapis_block_boots}] ~ ~ ~ effect @s[lm=1] saturation 4 0 true
execute @s[hasitem={location=slot.armor.head,item=vatonage:lapis_block_helmet}] ~ ~ ~ xp -1L @s[lm=1]
execute @s[hasitem={location=slot.armor.chest,item=vatonage:lapis_block_chestplate}] ~ ~ ~ xp -1L @s[lm=1]
execute @s[hasitem={location=slot.armor.legs,item=vatonage:lapis_block_leggings}] ~ ~ ~ xp -1L @s[lm=1]
execute @s[hasitem={location=slot.armor.feet,item=vatonage:lapis_block_boots}] ~ ~ ~ xp -1L @s[lm=1]

execute @s[hasitem={location=slot.armor.head,item=vatonage:netherite_block_helmet}] ~ ~ ~ scoreboard players add @e[r=10,type=!player] withereffect 1
execute @s[hasitem={location=slot.armor.chest,item=vatonage:netherite_block_chestplate}] ~ ~ ~ scoreboard players add @e[r=10,type=!player] withereffect 1
execute @s[hasitem={location=slot.armor.legs,item=vatonage:netherite_block_leggings}] ~ ~ ~ scoreboard players add @e[r=10,type=!player] withereffect 1
execute @s[hasitem={location=slot.armor.feet,item=vatonage:netherite_block_boots}] ~ ~ ~ scoreboard players add @e[r=10,type=!player] withereffect 1

execute @s[hasitem={location=slot.armor.head,item=vatonage:netherrack_helmet}] ~ ~ ~ effect @s fire_resistance 4 0 true
execute @s[hasitem={location=slot.armor.chest,item=vatonage:netherrack_chestplate}] ~ ~ ~ effect @s fire_resistance 4 0 true
execute @s[hasitem={location=slot.armor.legs,item=vatonage:netherrack_leggings}] ~ ~ ~ effect @s fire_resistance 4 0 true
execute @s[hasitem={location=slot.armor.feet,item=vatonage:netherrack_boots}] ~ ~ ~ effect @s fire_resistance 4 0 true

execute @s[hasitem={location=slot.armor.head,item=vatonage:wool_helmet}] ~ ~ ~ effect @s slow_falling 4 0 true
execute @s[hasitem={location=slot.armor.chest,item=vatonage:wool_chestplate}] ~ ~ ~ effect @s slow_falling 4 0 true
execute @s[hasitem={location=slot.armor.legs,item=vatonage:wool_leggings}] ~ ~ ~ effect @s slow_falling 4 0 true
execute @s[hasitem={location=slot.armor.feet,item=vatonage:wool_boots}] ~ ~ ~ effect @s slow_falling 4 0 true