import { requireAuthorization, redirectToRoute, getUser } from './action';
import { AppRoute, AuthorizationStatus } from '../const';

const checkAuth = (data) => (dispatch, _getState, api) => (
  api.post('api/auth/check')
    .then((res) => {
      if (!data) {
        dispatch(requireAuthorization('NO_AUTH'));
      } else {
        const fullData = JSON.parse(data);
        const userId = fullData.userId
        // console.log(userId);
        dispatch(requireAuthorization(res.data));
        api.get('api/user/item', { params: userId })
          .then((res) => {
            const user = res.data;
            dispatch(getUser(user))
          }).catch((err) => {
            console.log(err);
          })
      }
    })
    .catch((err) => { console.log(err); })
);

const reg = ({ login, email, password }) => async (dispatch, _getState, api) => {
  const form = { login, email, password };
  console.log('api', login, email, password);
  try {
    console.log('api', login, email, password);
    await api.post('/api/auth/registration', { ...form }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        console.log('все ок', res);
        dispatch(redirectToRoute(AppRoute.SIGN_IN));
        window.location.reload();
      })
  } catch (err) {
    console.log(err);
  }
}

const login = ({ login, email, password }) => async (dispatch, _getState, api) => {
  const form = { login, email, password };
  try {
    await api.post('api/auth/login', { ...form }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        localStorage.setItem('userData', JSON.stringify({
          userLogin: res.data.userLogin,
          userId: res.data.userId,
          token: res.data.token,
        }))
        const user = (res.data)
        dispatch(getUser(user));
      })
      .then(() => {
        dispatch(requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(redirectToRoute(AppRoute.MAIN))
        window.location.reload();
      })
  } catch (err) {
    console.log(err);
  }
}

// const getRoomBD = (roomId) => async (dispatch, _getState, api) => {
//   try {
//     await api.get('/api/room', {params: roomId}).then((res) => {
//       dispatch(setRoomBD(res.data));
//     })
//   } catch (error) {
//     console.log(error);
//   }
// }

export { checkAuth, login, reg };
