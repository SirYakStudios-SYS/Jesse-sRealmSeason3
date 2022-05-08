#bridge-file-version: #3
scoreboard objectives add lagdespawn dummy lagdespawn

scoreboard players add @e[type=item,name="cobblestone"] lagdespawn 1
scoreboard players add @e[type=item,name="stone"] lagdespawn 1
scoreboard players add @e[type=item,name="granite"] lagdespawn 1
scoreboard players add @e[type=item,name="andersite"] lagdespawn 1
scoreboard players add @e[type=item,name="diorite"] lagdespawn 1
scoreboard players add @e[type=item,name="deepslate"] lagdespawn 1
scoreboard players add @e[type=item,name="cobbled deepslate"] lagdespawn 1
scoreboard players add @e[type=item,name="dirt"] lagdespawn 1
scoreboard players add @e[type=item,name="sand"] lagdespawn 1
scoreboard players add @e[type=item,name="endstone"] lagdespawn 1
scoreboard players add @e[type=item,name="netherrack"] lagdespawn 1
scoreboard players add @e[type=item,name="soulsand"] lagdespawn 1
scoreboard players add @e[type=item,name="tuff"] lagdespawn 1
scoreboard players add @e[type=item,name="gravel"] lagdespawn 1
scoreboard players add @e[type=item,name="ice"] lagdespawn 1
scoreboard players add @e[type=snowball] lagdespawn 1
scoreboard players add @e[type=arrow] lagdespawn 1
 
kill @e[type=item,name="cobblestone",scores={lagdespawn=100..}]
kill @e[type=item,name="stone",scores={lagdespawn=100..}]
kill @e[type=item,name="granite",scores={lagdespawn=100..}]
kill @e[type=item,name="andersite",scores={lagdespawn=100..}]
kill @e[type=item,name="diorite",scores={lagdespawn=100..}]
kill @e[type=item,name="deepslate",scores={lagdespawn=100..}]
kill @e[type=item,name="cobbled deepslate",scores={lagdespawn=100..}]
kill @e[type=item,name="dirt",scores={lagdespawn=100..}]
kill @e[type=item,name="sand",scores={lagdespawn=140..}]
kill @e[type=item,name="endstone",scores={lagdespawn=100..}]
kill @e[type=item,name="netherrack",scores={lagdespawn=100..}]
kill @e[type=item,name="soulsand",scores={lagdespawn=100..}]
kill @e[type=snowball,scores={lagdespawn=140..}]
kill @e[type=arrow,scores={lagdespawn=300..}]
kill @e[type=item,name="tuff",scores={lagdespawn=100..}]
kill @e[type=item,name="gravel",scores={lagdespawn=100..}]
kill @e[type=item,name="ice",scores={lagdespawn=140..}]
