export const environment = {
  production: false,
  angularUrl: 'http://localhost:4200',
  checkPleaseBaseUrl: 'http://localhost:4200',
  userIdClaimKey: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier',
  redirectToMain: '/main',
  redirectToRegisterAuthUrl: '/register',
  redirectToLoginAuthUrl: '/login',
  localStorageLocaleVariableName: 'check-please-locale',
  defaultLanguage: 'en',
  currentLanguageLabel: 'English',
  secretKeyHiddenFormat: '***-***-***',
  datetimeDefaultFormat: 'dd-MM-yyyy HH:mm',
  languages: [
    { code: 'en', label: 'English' },
    { code: 'ru', label: 'Русский' },
    { code: 'ro', label: 'Română' },
  ],
};
