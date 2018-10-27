import React, { Component } from 'react';

class AddHomework extends Component 
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            subject: "",
            student: this.props.ahprops.student,
            dateSet: null,
            dateDue: null
        };
        //this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) =>
    {
        console.log("AddHomework.handleChange: " + e.target.id + " " + e.target.value);
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSubmit = (e) =>
    {
        console.log('AddHomework submitted.');
        console.log(this.state);
        e.preventDefault();
        console.log(this.props);
        this.props.ahprops.addHomework (this.state);
    }
    
    componentDidMount ()
    {
        $('.datepicker').datepicker({format: 'dd/mm/yyyy',
                                     defaultDate: Date.now(),
                                     onSet: this.handleChange });
    }
    
    render()
    {
        return (
            <div className={"add-homework left-align container lime lighten-4"}>
                <form onSubmit={this.handleSubmit}>
                    <p className="center">New Homework for {this.props.ahprops.student}</p>
                    <label className="add-homework-label" htmlFor="subject">Subject: </label>
                    <input id="subject" type="text" onChange={this.handleChange}/>
                    <label className="add-homework-label" htmlFor="dateSet">Date Set: </label>
                    {/*<input id="dateSet" type="date" defaultValue={Date.now()}  onChange={this.handleChange}/>*/}
                    <input id="dateSet" type="date" className="datepicker" format="dd/mm/yyyy" onChange={this.handleChange}/>
                    <label className="add-homework-label" htmlFor="dateDue">Date Due: </label>
                    <input id="dateDue" type="date"  onChange={this.handleChange}/>
                    <button>Add</button>
                </form>
            </div>
        );
    }
}

export default AddHomework;