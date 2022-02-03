import {
  HashRouter as Router,
  Route,
  Switch,
  Link,
  withRouter,
} from "react-router-dom";
import { Breadcrumb, Alert } from "antd";
import App from "./App";
import Apps from "./pages/PaidUsers";

const breadcrumbNameMap = {
  "/apps": "Application List",
  "/apps/1": "Application1",
  "/apps/2": "Application2",
  "/apps/1/detail": "Detail",
  "/apps/2/detail": "Detail",
  "/appScreen": "App Screen",
};
const Home = withRouter((props) => {
  const { location } = props;
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">Home</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);
  return (
    <Switch>
      <Route path="/apps" component={Apps} />
      <Route path="/" component={App} />
      <Route path="/appScreen" component={App} />
    </Switch>
  );
});

const Routes = () => {
  return (
    <Router>
      <Home />
    </Router>
  );
};
export default Routes;
