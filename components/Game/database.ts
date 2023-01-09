export interface GameAssetInterface {
  images: string[];
}

const images = [
  'illustrate',
  'leg',
  'pie',
  'random',
  'talk',
  'organix',
  'spoon',
  'regular',
  'phone',
  'cord',
  'chopsticks',
  'whine',
  'wine',
  'millie',
  'database',
  'failure',
  'puzzle',
  'sreenshot',
  'game',
  'sick',
  'literal',
  'async',
  'identifier',
  'process',
  'input',
  'file',
  'time',
  'verify',
  'baby',
  'lounge',
  'heaven',
  'clouds',
  'resilience',
  'folder',
  'android',
  'apple',
  'class',
  'outer',
  'space',
  'improved',
  'screen',
  'saver',
  'black',
  'socket',
  'meeting',
  'remote',
  'battery',
  'television',
  'candle',
  'kite',
  'johnny',
  'music',
  'sponge',
  'zebra',
  'lines',
  'crossing',
  'steady',
  'dance',
  'archive',
  'documentspdf',
  'trees',
  'oxygen',
  'spider',
  'encrypted',
];

const gameAsset = [
  {
    type: {
      row: 1,
      col: 3,
    },
    result: {
      inheadenHomePage: {
        images: images
          .slice(0, 3)
          .map((i) => `/assets/game/col3row1/inheadenhomepage/${i}.png`),
        default: '/assets/game/col3row1/inheadenhomepage/default.png',
      },
      denisInTechSpace: {
        images: [
          '/assets/game/col3row1/denisInTechSpace/suit.png',
          '/assets/game/col3row1/denisInTechSpace/killer.png',
          '/assets/game/col3row1/denisInTechSpace/integration.png',
        ],
        default: '/assets/game/col3row1/denisInTechSpace/default.png',
      },
      footer: {
        images: [
          '/assets/game/col3row1/footer/reliable.png',
          '/assets/game/col3row1/footer/breakdown.png',
          '/assets/game/col3row1/footer/punch.png',
        ],
        default: '/assets/game/col3row1/footer/default.png',
      },
    },
  },
  {
    type: {
      row: 2,
      col: 3,
    },
    result: {
      inheadenHomePage: {
        images: [
          '/assets/game/col3row2/inheadenhomepage/theorist.png',
          '/assets/game/col3row2/inheadenhomepage/hell.png',
          '/assets/game/col3row2/inheadenhomepage/morsel.png',
          '/assets/game/col3row2/inheadenhomepage/resignation.png',
          '/assets/game/col3row2/inheadenhomepage/negative.png',
          '/assets/game/col3row2/inheadenhomepage/wonder.png',
        ],
        default: '/assets/game/col3row1/inheadenhomepage/default.png',
      },
      denisInTechSpace: {
        images: [
          '/assets/game/col3row2/denisInTechSpace/integration.png',
          '/assets/game/col3row2/denisInTechSpace/killer.png',
          '/assets/game/col3row2/denisInTechSpace/suit.png',
          '/assets/game/col3row2/denisInTechSpace/strategic.png',
          '/assets/game/col3row2/denisInTechSpace/moon.png',
          '/assets/game/col3row2/denisInTechSpace/marble.png',
        ],
        default: '/assets/game/col3row2/denisInTechSpace/default.png',
      },
      footer: {
        images: [
          '/assets/game/col3row2/footer/at.png',
          '/assets/game/col3row2/footer/flatware.png',
          '/assets/game/col3row2/footer/exclusive.png',
          '/assets/game/col3row2/footer/elbow.png',
          '/assets/game/col3row2/footer/exploit.png',
          '/assets/game/col3row2/footer/tool.png',
        ],
        default: '/assets/game/col3row1/footer/default.png',
      },
    },
  },
  {
    type: {
      row: 3,
      col: 3,
    },
    result: {
      inheadenHomePage: {
        images: [
          '/assets/game/col3row3/inheadenhomepage/theorist.png',
          '/assets/game/col3row3/inheadenhomepage/hell.png',
          '/assets/game/col3row3/inheadenhomepage/morsel.png',
          '/assets/game/col3row3/inheadenhomepage/resignation.png',
          '/assets/game/col3row3/inheadenhomepage/negative.png',
          '/assets/game/col3row3/inheadenhomepage/wonder.png',
          '/assets/game/col3row3/inheadenhomepage/resignation2.png',
          '/assets/game/col3row3/inheadenhomepage/negative2.png',
          '/assets/game/col3row3/inheadenhomepage/wonder2.png',
        ],
        default: '/assets/game/col3row3/inheadenhomepage/default.png',
      },
      denisInTechSpace: {
        images: [
          '/assets/game/col3row3/denisInTechSpace/integration.png',
          '/assets/game/col3row3/denisInTechSpace/killer.png',
          '/assets/game/col3row3/denisInTechSpace/suit.png',
          '/assets/game/col3row3/denisInTechSpace/strategic.png',
          '/assets/game/col3row3/denisInTechSpace/moon.png',
          '/assets/game/col3row3/denisInTechSpace/marble.png',
          '/assets/game/col3row3/denisInTechSpace/strategic2.png',
          '/assets/game/col3row3/denisInTechSpace/moon2.png',
          '/assets/game/col3row3/denisInTechSpace/marble2.png',
        ],
        default: '/assets/game/col3row2/denisInTechSpace/default.png',
      },
      footer: {
        images: [
          '/assets/game/col3row3/footer/at.png',
          '/assets/game/col3row3/footer/flatware.png',
          '/assets/game/col3row3/footer/exclusive.png',
          '/assets/game/col3row3/footer/elbow.png',
          '/assets/game/col3row3/footer/exploit.png',
          '/assets/game/col3row3/footer/tool.png',
          '/assets/game/col3row3/footer/elbow2.png',
          '/assets/game/col3row3/footer/exploit2.png',
          '/assets/game/col3row3/footer/tool2.png',
        ],
        default: '/assets/game/col3row1/footer/default.png',
      },
    },
  },

  {
    type: {
      col: 5,
      row: 3,
    },
    result: {
      inheadenHomePage: {
        images: images
          .slice(0, 15)
          .map((i) => `/assets/game/col5row3/inheadenhomepage/${i}.png`),
        default: '/assets/game/col3row1/inheadenhomepage/default.png',
      },
      denisTechSpace: {
        images: images
          .slice(0, 15)
          .map((i) => `/assets/game/col5row3/denisInTechSpace/${i}.png`),
        default: '/assets/game/col3row1/denisInTechSpace/default.png',
      },
      footer: {
        images: images
          .slice(0, 15)
          .map((i) => `/assets/game/col5row3/footer/${i}.png`),
        default: '/assets/game/col3row1/footer/default.png',
      },
    },
  },

  {
    type: {
      col: 7,
      row: 4,
    },
    result: {
      inheadenHomePage: {
        images: images
          .slice(0, 28)
          .map((i) => `/assets/game/col7row4/inheadenhomepage/${i}.png`),
        default: '/assets/game/col3row1/inheadenhomepage/default.png',
      },
      denisTechSpace: {
        images: images
          .slice(0, 28)
          .map((i) => `/assets/game/col7row4/denisInTechSpace/${i}.png`),
        default: '/assets/game/col3row1/denisInTechSpace/default.png',
      },
      footer: {
        images: images
          .slice(0, 28)
          .map((i) => `/assets/game/col7row4/footer/${i}.png`),
        default: '/assets/game/col3row1/footer/default.png',
      },
    },
  },

  {
    type: {
      col: 8,
      row: 6,
    },
    result: {
      inheadenHomePage: {
        images: images
          .slice(0, 60)
          .map((i) => `/assets/game/col8row6/inheadenhomepage/${i}.png`),
        default: '/assets/game/col3row1/inheadenhomepage/default.png',
      },
      denisTechSpace: {
        images: images
          .slice(0, 60)
          .map((i) => `/assets/game/col8row6/denisInTechSpace/${i}.png`),
        default: '/assets/game/col3row1/denisInTechSpace/default.png',
      },
      footer: {
        images: images
          .slice(0, 60)
          .map((i) => `/assets/game/col8row6/footer/${i}.png`),
        default: '/assets/game/col3row1/footer/default.png',
      },
    },
  },
];

export default gameAsset;
