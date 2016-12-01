function mergeRooms (){
  console.log('ready to merge darling');
  //TODO 24 is the correct index but isn't working
  //loadLevel(24);
  //provisional means of demoing the floor merge, it's just the guts of the loadLevel function
  worldGrid = levelKitchenBedroomFourMerged.slice();
  roman.reset(heroPic, "Roman");
}

function unmergeRooms(){
  //TODO change to unmergeRooms
  console.log('unmerged dear');
  loadLevel(5);
}
