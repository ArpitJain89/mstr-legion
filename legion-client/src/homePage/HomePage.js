import React, { Component } from 'react';
import Keycloak from 'keycloak-js';
import Lsacsupernavbar from '@saama/lsac-supernavbar'
import StudiesAPI from '../gpl-services/StudiesAPI';
import SimpleDropdown from '../component/SimpleDropdown';
import UserMenu from '../component/UserMenu';
import './homePage.css';
import immUserInfo from '../json/userInfo.json';
import immUserMenuItems from '../json/userMenu.json';
import Imm from 'immutable';
import '../stylesheet/top-nav.scss';
import '../stylesheet/user-menu.scss';
import 'primeicons/primeicons.css';
import '../stylesheet/_imported-font-icons.scss';

const applicationTitle = "Microstrategy"
const appContext = "home"
const appDomainOrigin = "";
const version = "";

class HomePage extends Component {

	constructor(props) {
		super(props);
		this.state = { keycloak: null, authenticated: false };
	}

	componentDidMount() {
		const keycloak = Keycloak({
			url: process.env.REACT_APP_KEYCLOAK_URL,
			realm: process.env.REACT_APP_KEYCLOAK_REALM,
			clientId: process.env.REACT_APP_KEYCLOAK_CLIENTID,
		});
		keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
			localStorage.setItem('token', keycloak.token)
			this.setState({ keycloak: keycloak, authenticated: authenticated })
		})
	}

	render() {
		if (this.state.keycloak) {
			if (this.state.authenticated) return (
				<div className="container">
					<div className="main">
						<Lsacsupernavbar
							topNavHeight='5.5rem'
							sidebarDisplayMode='minimal'
							topnavDisplayMode='minimal'
							applicationTitle={applicationTitle}
							appContext={appContext}
							domain={appDomainOrigin}
							runMode='development' />
					</div>
					<div className='top-nav'>
						<div className='top-nav-row'>
							<div className='top-nav-left-items'>
								<div className="msfContainer">
									<h3>Studies</h3>
									<div className='msf'>
										<StudiesAPI/>
									</div>
									
								</div>
							</div>
							<div className='top-nav-right-items'>
								<div id='top-nav-customer-menu' className='top-nav-item'>
									<SimpleDropdown 
										opener={null}
										items={[]}
										itemListHeader={[]}
										//onChange={this.handleChange.bind(this)}
										selectedIndex={0}
										disableChevron={true}
										isDisabled={true}
										selectedOverride={'CCDM'}
									/>
								</div>
								<div className='top-nav-item'>
									<UserMenu immUserInfo={ Imm.Map(immUserInfo)} 
									version={""} 
									userMenuItems={immUserMenuItems}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			); else return (<div>Unable to authenticate!</div>)
		}
		return (
			<div>Initializing Keycloak...</div>
		);
	}
}
export default HomePage;
