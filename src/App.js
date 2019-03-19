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
import {SideNav} from 'react-simple-sidenav';
import Sidebar from "react-sidebar";
import { Slider } from 'react-burgers';
import { slide as Menu } from 'react-burger-menu';
import NewGraphComponent from './GraphComp';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import TimelineIcon from '@material-ui/icons/Timeline';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import MenuIcon from '@material-ui/icons/Menu';
import AcUnitIcon from '@material-ui/icons/AcUnit'; 
import GroupIcon from '@material-ui/icons/Group'; 
import ListIcon from '@material-ui/icons/List';



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
       sidebarOpen: false,
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


   <Slider />
   

      <div>
      <Sidebar
        sidebar={<div style={{width:'30vw'}}>
        {this.state.sidebarOpen.toString()}
        <List className="">
      <ListItem button selected={true}>
      <Avatar>
          <MenuIcon />
        </Avatar>
        <ListItemText primary="All"/>
      </ListItem>
      <ListItem button>
      <Avatar>
          <ListIcon />
        </Avatar>
        <ListItemText primary="List" />
      </ListItem>
      <ListItem button>
      <Avatar>
          <AcUnitIcon />
        </Avatar>
        <ListItemText primary="Graph" />
      </ListItem>
      <ListItem button>      
      <Avatar>
          <GroupIcon />
        </Avatar>
        <ListItemText primary="Find Connections" />
      </ListItem>
      <ListItem button>
      
      <Avatar>
          <TimelineIcon />
        </Avatar>
        <ListItemText primary="Timeline" />
      </ListItem>
    </List>
        </div>}
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        pullRight={true}
        defaultSidebarWidth='200px'
        styles={{ sidebar: { background: "white", position:'fixed' } }}
      >
        <button onClick={() => this.onSetSidebarOpen(true)}>
          Open sidebar
        </button>

      </Sidebar>
      </div>
      <div>
      {this.state.sidebarOpen.toString()}
      </div>
       <div style={{background:'lightblue'}}>

       <Router basename={process.env.PUBLIC_URL}>

       
 
          <Route path="/timeline" 
          render={() => <TimelineComponent list={this.state.arry} />}
          />
          
       </Router>

       <Router>
 
          <Route path="/graph" 
          render={() => <NewGraphComponent />}
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


