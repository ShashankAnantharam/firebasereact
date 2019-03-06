import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import 'firebase/firestore';
import {ArrayObj} from './arrayObj';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import TimelineComponent from './TimelineComponent';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {SideNav, MenuIcon} from 'react-simple-sidenav';
import Sidebar from "react-sidebar";


class App extends Component {

  constructor(){
   super();
   this.state ={
       speed: "ttt",
       docs: [],
       displaydocs: [],
       name: "",
       arry: [],
       showNav: false,
       currentClicked:'0',
       sidebarOpen: false
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSetSidebarOpen(open) {
   this.setState({ sidebarOpen: open });
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


    return (
      <div className="App">
      <MenuIcon style={{background:'black'}} onClick={() => this.setState({showNav: !this.state.showNav})}/>

   <div>    
   
   <SideNav
    showNav        =  {this.state.showNav}
    onHideNav      =  {() => this.setState({showNav: false})}
    title          =  "Hello World"
    items          =  {['home', 'services', 'about', 'contact']}
    titleStyle     =  {{backgroundColor: '#4CAF50'}}
    itemStyle      =  {{backgroundColor: '#fff'}}
    itemHoverStyle =  {{backgroundColor: '#CDDC39'}}
    currentClicked = {'home'}
    />

      <Sidebar
        sidebar={<div style={{width:'30vw'}}>Sidebar content</div>}
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        pullRight={true}
        defaultSidebarWidth='200px'
        styles={{ sidebar: { background: "white" } }}
      >
        <button onClick={() => this.onSetSidebarOpen(true)}>
          Open sidebar
        </button>
      </Sidebar>
       <div style={{background:'lightblue'}}>

       <Router basename={process.env.PUBLIC_URL}>

       
 
          <Route path="/timeline" 
          render={() => <TimelineComponent list={this.state.arry} />}
          />
          
       </Router>

       <Router>
       <Route path="/usr/:id"  
                   component={Topics}
         />
       </Router>

      </div>
      </div>
      </div>
    );
  }

  
}

function Topics({ match }) {
  return (
    <div>
      <h2>{match.params.id}</h2>
    </div>
      )
}

export default App;


