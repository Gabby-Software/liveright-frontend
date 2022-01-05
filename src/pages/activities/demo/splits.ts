export const TS_DEMO = [
  {
    day: 'Day 1',
    training_plan_day: {
      id: '123',
      name: 'High Intensity Workouts',
      activities: [
        {
          _id: '1',
          name: 'Workout One',
          items: [
            [
              {
                name: 'Pushups',
                info: {
                  sets: 4,
                  reps: 10,
                  rest_interval: '2 min'
                }
              }
            ],
            [
              {
                name: 'Pushups',
                info: {
                  sets: 4,
                  reps: 10,
                  rest_interval: '2 min'
                }
              }
            ],
            [
              {
                name: '1A-Pushups',
                info: {
                  sets: 4,
                  reps: 7,
                  rest_interval: '2 min'
                }
              },
              {
                name: '1B-Pushups',
                info: {
                  sets: 3,
                  reps: 10,
                  rest_interval: '2 min'
                }
              }
            ]
          ]
        },
        {
          _id: '2',
          name: 'Workout Two',
          items: [
            [
              {
                name: 'Pushups',
                info: {
                  sets: 4,
                  reps: 10,
                  rest_interval: '2 min'
                }
              }
            ],
            [
              {
                name: 'Pushups',
                info: {
                  sets: 3,
                  reps: 4,
                  rest_interval: '2 min'
                }
              }
            ]
          ]
        }
      ]
    },
    diet_plan_day: {
      name: 'Low Carb day',
      meals: [
        {
          name: 'Fried Rice',
          foods: [
            { id: 'food_1', name: 'Chicken Brest Tender', amount: '100g' },
            { id: 'food_2', name: 'Brown Rice', amount: '50g' },
            { id: 'food_31', name: 'Red Apple', amount: '150g' }
          ]
        },
        {
          name: 'Brown Rice',
          foods: [
            { id: 'food_4', name: 'Food 1', amount: '80g' },
            { id: 'food_5', name: 'Food 2', amount: '70g' },
            { id: 'food_7', name: 'Food 4', amount: '110g' },
            { id: 'food_6', name: 'Food 3', amount: '120g' }
          ]
        }
      ]
    },
    items: []
  },
  {
    day: 'Day 2',
    training_plan_day: {
      name: 'Low Intensity Workouts',
      activities: [
        {
          _id: '1',
          name: 'Workout One',
          items: [
            [
              {
                name: 'Pushups',
                info: {
                  sets: 3,
                  reps: 6,
                  rest_interval: '3 min'
                }
              }
            ],
            [
              {
                name: 'Pushups',
                info: {
                  sets: 3,
                  reps: 10,
                  rest_interval: '2 min'
                }
              }
            ]
          ]
        },
        {
          _id: '2',
          name: 'Workout Two',
          items: [
            [
              {
                name: 'Pushups',
                info: {
                  sets: 4,
                  reps: 10,
                  rest_interval: '2 min'
                }
              }
            ],
            [
              {
                name: 'Pushups',
                info: {
                  sets: 3,
                  reps: 4,
                  rest_interval: '2 min'
                }
              }
            ],
            [
              {
                name: '1A--Pushups',
                info: {
                  steps: 2,
                  reps: 10,
                  rest_interval: '1 min'
                }
              },
              {
                name: '1B--Pushups',
                info: {
                  steps: 2,
                  reps: 10,
                  rest_interval: '1 min'
                }
              }
            ]
          ]
        }
      ]
    },
    diet_plan_day: {
      name: 'High Protein day',
      meals: [
        {
          name: 'Meal 1',
          foods: [
            { name: 'Meat', amount: '300g' },
            { name: 'Brown Rice', amount: '50g' },
            { name: 'Red Apple', amount: '50g' }
          ]
        },
        {
          name: 'Meal 2',
          foods: [
            { name: 'Meat', amount: '200g' },
            { name: 'Food 2', amount: '70g' },
            { name: 'Blue Apple', amount: '100g' }
          ]
        }
      ]
    },
    items: []
  },
  {
    day: 'Day 3',
    training_plan_day: {
      name: 'High Intensity Workouts',
      activities: [
        {
          _id: '1',
          name: 'Workout One',
          items: [
            [
              {
                name: 'Pushups',
                info: {
                  steps: 4,
                  reps: 10,
                  rest_interval: '2 min'
                }
              }
            ],
            [
              {
                name: 'Pushups',
                info: {
                  steps: 4,
                  reps: 10,
                  rest_interval: '2 min'
                }
              }
            ],
            [
              {
                name: '1A-Pushups',
                info: {
                  steps: 4,
                  reps: 10,
                  rest_interval: '2 min'
                }
              },
              {
                name: '1B-Pushups',
                info: {
                  steps: 4,
                  reps: 10,
                  rest_interval: '2 min'
                }
              }
            ]
          ]
        },
        {
          _id: '2',
          name: 'Workout Two',
          items: [
            [
              {
                name: 'Pushups',
                info: {
                  steps: 4,
                  reps: 10,
                  rest_interval: '2 min'
                }
              }
            ],
            [
              {
                name: 'Pushups',
                info: {
                  steps: 3,
                  reps: 4,
                  rest_interval: '2 min'
                }
              }
            ]
          ]
        }
      ]
    },
    diet_plan_day: {
      name: 'Low Carb day',
      meals: [
        {
          name: 'Meal 1',
          foods: [
            { name: 'Chicken Brest Tender', amount: '100g' },
            { name: 'Brown Rice', amount: '50g' },
            { name: 'Red Apple', amount: '150g' }
          ]
        },
        {
          name: 'Meal 2',
          foods: [
            { name: 'Food 1', amount: '80g' },
            { name: 'Food 2', amount: '70g' },
            { name: 'Food 3', amount: '120g' }
          ]
        }
      ]
    },
    items: []
  },
  {
    day: 'Day 4',
    training_plan_day: {
      name: 'Low Intensity Workouts',
      activities: [
        {
          _id: '1',
          name: 'Workout One',
          items: [
            [
              {
                name: 'Pushups',
                info: {
                  steps: 3,
                  reps: 6,
                  rest_interval: '3 min'
                }
              }
            ],
            [
              {
                name: 'Pushups',
                info: {
                  steps: 3,
                  reps: 10,
                  rest_interval: '2 min'
                }
              }
            ]
          ]
        },
        {
          _id: '2',
          name: 'Workout Two',
          items: [
            [
              {
                name: 'Pushups',
                info: {
                  steps: 4,
                  reps: 10,
                  rest_interval: '2 min'
                }
              }
            ],
            [
              {
                name: 'Pushups',
                info: {
                  steps: 3,
                  reps: 4,
                  rest_interval: '2 min'
                }
              }
            ],
            [
              {
                name: '1A-Pushups',
                info: {
                  steps: 2,
                  reps: 10,
                  rest_interval: '1 min'
                }
              },
              {
                name: '1B-Pushups',
                info: {
                  steps: 2,
                  reps: 10,
                  rest_interval: '1 min'
                }
              }
            ]
          ]
        }
      ]
    },
    diet_plan_day: {
      name: 'High Protein day',
      meals: [
        {
          name: 'Meal 1',
          foods: [
            { name: 'Meat', amount: '300g' },
            { name: 'Brown Rice', amount: '50g' },
            { name: 'Red Apple', amount: '50g' }
          ]
        },
        {
          name: 'Meal 2',
          foods: [
            { name: 'Meat', amount: '200g' },
            { name: 'Food 2', amount: '70g' },
            { name: 'Blue Apple', amount: '100g' }
          ]
        }
      ]
    },
    items: []
  },
  {
    day: 'Day 5',
    training_plan_day: {
      name: 'High Intensity Workouts',
      activities: [
        {
          _id: '1',
          name: 'Workout One',
          items: [
            [
              {
                name: 'Pushups',
                info: {
                  steps: 4,
                  reps: 10,
                  rest_interval: '2 min'
                }
              }
            ],
            [
              {
                name: 'Pushups',
                info: {
                  steps: 4,
                  reps: 10,
                  rest_interval: '2 min'
                }
              }
            ],
            [
              {
                name: '1A-Pushups',
                info: {
                  steps: 4,
                  reps: 10,
                  rest_interval: '2 min'
                }
              },
              {
                name: '1B-Pushups',
                info: {
                  steps: 4,
                  reps: 10,
                  rest_interval: '2 min'
                }
              }
            ]
          ]
        },
        {
          _id: '2',
          name: 'Workout Two',
          items: [
            [
              {
                name: 'Pushups',
                info: {
                  steps: 4,
                  reps: 10,
                  rest_interval: '2 min'
                }
              }
            ],
            [
              {
                name: 'Pushups',
                info: {
                  steps: 3,
                  reps: 4,
                  rest_interval: '2 min'
                }
              }
            ]
          ]
        }
      ]
    },
    diet_plan_day: {
      name: 'Low Carb day',
      meals: [
        {
          name: 'Meal 1',
          foods: [
            { name: 'Chicken Brest Tender', amount: '100g' },
            { name: 'Brown Rice', amount: '50g' },
            { name: 'Red Apple', amount: '150g' }
          ]
        },
        {
          name: 'Meal 2',
          foods: [
            { name: 'Food 1', amount: '80g' },
            { name: 'Food 2', amount: '70g' },
            { name: 'Food 3', amount: '120g' }
          ]
        }
      ]
    },
    items: []
  },
  {
    day: 'Day 6',
    training_plan_day: {
      name: 'Low Intensity Workouts',
      activities: [
        {
          _id: '1',
          name: 'Workout One',
          items: [
            [
              {
                name: 'Pushups',
                info: {
                  steps: 3,
                  reps: 6,
                  rest_interval: '3 min'
                }
              }
            ],
            [
              {
                name: 'Pushups',
                info: {
                  steps: 3,
                  reps: 10,
                  rest_interval: '2 min'
                }
              }
            ]
          ]
        },
        {
          _id: '2',
          name: 'Workout Two',
          items: [
            [
              {
                name: 'Pushups',
                info: {
                  steps: 4,
                  reps: 10,
                  rest_interval: '2 min'
                }
              }
            ],
            [
              {
                name: 'Pushups',
                info: {
                  steps: 3,
                  reps: 4,
                  rest_interval: '2 min'
                }
              }
            ],
            [
              {
                name: '1A-Pushups',
                info: {
                  steps: 2,
                  reps: 10,
                  rest_interval: '1 min'
                }
              },
              {
                name: '1B-Pushups',
                info: {
                  steps: 2,
                  reps: 10,
                  rest_interval: '1 min'
                }
              }
            ]
          ]
        }
      ]
    },
    diet_plan_day: {
      name: 'High Protein day',
      meals: [
        {
          name: 'Meal 1',
          foods: [
            { name: 'Meat', amount: '300g' },
            { name: 'Brown Rice', amount: '50g' },
            { name: 'Red Apple', amount: '50g' }
          ]
        },
        {
          name: 'Meal 2',
          foods: [
            { name: 'Meat', amount: '200g' },
            { name: 'Food 2', amount: '70g' },
            { name: 'Blue Apple', amount: '100g' }
          ]
        }
      ]
    },
    items: []
  }
]
