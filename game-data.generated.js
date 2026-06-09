// AUTO-GENERADO por tools/game-export.js desde GAME.md — NO EDITAR A MANO.
// Regenerar con:  node tools/game-export.js
window.GAME = {
  "TYPES": {
    "fuego": {
      "c": "#D85A30",
      "bg": "#FAECE7",
      "icon": "ti-flame"
    },
    "agua": {
      "c": "#185FA5",
      "bg": "#E6F1FB",
      "icon": "ti-droplet"
    },
    "planta": {
      "c": "#3B6D11",
      "bg": "#EAF3DE",
      "icon": "ti-leaf"
    },
    "normal": {
      "c": "#5F5E5A",
      "bg": "#F1EFE8",
      "icon": "ti-paw"
    }
  },
  "EFF": {
    "fuego": {
      "planta": 2,
      "agua": 0.5,
      "fuego": 0.5
    },
    "agua": {
      "fuego": 2,
      "planta": 0.5,
      "agua": 0.5
    },
    "planta": {
      "agua": 2,
      "fuego": 0.5,
      "planta": 0.5
    },
    "normal": {}
  },
  "STATUS": {
    "burn": {
      "tag": "QUE",
      "c": "#D85A30",
      "bg": "#FAECE7",
      "hit": "¡{n} sufre quemaduras!"
    },
    "par": {
      "tag": "PAR",
      "c": "#8A6A1F",
      "bg": "#FBF3D0",
      "hit": "¡{n} quedó paralizado!"
    }
  },
  "MOVES": {
    "ascuas": {
      "n": "Ascuas",
      "t": "fuego",
      "p": 40,
      "st": "burn",
      "sc": 0.1
    },
    "llamarada": {
      "n": "Llamarada",
      "t": "fuego",
      "p": 55,
      "st": "burn",
      "sc": 0.2
    },
    "chorro": {
      "n": "Chorro",
      "t": "agua",
      "p": 40
    },
    "maremoto": {
      "n": "Maremoto",
      "t": "agua",
      "p": 55
    },
    "latigo": {
      "n": "Látigo verde",
      "t": "planta",
      "p": 40
    },
    "hojafilo": {
      "n": "Hoja filo",
      "t": "planta",
      "p": 55
    },
    "placaje": {
      "n": "Placaje",
      "t": "normal",
      "p": 35
    },
    "mordisco": {
      "n": "Mordisco",
      "t": "normal",
      "p": 45
    },
    "colmillo": {
      "n": "Colmillo ígneo",
      "t": "fuego",
      "p": 50,
      "st": "burn",
      "sc": 0.3
    },
    "esporas": {
      "n": "Esporas",
      "t": "planta",
      "p": 35,
      "st": "par",
      "sc": 0.35
    },
    "aturdir": {
      "n": "Aturdir",
      "t": "normal",
      "p": 40,
      "st": "par",
      "sc": 0.3
    }
  },
  "SPECIES": {
    "Flarito": {
      "t": "fuego",
      "hp": 44,
      "atk": 12,
      "mv": [
        "ascuas",
        "placaje"
      ],
      "evo": "Flaranto",
      "evoLvl": 12,
      "starter": true
    },
    "Aquino": {
      "t": "agua",
      "hp": 48,
      "atk": 11,
      "mv": [
        "chorro",
        "placaje"
      ],
      "evo": "Aquantor",
      "evoLvl": 12,
      "starter": true
    },
    "Brotin": {
      "t": "planta",
      "hp": 50,
      "atk": 10,
      "mv": [
        "latigo",
        "placaje"
      ],
      "evo": "Brotalon",
      "evoLvl": 12,
      "starter": true
    },
    "Flaranto": {
      "t": "fuego",
      "hp": 60,
      "atk": 16,
      "mv": [
        "llamarada",
        "mordisco"
      ]
    },
    "Aquantor": {
      "t": "agua",
      "hp": 64,
      "atk": 15,
      "mv": [
        "maremoto",
        "mordisco"
      ]
    },
    "Brotalon": {
      "t": "planta",
      "hp": 66,
      "atk": 14,
      "mv": [
        "hojafilo",
        "mordisco"
      ]
    },
    "Ratopo": {
      "t": "normal",
      "hp": 36,
      "atk": 9,
      "mv": [
        "placaje",
        "mordisco"
      ],
      "habitats": [
        "G"
      ]
    },
    "Llamiza": {
      "t": "fuego",
      "hp": 40,
      "atk": 11,
      "mv": [
        "ascuas",
        "placaje"
      ],
      "habitats": [
        "G"
      ]
    },
    "Gotalia": {
      "t": "agua",
      "hp": 42,
      "atk": 10,
      "mv": [
        "chorro",
        "mordisco"
      ],
      "habitats": [
        "G",
        "A"
      ]
    },
    "Hojarin": {
      "t": "planta",
      "hp": 44,
      "atk": 9,
      "mv": [
        "latigo",
        "placaje"
      ],
      "habitats": [
        "G"
      ]
    },
    "Fumarol": {
      "t": "fuego",
      "hp": 46,
      "atk": 13,
      "mv": [
        "ascuas",
        "mordisco"
      ],
      "habitats": [
        "B"
      ]
    },
    "Torrentin": {
      "t": "agua",
      "hp": 50,
      "atk": 13,
      "mv": [
        "chorro",
        "mordisco"
      ],
      "habitats": [
        "B",
        "A"
      ]
    },
    "Espinor": {
      "t": "planta",
      "hp": 52,
      "atk": 12,
      "mv": [
        "latigo",
        "mordisco"
      ],
      "habitats": [
        "B"
      ]
    },
    "Sombrux": {
      "t": "normal",
      "hp": 48,
      "atk": 14,
      "mv": [
        "mordisco",
        "placaje"
      ],
      "habitats": [
        "B"
      ]
    },
    "Magmoz": {
      "t": "fuego",
      "hp": 54,
      "atk": 15,
      "mv": [
        "colmillo",
        "mordisco"
      ],
      "habitats": [
        "M"
      ]
    },
    "Cascadon": {
      "t": "agua",
      "hp": 58,
      "atk": 14,
      "mv": [
        "maremoto",
        "aturdir"
      ],
      "habitats": [
        "M"
      ]
    },
    "Zarzudo": {
      "t": "planta",
      "hp": 60,
      "atk": 13,
      "mv": [
        "esporas",
        "hojafilo"
      ],
      "habitats": [
        "M"
      ]
    },
    "Rocaroz": {
      "t": "normal",
      "hp": 62,
      "atk": 15,
      "mv": [
        "aturdir",
        "mordisco"
      ],
      "habitats": [
        "M"
      ]
    },
    "Ondino": {
      "t": "agua",
      "hp": 46,
      "atk": 12,
      "mv": [
        "chorro",
        "aturdir"
      ],
      "habitats": [
        "A"
      ]
    },
    "Coralix": {
      "t": "planta",
      "hp": 52,
      "atk": 11,
      "mv": [
        "esporas",
        "latigo"
      ],
      "habitats": [
        "A"
      ]
    }
  },
  "DESCS": {
    "Flarito": "Una chispa con patas. Enciende la punta de su cola cuando se emociona, y la apaga de un soplido para dormir.",
    "Aquino": "Escupe chorros precisos para cazar insectos. Dicen que nunca falla dos veces seguidas.",
    "Brotin": "Le brota una hoja nueva cada vez que aprende algo. Los más viejos parecen arbustos caminantes.",
    "Flaranto": "La evolución templó su llama, y ya no chispea, ruge. Su mordida deja brasas.",
    "Aquantor": "Genera mareas en miniatura con un giro del cuerpo. Los pescadores lo siguen para encontrar cardúmenes.",
    "Brotalon": "Sus hojas cortan como navajas y se afilan solas con el rocío del amanecer.",
    "Ratopo": "Cava túneles cortos por toda la pradera. Si lo perdés de vista, ya está atrás tuyo.",
    "Llamiza": "Una brasa errante que chamusca el pasto seco donde pisa. Por suerte, pisa poco.",
    "Gotalia": "Vive entre el pasto húmedo y la orilla del lago. Carga una gota en la frente que nunca se cae.",
    "Hojarin": "Se disfraza de planta común. La diferencia es que las plantas no estornudan.",
    "Fumarol": "Exhala humo espeso para esconderse en el bosque oscuro. Se le ve la nariz brillar entre la niebla.",
    "Torrentin": "Un torrente con mal humor. Embiste a todo lo que se mueva más rápido que él.",
    "Espinor": "Cada espina de su lomo es un trofeo de combate. A los más viejos casi no les queda lugar libre.",
    "Sombrux": "Aparece donde la sombra del bosque es más densa. Nadie lo vio llegar, ni irse.",
    "Magmoz": "Sus colmillos guardan calor de magma. Duerme enterrado en ceniza volcánica.",
    "Cascadon": "Trepa cascadas a contracorriente para demostrar fuerza. El que llega arriba lidera el cardumen.",
    "Zarzudo": "Una zarza andante que paraliza con esporas a quien intente podarla.",
    "Rocaroz": "Un peñasco con carácter. Aturde a sus rivales a cabezazos y jamás retrocede.",
    "Ondino": "Surfea las olas del lago sin esfuerzo. Su silbido anuncia tormenta.",
    "Coralix": "Un jardín de coral en miniatura. Sus esporas adormecen hasta al pescador más paciente."
  },
  "TRAINERS": {
    "1": {
      "name": "Bruno",
      "team": [
        [
          "Llamiza",
          7
        ],
        [
          "Fumarol",
          9
        ]
      ],
      "reward": {
        "balls": 3,
        "p": 2,
        "s": 0,
        "c": 60
      }
    },
    "2": {
      "name": "Sora",
      "team": [
        [
          "Torrentin",
          11
        ],
        [
          "Sombrux",
          12
        ]
      ],
      "reward": {
        "balls": 4,
        "p": 0,
        "s": 2,
        "c": 90
      }
    },
    "3": {
      "name": "Lia",
      "team": [
        [
          "Hojarin",
          6
        ]
      ],
      "reward": {
        "balls": 2,
        "p": 1,
        "s": 0,
        "c": 35
      }
    },
    "4": {
      "name": "Magna",
      "team": [
        [
          "Magmoz",
          14
        ],
        [
          "Zarzudo",
          15
        ],
        [
          "Rocaroz",
          16
        ]
      ],
      "reward": {
        "balls": 5,
        "p": 2,
        "s": 2,
        "c": 250
      },
      "requires": [
        1,
        2,
        3
      ],
      "champion": true
    }
  },
  "SHOP": {
    "ball": {
      "n": "Esfera",
      "pr": 8,
      "ic": "ti-circle-dot"
    },
    "p": {
      "n": "Poción (+25 PS)",
      "pr": 10,
      "ic": "ti-flask"
    },
    "s": {
      "n": "Superpoción (+60 PS)",
      "pr": 25,
      "ic": "ti-flask-2"
    },
    "ma": {
      "n": "Montura acuática",
      "pr": 120,
      "ic": "ti-droplet",
      "mount": "agua",
      "d": "permite cruzar el agua"
    },
    "mm": {
      "n": "Montura montés",
      "pr": 160,
      "ic": "ti-mountain",
      "mount": "montes",
      "d": "permite escalar rocas"
    }
  },
  "TILES": {
    "T": {
      "bg": "#27500A",
      "icon": "ti-tree",
      "ic": "#C0DD97",
      "solid": true
    },
    "G": {
      "bg": "#C0DD97"
    },
    "B": {
      "bg": "#639922",
      "icon": "ti-trees",
      "ic": "#EAF3DE"
    },
    "A": {
      "bg": "#85B7EB",
      "mount": "agua"
    },
    "C": {
      "bg": "#F4C0D1",
      "icon": "ti-heart",
      "ic": "#993556",
      "effect": "heal"
    },
    "M": {
      "bg": "#CBB089",
      "icon": "ti-mountain",
      "ic": "#7A5B3A"
    },
    "R": {
      "bg": "#9A8F80",
      "icon": "ti-mountain",
      "ic": "#4F463A",
      "mount": "montes"
    },
    "S": {
      "bg": "#F2D89B",
      "icon": "ti-building-store",
      "ic": "#8A6A1F",
      "screen": "shop"
    },
    "H": {
      "bg": "#F7E3C0",
      "icon": "ti-egg",
      "ic": "#A8743B",
      "screen": "breed"
    },
    "h": {
      "bg": "#D9CBB5",
      "icon": "ti-home",
      "ic": "#6B5337",
      "solid": true
    },
    "W": {
      "bg": "#D8C8E8",
      "icon": "ti-tools",
      "ic": "#5E4585",
      "screen": "craft"
    },
    "X": {
      "bg": "#C8E0D8",
      "icon": "ti-compass",
      "ic": "#2E6E5A",
      "screen": "expd"
    },
    "P": {
      "bg": "#CFE0F2",
      "icon": "ti-box",
      "ic": "#2C5E8F",
      "screen": "box"
    },
    "E": {
      "bg": "#EFE3C8",
      "icon": "ti-map-pin",
      "ic": "#7C4A9E"
    },
    ".": {
      "bg": "#D3D1C7"
    }
  },
  "BIOMES": {
    "G": {
      "n": "Pastizales",
      "rate": 0.26,
      "base": 3,
      "cap": 4,
      "boost": 1
    },
    "B": {
      "n": "Bosque profundo",
      "rate": 0.3,
      "base": 7,
      "cap": 9,
      "boost": 3
    },
    "M": {
      "n": "Montaña",
      "rate": 0.28,
      "base": 10,
      "cap": 12,
      "boost": 3
    },
    "A": {
      "n": "Aguas del lago",
      "rate": 0.25,
      "base": 8,
      "cap": 10,
      "boost": 2
    }
  },
  "MATERIALS": {
    "ceniza": {
      "n": "Ceniza ígnea",
      "ic": "ti-flame",
      "from": "fuego",
      "rate": 0.4
    },
    "perla": {
      "n": "Perla de agua",
      "ic": "ti-droplet",
      "from": "agua",
      "rate": 0.4
    },
    "savia": {
      "n": "Savia",
      "ic": "ti-leaf",
      "from": "planta",
      "rate": 0.4
    },
    "pelaje": {
      "n": "Pelaje suave",
      "ic": "ti-paw",
      "from": "normal",
      "rate": 0.4
    }
  },
  "RECIPES": {
    "p": {
      "savia": 2,
      "pelaje": 1
    },
    "s": {
      "perla": 2,
      "ceniza": 2
    },
    "ball": {
      "pelaje": 2,
      "perla": 1
    }
  },
  "EXPEDITIONS": {
    "duration": 30,
    "coinsPerLvl": 1,
    "rolls": 3,
    "matChance": 0.5
  },
  "BUILDINGS": {
    "brasero": {
      "n": "Brasero ígneo",
      "ic": "ti-flame",
      "pr": 150,
      "mat": "ceniza",
      "every": 12
    },
    "draga": {
      "n": "Draga de perlas",
      "ic": "ti-droplet",
      "pr": 150,
      "mat": "perla",
      "every": 12
    },
    "invernadero": {
      "n": "Invernadero",
      "ic": "ti-leaf",
      "pr": 150,
      "mat": "savia",
      "every": 12
    },
    "esquiladora": {
      "n": "Esquiladora",
      "ic": "ti-paw",
      "pr": 150,
      "mat": "pelaje",
      "every": 12
    }
  },
  "STORAGE": {
    "cap": 24
  },
  "SFX": {
    "encounter": {
      "freq": 392,
      "dur": 0.12
    },
    "hit": {
      "freq": 220,
      "dur": 0.08,
      "type": "sawtooth"
    },
    "super": {
      "freq": 660,
      "dur": 0.1
    },
    "faint": {
      "freq": 110,
      "dur": 0.4,
      "type": "triangle"
    },
    "capture": {
      "freq": 523,
      "dur": 0.12,
      "freq2": 784
    },
    "escape": {
      "freq": 330,
      "dur": 0.15,
      "type": "sawtooth"
    },
    "levelup": {
      "freq": 587,
      "dur": 0.1,
      "freq2": 880
    },
    "evolve": {
      "freq": 523,
      "dur": 0.15,
      "freq2": 1047
    },
    "heal": {
      "freq": 698,
      "dur": 0.15,
      "type": "sine"
    },
    "buy": {
      "freq": 784,
      "dur": 0.07
    },
    "hatch": {
      "freq": 659,
      "dur": 0.12,
      "freq2": 988
    },
    "win": {
      "freq": 523,
      "dur": 0.12,
      "freq2": 1047
    },
    "warp": {
      "freq": 494,
      "dur": 0.1,
      "type": "sine"
    }
  },
  "MUSIC": {
    "map": {
      "tempo": 104,
      "wave": "triangle",
      "vol": 0.025,
      "loop": true,
      "notes": [
        60,
        0,
        64,
        0,
        67,
        0,
        64,
        0,
        69,
        0,
        67,
        0,
        64,
        62,
        60,
        0,
        62,
        0,
        65,
        0,
        69,
        0,
        65,
        0,
        67,
        0,
        64,
        0,
        62,
        0,
        60,
        0
      ]
    },
    "battle": {
      "tempo": 148,
      "wave": "square",
      "vol": 0.02,
      "loop": true,
      "notes": [
        57,
        57,
        0,
        60,
        57,
        0,
        62,
        63,
        62,
        60,
        57,
        0,
        55,
        0,
        57,
        0
      ]
    }
  },
  "BREED": {
    "eggSteps": 24,
    "hatchLvl": 5,
    "hpDiv": 40,
    "atkDiv": 20
  },
  "PLAYER": {
    "start": [
      "pueblo",
      6,
      4
    ],
    "respawn": [
      "pueblo",
      3,
      3
    ],
    "balls": 8,
    "potions": 3,
    "supers": 1
  },
  "FED": {
    "worldId": "terravia-prime",
    "peers": {}
  },
  "ZONES": {
    "pueblo": {
      "name": "Pueblo Brote",
      "map": [
        "TTTTTTTTTTTTTT",
        "T....h..h....T",
        "T..P.........T",
        "T..C......H..T",
        "T............E",
        "T.h.......h..T",
        "T.....X......T",
        "TTTTTTTTTTTTTT"
      ],
      "warps": {
        "13,4": [
          "ruta1",
          1,
          4
        ]
      }
    },
    "ruta1": {
      "name": "Ruta 1",
      "map": [
        "TTTTTTTTTTTTTT",
        "TGGGG....GGGGT",
        "TGGGG.3..GGGGT",
        "T....GG......T",
        "E..GGGGGG....E",
        "TGGG....GGGGGT",
        "TGGGGG..GGGGGT",
        "TTTTTTTTTTTTTT"
      ],
      "warps": {
        "0,4": [
          "pueblo",
          12,
          4
        ],
        "13,4": [
          "ciudad",
          1,
          4
        ]
      }
    },
    "ciudad": {
      "name": "Ciudad Terral",
      "map": [
        "TTTTTTETTTTTTT",
        "T............T",
        "T..h..C..h.W.T",
        "T............T",
        "E.....S......T",
        "T....1...h...T",
        "T............E",
        "TTTTTTTTTTTTTT"
      ],
      "warps": {
        "6,0": [
          "bosque",
          6,
          5
        ],
        "0,4": [
          "ruta1",
          12,
          4
        ],
        "13,6": [
          "lago",
          1,
          2
        ]
      }
    },
    "bosque": {
      "name": "Bosque Umbrío",
      "map": [
        "TTTTTTTTTTTTTT",
        "TBBBB..BBBBBBT",
        "TBBBB....2BBBT",
        "TB..BB..BB..BT",
        "TBBB......BBBT",
        "TBB..BBBB..BBT",
        "TTTTTTETTTTTTT"
      ],
      "warps": {
        "6,6": [
          "ciudad",
          6,
          1
        ]
      }
    },
    "lago": {
      "name": "Lago Azur",
      "map": [
        "TTTTTTTTTTTTTT",
        "T....AAAAA...T",
        "E..AAAAAAAA..T",
        "T.AAAA..AAAA.T",
        "T.AAAA..AAAA.T",
        "T..AAAAAAAA..T",
        "T....AAAA....E",
        "TTTTTTTTTTTTTT"
      ],
      "warps": {
        "0,2": [
          "ciudad",
          12,
          6
        ],
        "13,6": [
          "monte",
          1,
          4
        ]
      }
    },
    "monte": {
      "name": "Monte Magna",
      "map": [
        "TTTTTTTTTTTTTT",
        "TMMMM.MMMMMMMT",
        "TM.MMMM.RRR.MT",
        "TM.MM.M.R4R.MT",
        "EMM.MMM.RRR.MT",
        "TMMMM.MMMM..MT",
        "TM..MMMM..MMMT",
        "TTTTTTTTTTTTTT"
      ],
      "warps": {
        "0,4": [
          "lago",
          12,
          6
        ]
      }
    }
  }
};
