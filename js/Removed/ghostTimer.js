const FRAMES_TO_SHOW_GHOST = 80;
const TRANSPARENT_GHOST = 402;
const WARP_GHOST = 401;

framesLeftUntilWarpGhost = FRAMES_TO_SHOW_GHOST;

function warpGhostCountDown(){
  if (framesLeftUntilWarpGhost > 0 ){
      framesLeftUntilWarpGhost--;
      console.log(framesLeftUntilWarpGhost);
  }
}

function summonWarpGhost(){
  if(framesLeftUntilWarpGhost == 0){
    //worldGrid[x] = killGhost;
    console.log("boo!");
  }
}

function handleWarpGhosts(){
  warpGhostCountDown();
  summonWarpGhost();
}
