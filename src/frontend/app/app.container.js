// Core imports
import {connect} from 'react-redux';
import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {bindActionCreators} from 'redux';

// Material-ui
import LinearProgress from 'material-ui/LinearProgress';

// Components
import DevTools from './shared/devtools';
import HeaderContainer from './shared/header/header.container';
import LeftMenuComponent from './shared/left-menu.component';
import ButtonMenuComponent from './shared/buttons/button-menu.component';

// Redux
import * as AppActions from './app.actions';
import { routeToContacts } from './pages/contacts/contacts.actions';

// Styles
import './app.container.css';

export class AppContainer extends Component {
  static path = '/';

  constructor(props) {
    super(props);

    this.state = {
      headerButtonLeft: null,
      headerButtonRight: null,
    }
  }

  componentWillMount() {
    injectTapEventPlugin();
  }

  render() {
    let menuItems = [
      {
        title: 'Contacts',
        routeDispatch: this.props.routeActions.routeToContacts,
      },
    ];

    return(
        <div id="app-container" className="container">
          <LeftMenuComponent
            items={menuItems}
            isOpen={this.props.app.isLeftMenuOpen}
            handleSwitch={this.props.appActions.switchLeftMenu}
          />

          <HeaderContainer
            buttonLeft={this.state.headerButtonLeft}
            buttonRight={this.state.headerButtonRight}
          />
          
          <div className="row">
            <div className="col-xs-12" id="progressbar-wrapper">
              <LinearProgress mode="determinate" value={50} />
            </div>
          </div>

          <main className="row">
            <div id="app-content" className="col-xs-12 col-md-12">
              {/* { this.props.children } */}
              {
                React.cloneElement(
                  this.props.children,
                  {
                    setHeaderButtons: ::this.setHeaderButtons,
                    setHeaderButtonLeft: ::this.setHeaderButtonLeft,
                    setHeaderButtonRight: ::this.setHeaderButtonRight,
                  }
                )
              }
            </div>
          </main>
          { NODE_ENV === 'development' ? <DevTools /> : null }
        </div>
    );
  }

  setHeaderButtons(headerButtonLeft, headerButtonRight) {
    let leftButton = headerButtonLeft ? headerButtonLeft : <ButtonMenuComponent handleCLick={this.props.appActions.switchLeftMenu} />;

    this.setState({
      ...this.state,
      headerButtonLeft: leftButton,
      headerButtonRight: headerButtonRight,
    });
  }

  setHeaderButtonLeft(button, callback = () => {}) {
    this.setState({ ...this.state, headerButtonLeft: button }, callback);
  }

  setHeaderButtonRight(button, callback = () => {}) {
    this.setState({ ...this.state, headerButtonRight: button }, callback);
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
  }
}

function mapDisptachToProps(dispatch) {
  return {
    appActions: bindActionCreators(AppActions, dispatch),
    routeActions: bindActionCreators({routeToContacts}, dispatch),
  }
}

export default connect(mapStateToProps, mapDisptachToProps)(AppContainer);
