const config = require('../config.json');
const db = require('../_helpers/database');
const Food = db.FoodLists;

module.exports = {
    getList,
    updateList
};

// Get requested list (by user)
async function getList(username) {
  console.log(username);
  const list = await Food.findOne({ownerUsername: username}).select();
  console.log(list);
  return list;
}

// Update given list
async function updateList(newList) {
    //if list exists
    console.log(newList);
    let list = await Food.findOne({ownerUsername: newList.ownerUsername});
    console.log(list);
    if (list) {
        list.foods = newList.foods;
    }
    else {
        console.log("creating new list")
        list = new Food(newList);
    }
    await list.save();
}

