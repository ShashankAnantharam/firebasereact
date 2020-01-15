import { isNullOrUndefined, isNumber, isString } from "util";
import { filter } from "@amcharts/amcharts4/.internal/core/utils/Iterator";

export const traverseDataItemTree = (dataKey, dataItem, level, parentDataItem) => {
    
    //returns total, updates chartMap

  
    if(isNumber(dataItem)){
        if(!isNullOrUndefined(dataKey) && !isNullOrUndefined(parentDataItem)){
            parentDataItem[dataKey] = {
                '#v': dataItem,
                '#t': 1,
                '#l':level
            };
        }      
        
        return {val: dataItem};
    }
    else if(isString(dataItem)){
        if(!isNullOrUndefined(dataKey) && !isNullOrUndefined(parentDataItem)){
            parentDataItem[dataKey] = {
                '#v': 0,
                '#orig': dataItem,
                '#l':level
            };
        }
        
        return {val: 0};
    }

    let total = 0;
    let count = 0;
    for(let key in dataItem){
        if(key != '#v' && key != '#t' && key != '#l'){
            // #v is for the value
            let result = traverseDataItemTree(key, dataItem[key], level+1, dataItem);
            let val = result.val;
            if(val){
                total += val;
            }
            count++;
        }        
    } 
    
    if(!isNullOrUndefined(dataKey)){
        if(!('#t' in dataItem)){
            //Simple
            dataItem['#t'] = 1;
        }
        
        if(count>1){
            //Pie, Simple
            dataItem['#t'] = 2;
        }        
    }

    dataItem['#v'] = total;
    dataItem['#l'] = level;
    
    return {val: total};
}

export const traverseDataItem = (dataItem) => {
    traverseDataItemTree(null, dataItem, 0);
}

export const getFilterOptions = (dataItem, filters) => {

    if(isNullOrUndefined(dataItem)){
        return;
    }
    
    for(let key in dataItem){
        if(key != '#v' && key != '#t' && key != '#l'){
            // #v is for the value
           filters[1][key] = true;
           if(dataItem[key]['#t'] == 2){
                filters[2][key] = true;
           }
        }        
    } 
}

export const traverseDataItemByFilters = (dataItem, selectedFilters, filterOptions, newSelection) => {
    // returns next options
    let currOptions = {1: [], 2: []};
    if(filterOptions.length == 0){
        getFilterOptions(dataItem,currOptions);
        filterOptions.push(currOptions);
        return;
    } 
    if(isNullOrUndefined(newSelection)){
        if(selectedFilters.length > 0)
            selectedFilters.pop();
        if(filterOptions.length > 0)
            filterOptions.pop();        
        return;
    }
    else{
        selectedFilters.push(newSelection);
        let currDataItem = dataItem;

        for(let i=0; i<selectedFilters.length && !isNullOrUndefined(currDataItem); i++){
            currDataItem = currDataItem[selectedFilters[i]];
            if(isNullOrUndefined(currDataItem))
                break;
        }
        getFilterOptions(currDataItem,currOptions);
        filterOptions.push(currOptions);
    }
}

export const createChartForSingleDataItem = (possibleChart, dataItem, existingChartData, dataKey, category) => {
    let reqKey = possibleChart.node;
    let chartType = possibleChart.type;
    let isSeries = false;
    if(!isNullOrUndefined(category)){
        isSeries = true;
    }
    
    if(!isNullOrUndefined(dataKey) && dataKey == reqKey){
        //dataItem reached
        if(chartType == 1){
            //simple line/bar chart
            if(isSeries){
                existingChartData.push({
                    category: category,
                    value: dataItem['#v']
                })
            }
        } 
        else  if(chartType == 2){
            if(isSeries){
                //Stacked bar chart

            }
            else{
                for(let key in dataItem){
                    if(key!='#v'){
                        existingChartData.push({
                            category: key,
                            value: dataItem[key]['#v']
                        })
                    }
                }

            }
        }
    }
    else{
        for(let key in dataItem){
            createChartForSingleDataItem(possibleChart,dataItem[key],existingChartData,key,category);
        }
    }
}