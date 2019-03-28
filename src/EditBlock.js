import React, { Component } from 'react';


class EditBlock extends React.Component {

    constructor(props){

        super(props);
        this.state ={
            blockList:[
                {
                    "id":"sdfsdfs"
                }
            ]
        }

        //this.EditSingleBlock = this.EditSingleBlock.bind(this);

    }

    EditSingleBlock(listItem){
        return(

            <div style={{
                borderWidth:'2px', 
                borderStyle:'solid', 
                borderColor:'lightgrey',
                marginLeft:'8%',
                marginRight:'8%',
                paddingTop:'6px',
                paddingBottom:'6px'
                }}>
                Block
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