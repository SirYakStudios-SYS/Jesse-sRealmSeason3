import { world, BlockLocation } from "mojang-minecraft";

world.events.blockBreak.subscribe((blockEvent) => {
    let p = blockEvent.player;
    let block = blockEvent.block;

    let location = [
      blockEvent.block.location.x,
      blockEvent.block.location.y,
      blockEvent.block.location.z
    ];

    let container = p.getComponent("inventory").container;
    let hand = container.getItem(p.selectedSlot);

    let id = hand.id

    let items = ["_axe", "hacha", "tomahawk", "battleaxe", "chainsaw"]
    
    for(let itemsID of items){
        if (id.toLowerCase().includes(itemsID) && p.isSneaking == false) {
          p.runCommand(`summon new:axe ${location[0]} ${location[1] + 1} ${location[2]} new:axe_function`);
      }
    } 

});



world.events.beforeItemUseOn.subscribe((useOn) =>{

     let pl = useOn.source;
     let blockLocation = [
        useOn.blockLocation.x,
        useOn.blockLocation.y,
        useOn.blockLocation.z

     ];
     let item = useOn.item.id;
     let itemId = ["_axe", "hacha", "tomahawk", "battleaxe", "chainsaw"];
     pl.addTag("active");

     for(let i of itemId){
        if(item.toLowerCase().includes(i) && pl.isSneaking && pl.hasTag("active")){
           pl.removeTag("active");
           pl.runCommand(`summon new:axe2 ${blockLocation[0]} ${blockLocation[1]} ${blockLocation[2]} new:axe2_function`);
        }
     }


     

});