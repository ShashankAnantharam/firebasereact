import React, { Component } from 'react';
import Textarea from 'react-textarea-autosize';


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
            value:'fdfdgd'
        }

        //this.EditSingleBlock = this.EditSingleBlock.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
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
                    onChange={this.handleChange}
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
            </div>
        );
    }

}
export default EditBlock;