import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import WoundsPage from '../container/Module_Wounds/WoundsPage';
import SettingsPage from '../container/Settings/SettingsPage';

export default (props) => (
  <>
    {props.acess.wounds && props.acess.settings ? 
      
      <Switch>
        <Route exact path='/' component={WoundsPage} />
        <Route exact path='/settings' component={SettingsPage} />
        <Redirect from='*' to='/' />
      </Switch>
    : 
      (props.acess.wounds && !props.acess.settings ?
        <Switch>
          <Route exact path='/' component={WoundsPage} />
          <Redirect from='*' to='/' />
        </Switch>
      : (!props.acess.wounds && props.acess.settings ?
        <Switch>
          <Route exact path='/settings' component={SettingsPage} />
          <Redirect from='*' to='/settings' />
        </Switch>
        : <></>
        )
      )
    }
  </>
);
