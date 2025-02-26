import { isEmpty, getDateTime, isNonEmptyArray, formatLowerCase } from "./sharedFunctions";

const componentName = "DeveloperFunctions";

export const isProcessEnvironment = () => {

  let importProcessEnabled = false;

  try {

    if (typeof process.env !== "undefined") {

      importProcessEnabled = true;

    };

  } catch (error) {

  };

  return importProcessEnabled;

};


export const isLocalDevelopment = () => {

  if (isProcessEnvironment()) {

    if (process.env.NODE_ENV === "development") {

      return true;

    } else {

      return false;

    };

  } else {

    if (isEmpty(import.meta) === false && import.meta.env.MODE === "development") {

      return true;

    } else {

      return false;

    };

  };

};


export const inElectron = () => {

  // * Check the userAgent when the nodeIntegration is set to false or contextIsolation is set to true to determine if the application is running in electron. -- 07/02/2021 MF
  // if (isEmpty(navigator) === false && isEmpty(navigator.userAgent) === false) {
  let userAgent = formatLowerCase(navigator.userAgent);

  if (userAgent.indexOf(" electron/") > -1) {

    return true;

  } else {

    return false;

  };

};


export const inLearningObjectEcosystem = () => {

  // * This should be true in these cases: -- 06/30/2023 MF
  // * 1. When window.location.href contains "orbiseducation.com"
  // * 2. Executive Demonstration in Electron
  // * 3. isLocalDevelopment() === true

  if (isLocalDevelopment() === true || inElectron() === true || window.location.href.includes("orbiseducation.com") === true) {

    return true;

  } else {

    return false;

  };

};


export const showLocalDevelopment = (environmentMode) => {

  if (isLocalDevelopment() === true && environmentMode !== "production") {

    return true;

  } else {

    return false;

  };

};


export const showDevelopment = (environmentMode, demonstrationMode) => {

  if (isProcessEnvironment()) {

    if ((isLocalDevelopment() === true || process.env.REACT_APP_FORCE_DEVELOPMENT_MODE === "True" || environmentMode === "development") && demonstrationMode !== true && environmentMode !== "production") {

      return true;

    } else {

      return false;

    };

  } else {

    if (isEmpty(import.meta) === false && (isLocalDevelopment() === true || import.meta.env.VITE_FORCE_DEVELOPMENT_MODE === "True" || environmentMode === "development") && demonstrationMode !== true && environmentMode !== "production") {

      return true;

    } else {

      return false;

    };

  };

};


export const showDemonstration = (/* environmentMode, */ demonstrationMode) => {

  // TODO: Ignore the query string if the user doesn't view the learning object from a playground, executive demonstration, or linked to from the learning object repository administration application (if it's being viewed from a learning management system (LMS) or other outside location). -- 09/20/2023 MF

  // * Demonstration Mode would always override the environmentMode value. -- 09/20/2023 MF

  if (isProcessEnvironment()) {

    if ( /* showDevelopment(environmentMode, demonstrationMode) === true || */ (demonstrationMode === true || process.env.REACT_APP_FORCE_DEMONSTRATION_MODE === "True") /* && environmentMode !== "production" */) {

      return true;

    } else {

      return false;

    };

  } else {

    if ( /* showDevelopment(environmentMode, demonstrationMode) === true || */ (demonstrationMode === true || (isEmpty(import.meta) === false && import.meta.env.VITE_FORCE_DEMONSTRATION_MODE === "True")) /* && environmentMode !== "production" */) {

      return true;

    } else {

      return false;

    };

  };

};


export const showPlayground = (environmentMode, demonstrationMode) => {

  // * This should be true in two cases: -- 12/02/2021 MF
  // * 1. When showDevelopment === true
  // * 2. When window.location.href contains "intranet.orbiseducation.com/test_local/" or window.location.href contains "intranet.orbiseducation.com/for-review/" (and environmentMode !== "production")
  // * The intranet.orbiseducation.com/test_local directory is the location that the web developers can place code to test or demonstrate learning object functionality. -- 01/13/2023 MF
  // * The intranet.orbiseducation.com/for-review directory is the location that the ELD Team can place learning objects to test or demonstrate functionality. -- 01/13/2023 MF
  // * On these web servers, there may be other directories in which this behavior is not desired so the check needs to be at a directory level and not only at the web server level. -- 01/13/2023 MF

  if (showDevelopment(environmentMode, demonstrationMode) === true || ((window.location.href.includes("intranet.orbiseducation.com/test_local/") === true || window.location.href.includes("intranet.orbiseducation.com/for-review/") === true) && environmentMode !== "production")) {

    return true;

  } else {

    return false;

  };

};


