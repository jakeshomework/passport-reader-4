import React from "react"; 
import PropTypes from "prop-types";
/* ----- COMPONENT IMPORTS ----- */
import SettingsList from "../components/SettingsList";
/* ----- GRAPHQL IMPORTS ----- */
//import GET_SETTINGS from "../graphql/GET_SETTINGS";
//import GET_USER from "../graphql/GET_USER";
//import UPDATE_SETTINGS from "../graphql/UPDATE_SETTINGS";

/*---In a side drawer, Settings contains the user control over the content.---*/

const Settings = ({}) => {
	/*---Only show if correct correct permissions are met -- teacher or teacher authorized class view.---*/
	const toggleView = () => {}
	/*---Hide all highlights to allow for a clean reading experience. *User can still add highlights.---*/
	const togglefocusMode = () => {}
	/*---Create and 'easy-on-eyes' reading experience---*/
	const toggleDarkMode = () => {}
	/*---Available for teachers only, this allows students to use the toggleView method.---*/
	const toggleViewPermissions = () => {}
	
	return(
		<div>Settings
			<SettingsList settingsActions="object" settings="object" />
		</div>
	)
}

Settings.propTypes = {
}

export default Settings;