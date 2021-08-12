import { NameSpace } from '../root-reducer';

const getChosenItem = (state) => state[NameSpace.INVENTORY].chosenItem;

export { getChosenItem };