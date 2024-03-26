import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
/*   IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs, */
  setupIonicReact
} from '@ionic/react';
// import { IonReactRouter } from '@ionic/react-router';
import { ellipse, heartCircle, heartCircleSharp, listCircleOutline, square, triangle } from 'ionicons/icons';

/* //remove default tabs
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3'; */

//add seperate tsx here and remove tabs
import React from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { playCircle, radio, library, search } from 'ionicons/icons';

import HomePage from './pages/HomePage';
import RadioPage from './pages/RadioPage';
import SearchPage from './pages/SearchPage';
import PlaylistPage from './pages/PlaylistPage';
// import YoutubeComponent from './YoutubeComponent'; // Import the YoutubeComponent here


import './pages/main.css';




/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  //remove ionreactrouter and down replace with main.tsx info inside function. 
  <IonApp className="app">
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/" to="/home" />
          {/*
          Use the render method to reduce the number of renders your component will have due to a route change.

          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
          <Route path="/home" render={() => <HomePage />} exact={true} />
          <Route path="/search" render={() => <SearchPage />} exact={true} />
          <Route path="/playlist" render={() => <PlaylistPage/>} exact={true}/>
          <Route path="/radio" render={() => <RadioPage />} exact={true} />
          <Route path="/radio/watch/:id" component={RadioPage} />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={playCircle} />
            <IonLabel>Listen now</IonLabel>
          </IonTabButton>

          <IonTabButton tab="search" href="/search">
            <IonIcon icon={search} />
            <IonLabel>Search</IonLabel>
          </IonTabButton>

          <IonTabButton tab="playlist" href="/playlist">
            <IonIcon icon={library} />
            <IonLabel>Playlist</IonLabel>
          </IonTabButton>

          <IonTabButton tab="radio" href="/radio">
          <IonIcon icon={heartCircle} />
            <IonLabel>Favorites</IonLabel>
          </IonTabButton>

        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
    {/* <YoutubeComponent /> Use YoutubeComponent here */}
  </IonApp>
);

export default App;
