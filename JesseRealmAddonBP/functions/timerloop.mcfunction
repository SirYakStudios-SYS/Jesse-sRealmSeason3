# Setup
scoreboard objectives add timer dummy

# Loop
scoreboard players add @a timer 1

# Main
execute @a[scores={timer=5}] ~~~ function briars
execute @a[scores={timer=10}] ~~~ function small_cactus

# Timer Update
scoreboard players set @a[scores={timer=10..}] timer 0