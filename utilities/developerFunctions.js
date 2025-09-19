import { isEmpty, formatLowerCase } from "./sharedFunctions";

export const selectEnvironmentVariable = (name) => {

  let environmentVariable = null;
  let environmentVariableName = !isEmpty(name) ? name : "";

  try {

    if (typeof import.meta !== "undefined") {

      environmentVariable = import.meta.env?.[`VITE_${environmentVariableName}`];

    };

    if (typeof process === "undefined" && isEmpty(environmentVariable) && typeof process.env !== "undefined") {

      environmentVariable = process.env[`REACT_APP_${environmentVariableName}`];

    };

  } catch (error) {

  };

  return environmentVariable;

};


export const isLocalDevelopment = () => {

  let developmentEnvironment = "";

  try {

    if (typeof import.meta !== "undefined") {

      // developmentEnvironment = import.meta?.env?.MODE; // * Does not work for some reason. -- 04/07/2025 MF
      developmentEnvironment = import.meta.env?.MODE;
      // developmentEnvironment = import.meta.env.MODE;

    };

    if (typeof process === "undefined" && isEmpty(developmentEnvironment) && typeof process.env !== "undefined") {

      developmentEnvironment = process.env?.NODE_ENV;
      // developmentEnvironment = process.env.NODE_ENV;

    };

  } catch (error) {

  };

  if (developmentEnvironment === "development") {

    return true;

  } else {

    return false;

  };

};


export const inElectron = () => {

  // * Check the userAgent when the nodeIntegration is set to false or contextIsolation is set to true to determine if the application is running in electron. -- 07/02/2021 MF
  // if (!isEmpty(navigator) && !isEmpty(navigator.userAgent)) {
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
  // * 3. isLocalDevelopment()

  if (isLocalDevelopment() || inElectron() || window.location.href.includes("orbiseducation.com")) {

    return true;

  } else {

    return false;

  };

};


export const showLocalDevelopment = (environmentMode) => {

  if (isLocalDevelopment() && environmentMode !== "production") {

    return true;

  } else {

    return false;

  };

};


export const showDevelopment = (environmentMode, demonstrationMode) => {

  let forceDevelopmentMode = selectEnvironmentVariable("FORCE_DEVELOPMENT_MODE");

  if ((isLocalDevelopment() || forceDevelopmentMode === "True" || environmentMode === "development") && demonstrationMode !== true && environmentMode !== "production" && environmentMode !== "staging") {

    return true;

  } else {

    return false;

  };

};


export const showStaging = (environmentMode, demonstrationMode) => {

  let forceStagingMode = selectEnvironmentVariable("FORCE_STAGING_MODE");

  if ((forceStagingMode === "True" || environmentMode === "staging") && demonstrationMode !== true && environmentMode !== "production" && environmentMode !== "development") {

    return true;

  } else {

    return false;

  };

};


export const showDemonstration = (demonstrationMode) => {

  // TODO: Ignore the query string if the user doesn't view the learning object from a playground, executive demonstration, or linked to from the learning object repository administration application (if it's being viewed from a learning management system (LMS) or other outside location). -- 09/20/2023 MF

  // * Demonstration Mode would always override the environmentMode value. -- 09/20/2023 MF

  let forceDemonstrationMode = selectEnvironmentVariable("FORCE_DEMONSTRATION_MODE");

  if (demonstrationMode === true || forceDemonstrationMode === "True") {

    return true;

  } else {

    return false;

  };

};


export const showPlayground = (environmentMode, demonstrationMode) => {

  // * This should be true in two cases: -- 12/02/2021 MF
  // * 1. When showDevelopment === true
  // * 2. When window.location.href contains "intranet.orbiseducation.com/test_local/" or window.location.href contains "intranet.orbiseducation.com/for-review/" (and environmentMode !== "production")
  // * The intranet.orbiseducation.com/test_local directory is the location that the web developers can place code to test or demonstrate learning object functionality. -- 01/13/2023 MF
  // * The intranet.orbiseducation.com/for-review directory is the location that the ELD Team can place learning objects to test or demonstrate functionality. -- 01/13/2023 MF
  // * On these web servers, there may be other directories in which this behavior is not desired so the check needs to be at a directory level and not only at the web server level. -- 01/13/2023 MF

  if (showDevelopment(environmentMode, demonstrationMode) || ((window.location.href.includes("intranet.orbiseducation.com/test_local/") || window.location.href.includes("intranet.orbiseducation.com/for-review/")) && environmentMode !== "production")) {

    return true;

  } else {

    return false;

  };

};


export const showErrorMessage = (environmentMode, alwaysShow) => {

  if ((isLocalDevelopment() && environmentMode !== "production") || alwaysShow === true) {

    return true;

  } else {

    return false;

  };

};


