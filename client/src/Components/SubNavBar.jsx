import React from 'react';
import ReactDOM from 'react-dom';

const SubNavBar = () => {
    const [Selection, setSelection] = React.useState(0);    // selection state
    const holdSelection = (sel)=>{ // change selection
        setSelection(sel);
    }
    
    const highlightStyle = {background: '#b0b0b0'}

    return(
        <div className='subnav-bar'>
            <a className='subnav-update-button' sytle={Selection == 1 ? highlightStyle:{background: "inherit"}} 
                onClick={()=>holdSelection(1)}> Update </a>
            <a className='subnav-delete-button' style={Selection == 2 ? highlightStyle:{background: "inherit"}} 
                onClick={()=>holdSelection(2)}> Delete </a>
            <a className='subnav-insert-button' style={Selection == 3 ? highlightStyle:{background: "inherit"}} 
                onClick={()=>holdSelection(3)}> Insert </a>
        </div>);
};

export default SubNavBar;