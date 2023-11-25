interface ArabicLetterMapping {
  [key: string]: string;
}

export const arabicToEnglishMap: ArabicLetterMapping = {
  أ: "a",
  ب: "p",
  ج: "g",
  د: "d",
  ه: "h",
  و: "o",
  ز: "z",
  ح: "h",
  ط: "t",
  ي: "i",
  ك: "k",
  ل: "l",
  م: "m",
  ن: "n",
  س: "s",
  ع: "a",
  ف: "f",
  ص: "s",
  ق: "q",
  ر: "r",
  ش: "sh",
  ت: "t",
  ث: "th",
  خ: "kh",
  ذ: "th",
  ض: "dh",
  ظ: "z",
  غ: "gh",
  ا: "a",
  ئ: "a",
  ى: "a",
  ؤ: "u",
  ء: "a",
  ة: "h",
  إ: "i",
  آ: "a",
  " ": " ",
};

interface ArabicTransformRules {
  [key: string]: {
    action: "slice" | "replace";
    [key: string]: string;
  };
}

const transformRules: ArabicTransformRules = {
  و: {
    action: "slice",
    و: "o",
  },
  ه: {
    action: "slice",
    ه: "ah",
  },
  ة: {
    action: "slice",
    ة: "ah",
  },
  ي: {
    action: "slice",
    ي: "y",
  },
};

interface ArabicNextLetterRules {
  [key: string]: {
    [key: string]: string
  }
}

const nextLetterRules: ArabicNextLetterRules = {
  م: {
    ح: "u",
    ث: "u",
    ص: "u",
    خ: "u",
    ر: "a",
    ه: "u",
    ق: "u",
    ع: "u",
    ف: "u",
    ن: "u",
    ك: "a",
    ي: "a",
  },
  س: {
    ه: "u",
    ن: "a",
    و: "a",
    ي: "a",
    ل: "a",
    ع: "a",
    د: "a",
    م: "a",
    ح: "a",
  },
  ن: {
    ب: "a",
    د: "a",
    ج: "a",
    ص: "a",
    ز: "a",
    ش: "a",
    ظ: "i",
    س: "i",
    ه: "u",
  },
  ح: {
    س: "u",
    ي: "a",
    م: "a",
    ق: "a",
    ز: "u",
    ن: "a",
    ب: "a",
    ج: "a",
    ر: "a",
  },
  ر: {
    ح: "a",
    ف: "a",
    ب: "a",
    ض: "a",
  },
  ت: {
    ق: "u",
    ن: "i",
  },
  ز: {
    ه: "u",
    ي: "a",
    ن: "i",
  },
  غ: {
    ف: "u",
    م: "a",
  },
  ك: {
    م: "a",
    ر: "a",
    ل: "a",
  },
  د: {
    ع: "u",
  },
  ض: {
    ح: "u",
    ر: "u",
  },
  ق: {
    ي: "a",
    ص: "u",
    ر: "u",
    ت: "u",
    د: "a",
    ح: "a",
  },
  ج: {
    د: "a",
    ب: "a",
    ه: "a",
  },
  ب: {
    د: "a",
  },
  ؤ: {
    ي: "a",
  },
  ط: {
    ن: "a",
    ي: "a",
  },
  خ: {
    ل: "a",
    ت: "i",
  },
  ي: {
    م: "a",
    ز: "a",
  },
  و: {
    ر: "a",
  },
  ه: {
    د: "a",
  },
  ش: {
    ه: "a",
  },
  ص: {
    د: "a",
    ر: "a",
    ف: "a",
    ك: "a",
    ن: "a",
    ه: "u",
  },
  ف: {
    ذ: "a",
    ن: "a",
    ر: "a",
    ض: "a",
    ج: "a",
    ك: "i",
    ق: "a",
    خ: "a",
    ز: "a",
  },

  ل: {
    م: "a",
    ي: "a",
    ق: "i",
  },
};

interface ArabicThreeLetterRules {
  [key: string]: {
    [key: string]: {
      [key: string]: string;
    };
  };
}

