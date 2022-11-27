import React from "react";

import SubNavBar from "./SubNavBar";
import UserSetting from "./UserSetting"; 

const UserInterface = ({set_request_form, current_form}) => {
    return (<div className='update-table-component'>
    <SubNavBar
      set_request_form={set_request_form} // use subnavbar to set the current form for user settings
    />   
    <UserSetting
      current_form={current_form}  // render the form base on the current form selection
    />
    </div>);
}

export default UserInterface;