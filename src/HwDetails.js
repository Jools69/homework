import React from 'react';

const HwDetails = ({props}) => {

    return (
        <div className="homework-list collection">
        {
            props.homeworks.map(hwork => {
                console.log(hwork.dateDue);
                return hwork.student === props.student ? (
                <div className="card-content collection-item row purple lighten-5 purple-text text-darken-4" key={hwork._id}>
                    <div className="col s3">{hwork.subject}</div>
                    <div className="col s3">{hwork.dateSet.split("T")[0]}</div>
                    <div className="col s3">{hwork.dateDue.split("T")[0]}</div>
                    <div className="col s3">{hwork.status}</div>
                </div>
                ) : null
            })
        }
        </div>
    );
}

export default HwDetails