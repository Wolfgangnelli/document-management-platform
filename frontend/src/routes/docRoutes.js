import React from "react";
import { useRouteMatch, Switch, useParams } from "react-router-dom";
import Versioning from "../Pages/Doc/Versioning/Versioning";
import Introduction from "../Pages/Doc/Introduzione/Introduction";
import IntroduzioneGtm from "../Pages/Doc/DataLayerEgtm/ItroduzioneGtm/IntroduzioneGtm";
import CodiceStdGtm from "../Pages/Doc/DataLayerEgtm/CodiceStdGtm/CodiceStdGtm";
import DataLayer from "../Pages/Doc/DataLayerEgtm/InclusioneDataLayer/DataLayer";
import Implementazioni from "../Pages/Doc/Implementazioni/Implementazioni";
import ECommerce from "../Pages/Doc/Ecommerce/ECommerce";
import { Image } from "react-bootstrap";
import Resi from "../Pages/Doc/Ecommerce/Resi/Resi";
import InteractionSite from "../Pages/Doc/Implementazioni/InteractionSite/InteractionSite";
import CreateDocInteraction from "../Pages/Doc/Implementazioni/NewDocInteraction/CreateDocInteraction";
import EditDatalayer from "../Pages/Doc/DataLayerEgtm/InclusioneDataLayer/EditDatalayer/index";
import { PrivateRoute } from "../containers/privateRoute";

function DocRoutes() {
  let match = useRouteMatch();
  let { name, title } = useParams();

  return (
    <>
      <Switch>
        <PrivateRoute path={`${match.path}`} exact>
          <h1 className="text-center">
            DOCUMENTO OPERATIVO {title.toUpperCase()}
          </h1>
          <Image src="https://picsum.photos/1200/500" fluid rounded />
        </PrivateRoute>
        <PrivateRoute
          path={`${match.path}/versioning`}
          exact
          component={Versioning}
        />
        <PrivateRoute
          exact
          path={`${match.path}/introduzione`}
          component={Introduction}
        />
        <PrivateRoute
          path={`${match.path}/datalayer-e-gtm/introduzione`}
          component={IntroduzioneGtm}
        />
        <PrivateRoute
          path={`${match.path}/datalayer-e-gtm/codice-standard-gtm`}
          component={CodiceStdGtm}
        />
        <PrivateRoute
          path={`${match.path}/datalayer-e-gtm/datalayer`}
          component={DataLayer}
          exact
        />
        <PrivateRoute
          path={`${match.path}/datalayer-e-gtm/datalayer/edit`}
          component={EditDatalayer}
          exact
        />
        <PrivateRoute
          path={`${match.path}/implementazioni/introduzione`}
          component={Implementazioni}
        />
        <PrivateRoute
          path={`${match.path}/implementazioni/interazioni-sul-sito`}
          component={InteractionSite}
          exact
        />
        <PrivateRoute
          path={`${match.path}/implementazioni/interazioni-sul-sito/crea-interazione`}
          component={CreateDocInteraction}
          exact
        />
        <PrivateRoute
          path={`${match.path}/implementazioni/interazioni-sul-sito/section/:sectionID/:sectionPK/edit`}
          component={CreateDocInteraction}
          exact
        />
        <PrivateRoute
          path={`${match.path}/e-commerce/e-commerce`}
          exact
          component={ECommerce}
        />
        <PrivateRoute path={`${match.path}/e-commerce/resi`} component={Resi} />
      </Switch>
    </>
  );
}

export default DocRoutes;
