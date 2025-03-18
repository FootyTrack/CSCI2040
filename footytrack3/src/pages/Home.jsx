import React, { useState, useEffect } from 'react';

const Home = () => {
  const [season, setSeason] = useState("2023-24");
  const [standings, setStandings] = useState([]);
  const [fixtures, setFixtures] = useState([]);

  // Complete static dataset for 2021-22 and 2022-23 seasons
  const staticData = {
    "2021": {
      standings: [
        {
          rank: 1,
          team: { name: "Manchester City", logo: "https://resources.premierleague.com/premierleague/badges/50/t43.png" },
          points: 93,
          goalsDiff: 68,
          all: {
            played: 38,
            win: 29,
            draw: 6,
            lose: 3,
            goals: { for: 94, against: 26 }
          }
        },
        {
          rank: 2,
          team: { name: "Liverpool", logo: "https://resources.premierleague.com/premierleague/badges/50/t14.png" },
          points: 92,
          goalsDiff: 68,
          all: {
            played: 38,
            win: 28,
            draw: 8,
            lose: 2,
            goals: { for: 94, against: 26 }
          }
        },
        {
          rank: 3,
          team: { name: "Chelsea", logo: "https://resources.premierleague.com/premierleague/badges/50/t8.png" },
          points: 74,
          goalsDiff: 41,
          all: {
            played: 38,
            win: 21,
            draw: 11,
            lose: 6,
            goals: { for: 74, against: 33 }
          }
        },
        {
          rank: 4,
          team: { name: "Tottenham", logo: "https://resources.premierleague.com/premierleague/badges/50/t6.png" },
          points: 71,
          goalsDiff: 29,
          all: {
            played: 38,
            win: 22,
            draw: 5,
            lose: 11,
            goals: { for: 69, against: 40 }
          }
        },
        {
          rank: 5,
          team: { name: "Arsenal", logo: "https://resources.premierleague.com/premierleague/badges/50/t3.png" },
          points: 69,
          goalsDiff: 13,
          all: {
            played: 38,
            win: 22,
            draw: 3,
            lose: 13,
            goals: { for: 61, against: 48 }
          }
        },
        {
          rank: 6,
          team: { name: "Manchester Utd", logo: "https://resources.premierleague.com/premierleague/badges/50/t1.png" },
          points: 58,
          goalsDiff: 0,
          all: {
            played: 38,
            win: 16,
            draw: 10,
            lose: 12,
            goals: { for: 57, against: 57 }
          }
        },
        {
          rank: 7,
          team: { name: "West Ham", logo: "https://resources.premierleague.com/premierleague/badges/50/t21.png" },
          points: 56,
          goalsDiff: 9,
          all: {
            played: 38,
            win: 16,
            draw: 8,
            lose: 14,
            goals: { for: 60, against: 51 }
          }
        },
        {
          rank: 8,
          team: { name: "Leicester City", logo: "https://resources.premierleague.com/premierleague/badges/50/t13.png" },
          points: 52,
          goalsDiff: 3,
          all: {
            played: 38,
            win: 14,
            draw: 10,
            lose: 14,
            goals: { for: 62, against: 59 }
          }
        },
        {
          rank: 9,
          team: { name: "Brighton", logo: "https://resources.premierleague.com/premierleague/badges/50/t36.png" },
          points: 51,
          goalsDiff: -2,
          all: {
            played: 38,
            win: 12,
            draw: 15,
            lose: 11,
            goals: { for: 42, against: 44 }
          }
        },
        {
          rank: 10,
          team: { name: "Wolves", logo: "https://resources.premierleague.com/premierleague/badges/50/t39.png" },
          points: 51,
          goalsDiff: -5,
          all: {
            played: 38,
            win: 15,
            draw: 6,
            lose: 17,
            goals: { for: 38, against: 43 }
          }
        },
        {
          rank: 11,
          team: { name: "Newcastle", logo: "https://resources.premierleague.com/premierleague/badges/50/t4.png" },
          points: 49,
          goalsDiff: -18,
          all: {
            played: 38,
            win: 13,
            draw: 10,
            lose: 15,
            goals: { for: 44, against: 62 }
          }
        },
        {
          rank: 12,
          team: { name: "Crystal Palace", logo: "https://resources.premierleague.com/premierleague/badges/50/t31.png" },
          points: 48,
          goalsDiff: 4,
          all: {
            played: 38,
            win: 11,
            draw: 15,
            lose: 12,
            goals: { for: 50, against: 46 }
          }
        },
        {
          rank: 13,
          team: { name: "Brentford", logo: "https://resources.premierleague.com/premierleague/badges/50/t94.png" },
          points: 46,
          goalsDiff: -8,
          all: {
            played: 38,
            win: 13,
            draw: 7,
            lose: 18,
            goals: { for: 48, against: 56 }
          }
        },
        {
          rank: 14,
          team: { name: "Aston Villa", logo: "https://resources.premierleague.com/premierleague/badges/50/t7.png" },
          points: 45,
          goalsDiff: -2,
          all: {
            played: 38,
            win: 13,
            draw: 6,
            lose: 19,
            goals: { for: 52, against: 54 }
          }
        },
        {
          rank: 15,
          team: { name: "Southampton", logo: "https://resources.premierleague.com/premierleague/badges/50/t20.png" },
          points: 40,
          goalsDiff: -24,
          all: {
            played: 38,
            win: 9,
            draw: 13,
            lose: 16,
            goals: { for: 43, against: 67 }
          }
        },
        {
          rank: 16,
          team: { name: "Everton", logo: "https://resources.premierleague.com/premierleague/badges/50/t11.png" },
          points: 39,
          goalsDiff: -23,
          all: {
            played: 38,
            win: 11,
            draw: 6,
            lose: 21,
            goals: { for: 43, against: 66 }
          }
        },
        {
          rank: 17,
          team: { name: "Leeds United", logo: "https://resources.premierleague.com/premierleague/badges/50/t2.png" },
          points: 38,
          goalsDiff: -37,
          all: {
            played: 38,
            win: 9,
            draw: 11,
            lose: 18,
            goals: { for: 42, against: 79 }
          }
        },
        {
          rank: 18,
          team: { name: "Burnley", logo: "https://resources.premierleague.com/premierleague/badges/50/t90.png" },
          points: 35,
          goalsDiff: -19,
          all: {
            played: 38,
            win: 7,
            draw: 14,
            lose: 17,
            goals: { for: 34, against: 53 }
          }
        },
        {
          rank: 19,
          team: { name: "Watford", logo: "https://resources.premierleague.com/premierleague/badges/50/t57.png" },
          points: 23,
          goalsDiff: -43,
          all: {
            played: 38,
            win: 6,
            draw: 5,
            lose: 27,
            goals: { for: 34, against: 77 }
          }
        },
        {
          rank: 20,
          team: { name: "Norwich", logo: "https://resources.premierleague.com/premierleague/badges/50/t45.png" }, 
          points: 22,
          goalsDiff: -61,
          all: {
            played: 38,
            win: 5,
            draw: 7,
            lose: 26,
            goals: { for: 23, against: 84 }
          }
        }
      ],
      
      fixtures: [
        {
          id: 1,
          date: "2022-05-22T16:00:00+00:00",
          venue: { name: "Etihad Stadium" },
          teams: {
            home: { name: "Manchester City", logo: "https://resources.premierleague.com/premierleague/badges/50/t43.png" },
            away: { name: "Aston Villa", logo: "https://resources.premierleague.com/premierleague/badges/50/t7.png" }
          },
          goals: { home: 3, away: 2 }
        },
        {
          id: 2,
          date: "2022-05-22T16:00:00+00:00",
          venue: { name: "Anfield" },
          teams: {
            home: { name: "Liverpool", logo: "https://resources.premierleague.com/premierleague/badges/50/t14.png" },
            away: { name: "Wolverhampton Wanderers", logo: "https://resources.premierleague.com/premierleague/badges/50/t39.png" }
          },
          goals: { home: 3, away: 1 }
        },
        {
          id: 3,
          date: "2022-05-22T16:00:00+00:00",
          venue: { name: "Stamford Bridge" },
          teams: {
            home: { name: "Chelsea", logo: "https://resources.premierleague.com/premierleague/badges/50/t8.png" },
            away: { name: "Watford", logo: "https://resources.premierleague.com/premierleague/badges/50/t57.png" }
          },
          goals: { home: 2, away: 1}
        },
        {
          id: 4,
          date: "2022-05-22T16:00:00+00:00",
          venue: { name: "Selhurst Park" },
          teams: {
            home: { name: "Crystal Palace", logo: "https://resources.premierleague.com/premierleague/badges/50/t31.png" },
            away: { name: "Manchester United", logo: "https://resources.premierleague.com/premierleague/badges/50/t1.png" }
          },
          goals: { home: 1, away: 0 }
        },
        {
          id: 5,
          date: "2022-05-22T16:00:00+00:00",
          venue: { name: "Emirates Stadium" },
          teams: {
            home: { name: "Arsenal", logo: "https://resources.premierleague.com/premierleague/badges/50/t3.png" },
            away: { name: "Everton", logo: "https://resources.premierleague.com/premierleague/badges/50/t11.png" }
          },
          goals: { home: 5, away: 1 }
        }
      ]
    },
    "2022": {
      standings: [
        { rank: 1, team: { name: "Manchester City", logo: "https://resources.premierleague.com/premierleague/badges/50/t43.png" }, points: 89, goalsDiff: 61, all: { played: 38, win: 28, draw: 5, lose: 5, goals: { for: 94, against: 33 } }},
        { rank: 2, team: { name: "Arsenal", logo: "https://resources.premierleague.com/premierleague/badges/50/t3.png" }, points: 84, goalsDiff: 45, all: { played: 38, win: 26, draw: 6, lose: 6, goals: { for: 88, against: 43 } }},
        { rank: 3, team: { name: "Liverpool", logo: "https://resources.premierleague.com/premierleague/badges/50/t14.png" }, points: 82, goalsDiff: 45, all: { played: 38, win: 24, draw: 10, lose: 4, goals: { for: 86, against: 41 } }},
        { rank: 4, team: { name: "Aston Villa", logo: "https://resources.premierleague.com/premierleague/badges/50/t7.png" }, points: 68, goalsDiff: 18, all: { played: 38, win: 20, draw: 8, lose: 10, goals: { for: 76, against: 58 } }},
        { rank: 5, team: { name: "Tottenham", logo: "https://resources.premierleague.com/premierleague/badges/50/t6.png" }, points: 66, goalsDiff: 13, all: { played: 38, win: 20, draw: 6, lose: 12, goals: { for: 74, against: 61 } }},
        { rank: 6, team: { name: "Chelsea", logo: "https://resources.premierleague.com/premierleague/badges/50/t8.png" }, points: 63, goalsDiff: 14, all: { played: 38, win: 18, draw: 9, lose: 11, goals: { for: 77, against: 63 } }},
        { rank: 7, team: { name: "Newcastle", logo: "https://resources.premierleague.com/premierleague/badges/50/t4.png" }, points: 60, goalsDiff: 23, all: { played: 38, win: 18, draw: 6, lose: 14, goals: { for: 85, against: 62 } }},
        { rank: 8, team: { name: "Manchester United", logo: "https://resources.premierleague.com/premierleague/badges/50/t1.png" }, points: 60, goalsDiff: -1, all: { played: 38, win: 18, draw: 6, lose: 14, goals: { for: 57, against: 58 } }},
        { rank: 9, team: { name: "West Ham", logo: "https://resources.premierleague.com/premierleague/badges/50/t21.png" }, points: 52, goalsDiff: -14, all: { played: 38, win: 14, draw: 10, lose: 14, goals: { for: 60, against: 74 } }},
        { rank: 10, team: { name: "Crystal Palace", logo: "https://resources.premierleague.com/premierleague/badges/50/t31.png" }, points: 49, goalsDiff: -1, all: { played: 38, win: 13, draw: 10, lose: 15, goals: { for: 57, against: 58 } }},
        { rank: 11, team: { name: "Brighton", logo: "https://resources.premierleague.com/premierleague/badges/50/t36.png" }, points: 48, goalsDiff: -7, all: { played: 38, win: 12, draw: 12, lose: 14, goals: { for: 55, against: 62 } }},
        { rank: 12, team: { name: "Bournemouth", logo: "https://resources.premierleague.com/premierleague/badges/50/t91.png" }, points: 48, goalsDiff: -13, all: { played: 38, win: 13, draw: 9, lose: 16, goals: { for: 54, against: 67 } }},
        { rank: 13, team: { name: "Fulham", logo: "https://resources.premierleague.com/premierleague/badges/50/t54.png" }, points: 47, goalsDiff: -6, all: { played: 38, win: 13, draw: 8, lose: 17, goals: { for: 55, against: 61 } }},
        { rank: 14, team: { name: "Wolves", logo: "https://resources.premierleague.com/premierleague/badges/50/t39.png" }, points: 46, goalsDiff: -13, all: { played: 38, win: 13, draw: 7, lose: 18, goals: { for: 50, against: 63 } }},
        { rank: 15, team: { name: "Everton", logo: "https://resources.premierleague.com/premierleague/badges/50/t11.png" }, points: 40, goalsDiff: -11, all: { played: 38, win: 13, draw: 9, lose: 16, goals: { for: 40, against: 51 } }},
        { rank: 16, team: { name: "Brentford", logo: "https://resources.premierleague.com/premierleague/badges/50/t94.png" }, points: 39, goalsDiff: -9, all: { played: 38, win: 10, draw: 9, lose: 19, goals: { for: 56, against: 65 } }},
        { rank: 17, team: { name: "Nottingham Forest", logo: "https://resources.premierleague.com/premierleague/badges/50/t17.png" }, points: 32, goalsDiff: -18, all: { played: 38, win: 9, draw: 9, lose: 20, goals: { for: 49, against: 67 } }},
        { rank: 18, team: { name: "Luton Town", logo: "https://resources.premierleague.com/premierleague/badges/50/t92.png" }, points: 30, goalsDiff: -20, all: { played: 38, win: 8, draw: 6, lose: 24, goals: { for: 35, against: 55 } }},
        { rank: 19, team: { name: "Southampton", logo: "https://resources.premierleague.com/premierleague/badges/50/t20.png" }, points: 28, goalsDiff: -22, all: { played: 38, win: 7, draw: 7, lose: 24, goals: { for: 33, against: 55 } }},
        { rank: 20, team: { name: "Leeds United", logo: "https://resources.premierleague.com/premierleague/badges/50/t2.png" }, points: 26, goalsDiff: -30, all: { played: 38, win: 6, draw: 10, lose: 22, goals: { for: 30, against: 60 } }},
      ],
      fixtures: [
        {
          id: 1,
          date: "2023-05-28T16:00:00+00:00",
          venue: { name: "Stamford Bridge" },
          teams: {
            home: { name: "Chelsea", logo: "https://resources.premierleague.com/premierleague/badges/50/t8.png" },
            away: { name: "Newcastle", logo: "https://resources.premierleague.com/premierleague/badges/50/t4.png" }
          },
          goals: { home: 1, away: 1 }
        },
        {
          id: 2,
          date: "2023-05-28T16:00:00+00:00",
          venue: { name: "Old Trafford" },
          teams: {
            home: { name: "Manchester Utd", logo: "https://resources.premierleague.com/premierleague/badges/50/t1.png" },
            away: { name: "Fulham", logo: "https://resources.premierleague.com/premierleague/badges/50/t54.png" }
          },
          goals: { home: 2, away: 1 }
        },
        {
          id: 3,
          date: "2023-05-28T16:00:00+00:00",
          venue: { name: "King Power Stadium" },
          teams: {
            home: { name: "Leicester", logo: "https://resources.premierleague.com/premierleague/badges/50/t13.png" },
            away: { name: "West Ham United", logo: "https://resources.premierleague.com/premierleague/badges/50/t21.png" }
          },
          goals: { home: 2, away: 1 }
        },
        {
          id: 4,
          date: "2023-05-28T16:00:00+00:00",
          venue: { name: "St Mary's Stadium" },
          teams: {
            home: { name: "Southampton", logo: "https://resources.premierleague.com/premierleague/badges/50/t20.png" },
            away: { name: "Liverpool", logo: "https://resources.premierleague.com/premierleague/badges/50/t14.png" }
          },
          goals: { home: 4, away: 4 }
        },
        {
          id: 5,
          date: "2023-05-28T16:00:00+00:00",
          venue: { name: "Gtech Community Stadium" },
          teams: {
            home: { name: "Brentford", logo: "https://resources.premierleague.com/premierleague/badges/50/t94.png" },
            away: { name: "Manchester City", logo: "https://resources.premierleague.com/premierleague/badges/50/t43.png" }
          },
          goals: { home: 1, away: 0 }
        }
      ]
    },
    "2023-24": {
      standings: [
        { rank: 1, team: { name: "Manchester City", logo: "https://resources.premierleague.com/premierleague/badges/50/t43.png" }, points: 91, goalsDiff: 61, all: { played: 38, win: 28, draw: 7, lose: 3, goals: { for: 96, against: 35 } }},
        { rank: 2, team: { name: "Arsenal", logo: "https://resources.premierleague.com/premierleague/badges/50/t3.png" }, points: 89, goalsDiff: 62, all: { played: 38, win: 28, draw: 5, lose: 5, goals: { for: 91, against: 29 } }},
        { rank: 3, team: { name: "Liverpool", logo: "https://resources.premierleague.com/premierleague/badges/50/t14.png" }, points: 81, goalsDiff: 45, all: { played: 38, win: 24, draw: 9, lose: 5, goals: { for: 86, against: 41 } }},
        { rank: 4, team: { name: "Aston Villa", logo: "https://resources.premierleague.com/premierleague/badges/50/t7.png" }, points: 73, goalsDiff: 23, all: { played: 38, win: 22, draw: 7, lose: 9, goals: { for: 76, against: 53 } }},
        { rank: 5, team: { name: "Tottenham Hotspur", logo: "https://resources.premierleague.com/premierleague/badges/50/t6.png" }, points: 66, goalsDiff: 13, all: { played: 38, win: 20, draw: 6, lose: 12, goals: { for: 74, against: 61 } }},
        { rank: 6, team: { name: "Chelsea", logo: "https://resources.premierleague.com/premierleague/badges/50/t8.png" }, points: 64, goalsDiff: 14, all: { played: 38, win: 18, draw: 10, lose: 10, goals: { for: 77, against: 63 } }},
        { rank: 7, team: { name: "Newcastle United", logo: "https://resources.premierleague.com/premierleague/badges/50/t4.png" }, points: 59, goalsDiff: 23, all: { played: 38, win: 18, draw: 5, lose: 15, goals: { for: 85, against: 62 } }},
        { rank: 8, team: { name: "Manchester United", logo: "https://resources.premierleague.com/premierleague/badges/50/t1.png" }, points: 59, goalsDiff: -1, all: { played: 38, win: 18, draw: 5, lose: 15, goals: { for: 57, against: 58 } }},
        { rank: 9, team: { name: "West Ham United", logo: "https://resources.premierleague.com/premierleague/badges/50/t21.png" }, points: 51, goalsDiff: -10, all: { played: 38, win: 14, draw: 9, lose: 15, goals: { for: 60, against: 70 } }},
        { rank: 10, team: { name: "Crystal Palace", logo: "https://resources.premierleague.com/premierleague/badges/50/t31.png" }, points: 50, goalsDiff: -5, all: { played: 38, win: 13, draw: 11, lose: 14, goals: { for: 54, against: 59 } }},
        { rank: 11, team: { name: "Brighton & Hove Albion", logo: "https://resources.premierleague.com/premierleague/badges/50/t36.png" }, points: 50, goalsDiff: -6, all: { played: 38, win: 13, draw: 11, lose: 14, goals: { for: 53, against: 59 } }},
        { rank: 12, team: { name: "Bournemouth", logo: "https://resources.premierleague.com/premierleague/badges/50/t91.png" }, points: 49, goalsDiff: -11, all: { played: 38, win: 13, draw: 10, lose: 15, goals: { for: 54, against: 65 } }},
        { rank: 13, team: { name: "Fulham", logo: "https://resources.premierleague.com/premierleague/badges/50/t54.png" }, points: 48, goalsDiff: -8, all: { played: 38, win: 14, draw: 6, lose: 18, goals: { for: 56, against: 64 } }},
        { rank: 14, team: { name: "Wolverhampton Wanderers", logo: "https://resources.premierleague.com/premierleague/badges/50/t39.png" }, points: 45, goalsDiff: -18, all: { played: 38, win: 13, draw: 6, lose: 19, goals: { for: 50, against: 68 } }},
        { rank: 15, team: { name: "Brentford", logo: "https://resources.premierleague.com/premierleague/badges/50/t94.png" }, points: 41, goalsDiff: -5, all: { played: 38, win: 11, draw: 8, lose: 19, goals: { for: 56, against: 61 } }},
        { rank: 16, team: { name: "Everton", logo: "https://resources.premierleague.com/premierleague/badges/50/t11.png" }, points: 40, goalsDiff: -11, all: { played: 38, win: 13, draw: 8, lose: 17, goals: { for: 40, against: 51 } }},
        { rank: 17, team: { name: "Nottingham Forest", logo: "https://resources.premierleague.com/premierleague/badges/50/t17.png" }, points: 31, goalsDiff: -17, all: { played: 38, win: 9, draw: 10, lose: 19, goals: { for: 49, against: 66 } }},
        { rank: 18, team: { name: "Luton Town", logo: "https://resources.premierleague.com/premierleague/badges/50/t92.png" }, points: 26, goalsDiff: -37, all: { played: 38, win: 6, draw: 8, lose: 24, goals: { for: 52, against: 89 } }},
        { rank: 19, team: { name: "Burnley", logo: "https://resources.premierleague.com/premierleague/badges/t90.png" }, points: 23, goalsDiff: -40, all: { played: 38, win: 5, draw: 8, lose: 25, goals: { for: 39, against: 79 } }},
        { rank: 20, team: { name: "Sheffield United", logo: "https://resources.premierleague.com/premierleague/badges/t49.png" }, points: 16, goalsDiff: -68, all: { played: 38, win: 3, draw: 7, lose: 28, goals: { for: 36, against: 104 } }}
      ],
      fixtures: [
        {
          id: 1,
          date: "2024-05-19T16:00:00+00:00",
          venue: { name: "Anfield" },
          teams: {
            home: { name: "Liverpool", logo: "https://resources.premierleague.com/premierleague/badges/50/t14.png" },
            away: { name: "Wolverhampton Wanderers", logo: "https://resources.premierleague.com/premierleague/badges/50/t39.png" }
          },
          goals: { home: 2, away: 0 }
        },
        {
          id: 2,
          date: "2024-05-19T16:00:00+00:00",
          venue: { name: "Stamford Bridge" },
          teams: {
            home: { name: "Chelsea", logo: "https://resources.premierleague.com/premierleague/badges/50/t8.png" },
            away: { name: "Bournemouth", logo: "https://resources.premierleague.com/premierleague/badges/50/t91.png" }
          },
          goals: { home: 2, away: 1 }
        },
        {
          id: 3,
          date: "2024-05-19T16:00:00+00:00",
          venue: { name: "Selhurst Park" },
          teams: {
            home: { name: "Crystal Palace", logo: "https://resources.premierleague.com/premierleague/badges/50/t31.png" },
            away: { name: "Aston Villa", logo: "https://resources.premierleague.com/premierleague/badges/50/t7.png" }
          },
          goals: { home: 5, away: 0 }
        },
        {
          id: 4,
          date: "2024-05-19T16:00:00+00:00",
          venue: { name: "Etihad Stadium" },
          teams: {
            home: { name: "Manchester City", logo: "https://resources.premierleague.com/premierleague/badges/50/t43.png" },
            away: { name: "West Ham United", logo: "https://resources.premierleague.com/premierleague/badges/50/t21.png" }
          },
          goals: { home: 3, away: 1 }
        },
        // New fixture 2: Brighton & Hove Albion 0 - Manchester United 2
        {
          id: 5,
          date: "2024-05-19T18:00:00+00:00",
          venue: { name: "Amex Stadium" },
          teams: {
            home: { name: "Brighton & Hove Albion", logo: "https://resources.premierleague.com/premierleague/badges/50/t36.png" },
            away: { name: "Manchester United", logo: "https://resources.premierleague.com/premierleague/badges/50/t1.png" }
          },
          goals: { home: 0, away: 2 }
        }
      ]
    }
  };

  useEffect(() => {
    setStandings(staticData[season].standings);
    setFixtures(staticData[season].fixtures.slice(-5));
  }, [season]);

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const dayOfWeek = dateObj.toLocaleString('en-US', { weekday: 'short' }); // e.g. "Sun"
    const day = dateObj.toLocaleString('en-US', { day: 'numeric' });         // e.g. "16"
    const month = dateObj.toLocaleString('en-US', { month: 'short' });       // e.g. "Mar"
    const year = dateObj.getFullYear();                                      // e.g. 2025
    return `${dayOfWeek} ${day} ${month} ${year}`;
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <label htmlFor="season-select" style={{ marginRight: '1rem', fontWeight: 'bold' }}>Select Season: </label>
        <select 
          id="season-select"
          value={season} 
          onChange={(e) => setSeason(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px' }}
        >
          <option value="2023-24">2023-24</option>
          <option value="2022">2022-23</option>
          <option value="2021">2021-22</option>
          
        </select>
      </div>

      {/* Standings Table */}
      <section>
        <div style={{ overflowX: 'auto', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            backgroundColor: 'white',
            fontSize: '0.95rem'
          }}>
            <thead>
              <tr style={{ 
                backgroundColor: '#3498db',
                color: 'white',
                fontSize: '0.95rem',
                fontWeight: '600'
              }}>
                {['Pos', 'Team', 'PL', 'W', 'D', 'L', 'GF', 'GA', 'GD', 'Pts'].map((header, index) => (
                  <th 
                    key={header}
                    style={{ 
                      padding: '1rem',
                      textAlign: index === 1 ? 'left' : 'center',
                      minWidth: index === 1 ? '250px' : '80px'
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {standings.map((team, index) => (
                <tr 
                  key={team.team.name}
                  style={{ 
                    backgroundColor: index % 2 === 0 ? '#f8f8f8' : 'white',
                    borderBottom: '1px solid #eee',
                    color: '#333'
                  }}
                >
                  <td style={{ padding: '1rem', textAlign: 'center', fontWeight: '500' }}>{team.rank}</td>
                  <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img 
                      src={team.team.logo} 
                      alt={team.team.name}
                      style={{ height: '28px', width: '28px', objectFit: 'contain' }}
                    />
                    <span style={{ fontWeight: '600' }}>{team.team.name}</span>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>{team.all.played}</td>
                  <td style={{ padding: '1rem', textAlign: 'center', color: '#2e7d32' }}>{team.all.win}</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>{team.all.draw}</td>
                  <td style={{ padding: '1rem', textAlign: 'center', color: '#c62828' }}>{team.all.lose}</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>{team.all.goals.for}</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>{team.all.goals.against}</td>
                  <td style={{ padding: '1rem', textAlign: 'center', fontWeight: '600' }}>{team.goalsDiff}</td>
                  <td style={{ padding: '1rem', textAlign: 'center', fontWeight: '700', color: '#1a237e' }}>
                    {team.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    {/* Recent Fixtures */}
<section style={{ marginTop: '3rem' }}>
  <h2 style={{ marginBottom: '1.5rem', fontWeight: 'bold' }}>Recent Fixtures</h2>
  <div style={{ display: 'grid', gap: '1rem' }}>
    {fixtures.map(fixture => (
      <div 
        key={fixture.id}
        style={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          padding: '1rem', // Reduced padding for a smaller card
          color: 'black',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
          border: '2px solid #3498db'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '40%' }}>
          <img 
            src={fixture.teams.home.logo} 
            alt={fixture.teams.home.name}
            style={{ height: '40px', width: '40px', objectFit: 'contain' }}
          />
          <span style={{ fontWeight: '600' }}>{fixture.teams.home.name}</span>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
            {fixture.goals.home} - {fixture.goals.away}
          </div>
          <div style={{ fontSize: '0.9rem', color: '#555', marginBottom: '0.2rem' }}>
            {formatDate(fixture.date)}
          </div>
          <div style={{ fontSize: '0.9rem', color: '#555' }}>
            Venue: {fixture.venue.name}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '40%', justifyContent: 'flex-end' }}>
          <span style={{ fontWeight: '600' }}>{fixture.teams.away.name}</span>
          <img 
            src={fixture.teams.away.logo} 
            alt={fixture.teams.away.name}
            style={{ height: '40px', width: '40px', objectFit: 'contain' }}
          />
        </div>
      </div>
    ))}
  </div>
</section>

    </div>
  );
};

export default Home;
