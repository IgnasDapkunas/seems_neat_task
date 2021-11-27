import { users } from "./fakeUsers";

const getUsers = () =>
  new Promise((resolve, error) => {
    //hypothetically if users was a false or falsy value it would catch the error
    if (!users) {
      return setTimeout(() => error(new Error("Users not found")), 300);
    }
    resolve(Object.values(users));
  });

export default getUsers;
