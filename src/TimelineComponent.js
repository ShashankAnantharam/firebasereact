import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import 'firebase/firestore';
import {ArrayObj} from './arrayObj';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

class TimelineComponent extends React.Component {

    constructor(props){

      super(props);
        this.state={
            timelineList: props.list
        }
        
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

      const timelineView = this.props.list.map((d) => 
      this.TimelineFn(d)
    );
      return (
         <VerticalTimeline> 
         {timelineView}
         <VerticalTimelineElement
               iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
           />
       </VerticalTimeline>
      );
    }
  }
  export default TimelineComponent;