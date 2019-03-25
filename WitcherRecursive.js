/*
    Input: ([{armorType: <type>, name: <name>, cost: <cost>, armor: <value>}], <bank>)
      <type> = helmet, chest, leggings, boots
      <name> = unique identifier (assume is unique)
      <cost> = price in crowns
      <armor_value> = value we are looking to maximize
      <bank> = potential spending cash in crowns

    Output: { head: <name>, chest: <name>, leggings: <name>, boots: <name>, flex: <name> }

    Constraints:
      • At a minimum should work for the data set provide

    Self imposed constraints:
      • Should work for any armor (even places with more armor pieces and different values)
      • Should work for additional armor slots (gauntlets, bracers, shouldpads)
      • Should be the optimal solution for time complexity, then space complexity
*/

/*
  Naive brute force:
    Recurse each combination of armor.
    Stop the recurse when cost exceeds bank (input) or all armor has been selected
    Only save armor categories with each type of armor (and if they are better than the existing)
      Time: 0(n^slots)    Space: O(n^slots);

  Optimization A:
    Use memoization on the Naive brute force to reduce the time complexity to O(n log n)
    of all possible combinations
      Time: O(n log^slots)   Space: O(n^slots);


  Optimization B:
    Categorize data to prevent duplicate combinations from being evaluated to begin with
    Recurse using a combinatorics approach. This is flexible and can handle changes to the
    number of armor slots and the amount of armor.
      Time: O(n log^slots)  Space: O(n^slots)

  Optimization C:
    Reduce memory cost by solving this with an iterative, rather than recurisve approach
    Categorize the data and hand code the loops from Optimization B;

*/

// Optimization B:
const witcherB = (armor, bank) => {
  let bestCombo;
  let maxArmor = -Infinity;
  let price;
  let options = { slots: [] };

  armor.map((e) => {
    if (!options[e.armorType]) {
      options[e.armorType] = [];
      options.slots.push(e.armorType);
    }
    options[e.armorType].push(e);
  });
  options.slots.push('Flex');

  const evaluate = (combo, value, cost) => {
    if (value < maxArmor) { return; }
    if (value === maxArmor && cost > price) { return; }
    maxArmor = value;
    bestCombo = combo;
    price = cost;
  }

  const recursively = (combo, value, cost, index, flexOptions) => {
    if (cost > bank) {
      return;
    }

    if (index === options.slots.length) {
      evaluate(combo, value, cost);
      return;
    }

    const slot = options.slots[index];
    let selectFrom = (slot === 'Flex') ? flexOptions : options[slot];

    for (let j = 0; j < selectFrom.length; j += 1) {
      const item = selectFrom[j];
      recursively(
        combo.concat([[slot, item.name]]),
        value + item.armor,
        cost + (slot === "Flex" ? 0 : item.cost),
        index + 1,
        flexOptions.concat(selectFrom.slice(0, j).concat(selectFrom.slice(j + 1)))
      );
    }
  }
  recursively([], 0, 0, 0, []);


  const formattedAnswer = {armor: maxArmor, cost: price };
  bestCombo.map(e => {
    formattedAnswer[e[0]] = e[1];
    return e;
  })
  return formattedAnswer;
}

const oldData = [
  ['Helmet','Serpentine Cruz Headpiece',90,23],
  ['Leggings','Famed Pon Leggings',87,22],
  ['Leggings','Ursine Trousers',78,18],
  ['Helmet','Keeton Mask',77,24],
  ['Leggings','Wolven Shinguards',75,15],
  ['Leggings',"Hansen'sBreeches",69,17],
  ['Helmet','Feline Visor',68,16],
  ['Chest','Armor de Jandro',67,22],
  ['Chest','Chestpiece of Vachon',64,23],
  ['Boots','Diamond Boots',64,18],
  ['Leggings','Griffin Pants',62,11],
  ['Chest','Kaer Morhen Armor',62,21],
  ['Helmet','Ornate Helmet of Cagampan',60,16],
  ['Chest','Cured Leather Chestpiece',59,20],
  ['Leggings','Tanned Leg Protection',59,15],
  ['Chest',"Smith's Plated Chestguard",58,10],
  ['Chest','Dented Plate Armor',57,19],
  ['Leggings','Manticore Braces',56,12],
  ['Chest','Jeweled Drake Tunic',55,19],
  ['Chest',"Ginger's Gilded Armor",54,18],
  ['Helmet','Offner Protector',54,15],
  ['Leggings','Mail Emares Leggings',53,14],
  ['Boots','Steel Boots',52,14],
  ['Boots',"Tate's Spiked Cleats",52,20],
  ['Chest','Garcia Guard',50,17],
  ['Helmet','Leather Helmet',49,13],
  ['Leggings',"Woven Leggings",47,11],
  ['Helmet',"Sligar's Noggin Protector",46,12],
  ['Leggings','Silken Pants',45,10],
  ['Helmet','Glass Bowl',44,12],
  ['Leggings', 'Tattered Shorts',42,13],
  ['Boots','Leather Lunde Shoes',35,7],
  ['Boots','Cloth Shoes',33,5]
];

const converData = (arr) => {
  const newShape = [];
  arr.map(e => {
    const element = {}
    element.armorType = e[0];
    element.name = e[1];
    element.cost = e[2];
    element.armor = e[3];
    newShape.push(element);
  });
  return newShape;
}

witcherB(converData(oldData), 300);
