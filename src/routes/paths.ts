function path(root: string, subLink: string) {
  return `${root}${subLink}`;
}

const ROOTS_DASHBOARD = "/";

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  login: path(ROOTS_DASHBOARD, "login"),
  splash: path(ROOTS_DASHBOARD, "splash"),
  user: path(ROOTS_DASHBOARD, "user"),
  messages: path(ROOTS_DASHBOARD, "messages"),
};
