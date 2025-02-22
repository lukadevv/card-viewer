import Router, { Route } from "preact-router";
import { HomePage } from "../components/pages/home.page";
import { appendUrlPath } from "../utils/path";
import { ViewPage } from "../components/pages/view.page";

export function Routes() {
  return (
    <Router>
      <Route default path={appendUrlPath("/")} component={HomePage} />
      <Route path={appendUrlPath("/view/:id")} component={ViewPage} />
    </Router>
  );
}
