import { AuthorizationStatus } from "./const"
import { requireAuthorization } from "./store/action";

const isCheckedAuth = (authorizationStatus) =>
  authorizationStatus === AuthorizationStatus.UNKNOWN;

const logout = () => {
  console.log('logout');
  localStorage.removeItem('userData');
  requireAuthorization(AuthorizationStatus.NO_AUTH);
}

function encode(string) {
  const htmlEscapes = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
  };

  return string.replace(/[&<>"']/g, function(match) {
      return htmlEscapes[match];
  });
};

export { isCheckedAuth, logout, encode }
