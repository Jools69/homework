import React, { Component } from 'react';
import HwDetails from './HwDetails';
import AddHomework from './AddHomework';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {students: [],
                  homeworks: [],
                  showAdd: false};
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
        }).then(()=> 
            {
              this.setState(
                {
                  showAdd: false
                });
            }).catch(err => {console.log("addHomework callback error caught: " + err)});
  }

  
  handleAdd = (e) =>
  {
    console.log("showAdd before = " + this.state.showAdd);
    this.setState(
      {
        showAdd: true
      });
      console.log("showAdd after = " + this.state.showAdd);
  }

  render() 
  {
    var students = this.state.students;
    var homeworks = this.state.homeworks;

    var studentHrefs = students.map((student, index) => {
      return(
        <li className="tab"><a href={'#'+student}>{student}</a></li>
      );
    });

    students = students.map((student, index) => {
      var props= {homeworks: homeworks,
                    student: student};
      var ahprops = {student: student,
                     addHomework: this.addHomework};
      return(
          <div id={student} key={index}>
            <div className="card-content s4 deep-purple lighten-4">
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
              <a className="btn-floating btn-large waves-effect waves-light deep-purple" onClick={this.handleAdd}><i className="material-icons">add</i></a>
              <hr />
              <div className={this.state.showAdd ? "" : "hidden"}>
                <AddHomework ahprops={ahprops} />  
              </div>
            </div>
          </div>
      );
    });

    return (
      <div className="App">
        <h1 className="blue-text text-lighten-1">What Homework yo gotsta do?</h1>
        <div className="card">
          <div className="card-tabs">
            <ul className="tabs tabs-fixed-width">
              {studentHrefs}
            </ul>
          </div>
          <div className="card-content">
            {students}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
