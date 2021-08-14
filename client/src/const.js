const AuthorizationStatus = {
    AUTH: 'AUTH',
    NO_AUTH: 'NO_AUTH',
    UNKNOWN: 'UNKNOWN',
  };

const AppRoute = {
    MAIN: '/',
    REG: '/registration',
    SIGN_IN: '/login',
    PROFILE: '/profile',
    STORE: '/store',
    ROOM_1: '/room-1',    
    ROOM_2: '/room-2',    
}

const APIRoute = {
    REG: '/registration',
    LOGIN: '/login',
    LOGOUT: '/logout',
    USER: '/user',
    ROOM_1: '/room-1',
    ROOM_2: '/room-2',
  };

const ROOMS = {
  MAIN_ROOM: '6111901e25947259b089bdb7',
  REG_ROOM: '611190f825947259b089bdc7',
  LOGIN_ROOM: '6111910925947259b089bdcb',
  USER_ROOM: '6111911625947259b089bdcf',
  STORE: '6117a719dfd13508c4f026be',
  ROOM_1: '6111912325947259b089bdd3',
  ROOM_2: '6111912a25947259b089bdd7',
}

export { AuthorizationStatus, AppRoute, APIRoute, ROOMS }