import { reducerWithInitialState } from "typescript-fsa-reducers";
import { Profile } from "../../class/Profile";
import profileActions from "./action";

const init: Profile = {
  name: "",
  gender: "",
  description: "",
  birthday: "",
};

const profileReducer = reducerWithInitialState(init).case(
  profileActions.setProfile,
  (state, payload) => ({
    ...state,
    ...payload
  })
);

export default profileReducer;
