function path(root: string, subLink: string) {
  return `${root}${subLink}`;
}

const ROOTS_DASHBOARD = "/";

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  login: path(ROOTS_DASHBOARD, "login"),
  checkout: path(ROOTS_DASHBOARD, "checkout"),
  user: path(ROOTS_DASHBOARD, "user"),
  messages: path(ROOTS_DASHBOARD, "messages"),
  about: path(ROOTS_DASHBOARD, "about"),

};
