const fs = require("fs");

const images = [
  "illustrate",
  "leg",
  "pie",
  "random",
  "talk",
  "organix",
  "spoon",
  "regular",
  "phone",
  "cord",
  "chopsticks",
  "whine",
  "wine",
  "millie",
  "database",
  "failure",
  "puzzle",
  "sreenshot",
  "game",
  "sick",
  "literal",
  "async",
  "identifier",
  "process",
  "input",
  "file",
  "time",
  "verify",
  "baby",
  "lounge",
  "heaven",
  "clouds",
  "resilience",
  "folder",
  "android",
  "apple",
  "class",
  "outer",
  "space",
  "improved",
  "screen",
  "saver",
  "black",
  "socket",
  "meeting",
  "remote",
  "battery",
  "television",
  "candle",
  "kite",
  "johnny",
  "music",
  "sponge",
  "zebra",
  "lines",
  "crossing",
  "steady",
  "dance",
  "archive",
  "documentspdf",
  "trees",
  "oxygen",
  "spider",
  "encrypted",
  "Kaleigh",
  "Jamar",
  "Lucie",
  "Nyah",
  "Shirley",
  "Tre",
  "Violet",
  "Collin",
  "Josie",
  "Buford",
  "Talia",
  "Dena",
  "Brice",
  "Barry",
  "Columbus",
  "Marielle",
  "Hillary",
  "Ruben",
  "Florine",
  "Sheridan",
  "Kristy",
  "Marcel",
  "Khalil",
  "Guiseppe",
  "Jake",
  "Clint",
  "Mia",
  "Blake",
  "Bryana",
  "Demario",
  "Kathryne",
  "Ramona",
  "Devin",
  "Sigurd",
  "Monica",
  "Adah",
  "Margret",
  "Khalid",
  "Hermina",
  "Whitney",
  "Ruthie",
  "Lacey",
  "Kira",
  "Elsa",
  "Jennyfer",
  "Michael",
  "Jaydon",
  "Linda",
  "Alfreda",
  "Alexie",
  "Katarina",
  "Cale",
  "Stefan",
  "Chad",
  "Shawn",
  "Gilbert",
  "Rhianna",
  "Marietta",
  "Jarret",
  "Agustin",
  "Alan",
  "Herminia",
  "Andre",
  "Reta",
  "Etha",
  "Isabel",
  "Stan",
  "Kayden",
  "Deven",
  "Nick",
  "Yadira",
  "Marilou",
  "Gia",
  "Karen",
  "Macie",
  "Fern",
  "Alexys",
  "Theresa",
  "Cheyanne",
  "Eugenia",
  "Godfrey",
  "Christina",
  "Abbey",
  "Cristina",
  "Chanel",
  "Reynold",
  "Naomie",
  "Olga",
  "Rigoberto",
  "Estel",
  "Ismael",
  "Fidel",
  "Tia",
  "Jett",
  "Dannie",
  "Jaron",
  "Queenie",
  "Theron",
  "Abby",
  "Skyla",
  "Horace",
  "Kadin",
  "Juanita",
  "Mandy",
  "Elliot",
  "Karley",
  "Vita",
  "Oren",
  "Jayson",
  "Alexa",
  "Bertha",
  "Lenore",
  "Demetrius",
  "Anika",
  "Vern",
  "Kennith",
  "Romaine",
  "Murl",
  "Fannie",
  "Rex",
  "Kaela",
  "Lafayette",
  "Hope",
  "Ludwig",
  "Alvah",
  "Florence",
  "Josiane",
  "Emmalee",
  "Victor",
  "Junius",
  "Ambrose",
  "Alysha",
  "Alivia",
  "Mortimer",
  "Austin",
  "Novella",
  "Rosalee",
  "Andreanne",
  "Ava",
  "Rasheed",
  "Gina",
  "Evan",
  "Delta",
  "Rashawn",
  "Stuart",
  "Ryan",
  "Ayana",
  "Alvis",
  "Lou",
  "Raymond",
  "Lily",
  "Justen",
  "Royal",
  "Abdul",
  "Lessie",
  "Joshua",
  "Tod",
  "Mozell",
  "Jaylin",
  "Emilio",
  "Brandyn",
  "Asa",
  "Zoey",
  "Alena",
  "Maybelle",
  "Mikel",
  "Molly",
  "Eliane",
  "Dixie",
  "Ward",
  "Emmanuel",
  "Kaylin",
  "Joe",
  "Kameron",
  "Karianne",
  "Ahmad",
  "Oliver",
  "Charlie",
  "Tobin",
  "Amya",
  "Geovanny",
  "Edward",
  "Dessie",
  "Penelope",
  "Louisa",
  "Bella",
  "Marquise",
  "Kenna",
  "Kamren",
  "Rogers",
  "Kelly",
  "Tito",
  "Hassan",
  "Reginald",
  "Gaston",
  "Jaylan",
  "Milford",
  "Aletha",
  "Melyna",
  "Lazaro",
  "Beau",
  "Kendall",
  "Jerel",
  "Jerrold",
  "Luther",
  "Dwight",
  "Madisen",
  "Noemie",
  "Dax",
  "Travon",
  "Jaylon",
  "Lourdes",
  "Julia",
  "Stephany",
  "Lorenzo",
  "Marcia",
  "Leila",
  "Ned",
  "Faustino",
  "Yvette",
  "Jammie",
  "Jayme",
  "Camden",
  "Sharon",
  "Dayana",
  "Corene",
  "Omer",
  "Daron",
  "Audie",
  "Mathilde",
  "Jermain",
  "Kirk",
  "Devyn",
  "Virgil",
  "Clemens",
  "Delia",
  "Lia",
  "Gail",
  "Jamir",
  "Aron",
  "Rebekah",
  "Wilford",
  "Mason",
  "Serena",
  "Judy",
  "Joan",
  "Chris",
  "Syble",
  "Bethany",
  "Mittie",
  "Soledad",
  "Willow",
  "Gennaro",
  "Carol",
  "Rolando",
  "Quinten",
  "Doug",
  "Freeman",
  "Laisha",
  "Eliezer",
  "Shanna",
  "Jedediah",
  "Colten",
  "Nicolette",
  "Bessie",
  "Emelia",
  "Dino",
  "Emerson",
  "Jean",
  "Arvid",
  "Cody",
  "Laury",
  "Ceasar",
  "Simeon",
  "Savion",
  "Elisabeth",
  "Jaime",
  "Loraine",
  "Norberto",
  "Jacklyn",
  "Beulah",
  "Janis",
  "Jovan",
  "Daija",
  "Gus",
];

const space = `public/assets/game/col6row6`;

images.forEach((name, indx) => {
  fs.rename(
    `${space}/denisInTechSpace/${indx + 1}.png`,
    `${space}/denisInTechSpace/${name}.png`,
    (e) => {
      console.log(e);
    }
  );
});

images.forEach((name, indx) => {
  fs.rename(
    `${space}/footer/${indx + 1}.png`,
    `${space}/footer/${name}.png`,
    (e) => {
      console.log(e);
    }
  );
});

images.forEach((name, indx) => {
  fs.rename(
    `${space}/inheadenhomepage/${indx + 1}.png`,
    `${space}/inheadenhomepage/${name}.png`,
    (e) => {
      console.log(e);
    }
  );
});
