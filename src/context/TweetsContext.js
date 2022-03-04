import { createContext } from "react";

export const TweetsContext = createContext({
  currentUserCollection: {},
  modalName: "",
  setModalName: () => {},
  allUsers: {},
  setLoading: () => {},
  authUser: "",
  setAuthUser: () => {},
});
