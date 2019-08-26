import React, { Component } from 'react';
import Textarea from 'react-textarea-autosize';
import { ENOSPC } from 'constants';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4plugins_forceDirected from "@amcharts/amcharts4/plugins/forceDirected"; 
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

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
        this.chartCode = this.chartCode.bind(this);
        this.chart = null;
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

      chartCode(){
            // Create chart
            var chart = am4core.create("chartdiv", am4plugins_forceDirected.ForceDirectedTree);

            // Create series
            var series = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries());

            // Set data
            series.data = [{
                "name":"Sandwraith",
                "image": "https://upload.wikimedia.org/wikipedia/commons/c/c9/Nigel_Farage_%2845718080574%29_%28cropped%29.jpg",
            "children": [{
                "name": "Chrome",
                "value": 1,
                "image": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-160/icon_chrome.svg"
            }, {
                "name": "Firefox",
                "value": 1,
                "image": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-160/icon_firefox.svg"
            }, {
                "name": "Internet Explorer",
                "value": 1,
                "image": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-160/icon_ie.svg"
            }, {
                "name": "Safari",
                "value": 1,
                "image": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-160/icon_safari.svg"
            }, {
                "name": "Opera",
                "value": 1,
                "image": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-160/icon_opera.svg"
            }]
            }];

            // Set up data fields
            series.dataFields.value = "value";
            series.dataFields.name = "name";
            series.dataFields.id = "id";
            series.dataFields.children = "children";
            series.dataFields.linkWith = "link";

            // Add labels
            series.nodes.template.label.text = "{name}";
            series.nodes.template.label.valign = "bottom";
            series.nodes.template.label.fill = am4core.color("#000");
            series.nodes.template.label.dy = 10;
            series.nodes.template.tooltipText = "{name}: [bold]{value}[/]";
            series.nodes.template.label.hidden = true;
            series.fontSize = 10;
            series.minRadius = 30;
            series.maxRadius = 30;

            // Configure circles
            series.nodes.template.circle.disabled = true;
            series.nodes.template.outerCircle.disabled = true;

            // Configure icons
            var icon = series.nodes.template.createChild(am4core.Image);
            icon.propertyFields.href = "image";
            icon.horizontalCenter = "middle";
            icon.verticalCenter = "middle";
            icon.width = 60;
            icon.height = 60;

            var mask = new am4core.Circle();
            mask.fill = am4core.color('#000');
            mask.radius = 30;
            series.nodes.template.mask = mask;
///            icon.mask = mask;
//            icon.mask.disabled = false;
           

            series.centerStrength = 0.2;

            series.nodes.template.events.on("up", function (event) {
                var node = event.target;
                node.outerCircle.disabled = !node.outerCircle.disabled;
              });
              
              //NOT WORKING
              series.links.template.interactionsEnabled = true;
              series.links.template.clickable = true;
              series.links.template.strokeWidth = 20;
              series.links.template.events.on("hit", function (event) {                
                var link = event.target;                
              });
              
    
            this.chart = chart;
      }

      componentDidMount() {
        this.chartCode();
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

                <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
            </div>
        );
    }

}
export default LongPara;