export const showBanner = (environmentMode, demonstrationMode) => {

  // * This should be true in these cases: -- 06/30/2023 MF
  // * 1. When showDevelopment === true
  // * 2. When window.location.href contains "intranet.orbiseducation.com/test_local/" or window.location.href contains "intranet.orbiseducation.com/for-review/"
  // * The intranet.orbiseducation.com/test_local directory is the location that the web developers can place code to test or demonstrate learning object functionality. -- 06/30/2023 MF
  // * The intranet.orbiseducation.com/for-review directory is the location that the ELD Team can place learning objects to test or demonstrate functionality. -- 06/30/2023 MF
  // * 3. When environmentMode=development regardless of where the learning object is (intranet, LOR, Executive Demonstration in Electron, etc.)?
  // * 4. When demonstrationMode=true regardless of where the learning object is (intranet, LOR, Executive Demonstration in Electron, etc.)?
  // * 5. https://intranet.orbiseducation.com/learningObject/index.html?learningObjectID=caseStudyOne1387
  // * 6. https://intranet.orbiseducation.com/executivedemo/
  // * 7. https://intranet.orbiseducation.com/executivedemo_ota/
  // * 8. https://intranet.orbiseducation.com/mls-demo/
  // * 9. https://instructor.orbiseducation.com/
  // * 10. When window.location.href contains "intranet.orbiseducation.com"
  // * 11. When window.location.href contains "product.orbiseducation.com"
  // * 12. When window.location.href contains "testlor.orbiseducation.com"
  // * 13. When window.location.href contains "api.orbiseducation.com" or window.location.href contains ""api-dev.orbiseducation.com" (temporary)
  // * 14. Executive Demonstration in Electron except when environmentMode=development
  // * 15. When window.location.href contains "lor.orbiseducation.com" except when environmentMode=development or demonstrationMode=true

  // * This should be false in these cases: -- 06/30/2023 MF
  // * 1. Executive Demonstration in Electron except when environmentMode=development
  // * 2. When window.location.href contains "lor.orbiseducation.com" except when environmentMode=development or demonstrationMode=true
  // * 3. environmentMode === "production"

  // * The reason behind marking learning objects this way is so that they aren't linked to from a learning management system (LMS) and used as a production learning object. The only production learning objects should be on the LOR. There are no exceptions that I'm aware of. -- 06/30/2023 MF

  if (environmentMode === "production" || (inElectron() === true && showDevelopment(environmentMode, demonstrationMode) !== true) || (showDevelopment(environmentMode, demonstrationMode) !== true && showDemonstration(demonstrationMode) !== true && window.location.href.includes("lor.orbiseducation.com") === true)) {

    return false;

  } else {

    return true;

  };

};


export const showSelectPage = (environmentMode, demonstrationMode) => {

  if ( /* isEmpty(import.meta) === false && import.meta.env.VITE_DISPLAY_LOAD_PAGE_COMPONENT !== "False" && */ showDevelopment(environmentMode, demonstrationMode) === true) {

    return true;

  } else {

    return false;

  };

};


export const showErrorMessage = (environmentMode, alwaysShow) => {

  if ((isLocalDevelopment() === true && environmentMode !== "production") || alwaysShow === true) {

    return true;

  } else {

    return false;

  };

};


export const allowLogging = ( /* baseURLLOR */) => {

  // // * Checking window.location.href.includes(baseURLLOR + "1387/index.html") and window.location.href.includes(baseURLLOR + "1293/index.html" are temporary to test on the LOR without other learning objects going out to production before this is ready. -- 01/14/2022 MF
  // if (isLocalDevelopment() === true || window.location.href.includes("intranet.orbiseducation.com/test_local/") === true || window.location.href.includes(baseURLLOR + "1387/index.html") || window.location.href.includes(baseURLLOR + "1293/index.html") === true) {

  if (isProcessEnvironment()) {

    if (inLearningObjectEcosystem() === true && isEmpty(process.env) === false && (isLocalDevelopment() === false || process.env.REACT_APP_ALLOW_DEVELOPMENT_COMPUTERLOG === "True")) {

      return true;

    } else {

      return false;

    };

  } else {

    if (inLearningObjectEcosystem() === true && isEmpty(import.meta) === false && (isLocalDevelopment() === false || import.meta.env.VITE_ALLOW_DEVELOPMENT_COMPUTERLOG === "True")) {

      return true;

    } else {

      return false;

    };

  };

};


export const showDeveloperTools = (environmentMode, isSystemAdministrator) => {

  if (isSystemAdministrator === true || showDevelopment(environmentMode) === true) {

    return true;

  } else {

    return false;

  };

};


export const showBarcode = (environmentMode, demonstrationMode, barcodeScannerRequired, isAdministrator, isSystemAdministrator) => {

  if (isProcessEnvironment()) {

    if (isAdministrator === true || isSystemAdministrator === true) {

      return true;

    } else {

      if ((showDemonstration(environmentMode, demonstrationMode, isSystemAdministrator) === true || showDevelopment(environmentMode) === true) && process.env.REACT_APP_DISPLAY_BARCODE === "True" && barcodeScannerRequired === true) {

        return true;

      } else {

        return false;

      };

    };

  } else {

    if (isAdministrator === true || isSystemAdministrator === true) {

      return true;

    } else {

      if ((showDemonstration(environmentMode, demonstrationMode, isSystemAdministrator) === true || showDevelopment(environmentMode) === true) && import.meta.env.VITE_DISPLAY_BARCODE === "True" && barcodeScannerRequired === true) {

        return true;

      } else {

        return false;

      };

    };

  };

};


export const showAuthentication = (environmentMode, demonstrationMode, applicationName, azureAuthentication) => {

  if (isEmpty(azureAuthentication) === false && azureAuthentication !== true && applicationName === "Learning Object Template" && showPlayground(environmentMode, demonstrationMode) === true) {

    return false;

  } else if (window.location.href.includes("lor.orbiseducation.com") === false && window.location.href.includes("lor-dev.") === false && window.location.href.includes("lor-staging.") === false && (window.location.href.includes("orbiseducation.com") === true || window.location.href.includes("dewfapvs2001e.gce.com") === true)) {

    return true;

  } else {

    return false;

  };

};
