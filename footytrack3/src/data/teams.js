// src/data/teams.js

const teams = [
    /*******************************************************
     * 1) Manchester City
     * 1st place (2022/23): W28 D5 L5, GF94 GA33, 89 pts
     * Approx advanced stats included
     *******************************************************/
    {
      id: 1,
      name: "Manchester City",
      logo: "https://upload.wikimedia.org/wikipedia/sco/e/eb/Manchester_City_FC_badge.svg",
      founded: 1880,
      venue: "Etihad Stadium",
      location: "Manchester, England",
  
      // Basic final 2022/23 stats
      wins: 28,
      draws: 5,
      losses: 5,
      goalsScored: 94,
      goalsConceded: 33,
      points: 89,
  
      // The nested stats object EXACTLY how your code references it:
      stats: {
        // 1) fixtures
        fixtures: {
          played: { total: 38 },
          wins:   { total: 28 },
          draws:  { total: 5 },
          loses:  { total: 5 }
        },
        // 2) goals
        goals: {
          for:     { total: 94 },
          against: { total: 33 }
        },
        // 3) Single integer stats that your code references as direct fields:
        clean_sheet: 11,         // approximate clean sheets
        possession: 65,          // approximate average possession (%)
        passes: { total: 575 },  // approximate passes per match
        penalty: { total: 6 },   // approximate penalties awarded
        shots: {
          total: 658,            // approximate total shots
          on:    251             // approximate shots on target
        },
        corners: { total: 293 }, // approximate corners
        fouls:   { committed: 392 } // approximate fouls
      }
    },
  
    /*******************************************************
     * 2) Arsenal
     * 2nd place: W26 D6 L6, GF88 GA43, 84 pts
     *******************************************************/
    {
      id: 2,
      name: "Arsenal",
      logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
      founded: 1886,
      venue: "Emirates Stadium",
      location: "London, England",
  
      wins: 26,
      draws: 6,
      losses: 6,
      goalsScored: 88,
      goalsConceded: 43,
      points: 84,
  
      stats: {
        fixtures: {
          played: { total: 38 },
          wins:   { total: 26 },
          draws:  { total: 6 },
          loses:  { total: 6 }
        },
        goals: {
          for:     { total: 88 },
          against: { total: 43 }
        },
        clean_sheet: 14,
        possession: 60,     // ~60.2
        passes: { total: 515 },
        penalty: { total: 5 },
        shots: {
          total: 610,
          on:    220
        },
        corners: { total: 277 },
        fouls:   { committed: 361 }
      }
    },
  
    /*******************************************************
     * 3) Manchester United
     * 3rd place: W23 D6 L9, GF58 GA43, 75 pts
     *******************************************************/
    {
      id: 3,
      name: "Manchester United",
      logo: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
      founded: 1878,
      venue: "Old Trafford",
      location: "Manchester, England",
  
      wins: 23,
      draws: 6,
      losses: 9,
      goalsScored: 58,
      goalsConceded: 43,
      points: 75,
  
      stats: {
        fixtures: {
          played: { total: 38 },
          wins:   { total: 23 },
          draws:  { total: 6 },
          loses:  { total: 9 }
        },
        goals: {
          for:     { total: 58 },
          against: { total: 43 }
        },
        clean_sheet: 17,
        possession: 54,     
        passes: { total: 470 },
        penalty: { total: 6 },
        shots: {
          total: 537,
          on:    195
        },
        corners: { total: 229 },
        fouls:   { committed: 403 }
      }
    },
  
    /*******************************************************
     * 4) Newcastle United
     * 4th place: W19 D14 L5, GF68 GA33, 71 pts
     *******************************************************/
    {
      id: 4,
      name: "Newcastle",
      logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Newcastle_United_Logo.svg",
      founded: 1892,
      venue: "St. James' Park",
      location: "Newcastle, England",
  
      wins: 19,
      draws: 14,
      losses: 5,
      goalsScored: 68,
      goalsConceded: 33,
      points: 71,
  
      stats: {
        fixtures: {
          played: { total: 38 },
          wins:   { total: 19 },
          draws:  { total: 14 },
          loses:  { total: 5 }
        },
        goals: {
          for:     { total: 68 },
          against: { total: 33 }
        },
        clean_sheet: 14,
        possession: 50,     
        passes: { total: 415 },
        penalty: { total: 3 },
        shots: {
          total: 541,
          on:    189
        },
        corners: { total: 228 },
        fouls:   { committed: 417 }
      }
    },
  
    /*******************************************************
     * 5) Liverpool
     * 5th place: W19 D10 L9, GF75 GA47, 67 pts
     *******************************************************/
    {
      id: 5,
      name: "Liverpool",
      logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
      founded: 1892,
      venue: "Anfield",
      location: "Liverpool, England",
  
      wins: 19,
      draws: 10,
      losses: 9,
      goalsScored: 75,
      goalsConceded: 47,
      points: 67,
  
      stats: {
        fixtures: {
          played: { total: 38 },
          wins:   { total: 19 },
          draws:  { total: 10 },
          loses:  { total: 9 }
        },
        goals: {
          for:     { total: 75 },
          against: { total: 47 }
        },
        clean_sheet: 14,
        possession: 59,
        passes: { total: 520 },
        penalty: { total: 4 },
        shots: {
          total: 579,
          on:    223
        },
        corners: { total: 275 },
        fouls:   { committed: 385 }
      }
    },
  
    /*******************************************************
     * 6) Brighton & Hove Albion
     * 6th place: W18 D8 L12, GF72 GA53, 62 pts
     *******************************************************/
    {
      id: 6,
      name: "Brighton",
      logo: "https://upload.wikimedia.org/wikipedia/en/f/fd/Brighton_%26_Hove_Albion_logo.svg",
      founded: 1901,
      venue: "Falmer Stadium (Amex)",
      location: "Brighton, England",
  
      wins: 18,
      draws: 8,
      losses: 12,
      goalsScored: 72,
      goalsConceded: 53,
      points: 62,
  
      stats: {
        fixtures: {
          played: { total: 38 },
          wins:   { total: 18 },
          draws:  { total: 8 },
          loses:  { total: 12 }
        },
        goals: {
          for:     { total: 72 },
          against: { total: 53 }
        },
        clean_sheet: 12,
        possession: 56,
        passes: { total: 495 },
        penalty: { total: 3 },
        shots: {
          total: 576,
          on:    210
        },
        corners: { total: 257 },
        fouls:   { committed: 386 }
      }
    },
  
    /*******************************************************
     * 7) Aston Villa
     * 7th place: W18 D7 L13, GF51 GA46, 61 pts
     *******************************************************/
    {
      id: 7,
      name: "Aston Villa",
      logo: "https://upload.wikimedia.org/wikipedia/fr/e/e5/Logo_Aston_Villa.svg",
      founded: 1874,
      venue: "Villa Park",
      location: "Birmingham, England",
  
      wins: 18,
      draws: 7,
      losses: 13,
      goalsScored: 51,
      goalsConceded: 46,
      points: 61,
  
      stats: {
        fixtures: {
          played: { total: 38 },
          wins:   { total: 18 },
          draws:  { total: 7 },
          loses:  { total: 13 }
        },
        goals: {
          for:     { total: 51 },
          against: { total: 46 }
        },
        clean_sheet: 12,
        possession: 51,
        passes: { total: 440 },
        penalty: { total: 2 },
        shots: {
          total: 424,
          on:    151
        },
        corners: { total: 222 },
        fouls:   { committed: 398 }
      }
    },
  
    /*******************************************************
     * 8) Tottenham Hotspur
     * 8th place: W18 D6 L14, GF70 GA63, 60 pts
     *******************************************************/
    {
      id: 8,
      name: "Tottenham",
      logo: "https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg",
      founded: 1882,
      venue: "Tottenham Hotspur Stadium",
      location: "London, England",
  
      wins: 18,
      draws: 6,
      losses: 14,
      goalsScored: 70,
      goalsConceded: 63,
      points: 60,
  
      stats: {
        fixtures: {
          played: { total: 38 },
          wins:   { total: 18 },
          draws:  { total: 6 },
          loses:  { total: 14 }
        },
        goals: {
          for:     { total: 70 },
          against: { total: 63 }
        },
        clean_sheet: 8,
        possession: 50,
        passes: { total: 440 },
        penalty: { total: 4 },
        shots: {
          total: 488,
          on:    183
        },
        corners: { total: 240 },
        fouls:   { committed: 402 }
      }
    },
  
    /*******************************************************
     * 9) Brentford
     * 9th place: W15 D14 L9, GF58 GA46, 59 pts
     *******************************************************/
    {
      id: 9,
      name: "Brentford",
      logo: "https://upload.wikimedia.org/wikipedia/en/2/2a/Brentford_FC_crest.svg",
      founded: 1889,
      venue: "Gtech Community Stadium",
      location: "London, England",
  
      wins: 15,
      draws: 14,
      losses: 9,
      goalsScored: 58,
      goalsConceded: 46,
      points: 59,
  
      stats: {
        fixtures: {
          played: { total: 38 },
          wins:   { total: 15 },
          draws:  { total: 14 },
          loses:  { total: 9 }
        },
        goals: {
          for:     { total: 58 },
          against: { total: 46 }
        },
        clean_sheet: 10,
        possession: 44,
        passes: { total: 350 },
        penalty: { total: 6 },
        shots: {
          total: 453,
          on:    177
        },
        corners: { total: 183 },
        fouls:   { committed: 400 }
      }
    },
  
    /*******************************************************
     * 10) Fulham
     * 10th place: W15 D7 L16, GF55 GA53, 52 pts
     *******************************************************/
    {
      id: 10,
      name: "Fulham",
      logo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Fulham_FC_%28shield%29.svg",
      founded: 1879,
      venue: "Craven Cottage",
      location: "London, England",
  
      wins: 15,
      draws: 7,
      losses: 16,
      goalsScored: 55,
      goalsConceded: 53,
      points: 52,
  
      stats: {
        fixtures: {
          played: { total: 38 },
          wins:   { total: 15 },
          draws:  { total: 7 },
          loses:  { total: 16 }
        },
        goals: {
          for:     { total: 55 },
          against: { total: 53 }
        },
        clean_sheet: 9,
        possession: 47,
        passes: { total: 370 },
        penalty: { total: 2 },
        shots: {
          total: 477,
          on:    167
        },
        corners: { total: 205 },
        fouls:   { committed: 453 }
      }
    },
  
    /*******************************************************
     * 11) Crystal Palace
     * 11th place: W11 D12 L15, GF40 GA49, 45 pts
     *******************************************************/
    {
      id: 11,
      name: "Crystal Palace",
      logo: "https://upload.wikimedia.org/wikipedia/sco/0/0c/Crystal_Palace_FC_logo.svg",
      founded: 1905,
      venue: "Selhurst Park",
      location: "London, England",
  
      wins: 11,
      draws: 12,
      losses: 15,
      goalsScored: 40,
      goalsConceded: 49,
      points: 45,
  
      stats: {
        fixtures: {
          played: { total: 38 },
          wins:   { total: 11 },
          draws:  { total: 12 },
          loses:  { total: 15 }
        },
        goals: {
          for:     { total: 40 },
          against: { total: 49 }
        },
        clean_sheet: 10,
        possession: 42,
        passes: { total: 340 },
        penalty: { total: 2 },
        shots: {
          total: 423,
          on:    146
        },
        corners: { total: 191 },
        fouls:   { committed: 427 }
      }
    },
  
    /*******************************************************
     * 12) Chelsea
     * 12th place: W11 D11 L16, GF38 GA47, 44 pts
     *******************************************************/
    {
      id: 12,
      name: "Chelsea",
      logo: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
      founded: 1905,
      venue: "Stamford Bridge",
      location: "London, England",
  
      wins: 11,
      draws: 11,
      losses: 16,
      goalsScored: 38,
      goalsConceded: 47,
      points: 44,
  
      stats: {
        fixtures: {
          played: { total: 38 },
          wins:   { total: 11 },
          draws:  { total: 11 },
          loses:  { total: 16 }
        },
        goals: {
          for:     { total: 38 },
          against: { total: 47 }
        },
        clean_sheet: 9,
        possession: 58,
        passes: { total: 600 },
        penalty: { total: 1 },
        shots: {
          total: 505,
          on:    165
        },
        corners: { total: 249 },
        fouls:   { committed: 398 }
      }
    },
  
    /*******************************************************
     * 13) Wolverhampton Wanderers
     * 13th place: W11 D8 L19, GF31 GA58, 41 pts
     *******************************************************/
    {
      id: 13,
      name: "Wolves",
      logo: "https://upload.wikimedia.org/wikipedia/en/f/fc/Wolverhampton_Wanderers.svg",
      founded: 1877,
      venue: "Molineux",
      location: "Wolverhampton, England",
  
      wins: 11,
      draws: 8,
      losses: 19,
      goalsScored: 31,
      goalsConceded: 58,
      points: 41,
  
      stats: {
        fixtures: {
          played: { total: 38 },
          wins:   { total: 11 },
          draws:  { total: 8 },
          loses:  { total: 19 }
        },
        goals: {
          for:     { total: 31 },
          against: { total: 58 }
        },
        clean_sheet: 11,
        possession: 49,
        passes: { total: 400 },
        penalty: { total: 2 },
        shots: {
          total: 403,
          on:    145
        },
        corners: { total: 167 },
        fouls:   { committed: 443 }
      }
    },
  
    /*******************************************************
     * 14) West Ham United
     * 14th place: W11 D7 L20, GF42 GA55, 40 pts
     *******************************************************/
    {
      id: 14,
      name: "West Ham",
      logo: "https://upload.wikimedia.org/wikipedia/en/c/c2/West_Ham_United_FC_logo.svg",
      founded: 1895,
      venue: "London Stadium",
      location: "London, England",
  
      wins: 11,
      draws: 7,
      losses: 20,
      goalsScored: 42,
      goalsConceded: 55,
      points: 40,
  
      stats: {
        fixtures: {
          played: { total: 38 },
          wins:   { total: 11 },
          draws:  { total: 7 },
          loses:  { total: 20 }
        },
        goals: {
          for:     { total: 42 },
          against: { total: 55 }
        },
        clean_sheet: 8,
        possession: 44,
        passes: { total: 375 },
        penalty: { total: 2 },
        shots: {
          total: 431,
          on:    140
        },
        corners: { total: 171 },
        fouls:   { committed: 375 }
      }
    },
  
    /*******************************************************
     * 15) Bournemouth
     * 15th place: W11 D6 L21, GF37 GA71, 39 pts
     *******************************************************/
    {
      id: 15,
      name: "Bournemouth",
      logo: "https://upload.wikimedia.org/wikipedia/en/e/e5/AFC_Bournemouth_%282013%29.svg",
      founded: 1899,
      venue: "Vitality Stadium",
      location: "Bournemouth, England",
  
      wins: 11,
      draws: 6,
      losses: 21,
      goalsScored: 37,
      goalsConceded: 71,
      points: 39,
  
      stats: {
        fixtures: {
          played: { total: 38 },
          wins:   { total: 11 },
          draws:  { total: 6 },
          loses:  { total: 21 }
        },
        goals: {
          for:     { total: 37 },
          against: { total: 71 }
        },
        clean_sheet: 7,
        possession: 39,
        passes: { total: 270 },
        penalty: { total: 3 },
        shots: {
          total: 362,
          on:    126
        },
        corners: { total: 158 },
        fouls:   { committed: 430 }
      }
    },
  
    /*******************************************************
     * 16) Nottingham Forest
     * 16th place: W9 D11 L18, GF38 GA68, 38 pts
     *******************************************************/
    {
      id: 16,
      name: "Nottingham Forest",
      logo: "https://upload.wikimedia.org/wikipedia/sco/d/d2/Nottingham_Forest_logo.svg",
      founded: 1865,
      venue: "City Ground",
      location: "Nottingham, England",
  
      wins: 9,
      draws: 11,
      losses: 18,
      goalsScored: 38,
      goalsConceded: 68,
      points: 38,
  
      stats: {
        fixtures: {
          played: { total: 38 },
          wins:   { total: 9 },
          draws:  { total: 11 },
          loses:  { total: 18 }
        },
        goals: {
          for:     { total: 38 },
          against: { total: 68 }
        },
        clean_sheet: 8,
        possession: 38,
        passes: { total: 240 },
        penalty: { total: 2 },
        shots: {
          total: 360,
          on:    129
        },
        corners: { total: 151 },
        fouls:   { committed: 463 }
      }
    },
  
    /*******************************************************
     * 17) Everton
     * 17th place: W8 D12 L18, GF34 GA57, 36 pts
     *******************************************************/
    {
      id: 17,
      name: "Everton",
      logo: "https://upload.wikimedia.org/wikipedia/en/7/7c/Everton_FC_logo.svg",
      founded: 1878,
      venue: "Goodison Park",
      location: "Liverpool, England",
  
      wins: 8,
      draws: 12,
      losses: 18,
      goalsScored: 34,
      goalsConceded: 57,
      points: 36,
  
      stats: {
        fixtures: {
          played: { total: 38 },
          wins:   { total: 8 },
          draws:  { total: 12 },
          loses:  { total: 18 }
        },
        goals: {
          for:     { total: 34 },
          against: { total: 57 }
        },
        clean_sheet: 8,
        possession: 42,
        passes: { total: 345 },
        penalty: { total: 3 },
        shots: {
          total: 391,
          on:    135
        },
        corners: { total: 193 },
        fouls:   { committed: 406 }
      }
    },
  
    /*******************************************************
     * 18) Leicester City
     * 18th place: W9 D7 L22, GF51 GA68, 34 pts
     *******************************************************/
    {
      id: 18,
      name: "Leicester",
      logo: "https://upload.wikimedia.org/wikipedia/en/2/2d/Leicester_City_crest.svg",
      founded: 1884,
      venue: "King Power Stadium",
      location: "Leicester, England",
  
      wins: 9,
      draws: 7,
      losses: 22,
      goalsScored: 51,
      goalsConceded: 68,
      points: 34,
  
      stats: {
        fixtures: {
          played: { total: 38 },
          wins:   { total: 9 },
          draws:  { total: 7 },
          loses:  { total: 22 }
        },
        goals: {
          for:     { total: 51 },
          against: { total: 68 }
        },
        clean_sheet: 7,
        possession: 47,
        passes: { total: 420 },
        penalty: { total: 2 },
        shots: {
          total: 446,
          on:    164
        },
        corners: { total: 197 },
        fouls:   { committed: 419 }
      }
    },
  
    /*******************************************************
     * 19) Leeds United
     * 19th place: W7 D10 L21, GF48 GA78, 31 pts
     *******************************************************/
    {
      id: 19,
      name: "Leeds",
      logo: "https://upload.wikimedia.org/wikipedia/en/5/54/Leeds_United_F.C._logo.svg",
      founded: 1919,
      venue: "Elland Road",
      location: "Leeds, England",
  
      wins: 7,
      draws: 10,
      losses: 21,
      goalsScored: 48,
      goalsConceded: 78,
      points: 31,
  
      stats: {
        fixtures: {
          played: { total: 38 },
          wins:   { total: 7 },
          draws:  { total: 10 },
          loses:  { total: 21 }
        },
        goals: {
          for:     { total: 48 },
          against: { total: 78 }
        },
        clean_sheet: 5,
        possession: 47,
        passes: { total: 330 },
        penalty: { total: 3 },
        shots: {
          total: 418,
          on:    145
        },
        corners: { total: 201 },
        fouls:   { committed: 451 }
      }
    },
  
    /*******************************************************
     * 20) Southampton
     * 20th place: W6 D7 L25, GF36 GA73, 25 pts
     *******************************************************/
    {
      id: 20,
      name: "Southampton",
      logo: "https://upload.wikimedia.org/wikipedia/en/c/c9/FC_Southampton.svg",
      founded: 1885,
      venue: "St Mary’s Stadium",
      location: "Southampton, England",
  
      wins: 6,
      draws: 7,
      losses: 25,
      goalsScored: 36,
      goalsConceded: 73,
      points: 25,
  
      stats: {
        fixtures: {
          played: { total: 38 },
          wins:   { total: 6 },
          draws:  { total: 7 },
          loses:  { total: 25 }
        },
        goals: {
          for:     { total: 36 },
          against: { total: 73 }
        },
        clean_sheet: 4,
        possession: 44,
        passes: { total: 340 },
        penalty: { total: 3 },
        shots: {
          total: 393,
          on:    137
        },
        corners: { total: 180 },
        fouls:   { committed: 387 }
      }
    },
  ];
  
  export default teams;
  