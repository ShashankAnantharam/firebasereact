import React, { Component } from 'react';
import Textarea from 'react-textarea-autosize';
import {Launcher} from 'react-chat-window';
import { ChatFeed, ChatBubble, BubbleGroup, Message } from 'react-chat-ui';
import * as Utils from './commonGraph/commonGraph';
import { filter } from '@amcharts/amcharts4/.internal/core/utils/Iterator';

const styles = {
  button: {
    backgroundColor: '#fff',
    borderColor: '#1D2129',
    borderStyle: 'solid',
    borderRadius: 20,
    borderWidth: 2,
    color: '#1D2129',
    fontSize: 18,
    fontWeight: '300',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
  selected: {
    color: '#fff',
    backgroundColor: '#0084FF',
    borderColor: '#0084FF',
  },
};

const users = {
  0: 'You',
  Mark: 'Mark',
  2: 'Evan',
};

const customBubble = props => (
  <div>
    <p>{`${props.message.senderName} ${props.message.id ? 'says' : 'said'}: ${
      props.message.message
    }`}</p>
  </div>
);


class EditBlock extends React.Component {

    constructor(props){

        super(props);
        this.state ={
            blockList:[
                {
                    "id":"sdfsdfs"
                },
                {
                    "id":"sddd"
                }
            ],
            value:'fdfdgd',
            messageList: [],
            messages: [
              new Message({
                id: 1,
                message: "I'm the recipient! (The person you're talking to)",
              }), // Gray bubble
              new Message({ id: 0, message: "I'm you -- the blue bubble!" }), // Blue bubble
            ],
            useCustomBubble: false,
            curr_user: 0        
        }

        //this.EditSingleBlock = this.EditSingleBlock.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    onPress(user) {
      this.setState({ curr_user: user });
    }
  
    onMessageSubmit(e) {
      const input = this.message;
      e.preventDefault();
      if (!input.value) {
        return false;
      }
      this.pushMessage(this.state.curr_user, input.value);
      input.value = '';
      return true;
    }
  
    pushMessage(recipient, message) {
      const prevState = this.state;
      const newMessage = new Message({
        id: recipient,
        message,
        senderName: users[recipient],
      });
      prevState.messages.push(newMessage);
      this.setState(this.state);
    }


    handleChange(event,index) {
        var shouldUpdate = true;
        var lastChar = event.target.value[event.target.value.length-1];
        if(lastChar=='\n' || lastChar=='\t'){
            shouldUpdate=false;
            console.log("Here");
        }

        if(shouldUpdate){
            var list = this.state.blockList;
            list[index].id = event.target.value;
            this.setState({blockList: list});
        }
      }

      handleKeyPress = (e) => {
        if (e.key === 'Enter') {
          console.log('do validate');
        }
      }

      sendMessage(e) {
        if (e.key === 'Enter') {
          //this.props.onKeyUp(e.target.value) your work with value
          // I want to clear the textarea around here
         // e.target.value = '';
        }
      }

    EditSingleBlock(listItem, index){
        return(

            <div>
                <form>
                <label>
                    <Textarea 
                    type="text"
                    value={this.state.blockList[index].id}
                    onKeyPress={this.handleKeyPress}
                    onChange={(e) => { this.handleChange(e,index)}}
                    maxRows="20"
                    minRows="10"
                    onKeyUp = {this.sendMessage}
                    style={{
                        borderWidth:'2px', 
                        borderStyle:'solid', 
                        borderColor:'lightgrey',
                        borderTopWidth:'0px',
                        marginLeft:'8%',
                        marginRight:'8%',
                        paddingTop:'6px',
                        paddingBottom:'6px',
                        width:'80%'
                        }}/>
                </label>
                </form>
            </div>

        );
    }

    _onMessageWasSent(message) {
        this.setState({
          messageList: [...this.state.messageList, message]
        })
      }
     
      _sendMessage(text) {
        if (text.length > 0) {
          this.setState({
            messageList: [...this.state.messageList, {
              author: 'them',
              type: 'text',
              data: { text }
            }]
          })
        }
      }

      componentDidMount(){
        let testData = {
          "US": 10,
          "UK": 8,
          "India": {
            "AP": 4,
            "TG": 3,
            "Rest": 6 
          }
        }

        let testData2 = {
          "US": 10,
          "UK": 8,
          "India": {
            "AP": 4,
            "TG": {
              lg: {
                kg: 0,
                kg2: 2
              },
              lg2: {
                kg: 10,
                kg2: 5
              },
              lg4: {
                kg: 1,
                kg2: 3
              }
            },
            "Rest": 6 
          }
        }
        let chartMap = {'US':0, 'India':0, 'TG':0};
        let possibleCharts = [];

        let dataIn =  testData2;

        let filters = {
          1: {},
          2: {}
        };


        Utils.traverseDataItem(dataIn);
        console.log(dataIn);
        
        Utils.getFilterOptions(dataIn['India'], filters);
        console.log(filters);

        let selectedFilters = [], filterOptions =  [];
        Utils.traverseDataItemByFilters(dataIn, selectedFilters, filterOptions);
        console.log(filterOptions);
        console.log(selectedFilters);

        Utils.traverseDataItemByFilters(dataIn, selectedFilters, filterOptions, 'US');
        console.log(filterOptions);
        console.log(selectedFilters);

        Utils.traverseDataItemByFilters(dataIn, selectedFilters, filterOptions);
        console.log(filterOptions);
        console.log(selectedFilters);

        Utils.traverseDataItemByFilters(dataIn, selectedFilters, filterOptions,'India');
        console.log(filterOptions);
        console.log(selectedFilters);

        Utils.traverseDataItemByFilters(dataIn, selectedFilters, filterOptions,'TG');
        console.log(filterOptions);
        console.log(selectedFilters);
      }


    render(){

        const listItems = this.state.blockList.map((block, index) => 
         this.EditSingleBlock(block, index)
       );

        return (
            <div>
                {listItems}
                <div>
                    {this.state.blockList[0].id}
                </div>
                <div>
                    {this.state.blockList[1].id}
                </div>
                <div style={{width:'27%',height:'30%'}}>
                <ChatFeed
                  chatBubble={this.state.useCustomBubble && customBubble}
                  maxHeight={250}
                  messages={this.state.messages} // Boolean: list of message objects
                  showSenderName
                />

          <form onSubmit={e => this.onMessageSubmit(e)}>
            <input
              ref={m => {
                this.message = m;
              }}
              placeholder="Type a message..."
              className="message-input"
              style={{width:'100%'}}
            />
          </form>
                </div>
            </div>
        );
    }

}
export default EditBlock;