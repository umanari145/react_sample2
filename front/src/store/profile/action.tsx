import actionCreatorFactory from "typescript-fsa";
import { Profile } from "../../class/Profile";

const actionCreator = actionCreatorFactory();

const profileActions = {
  setProfile: actionCreator<Partial<Profile>>("SET_PROFILE")
};

export default profileActions;
