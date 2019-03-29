import React, { Component } from 'react';
import Textarea from 'react-textarea-autosize';
import { ENOSPC } from 'constants';


class LongPara extends React.Component {

    constructor(props){

        super(props);
        this.state ={
            display:'',
            value:'fdfdgd'
        }

        //this.EditSingleBlock = this.EditSingleBlock.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.getParas = this.getParas.bind(this);
    }


    getParas(text){
        var ans="";
        var prev='0';
        for(var i=0;i<text.length;i++){
            if(text[i]=='\n'){
                if(prev!='\n'){
                    ans=ans+';';
                }
            }
            else{
                ans=ans+text[i];
            }
            prev = text[i];
        }
        return ans;
    }

    handleChange(event) {
        this.setState({
            value: event.target.value,
        });
    
      }

      handleKeyPress = (e) => {
        if (e.key === 'Enter') {
          
        }
      }

      sendMessage(e) {
        if (e.key === 'Enter') {
          //this.props.onKeyUp(e.target.value) your work with value
          // I want to clear the textarea around here
         // e.target.value = '';
         var currVal = this.state.value;
         currVal = this.getParas(currVal);
         this.setState({
             display:currVal
         });
        }
      }



    render(){


        return (
            <div>
                <form>
                <label>
                    <Textarea 
                    type="text"
                    value={this.state.value}
                    onKeyPress={this.handleKeyPress}
                    onChange={(e) => { this.handleChange(e)}}
                    maxRows="60"
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
                <div>{this.state.display}</div>
            </div>
        );
    }

}
export default LongPara;