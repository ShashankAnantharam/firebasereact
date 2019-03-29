import React, { Component } from 'react';
import Textarea from 'react-textarea-autosize';


class EditBlock extends React.Component {

    constructor(props){

        super(props);
        this.state ={
            blockList:[
                {
                    "id":"sdfsdfs"
                }
            ],
            value:'fdfdgd'
        }

        //this.EditSingleBlock = this.EditSingleBlock.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.textAreaAdjust = this.textAreaAdjust.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
      }

      textAreaAdjust(o) {
        o.style.height = "1px";
        o.style.height = (25+o.scrollHeight)+"px";
      }

      sendMessage(e) {
        if (e.key === 'Enter') {
          //this.props.onKeyUp(e.target.value) your work with value
          // I want to clear the textarea around here
          e.target.value = '';
        }
      }

    EditSingleBlock(listItem){
        return(

            <div>
                <form>
                <label>
                    <Textarea 
                    type="text"
                    defaultValue={this.state.value}
                    onChange={this.handleChange}
                    onkeyup={this.textAreaAdjust}
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



    render(){

        const listItems = this.state.blockList.map((block) => 
         this.EditSingleBlock(block)
       );

        return (
            <div>
                {listItems}
            </div>
        );
    }

}
export default EditBlock;