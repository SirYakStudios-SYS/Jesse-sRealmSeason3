tag @a add blockaeffect

scoreboard objectives add blockarmorrun dummy blockarmorrun
scoreboard players add @a blockarmorrun 1
execute @a[scores={blockarmorrun=40..}] ~ ~ ~ function checkblockarmor
scoreboard players set @a[scores={blockarmorrun=40..}] blockarmorrun 0

scoreboard players add @a[hasitem={location=slot.armor.head,item=vatonage:amethyst_helmet}] regeneffect 1
scoreboard players add @a[hasitem={location=slot.armor.chest,item=vatonage:amethyst_chestplate}] regeneffect 1
scoreboard players add @a[hasitem={location=slot.armor.legs,item=vatonage:amethyst_leggings}] regeneffect 1
scoreboard players add @a[hasitem={location=slot.armor.feet,item=vatonage:amethyst_boots}] regeneffect 1

execute @a[hasitem={location=slot.armor.head,item=vatonage:beacon_helmet}] ~ ~ ~ scoreboard players add @a[r=10] hasteeffect 1
execute @a[hasitem={location=slot.armor.chest,item=vatonage:beacon_chestplate}] ~ ~ ~ scoreboard players add @a[r=10] resistanceeffect 1
execute @a[hasitem={location=slot.armor.legs,item=vatonage:beacon_leggings}] ~ ~ ~ scoreboard players add @a[r=10] jump_boosteffect 1
execute @a[hasitem={location=slot.armor.feet,item=vatonage:beacon_boots}] ~ ~ ~ scoreboard players add @a[r=10] speedeffect 1

scoreboard players remove @a[hasitem={location=slot.armor.head,item=vatonage:cobblestone_helmet}] speedeffect 1
scoreboard players remove @a[hasitem={location=slot.armor.chest,item=vatonage:cobblestone_chestplate}] speedeffect 1
scoreboard players remove @a[hasitem={location=slot.armor.legs,item=vatonage:cobblestone_leggings}] speedeffect 1
scoreboard players remove @a[hasitem={location=slot.armor.feet,item=vatonage:cobblestone_boots}] speedeffect 1

scoreboard players add @a[hasitem={location=slot.armor.head,item=vatonage:diamond_block_helmet}] resistanceeffect 1
scoreboard players add @a[hasitem={location=slot.armor.chest,item=vatonage:diamond_block_chestplate}] resistanceeffect 1
scoreboard players add @a[hasitem={location=slot.armor.legs,item=vatonage:diamond_block_leggings}] resistanceeffect 1
scoreboard players add @a[hasitem={location=slot.armor.feet,item=vatonage:diamond_block_boots}] resistanceeffect 1

scoreboard players add @a[hasitem={location=slot.armor.head,item=vatonage:emerald_block_helmet}] speedeffect 1
scoreboard players add @a[hasitem={location=slot.armor.chest,item=vatonage:emerald_block_chestplate}] speedeffect 1
scoreboard players add @a[hasitem={location=slot.armor.legs,item=vatonage:emerald_block_leggings}] speedeffect 1
scoreboard players add @a[hasitem={location=slot.armor.feet,item=vatonage:emerald_block_boots}] speedeffect 1

scoreboard players add @a[hasitem={location=slot.armor.head,item=vatonage:glass_helmet}] strengtheffect 1
scoreboard players add @a[hasitem={location=slot.armor.chest,item=vatonage:glass_chestplate}] strengtheffect 1
scoreboard players add @a[hasitem={location=slot.armor.legs,item=vatonage:glass_leggings}] strengtheffect 1
scoreboard players add @a[hasitem={location=slot.armor.feet,item=vatonage:glass_boots}] strengtheffect 1

scoreboard players add @a[hasitem={location=slot.armor.head,item=vatonage:quartz_helmet}] speedeffect 1
scoreboard players add @a[hasitem={location=slot.armor.chest,item=vatonage:quartz_chestplate}] speedeffect 1
scoreboard players add @a[hasitem={location=slot.armor.legs,item=vatonage:quartz_leggings}] speedeffect 1
scoreboard players add @a[hasitem={location=slot.armor.feet,item=vatonage:quartz_boots}] speedeffect 1

scoreboard players add @a[hasitem={location=slot.armor.head,item=vatonage:redstone_block_helmet}] hasteeffect 1
scoreboard players add @a[hasitem={location=slot.armor.chest,item=vatonage:redstone_block_chestplate}] hasteeffect 1
scoreboard players add @a[hasitem={location=slot.armor.legs,item=vatonage:redstone_block_leggings}] hasteeffect 1
scoreboard players add @a[hasitem={location=slot.armor.feet,item=vatonage:redstone_block_boots}] hasteeffect 1

scoreboard players add @a[hasitem={location=slot.armor.head,item=vatonage:slime_helmet}] jump_boosteffect 2
scoreboard players add @a[hasitem={location=slot.armor.chest,item=vatonage:slime_chestplate}] jump_boosteffect 2
scoreboard players add @a[hasitem={location=slot.armor.legs,item=vatonage:slime_leggings}] jump_boosteffect 2
scoreboard players add @a[hasitem={location=slot.armor.feet,item=vatonage:slime_boots}] jump_boosteffect 2