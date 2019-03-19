import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import 'firebase/firestore';
import {ArrayObj} from './arrayObj';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { timingSafeEqual } from 'crypto';  
import Graph from "react-graph-vis";

import  MultiSelectReact  from 'multi-select-react';


class NewGraphComponent extends React.Component {


    constructor(props){

        super(props);
          this.state={
              graph: {},
              options: {},
              multiSelect: [
                {
                  value: false, 
                  label: "aaa", 
                  id: 1
                },
              {
                  value: false, 
                  label: "bbb", 
                  id: 2
                },
                {
                    value: false, 
                    label: "ccc", 
                    id: 3
                  },
                  {
                    value: false, 
                    label: "bbb", 
                    id: 4
                  },
                  {
                      value: false, 
                      label: "ccc", 
                      id: 5
                    }
                    
                  

            ]
          }

          //this.optionClicked = this.optionClicked.bind(this);
          //this.selectedBadgeClicked = this.selectedBadgeClicked.bind(this);
          
      }

      optionClicked(optionsList) {
        this.setState({ multiSelect: optionsList });
        }
    
        selectedBadgeClicked(optionsList) {
            this.setState({ multiSelect: optionsList });
        }

    render(){

        const selectedOptionsStyles = {
            color: "#3c763d",
            backgroundColor: "#dff0d8"
        };
        const optionsListStyles = {
            backgroundColor: "#dff0d8",
            color: "#3c763d"
        };

        var graph = {
            nodes: [
                {id: 1, label: 'Node 1'},
                {id: 2, label: 'Node 2'},
                {id: 3, label: 'Node 3'},
                {id: 4, label: 'Node 4'},
                {id: 5, label: 'Node 5'}
              ],
            edges: [
                {from: 1, to: 2},
                {from: 1, to: 3},
                {from: 2, to: 4},
                {from: 2, to: 5}
              ]
          };

        var options = {
            layout: {
                hierarchical: false
            },
            edges: {
                arrows: {
                    to:     {enabled: false, scaleFactor:1, type:'arrow'},
                    middle: {enabled: false, scaleFactor:1, type:'arrow'},
                    from:   {enabled: false, scaleFactor:1, type:'arrow'}
                  },
                color: "#000000"
            }        
        };
        var events = {
            select: function(event) {
                var { nodes, edges } = event;
                console.log("Selected nodes:");
                console.log(nodes);
                console.log("Selected edges:");
                console.log(edges);
            }

        }
        
        return (
            <div>
                <div style={{width:'20%'}}>
                <MultiSelectReact 
                options={this.state.multiSelect}
                optionClicked={this.optionClicked.bind(this)}
                selectedBadgeClicked={this.selectedBadgeClicked.bind(this)}
                selectedOptionsStyles={selectedOptionsStyles}
                optionsListStyles={optionsListStyles} 
                isTextWrap={false} 
                />
                </div>

                <Graph graph={graph} options={options} events={events} style={{ height: "780px" }} />
            </div>
        );
    }


}
export default NewGraphComponent;