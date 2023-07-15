import { Suspense, lazy, LazyExoticComponent } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { NoAuth } from "./NoAuth";
import { RequireAuth } from "./RequireAuth";
import { PATH_DASHBOARD } from "./paths";

type LoadableProps = Record<string, unknown>;

type LoadableFunc = <T extends LoadableProps>(
  Component: LazyExoticComponent<() => JSX.Element>
) => (props: T) => JSX.Element;

const Loadable: LoadableFunc = <T extends LoadableProps>(
  Component: LazyExoticComponent<() => JSX.Element>
) =>
  function load(props: T): JSX.Element {
    return (
      <Suspense fallback={null}>
        <Component {...props} />
      </Suspense>
    );
  };

const Splash = Loadable(lazy(() => import("../pages/splash")));

const Login = Loadable(lazy(() => import("../pages/Login")));

const UserPage = Loadable(lazy(() => import("../pages/UserPage")));

export default function Router() {
  return (
    <Routes>
      <Route>
        <Route
          path={PATH_DASHBOARD.root}
          element={<Navigate to={PATH_DASHBOARD.splash} />}
        />
      </Route>
      <Route>
        <Route path={PATH_DASHBOARD.splash} element={<Splash />} />
        <Route
          path={PATH_DASHBOARD.login}
          element={
            <NoAuth>
              <Login />
            </NoAuth>
          }
        />
        <Route
          path={`${PATH_DASHBOARD.user}`}
          element={
            <RequireAuth>
              <UserPage />
            </RequireAuth>
          }
        />
        {/* <Route
          path={`${PATH_DASHBOARD.chat}`}
          element={
            <RequireAuth>
              <Chat />
            </RequireAuth>
          }
        /> */}
      </Route>
    </Routes>
  );
}
