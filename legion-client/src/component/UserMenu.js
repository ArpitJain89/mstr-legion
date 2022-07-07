import React from 'react';
import Imm from 'immutable';
import PropTypes from 'prop-types';
import DOM from 'react-dom-factories';
import SimpleDropdown from '../component/SimpleDropdown';

var br = DOM.br;
var div = DOM.div;
var span = DOM.span;

class UserMenu extends React.Component {
  static displayName = 'UserMenu';
  
  static propTypes = {
    immUserInfo: PropTypes.instanceOf(Imm.Map),
    userMenuItems: PropTypes.array,
    version: PropTypes.string
  };

  handleChange = (id) => {
    console.log("Logout");
  };

  render() {
    return div({className: 'user-menu'},
      div(null,
        <SimpleDropdown
          icon={'icon-user'}
          opener= {div({className: 'icon-accordion-down'})}
          items= {this.props.userMenuItems.map(function(i) { return {name: i.name, icon: i.icon}; })}
          itemListHeader={
            div({className: 'user-menu-header'},
              div({className: 'username'}, this.props.immUserInfo.get('username')),
              this.props.version ? div({className: 'version-container'}, span({className: 'version colon'}, "Version"), this.props.version) : null
              )}
          onChange={ this.handleChange}
          selectedOverride={ null}
          scrollbarDisabled={true}
        />
      )
    );
  }
}
export default UserMenu;
