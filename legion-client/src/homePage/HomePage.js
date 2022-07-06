import React, { Component } from 'react';
import Keycloak from 'keycloak-js';
import Lsacsupernavbar from '@saama/lsac-supernavbar'
import StudiesAPI from '../gpl-services/StudiesAPI';

const applicationTitle = "Microstrategy"
const appContext = "home"
const appDomainOrigin = ""
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
						<StudiesAPI/>
					</div>
			); else return (<div>Unable to authenticate!</div>)
		}
		return (
			<div>Initializing Keycloak...</div>
		);
	}
}
export default HomePage;