const threeLetterRules: ArabicThreeLetterRules = {
  م: {
    ح: {
      م: "u",
      ا: "a",
      أ: "a",
      ب: "a",
      ف: "a",
      ج: "a",
    },
    ي: {
      ر: "e",
      ث: "e",
    },
    ج: {
      ي: "a",
    },
    ن: {
      ي: "a",
    },
  },
  و: {
    س: {
      ف: "u",
    },
  },
  س: {
    ل: {
      ي: "u",
    },
    ف: {
      ي: "u",
    },
    ق: {
      ي: "u",
    },
    و: {
      ا: "a",
    },
    ي: {
      ا: "a",
    },
    م: {
      ر: "a",
      ا: "a",
    },
    ن: {
      ا: "a",
      د: "a",
    },
    ر: {
      ى: "u",
    },
  },
  ع: {
    م: {
      ا: "m",
    },
    د: {
      ي: "u",
    },
    ز: {
      ت: "i",
    },
    ط: {
      ا: "a",
      ب: "a",
      س: "a",
      ي: "a",
      ز: "a",
      ر: "i",
      ق: "a",
      ش: "a",
      ف: "a",
    },
  },
  ب: {
    ر: {
      ا: "a",
    },
    د: {
      ر: "a",
    },
    ل: {
      ا: "i",
    },
  },
  خ: {
    د: {
      ر: "a",
    },
    ض: {
      ر: "i",
    },
    ط: {
      ا: "a",
    },
    ظ: {
      ا: "a",
    },
    م: {
      ا: "a",
      ي: "a",
    },
    ي: {
      ر: "a",
    },
  },
  ح: {
    ظ: {
      ي: "a",
    },
    ك: {
      ي: "a",
    },
    ل: {
      و: "i",
      ي: "a",
    },
    س: {
      ن: "a",
    },
  },
  ش: {
    م: {
      س: "a",
    },
    ر: {
      و: "u",
    },
    ه: {
      ر: "u",
    },
    ي: {
      ت: "e",
    },
    ج: {
      ر: "a",
    },
  },
  د: {
    ر: {
      و: "a",
    },
  },
  ز: {
    م: {
      ن: "a",
      ا: "a",
    },
    ه: {
      ي: "u",
      ر: "u",
    },
    ي: {
      د: "a",
      ن: "a",
    },
  },
  ر: {
    ق: {
      ي: "u",
    },
    و: {
      ا: "a",
    },
    ي: {
      ا: "a",
    },
  },
  ل: {
    م: {
      ى: "u",
    },
  },
  ن: {
    و: {
      ر: "",
    },
  },
  ه: {
    ي: {
      ف: "a",
      ل: "a",
      م: "a",
    },
  },
  ص: {
    ب: {
      ا: "a",
      ر: "a",
    },
  },
  ط: {
    ل: {
      ا: "a",
    },
  },
};

interface ArabicMiddleLetterRules {
  [key: string]: {
    [key: string]: {
      [key: string]: string;
    };
  };
}

const middleLetterRules: ArabicMiddleLetterRules = {
  ب: {
    ك: {
      ر: "a",
    },
    ع: {
      ر: "a",
    },
    خ: {
      ر: "a",
    },
    ص: {
      ا: "a",
    },
    ز: {
      ا: "a",
    },
  },
  ز: {
    ا: {
      ل: "a",
    },
    ع: {
      ت: "a",
    },
  },
  ي: {
    ف: {
      ف: "e",
    },
    ن: {
      ن: "e",
    },
    د: {
      ن: "e",
    },
    ش: {
      ت: "e",
      ن: "e",
      م: "e",
      ح: "e",
    },
    ت: {
      ش: "e",
      ن: "e",
      م: "e",
      ح: "e",
    },
  },
  ه: {
    ن: {
      ر: "u",
    },
    ا: {
      ر: "i",
    },
  },

  ر: {
    ج: {
      ح: "a",
    },
    ح: {
      ج: "a",
    },
  },
  م: {
    ح: {
      د: "a",
    },
    ز: {
      ن: "a",
    },
  },

  د: {
    خ: {
      ر: "a",
    },
    ع: {
      ي: "a",
    },
    ا: {
      م: "a",
      ق: "i",
    },
    أ: {
      م: "a",
    },
    آ: {
      م: "a",
    },
  },

  ض: {
    خ: {
      ر: "i",
    },
  },
  ف: {
    ر: {
      ل: "a",
    },
    ا: {
      ي: "i",
    },
  },

  ن: {
    ا: {
      س: "a",
      ي: "e",
    },
    أ: {
      س: "a",
      ي: "e",
    },
    إ: {
      س: "e",
      ي: "e",
    },
    س: {
      د: "a",
    },
  },
  ح: {
    ا: {
      ب: "i",
    },
    س: {
      ر: "a",
    },
  },

  ل: {
    ع: {
      ا: "a",
      ك: "a",
      م: "a",
      ش: "a",
      ق: "a",
    },
  },



  ج: {
    ع: {
      ب: "a",
      ر: "a",
    },
    ن: {
      ب: "a",
      ر: "a",
    },
  },


};

export function toEnglishName(arabicName: string): string {

  let englishName = "";

  for (let i = 0; i < arabicName.length; i++) {

    const letter = arabicName[i];

    if (i === 0) {
      englishName += getEnglishForFirstLetter(letter);
    } else {
      englishName += getEnglishForLetter(letter, i, arabicName);
    }

  }

  return englishName;

}

function getEnglishForFirstLetter(letter: string): string {
  return arabicToEnglishMap[letter] || letter;
}

function getEnglishForLetter(letter: string, index: number, name: string): string {

  let english = arabicToEnglishMap[letter] || letter;

  const prevLetter = index > 0 ? name[index - 1] : '';
  const nextLetter = index < name.length - 1 ? name[index + 1] : '';

  if (transformRules[letter]) {
    const rule = transformRules[letter];
    if (rule.action === 'slice') {
      english = english.slice(0, -1) + rule[letter];
    }
  }

  if (nextLetterRules[letter] && nextLetterRules[letter][nextLetter]) {
    english += nextLetterRules[letter][nextLetter];
  }

  if (threeLetterRules[letter] && threeLetterRules[letter][nextLetter] &&
    threeLetterRules[letter][nextLetter][name[index + 2]]
  ) {
    english += threeLetterRules[letter][nextLetter][name[index + 2]];
  }

  if (middleLetterRules[letter] && middleLetterRules[letter][prevLetter] &&
    middleLetterRules[letter][prevLetter][nextLetter]) {
    english += middleLetterRules[letter][prevLetter][nextLetter];
  }

  return english;

}
