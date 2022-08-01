const dfd = require("danfojs")
const _ = require('lodash');

const dfd_unite_cols = (df, united_with, pattern = ", ", name_unite = "Untitled") =>{
    const df_json = dfd.toJSON(df)
    const getConcat = (item) =>{
            return Object.values(_.pick(item, united_with) ).join(pattern)
          }
    const new_col = df_json.map(getConcat)
    df.addColumn(name_unite, new_col, { inplace: true });
    return df
}


const dfd_separate_col = (df, sep_by, new_col_name, pattern=" ") =>{
    const getSepName = (item) => {
            return item[sep_by].split(pattern);
          }
    const df_json = dfd.toJSON(df)
    const df_arr = df_json.map(getSepName)
    if (new_col_name.length === df_arr[0].length) {
            df_append = new dfd.DataFrame(df_arr, {columns: new_col_name});
    }else{
            df_append = new dfd.DataFrame(df_arr)
    }
    
    const com_df = dfd.concat({ dfList: [df_append, df], axis: 1 })
    return com_df
}


const dfd_groupby_pivot = (df, group_by, pivot_at, operator="count")=> {
    const col_keep = group_by.concat(pivot_at);
    const sub_df = df.loc({columns: col_keep})
    const grp = sub_df.groupby(group_by)
    
    if(operator === "mean")
            output = grp.mean()
    else if(operator === "sum"){
            output = grp.sum()
    }else if(operator === "count"){
            output = grp.count()
    }else{
            output = "Hmm... operator must be one of sum, mean and count!"
    }
    
    return output
}


const dfd_pivot_wider = (pivot_test,  groupby_cols, at_col, value_col) =>{
    const unique_levels = _.uniq(dfd.toJSON(pivot_test[at_col], {'format': 'row'})[at_col])
    let df_sub = pivot_test.loc({columns: groupby_cols})

    let groupby_result = df_sub.groupby(groupby_cols)

    let obj = groupby_result['keyToValue']
    let result = Object.keys(obj).map((key) =>  obj[key]);

    let test_groupby2 = new dfd.DataFrame(result, {columns: groupby_result['columnName']})
    let output = test_groupby2;
    for (let i = 0; i < unique_levels.length; i++) {
            let query_sub = pivot_test.query(pivot_test[at_col].eq(unique_levels[i]))
            query_sub.drop({ columns: [at_col], inplace: true });
            query_sub.rename({ [value_col]: value_col.concat("_").concat(unique_levels[i]) }, { inplace: true })
            output = dfd.merge({ "left": output, "right": query_sub, "on": groupby_cols, how: "left"})
    }

    return(output)
}



const dfd_pivot_longer = (input_wide) =>{

    const keep_cols = ["group", "response"]
    ary = removeVals(input_wide.axis['columns'],keep_cols)
    for (let i = 0; i < ary.length; i++) {
            console.log(["group", "response", ary[i]])
            df_sel = input_wide.loc({columns: ["group", "response", ary[i]]})
            console.log(Array(df_sel.shape[0]).fill(ary[i]))
            df_sel.addColumn("new_col_name", Array(df_sel.shape[0]).fill(ary[i]), {inplace: true})
            df_sel.rename({[ary[i]]: "new_val_name"}, {inplace: true})
            if(i ===0){
                     output_long =  df_sel
            }else{
                     output_long = dfd.concat({ dfList: [output_long,df_sel], axis: 0 })
            }
    }
    output_long = output_long.loc({columns: ["group", "response", "new_col_name", "new_val_name" ]})
    //output_long.sortValues(["group", "response", "new_col_name"], { inplace: true })
    return(output_long)
}



module.exports = {
    dfd_unite_cols,
    dfd_separate_col,
    dfd_groupby_pivot,
    dfd_pivot_wider,
    dfd_pivot_longer
  }
