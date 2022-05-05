{
	"file_path": "C:\\Users\\Owner\\AppData\\Local\\Packages\\Microsoft.MinecraftUWP_8wekyb3d8bbwe\\LocalState\\games\\com.mojang\\development_behavior_packs\\Shields V2\\functions\\atk.mcfunction",
	"file_type": "function",
	"format_version": 0,
	"file_uuid": "200b1afd_6874_499a_a3b2_4ddffbe62d46",
	"file_version": 10,
	"cache_content": "execute @s[tag=slime] ~ ~ ~ summon ray:slime\r\nexecute @s[tag=slime] ~ ~ ~ playsound fall.slime @p \r\nexecute @s[tag=magma] ~ ~ ~ summon minecraft:small_fireball\r\nexecute @s[tag=shulker] ~ ~ ~ effect @s levitation 10 1 \r\nexecute @s[tag=shulker] ~ ~ ~ playsound mob.shulker.shoot @p \r\nexecute @s[tag=evocation] ~ ~ ~ summon evocation_fang\r\nexecute @s[tag=amethyst] ~ ~ ~ execute @p ~ ~ ~ function amethyst\r\nexecute @s[tag=iron] ~ ~ ~ damage @s 3\r\nexecute @s[tag=iron] ~ ~ ~  playsound item.trident.hit_ground @p ~ ~ ~ 1 0.5\r\nexecute @s[tag=cactus] ~ ~ ~ damage @s 2\r\nexecute @s[tag=copper] ~ ~ ~ effect @p resistance 1 255\r\n\r\nexecute @s[tag=copper] ~ ~ ~ summon lightning_bolt\r\n"
}