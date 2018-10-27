import React, { Component } from 'react';
import HwDetails from './HwDetails';
import AddHomework from './AddHomework';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {students: [],
                  homeworks: []};
  }

  componentDidMount() {
    console.log('componentDidMount() was called.');

    // Get the list of students from the DB.
    fetch('http://localhost:3001/api/homework/students').then(function(data){
      return data.json();
    }).then (json => {
      console.log("componentDidMount.Students: " + json);
      this.setState({
        students: json
      });
    });

    // Get the list of homeworks from the DB.
    fetch('http://localhost:3001/api/homework/incomplete').then(function(hwork){
      return hwork.json();
    }).then (json => {
      console.log("componentDidMount.Homeworks: " + json);
      this.setState({
        homeworks: json
      });
    });
  }

  addHomework = (homework) =>
  {
    // PUT the updated homework to the DB
    fetch('http://localhost:3001/api/homework/', { method: 'POST', 
                                                   headers: {'Content-Type':'application/json'},
                                                   body: JSON.stringify(homework)}).then(function(hwork)
    {
      return hwork.json();
    }).then(json => 
        {
          console.log(json);
          this.setState(
          {
          homeworks: [...this.state.homeworks, json]
          });
        }).catch(err => {console.log("addHomework callback error caught: " + err)});
  }


  render() 
  {
    var students = this.state.students;
    var homeworks = this.state.homeworks;

    students = students.map((student, index) => {
      var props= {homeworks: homeworks,
                    student: student};
      var ahprops = {student: student,
                     addHomework: this.addHomework};
      return(
        <div className="col s6" key={index}>
          <div className="card s4 deep-purple lighten-4">
            <h3 className="deep-purple-text text-darken-3">{student}'s Homework</h3>
            <div className="container">
              <div className="card-content row">
                  <div className="col s3 lime accent-1"><p>Subject:</p></div>
                  <div className="col s3 lime accent-2"><p>Date Set:</p></div>
                  <div className="col s3 lime accent-3"><p>Date Due:</p></div>
                  <div className="col s3 lime accent-4"><p>Status:</p></div>
              </div>
            </div>
            <HwDetails props={props} />
            <hr />
            <AddHomework ahprops={ahprops} />  
          </div>
        </div>
      );
    });

    return (
      <div className="App">
        <h1 className="blue-text text-lighten-1">What Homework yo gotsta do?</h1>
        <div className="row">
          <div>{students}</div>
        </div>
      </div>
    );
  }
}

export default App;
