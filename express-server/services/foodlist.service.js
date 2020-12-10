const config = require('../config.json');
const db = require('../_helpers/database');
const Food = db.FoodLists;

module.exports = {
    getList,
    updateList
};

// Get requested list (by user)
async function getList(username) {
  const list = await Food.findOne({ownerUsername: username}).select();
  return list;
}

// Update given list
async function updateList(newList) {
    //if list exists
    let list = await Food.findOne({ownerUsername: newList.ownerUsername});
    if (list) {
        list.foods = newList.foods;
    }
    else {
        list = new Food(newList);
    }
    await list.save();
}

