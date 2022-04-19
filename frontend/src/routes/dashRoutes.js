import React from "react";
import { useRouteMatch, Switch } from "react-router-dom";
import NewDoc from "../Pages/Dashboard/NewDoc/NewDoc";
import Variables from "../Pages/Dashboard/Variables/Variables";
import NewVariable from "../Pages/Dashboard/Variables/NewVariable/NewVariable";
import Events from "../Pages/Dashboard/Eventi/Events";
import { Image } from "react-bootstrap";
import SnippetList from "../Pages/Dashboard/SnippetTemplate/SnippetList";
import NewSnippetTemplate from "../Pages/Dashboard/SnippetTemplate/NewSnippetTemplate/NewSnippetTemplate";
import CreateInteraction from "../Pages/Dashboard/Interazioni/CreaInterazione/CreateInteraction";
import Interazioni from "../Pages/Dashboard/Interazioni/Interazioni";
import EditEvent from "../Pages/Dashboard/Eventi/editEvent/index";
import NewGA4EcoSnippetTemplate from "../Pages/Dashboard/SnippetTemplate/NewGA4EcoSnippetTemplate/index";
import { PrivateRoute } from "../containers/privateRoute";

function DashRoutes() {
  let match = useRouteMatch();

  return (
    <>
      <Switch>
        <PrivateRoute exact path={`${match.path}`}>
          <h1 className="text-center">DASHBOARD</h1>
          <Image src="https://picsum.photos/1200/500" fluid rounded />
        </PrivateRoute>
        <PrivateRoute path={`${match.path}/new-doc`} exact>
          <NewDoc />
        </PrivateRoute>
        <PrivateRoute
          path={`${match.path}/variable`}
          exact
          component={Variables}
        />
        <PrivateRoute
          path={`${match.path}/variable/new-variable`}
          exact
          component={NewVariable}
        />
        <PrivateRoute
          path={`${match.path}/variable/:id/edit`}
          exact
          component={NewVariable}
        />
        <PrivateRoute path={`${match.path}/event`} exact component={Events} />
        <PrivateRoute
          path={`${match.path}/event/:id/:pk/edit`}
          exact
          component={EditEvent}
        />
        <PrivateRoute
          path={`${match.path}/snippet`}
          exact
          component={SnippetList}
        />
        <PrivateRoute
          path={`${match.path}/snippet/crea-snippet-interazione`}
          exact
        >
          <NewSnippetTemplate isUpdate={false} />
        </PrivateRoute>
        <PrivateRoute
          path={`${match.path}/snippet/ga-snippet/:snippetID/:pk/edit`}
          exact
        >
          <NewSnippetTemplate isUpdate={true} />
        </PrivateRoute>
        <PrivateRoute
          path={`${match.path}/snippet/crea-snippet-ecommerce`}
          exact
          component={NewGA4EcoSnippetTemplate}
        />
        <PrivateRoute
          path={`${match.path}/snippet/ga4-eco-snippet-template/:snippetID/:pk/edit`}
          exact
          component={NewGA4EcoSnippetTemplate}
        />
        <PrivateRoute
          path={`${match.path}/interaction`}
          exact
          component={Interazioni}
        />
        <PrivateRoute
          path={`${match.path}/interaction/crea-interazione`}
          exact
          component={CreateInteraction}
        />
        <PrivateRoute
          path={`${match.path}/interaction/:id/:pk/edit`}
          exact
          component={CreateInteraction}
        />
      </Switch>
    </>
  );
}

export default DashRoutes;
