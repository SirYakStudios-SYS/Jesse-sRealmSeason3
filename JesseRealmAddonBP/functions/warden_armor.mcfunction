effect @e[hasitem=[{item=sp:warden_helmet,location=slot.armor.head}]] resistance 1 4 true
effect @e[hasitem=[{item=sp:warden_chestplate,location=slot.armor.chest}]] resistance 1 4 true
effect @e[hasitem=[{item=sp:warden_leggings,location=slot.armor.legs}]] resistance 1 4 true
effect @e[hasitem=[{item=sp:warden_boots,location=slot.armor.feet}]] resistance 1 4 true

effect @e[hasitem=[{item=sp:echo_sword,location=slot.weapon.mainhand}]] strength 1 4 true
effect @e[hasitem=[{item=sp:echo_pickaxe,location=slot.weapon.mainhand}]] strength 1 4 true
effect @e[hasitem=[{item=sp:echo_shovel,location=slot.weapon.mainhand}]] strength 1 4 true
effect @e[hasitem=[{item=sp:echo_axe,location=slot.weapon.mainhand}]] strength 1 4 true
effect @e[hasitem=[{item=sp:echo_hoe,location=slot.weapon.mainhand}]] strength 1 4 true

effect @e[hasitem={item=wb:warden_helmet,location=slot.armor.head}] night_vision 1 0 true
effect @e[hasitem={item=wb:warden_chestplate,location=slot.armor.chest}] fire_resistance 1 0 true
execute @e[hasitem={item=wb:warden_boots,location=slot.armor.feet}] ~~~ fill ~ ~ ~ ~ ~-2 ~ wb:air_exp 0 replace sculk_vein