export const allowLogging = () => {

  // // * Checking window.location.href.includes(baseURLLOR + "1387/index.html") and window.location.href.includes(baseURLLOR + "1293/index.html" are temporary to test on the LOR without other learning objects going out to production before this is ready. -- 01/14/2022 MF
  // if (isLocalDevelopment() || window.location.href.includes("intranet.orbiseducation.com/test_local/") || window.location.href.includes(baseURLLOR + "1387/index.html") || window.location.href.includes(baseURLLOR + "1293/index.html")) {

  let allowDevelopmentComputerLog = selectEnvironmentVariable("ALLOW_DEVELOPMENT_COMPUTERLOG");

  if (inLearningObjectEcosystem() && (!isLocalDevelopment() || allowDevelopmentComputerLog === "True")) {

    return true;

  } else {

    return false;

  };

};


// export const showAuthentication = (environmentMode, demonstrationMode, applicationName, azureAuthentication) => {
export const showAuthentication = (environmentMode, applicationName, azureAuthentication) => {

  // * This should be true in these cases: -- 03/28/2025 MF
  // * 1. When window.location.href contains "orbiseducation.com"
  // * 2. When window.location.href contains "dewfapvs2001e.gce.com"

  // * This should be false in these cases: -- 03/28/2025 MF
  // * 1. When azureAuthentication !== true and applicationName === "Learning Object Template" and application is on a playground
  // * 2. When window.location.href contains "lor.orbiseducation.com"
  // * 3. When window.location.href contains "lor-dev."
  // * 4. When window.location.href contains "lor-staging."

  let learningObjectAzureAuthentication = azureAuthentication !== true && applicationName === "Learning Object Template";

  // if (learningObjectAzureAuthentication === true && (showPlayground(environmentMode, demonstrationMode) || (window.location.href.includes("orbiseducation.com/test_local/") && environmentMode === "production"))) {
  // * Removed the code to allow development environment bypass the login. -- 09/11/2025 MF
  if (learningObjectAzureAuthentication === true && window.location.href.includes("orbiseducation.com/test_local/") && environmentMode === "production") {

    return false;

  } else if (!window.location.href.includes("lor.orbiseducation.com") && !window.location.href.includes("lor-dev.") && !window.location.href.includes("lor-staging.") && (window.location.href.includes("orbiseducation.com") || window.location.href.includes("dewfapvs2001e.gce.com"))) {

    return true;

  } else if (window.location.href.includes("localhost:")) {

    return true;

  } else {

    return false;

  };

};


export const getFetchAuthorization = (partnerID, databaseNameProduction, databaseNameDevelopment, sessionToken, environmentMode, demonstrationMode) => {

  let databaseName = databaseNameProduction;

  if (!isEmpty(databaseNameDevelopment) && (showLocalDevelopment(environmentMode) || showPlayground(environmentMode, demonstrationMode) || window.location.href.includes("lor-dev.orbiseducation.com") || window.location.href.includes("lor-staging.orbiseducation.com"))) {

    databaseName = databaseNameDevelopment;

  };

  return window.btoa(JSON.stringify({ partnerID: partnerID, databaseName: databaseName, sessionToken: sessionToken }));

};


export const resolveBaseURL = (endPointBase, environmentMode, demonstrationMode, lorServer) => {

  let forceLocalAPI = selectEnvironmentVariable("FORCE_LOCAL_API");
  let forceStagingAPI = selectEnvironmentVariable("FORCE_STAGING_API");
  let forceProductionAPI = selectEnvironmentVariable("FORCE_PRODUCTION_API");
  let serverPort = selectEnvironmentVariable("SERVER_PORT");

  let baseURL = lorServer === true ? "lor" : "api";

  if (
    isLocalDevelopment() &&
    forceLocalAPI === "True" &&
    forceStagingAPI !== "True" &&
    forceProductionAPI !== "True"
  ) {

    return `http://localhost:${serverPort}/${endPointBase}/`;

  };

  if (
    (isLocalDevelopment() || showDevelopment(environmentMode, demonstrationMode)) &&
    forceLocalAPI !== "True" &&
    forceStagingAPI !== "True" &&
    forceProductionAPI !== "True"
  ) {

    return `https://${baseURL}-dev.orbiseducation.com/${endPointBase}/`;

  };

  if (
    (forceStagingAPI === "True" || showPlayground(environmentMode, demonstrationMode) || showStaging(environmentMode, demonstrationMode)) &&
    forceLocalAPI !== "True" &&
    forceProductionAPI !== "True"
  ) {

    return `https://${baseURL}-staging.orbiseducation.com/${endPointBase}/`;

  };

  return `https://${baseURL}.orbiseducation.com/${endPointBase}/`;

};


export const resolveRedirectURL = (environmentMode, demonstrationMode) => {

  let popUpRedirectURI = selectEnvironmentVariable("POPUP_REDIRECT_URI");
  let playgroundPopUpRedirectURI = selectEnvironmentVariable("PLAYGROUND_POPUP_REDIRECT_URI");

  if (isLocalDevelopment()) return "/";

  if (showPlayground(environmentMode, demonstrationMode))
    return "/test_local" + playgroundPopUpRedirectURI;

  return popUpRedirectURI;

};
