import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import 'firebase/firestore';
import {ArrayObj} from './arrayObj';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

class App extends Component {

  constructor(){
   super();
   this.state ={
       speed: "ttt",
       docs: [],
       displaydocs: [],
       name: "",
       arry: []
   };
  }

  AppendToMainArray(){
     this.setState({
        displaydocs: [...this.state.docs],
        name:"jingalala"
     });
  }

  getSnapshot(doc){

            var currentArray = [];
            for(var i =0;i<doc.data().blocks.length;i++)
            {
               var obj = new ArrayObj(doc.data().blocks[i].id,
               doc.data().blocks[i].name);
               currentArray.push(obj);
            }
           this.setState((prevState) => ({
               docs: [...prevState.docs, ...doc.data().blocks],
               name: doc.data().blocks[0].name,
               arry: [...prevState.arry, ...currentArray]
            }));

  }

  populateArray(snapshot){

     snapshot.forEach((doc) => ( this.getSnapshot(doc) ));
     this.AppendToMainArray();
  }

  componentDidMount(){

   const speedRef = firebase.database().ref().child('Message').child('new');
   speedRef.on('value', snap => {

     this.setState({
        speed: snap.val()   
    });
   });
   
   firebase.firestore().collection("Test").get().then((snapshot) => (
      this.populateArray(snapshot)
   ));   

     
  }
 
  render() {

    const listItems = this.state.displaydocs.map((d) => <li key={d.name}>{d.name}  {d.id}</li>);
    const listItems2 = this.state.arry.map((d) => 
    <li key={d.id} 
    style = {{marginTop: '10px', marginBottom: '30px'}}>
    {d.id}  {d.name}
    <span 
    style={{
       border: '1px solid lightgrey',
       borderRadius: '20px', 
       padding: '10px',
       backgroundColor: 'lightgrey'}}>
    {d.name}
    </span>
    </li>
    );

    const listItems3 = this.state.arry.map((d) => 
    <VerticalTimelineElement
    className="vertical-timeline-element--work"
    date="2011 - present"
    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
  >
  <div style={
     {
     }}>
  <h3 className="vertical-timeline-element-title">{d.id}</h3>
  <div style={{
     marginTop:'30px'
     }}>
  <span 
    style={{
       border: '1px solid lightgrey',
       borderRadius: '20px', 
       padding: '10px',
       backgroundColor: 'lightgrey'}}>
    {d.name}
    </span>
    </div>
    <p>
      Creative Direction, User Experience, Visual Design, Project Management, Team Leading
    </p>
    </div>
  </VerticalTimelineElement>
    );

    return (
      <div className="App">
      <div>
        <h1>{this.state.speed}</h1>
      </div>
 
       <div> {this.state.name} </div>
       <div>
       {listItems}
       </div>
  
       <div> {listItems2}</div>
   
      <VerticalTimeline
      style={{
         background:'darkgrey'
      }}> 
         {listItems3}
      </VerticalTimeline>


      <VerticalTimeline>
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    date="2011 - present"
    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
  >
    <h3 className="vertical-timeline-element-title">Creative Director</h3>
    <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
    <p>
      Creative Direction, User Experience, Visual Design, Project Management, Team Leading
    </p>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    date="2010 - 2011"
    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
  >
    <h3 className="vertical-timeline-element-title">Art Director</h3>
    <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
    <p>
      Creative Direction, User Experience, Visual Design, SEO, Online Marketing
    </p>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    date="2008 - 2010"
    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
  >
    <h3 className="vertical-timeline-element-title">Web Designer</h3>
    <h4 className="vertical-timeline-element-subtitle">Los Angeles, CA</h4>
    <p>
      User Experience, Visual Design
    </p>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    date="2006 - 2008"
    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
  >
    <h3 className="vertical-timeline-element-title">Web Designer</h3>
    <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
    <p>
      User Experience, Visual Design
    </p>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--education"
    date="April 2013"
    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
  >
    <h3 className="vertical-timeline-element-title">Content Marketing for Web, Mobile and Social Media</h3>
    <h4 className="vertical-timeline-element-subtitle">Online Course</h4>
    <p>
      Strategy, Social Media
    </p>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--education"
    date="November 2012"
    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
  >
    <h3 className="vertical-timeline-element-title">Agile Development Scrum Master</h3>
    <h4 className="vertical-timeline-element-subtitle">Certification</h4>
    <p>
      Creative Direction, User Experience, Visual Design
    </p>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--education"
    date="2002 - 2006"
    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
  >
    <h3 className="vertical-timeline-element-title">Bachelor of Science in Interactive Digital Media Visual Imaging</h3>
    <h4 className="vertical-timeline-element-subtitle">Bachelor Degree</h4>
    <p>
      Creative Direction, Visual Design
    </p>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
  />
</VerticalTimeline>
 
      </div>
    );
  }

  
}

export default App;
