import React from "react"; 
import PropTypes from "prop-types";
/* ----- COMPONENT IMPORTS ----- */
import SettingsSwitch from "./SettingsSwitch";
import SettingsSelector from "./SettingsSelector";

/*---undefined---*/

const SettingsList = ({settingsActions,settings}) => {
	
	return(
		<div>SettingsList
			<SettingsSwitch action="func" value="string" /> 
			<SettingsSelector action="func" value="string" />
		</div>
	)
}

SettingsList.propTypes = {
	settingsActions: PropTypes.object,
	settings: PropTypes.object
}

export default SettingsList;