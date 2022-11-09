import React from "react";
import { Checkbox } from '../../../Path'

function Status(props){
    const { checkList, name, onChange } = props

    return (
        <div className="status-group">
            <div className="sub-title">Status</div>
            <div className="chb-group">
                {
                    checkList.length > 0 && checkList.map((ch, i) => {
                        return <Checkbox
                            key={'ch' + i}
                            name={name} 
                            info={ch}
                            onChange={onChange}
                        />
                    })
                } 
            </div>
        </div>
    )
}

export default Status