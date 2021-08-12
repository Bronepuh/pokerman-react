import { NameSpace } from '../root-reducer';

const getAuthorizationStatus = (state) => state[NameSpace.USER].authorizationStatus;
const getUser = (state) => state[NameSpace.USER];

export { getAuthorizationStatus, getUser };
