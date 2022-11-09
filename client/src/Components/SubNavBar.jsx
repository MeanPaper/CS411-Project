import React from 'react';
import ReactDOM from 'react-dom';

const SubNavBar = ({set_request_form}) => {
    const [Selection, setSelection] = React.useState(0);    // selection state

    const holdSelection = (sel,form_string)=>{ // change selection of the tag, and reflect the change
        setSelection(prev => (prev==sel) ? 0: sel); 
        set_request_form(prev => (form_string==prev) ? '' : form_string);
    }
    
    const highlightStyle = {background: '#b0b0b0'}; // highlight color when the tag is select

    return(
        <div className='subnav-bar'>
            <a className='subnav-update-button' style={Selection == 1 ? highlightStyle:{background: "inherit"}} 
                onClick={()=>holdSelection(1, 'update')}> Update </a>
            <a className='subnav-delete-button' style={Selection == 2 ? highlightStyle:{background: "inherit"}} 
                onClick={()=>holdSelection(2, 'delete')}> Delete </a>
            <a className='subnav-insert-button' style={Selection == 3 ? highlightStyle:{background: "inherit"}} 
                onClick={()=>holdSelection(3, 'insert')}> Insert </a>
        </div>);
};

export default SubNavBar;
