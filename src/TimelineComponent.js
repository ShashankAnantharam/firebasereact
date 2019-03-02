import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import 'firebase/firestore';
import {ArrayObj} from './arrayObj';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

export class TimelineComponent extends React.Component {

    constructor(props){

        this.state={
            timelineList: props
        }
        
    }

    renderSingleBlock(d){
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
            </div>
            <p>
              <span>Creative Direction </span>, User Experience, Visual Design, <span>Project Management, Team Leading</span>
            </p>
            </div>
          </VerticalTimelineElement>
          );

    }


    render() {


      return (
        <div>
            Dodododo 
      </div>
      );
    }
  }