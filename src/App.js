import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import 'firebase/firestore';
import {ArrayObj} from './arrayObj';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {TimelineComponent} from './TimelineComponent';

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
   this.TimelineFn = this.TimelineFn.bind(this);
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

  TimelineEntity(d){
   return(
   <span 
         style={{
            borderRadius: '20px', 
            padding: '10px',
            backgroundColor: 'rgb(140, 180, 250)',
            marginLeft: '10px',
            marginTop: '10px',
            display:'inline-block',
            color:'white'}}>
         {d.name}
   </span>
   );  
  }_

  
  TimelineFn(d){
     var listTemp = [];
     for(var i=0;i<7;i++){
        listTemp.push(d);
     }
     const listItems = listTemp.map((listItem) => 
      this.TimelineEntity(listItem)
    );

    return (
      <VerticalTimelineElement
      className="vertical-timeline-element--work"
      date="2011 - present"
      iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    >
    <div     style={{ 
              borderTopWidth:'6px', 
              borderTopColor:'red'}}
    >
    <h3 className="vertical-timeline-element-title">{d.id}</h3>
    <div>
    {listItems}
      </div>
      <p>
        <span>Creative Direction </span>, User Experience, Visual Design, <span>Project Management, Team Leading</span>
      </p>
      </div>
    </VerticalTimelineElement>
    );
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
      this.TimelineFn(d)
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

       <div style={{background:'lightblue'}}>
   
       <VerticalTimeline> 
          {listItems3}
          <VerticalTimelineElement
                iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
            />
        </VerticalTimeline>

      </div>
 
      </div>
    );
  }

  
}

export default App;
