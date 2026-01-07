const questions = [
  {
    questionCode: "Q_BODY_TYPE",
    text: "How would you describe your body type?",
    options: [
      {
        label: "Thin, dry, underweight",
        answerValue: "THIN_DRY",
        doshaType: "VATA",
        weight: 3,
      },
      {
        label: "Medium, muscular, well-built",
        answerValue: "MEDIUM_MUSCULAR",
        doshaType: "PITTA",
        weight: 3,
      },
      {
        label: "Heavy, broad, gains weight easily",
        answerValue: "HEAVY_BROAD",
        doshaType: "KAPHA",
        weight: 3,
      },
    ],
  },

  {
    questionCode: "Q_SKIN_TYPE",
    text: "What best describes your skin type?",
    options: [
      {
        label: "Dry, rough, cracks easily",
        answerValue: "DRY_ROUGH",
        doshaType: "VATA",
        weight: 2,
      },
      {
        label: "Warm, oily, acne or pimples",
        answerValue: "WARM_OILY",
        doshaType: "PITTA",
        weight: 2,
      },
      {
        label: "Thick, oily, soft, cold",
        answerValue: "THICK_OILY",
        doshaType: "KAPHA",
        weight: 2,
      },
    ],
  },

  {
    questionCode: "Q_HAIR_TYPE",
    text: "What best describes your hair?",
    options: [
      {
        label: "Dry, frizzy, hair fall",
        answerValue: "DRY_FRIZZY",
        doshaType: "VATA",
        weight: 2,
      },
      {
        label: "Premature greying or thinning",
        answerValue: "PREMATURE_GREY",
        doshaType: "PITTA",
        weight: 2,
      },
      {
        label: "Thick, oily, strong",
        answerValue: "THICK_STRONG",
        doshaType: "KAPHA",
        weight: 2,
      },
    ],
  },

  {
    questionCode: "Q_APPETITE",
    text: "How is your appetite?",
    options: [
      {
        label: "Irregular, sometimes hungry sometimes not",
        answerValue: "IRREGULAR",
        doshaType: "VATA",
        weight: 3,
      },
      {
        label: "Strong hunger, irritation if meal is delayed",
        answerValue: "STRONG",
        doshaType: "PITTA",
        weight: 3,
      },
      {
        label: "Low appetite, can skip meals easily",
        answerValue: "LOW",
        doshaType: "KAPHA",
        weight: 3,
      },
    ],
  },

  {
    questionCode: "Q_DIGESTION_ISSUES",
    text: "Which digestion issues do you experience most often?",
    options: [
      {
        label: "Gas, bloating, constipation",
        answerValue: "GAS_CONSTIPATION",
        doshaType: "VATA",
        weight: 3,
      },
      {
        label: "Acidity, burning sensation, loose motions",
        answerValue: "ACIDITY",
        doshaType: "PITTA",
        weight: 3,
      },
      {
        label: "Heaviness, slow digestion, mucus",
        answerValue: "HEAVY_SLOW",
        doshaType: "KAPHA",
        weight: 3,
      },
    ],
  },

  {
    questionCode: "Q_BOWEL_MOVEMENT",
    text: "How are your bowel movements usually?",
    options: [
      {
        label: "Hard, dry, irregular",
        answerValue: "HARD_DRY",
        doshaType: "VATA",
        weight: 2,
      },
      {
        label: "Loose or frequent",
        answerValue: "LOOSE",
        doshaType: "PITTA",
        weight: 2,
      },
      {
        label: "Normal but sluggish",
        answerValue: "SLUGGISH",
        doshaType: "KAPHA",
        weight: 2,
      },
    ],
  },

  {
    questionCode: "Q_WEATHER_SENSITIVITY",
    text: "Which weather affects you the most?",
    options: [
      {
        label: "Cold and windy weather",
        answerValue: "COLD_WINDY",
        doshaType: "VATA",
        weight: 2,
      },
      {
        label: "Hot weather and sunlight",
        answerValue: "HOT_WEATHER",
        doshaType: "PITTA",
        weight: 2,
      },
      {
        label: "Cold and damp weather",
        answerValue: "COLD_DAMP",
        doshaType: "KAPHA",
        weight: 2,
      },
    ],
  },

  {
    questionCode: "Q_BODY_TEMPERATURE",
    text: "How does your body temperature usually feel?",
    options: [
      {
        label: "Often cold hands and feet",
        answerValue: "COLD",
        doshaType: "VATA",
        weight: 2,
      },
      {
        label: "Feel hot, sweat a lot",
        answerValue: "HOT",
        doshaType: "PITTA",
        weight: 2,
      },
      {
        label: "Normal to cold, less sweating",
        answerValue: "NORMAL_COLD",
        doshaType: "KAPHA",
        weight: 2,
      },
    ],
  },

  {
    questionCode: "Q_MENTAL_NATURE",
    text: "How would you describe your mental nature?",
    options: [
      {
        label: "Overthinking, anxiety, fear",
        answerValue: "ANXIOUS",
        doshaType: "VATA",
        weight: 3,
      },
      {
        label: "Anger, impatience, irritation",
        answerValue: "IRRITATED",
        doshaType: "PITTA",
        weight: 3,
      },
      {
        label: "Calm but lazy or slow",
        answerValue: "CALM_LAZY",
        doshaType: "KAPHA",
        weight: 3,
      },
    ],
  },

  {
    questionCode: "Q_SLEEP_QUALITY",
    text: "How is your sleep quality?",
    options: [
      {
        label: "Light sleep, disturbed or insomnia",
        answerValue: "LIGHT_SLEEP",
        doshaType: "VATA",
        weight: 3,
      },
      {
        label: "Moderate sleep, disturbed by heat",
        answerValue: "MODERATE_SLEEP",
        doshaType: "PITTA",
        weight: 3,
      },
      {
        label: "Deep sleep, excessive sleep",
        answerValue: "DEEP_SLEEP",
        doshaType: "KAPHA",
        weight: 3,
      },
    ],
  },

  {
    questionCode: "Q_STRESS_REACTION",
    text: "How do you usually react to stress?",
    options: [
      {
        label: "Nervous, restless, anxious",
        answerValue: "NERVOUS",
        doshaType: "VATA",
        weight: 3,
      },
      {
        label: "Anger, frustration, irritation",
        answerValue: "FRUSTRATED",
        doshaType: "PITTA",
        weight: 3,
      },
      {
        label: "Prefer silence, withdraw, sit calmly",
        answerValue: "WITHDRAWN",
        doshaType: "KAPHA",
        weight: 3,
      },
    ],
  },

  {
    questionCode: "Q_COMMON_ISSUES",
    text: "Which health issues do you experience more often?",
    options: [
      {
        label: "Joint pain, back pain, cracking joints",
        answerValue: "JOINT_PAIN",
        doshaType: "VATA",
        weight: 2,
      },
      {
        label: "Headache, acidity, burning eyes or stomach",
        answerValue: "HEADACHE_ACIDITY",
        doshaType: "PITTA",
        weight: 2,
      },
      {
        label: "Cold, cough, sinus, mucus",
        answerValue: "COLD_COUGH",
        doshaType: "KAPHA",
        weight: 2,
      },
    ],
  },

  {
    questionCode: "Q_TONGUE_APPEARANCE",
    text: "What best describes your tongue appearance?",
    options: [
      {
        label: "Dry or cracked",
        answerValue: "DRY_CRACKED",
        doshaType: "VATA",
        weight: 2,
      },
      {
        label: "Red or yellow coating",
        answerValue: "RED_YELLOW",
        doshaType: "PITTA",
        weight: 2,
      },
      {
        label: "Thick white coating",
        answerValue: "WHITE_COATED",
        doshaType: "KAPHA",
        weight: 2,
      },
    ],
  },

  {
    questionCode: "Q_FOOD_CRAVING",
    text: "What type of food do you naturally crave?",
    options: [
      {
        label: "Warm, oily, salty foods",
        answerValue: "WARM_OILY",
        doshaType: "VATA",
        weight: 2,
      },
      {
        label: "Sweet, cold, bitter foods",
        answerValue: "SWEET_COLD",
        doshaType: "PITTA",
        weight: 2,
      },
      {
        label: "Spicy, fried, sweet foods",
        answerValue: "SPICY_FRIED",
        doshaType: "KAPHA",
        weight: 2,
      },
    ],
  },

  {
    questionCode: "Q_AFTER_HEAVY_FOOD",
    text: "How do you usually feel after eating heavy food?",
    options: [
      {
        label: "Gas or discomfort",
        answerValue: "GAS",
        doshaType: "VATA",
        weight: 2,
      },
      {
        label: "Acidity or body heat",
        answerValue: "ACIDITY",
        doshaType: "PITTA",
        weight: 2,
      },
      {
        label: "Sleepy, heavy, lethargic",
        answerValue: "LETHARGIC",
        doshaType: "KAPHA",
        weight: 2,
      },
    ],
  },
];

export default questions;
