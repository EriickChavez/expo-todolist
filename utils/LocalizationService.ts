// import LocalizedStrings from "react-native-localization";
import EN from "../constants/EN";
import ES from "../constants/ES";

import * as Localization from "expo-localization";

// export const LocalizationService = new LocalizedStrings({
//   "en-us": EN,
//   en: EN,
//   es: ES,
// });
const language = {
  en: EN,
  es: ES,
};

const languageCode = Localization.getLocales()[0].languageCode;

const LocalizationService = language[languageCode] || language["es"];
export default LocalizationService;
