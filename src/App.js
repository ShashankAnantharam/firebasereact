import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import StyleFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import 'firebase/firestore';
import {ArrayObj} from './arrayObj';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import TimelineComponent from './TimelineComponent';
import { BrowserRouter as Router,Switch, Route, Link } from "react-router-dom";
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
import EditBlock from './EditBlock';
import LongPara from './LongPara';


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
       isSignedIn:false,firebasePId: ''
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    callbacks:{
      signInSuccess: () => false,
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        var providerId = authResult.additionalUserInfo.providerId;
        this.setState({
          firebasePId:providerId
        });
        console.log(providerId);
        //...
      }      
    }
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

   firebase.auth().onAuthStateChanged(user =>{
     this.setState({
       isSignedIn: !!user
     });
     console.log(firebase.auth().currentUser);
     console.log(firebase.auth().currentUser.getIdToken());
   })

     
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

      {this.state.isSignedIn?
        <div>
          Signed In
          <button onClick={() => firebase.auth().signOut()}>
            Log Out
          </button>
          <h1>{firebase.auth().currentUser.phoneNumber}</h1>
          <span>{firebase.auth().currentUser.providerData[0].providerId}</span>
        </div>
        :
        <div>
          <StyleFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />

        </div>
    
      }
   <div>    


   <Slider />
   
       <div style={{background:'white'}}>

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
        <Switch>
          
          <Route path="/editBlock" 
          render={() => <EditBlock />}
          />
        <Route path="/" 
          render={() => <div>Jingalala</div>}
          />
      </Switch>
          
       </Router>

       <Router>
 
        <Route path="/longPara" 
        render={() => <LongPara />}
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


