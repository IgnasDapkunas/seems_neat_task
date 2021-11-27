import { SAVE_LOCAL_STORAGE } from "./actions";

export default function reducer(state, action) {
  if (action.type === SAVE_LOCAL_STORAGE) {
    console.log(action.payload.username);
    localStorage.clear();
    localStorage.setItem(
      `User_${action.payload.username}`,
      JSON.stringify(action.payload.username)
    );
    return { state };
  }
  return { state };
}
