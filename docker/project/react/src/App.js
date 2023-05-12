import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ProfilePage } from "./components/ProfilePage";
import { ProfileDetailPage } from "./components/ProfileDetailPage";
import { FeedPage } from "./components/FeedPage";
import { HomePage } from "./components/HomePage";
function App() {
  return (
    <div>
      <Router>
        <ul>
          <li>
            <Link to="/">To Home</Link>
          </li>
          <li>
            <Link to="/profile">To Profile</Link>
          </li>
          <li>
            <Link to="/profile/andrew" exact>To Andrew's Profile</Link>
          </li>
          <li>
            <Link to="/feed">To Feed</Link>
          </li>
        </ul>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route path="/profile/:username" component={ProfileDetailPage} />
          <Route path="/feed" component={FeedPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
