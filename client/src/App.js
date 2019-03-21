import React from "react";
import Journal from "./pages/Journal";
import Nav from "./components/Nav";
import NoMatch from "./pages/NoMatch";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {

  return (
    <Router>
      <div>
        <Nav/>
          <Switch>
            <Route exact path="/" component={Journal} />
            <Route exact path="/journal" component={Journal} />
            <Route component={NoMatch} />
          </Switch>      
      </div>
    </Router>
  );
}

export default App;
