//Witcher iterative solution with armor-slot loops hardcoded

const witcher = (armorData, bank) => {
  let bestCombo;
  let armor = 0;
  let price = 0;
  const functions = [];
  const combo = { cost: 0, value: 0 };

  //build armoroy list
  const armory = { slots: [], all: [] };
  armorData.map(e => {
    if (!armory[e[0]]) {
      armory[e[0]] = [];
      armory.slots.push(e[0]);
    }
    armory[e[0]].push({ name:e[1], cost:e[2], value:e[3] });
    armory.all.push({ name:e[1], cost:e[2], value:e[3] });
  });

  //this function  evaluates the combos for best value, then price
  const evaluate = () => {
    const testCase = {...combo};
    if (testCase.value > armor || (testCase.value === armor && price > testCase.cost)) {
      bestCombo = testCase;
      price = bestCombo.cost;
      armor = bestCombo.value;
    }
    return
  };

  for (let j = 0; j < armory.all.length; j += 1) {
    let flex = {...armory.all[j]}
    combo.flex = flex.name;
    combo.value += flex.value;
    for (let z = 0; z < armory.Helmet.length; z += 1) {
      let helmet = {...armory.Helmet[z]};
      if (helmet.name === flex.name) { continue; }
      combo.helmet = helmet.name;
      combo.value += helmet.value;
      combo.cost += helmet.cost;
      for (let m = 0; m < armory.Chest.length; m += 1) {
        let chest = {...armory.Chest[m]};
        if (chest.name === flex.name) { continue; }
        combo.chest = chest.name;
        combo.value += chest.value;
        combo.cost += chest.cost;
        for (let r = 0; r < armory.Leggings.length; r += 1) {
          let leggings = {...armory.Leggings[r]};
          if (leggings.name === flex.name) { continue; }
          combo.leggings = leggings.name;
          combo.value += leggings.value;
          combo.cost += leggings.cost;
          for (let s = 0; s < armory.Boots.length; s += 1) {
            let boots = {...armory.Boots[s]};
            if (boots.name === flex.name) { continue; }
            combo.boots = boots.name;
            combo.value += boots.value;
            combo.cost += boots.cost;
            if (combo.cost < bank) { evaluate(); }
            combo.value -= boots.value;
            combo.cost -= boots.cost;
          }
          combo.value -= leggings.value;
          combo.cost -= leggings.cost;
        }
        combo.value -= chest.value;
        combo.cost -= chest.cost;
      }
      combo.value -= helmet.value;
      combo.cost -= helmet.cost;
    }
    combo.value -= flex.value;
  }

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
