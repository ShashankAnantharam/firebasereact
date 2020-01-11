import { isNullOrUndefined, isNumber, isString } from "util";

export const traverseDataItemTree = (dataKey, dataItem, chartMap, possibleCharts, parentDataItem) => {
    
    //returns total, updates chartMap

    let isPresentInChartMap = false;
    if(!isNullOrUndefined(dataKey) && (dataKey in chartMap)){
        isPresentInChartMap = true;
    }
    if(isNumber(dataItem)){
        if(!isNullOrUndefined(dataKey) && !isNullOrUndefined(parentDataItem)){
            parentDataItem[dataKey] = {
                '#v': dataItem
            };
        }      
        
        if(isPresentInChartMap){
            chartMap[dataKey] = 1;
            possibleCharts.push(
                {
                    type: chartMap[dataKey],
                    node: dataKey
                }
            )
        }
        
        return {val: dataItem, foundChildren: isPresentInChartMap};
    }
    else if(isString(dataItem)){
        if(!isNullOrUndefined(dataKey) && !isNullOrUndefined(parentDataItem)){
            parentDataItem[dataKey] = {
                '#v': 0,
                '#orig': dataItem
            };
        }
        
        return {val: 0, foundChildren: false};
    }

    let total = 0;
    let count = 0;
    let hasChildBeenFoundInChartMap = false;
    for(let key in dataItem){
        if(key != '#v'){
            // #v is for the value
            let result = traverseDataItemTree(key, dataItem[key], chartMap, possibleCharts);
            let val = result.val;
            hasChildBeenFoundInChartMap = hasChildBeenFoundInChartMap || result.foundChildren;
            if(val){
                total += val;
            }
            count++;
        }        
    }

    
    
    if(isPresentInChartMap){
        if(chartMap[dataKey] == 0){
            //Simple
            chartMap[dataKey] = 1;
            possibleCharts.push(
                {
                    type: chartMap[dataKey],
                    node: dataKey
                }
            )
        }
        
        if(count>1 && Math.abs(chartMap[dataKey])==1){
            //Pie, Simple
            chartMap[dataKey] *= 2;
            possibleCharts.push(
                {
                    type: Math.abs(chartMap[dataKey]),
                    node: dataKey
                }
            )
        }

        
    }

    dataItem['#v'] = total;
    
    return {val: total, foundChildren: isPresentInChartMap};
}

export const traverseDataItem = (dataItem, chartMap, possibleCharts) => {
    traverseDataItemTree(null, dataItem, chartMap, possibleCharts);
}