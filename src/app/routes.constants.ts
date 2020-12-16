const slash = '/';
export const ROUTES = {
    USER_FORMS: 'userForms',
    FORM: 'form',
    LOGIN: 'login',
    LOGOUT: 'logout',
    HOME: '',
    PATH_MATCH: 'full'
};

export const ROUTES_SLASHED = {
    USER_FORMS: slash + ROUTES.USER_FORMS,
    FORM: slash + ROUTES.FORM
};
