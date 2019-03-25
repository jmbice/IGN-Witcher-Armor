//Iterative, flexible to type of armor slots
const witcher = (armorData, bank) => {
  let bestCombo;
  let armor = 0;
  let price = 0;
  let flexName;
  const functions = [];
  const combo = { cost: 0, value: 0 };

  //build armory list
  const armory = { slots: [], all: [] };
  armorData.map(e => {
    if (!armory[e[0]]) {
      armory[e[0]] = [];
      armory.slots.push(e[0]);
    }
    armory[e[0]].push({ name:e[1], cost:e[2], value:e[3] });
    armory.all.push({ name:e[1], cost:e[2], value:e[3] });
  });

  const evaluate = () => {
    const testCase = {...combo};
    if (testCase.value > armor || (testCase.value === armor && price > testCase.cost)) {
      bestCombo = testCase;
      price = bestCombo.cost;
      armor = bestCombo.value;
    }
    return;
  };

  const flexLoop = (fn) => {
    return () => {
      armory.all.map(e => {
        const flexItem = {...e};
        flexName = flexItem.name;
        combo.flex = flexItem.name;
        combo.value += flexItem.value;
        fn(0);
        combo.value -= flexItem.value;
        delete combo.flex;
      });
    }
  }

  const slotLoop = (fn) => {
    return (...args) => {
      let i = args[0];
      const slot = armory.slots[i];
      for (let j = 0; j < armory[slot].length; j += 1) {
        const item = {...armory[slot][j]}
        if (flexName === item.name) { continue; }
        combo[slot] = item.name;
        combo.value += item.value;
        combo.cost += item.cost;
        if (i === 3) { evaluate(); } else { fn(i + 1); }
        combo.value -= item.value;
        combo.cost -= item.cost;
        delete combo[slot];
      }
    };
  };

  //create funciton list
  for (let z = 0; z < armory.slots.length; z += 1) {
    functions.push(slotLoop);
  }
  functions.push(flexLoop);

  //interweave list into chain
  const chain = functions.reduce((prev, curr) => {
    return prev = curr(prev);
  }, evaluate);

  //call chain
  chain();

  return bestCombo;
}

const data = [
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

witcher(data, 300);
