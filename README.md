## danfoMojo: A javascript data analysis toolkit based on danfojs

## What is it?

**danfoMojo** is a javascript package that provides a series utility functions to tidy and manipulate data frame based on [danfojs](https://github.com/javascriptdata/danfojs#readme). It is heavily inspired by both [Pandas](https://pandas.pydata.org/pandas-docs/stable/) and [tidyr](https://tidyr.tidyverse.org/) library which means that users familiar with *Pandas* or *tidyr* from data science community, can easily pick up the functionalities of *danfoMojo*. 

## Main Features

  -  *dfd_unite_cols*: Unite multiple columns into one by pasting strings together
  -  *dfd_separate_col*: Separate a character column into multiple columns with a regular expression or numeric locations
  -  *dfd_groupby_pivot*: dfd_groupby_pivot() takes an existing data frame and converts it into a grouped data frame where operations are performed "by group".
  -  *dfd_pivot_wider*: "widens" data, increasing the number of columns and decreasing the number of rows. The inverse transformation is *dfd_pivot_longer()*
  -  *dfd_pivot_longer*:  increasing the number of rows and decreasing the number of columns. The inverse transformation is *dfd_pivot_wider()*.

  ## Installation

```bash
npm install danfomojo

```

## Use cases
```js
const dfm = require("danfomojo")

const dfd = require("danfojs")
const _ = require("lodash")


data = {'name':['Tom', 'nick', 'krish', 'jack', 'Mike','Jan'],
        'age':[20, 21, 19, 18, 21, 33],
       'group':['A','A', 'A', 'B', 'B', "B"],
       'major':['biology', 'english', 'biology', 'english', 'biology', 'biology'],
       'response':['good', 'good', 'ok', 'bad', 'bad','bad'],
       'date':['2020-04-01', '2021-03-12', '2021-03-12', '2020-04-01', '2020-04-01','2020-07-01']}

df = new dfd.DataFrame(data)
```

|    | name   |   age | group   | major   | response   | date       |
|---:|:-------|------:|:--------|:--------|:-----------|:-----------|
|  0 | Tom    |    20 | A       | biology | good       | 2020-04-01 |
|  1 | nick   |    21 | A       | english | good       | 2021-03-12 |
|  2 | krish  |    19 | A       | biology | ok         | 2021-03-12 |
|  3 | jack   |    18 | B       | english | bad        | 2020-04-01 |
|  4 | Mike   |    21 | B       | biology | bad        | 2020-04-01 |
|  5 | Jan    |    33 | B       | biology | bad        | 2020-07-01 |


### unite cols into one column

```js
result = dfm.dfd_unite_cols(df, united_with = ["major","response"], pattern = "; ", name_united="new_concat_col")
result.print()
```
|    | name   |   age | group   | major   | response   | date       | new_concat_col   |
|---:|:-------|------:|:--------|:--------|:-----------|:-----------|:-----------------|
|  0 | Tom    |    20 | A       | biology | good       | 2020-04-01 | biology; good    |
|  1 | nick   |    21 | A       | english | good       | 2021-03-12 | english; good    |
|  2 | krish  |    19 | A       | biology | ok         | 2021-03-12 | biology; ok      |
|  3 | jack   |    18 | B       | english | bad        | 2020-04-01 | english; bad     |
|  4 | Mike   |    21 | B       | biology | bad        | 2020-04-01 | biology; bad     |
|  5 | Jan    |    33 | B       | biology | bad        | 2020-07-01 | biology; bad     |


### Separate a character column into multiple columns with a regular expression or numeric locations

```js
result = dfm.dfd_unite_cols(df, sep_by="date",new_col_name = ["Year", "Month", "Date"], pattern="-")
result.print()
```
|    | name   |   age | group   | major   | response   |   date |   year |   month |
|---:|:-------|------:|:--------|:--------|:-----------|-------:|-------:|--------:|
|  0 | Tom    |    20 | A       | biology | good       |     01 |   2020 |      04 |
|  1 | nick   |    21 | A       | english | good       |     12 |   2021 |      03 |
|  2 | krish  |    19 | A       | biology | ok         |     12 |   2021 |      03 |
|  3 | jack   |    18 | B       | english | bad        |     01 |   2020 |      04 |
|  4 | Mike   |    21 | B       | biology | bad        |     01 |   2020 |      04 |
|  5 | Jan    |    33 | B       | biology | bad        |     01 |   2020 |      07 |

### dfd_groupby_pivot() takes an existing data frame and converts it into a grouped data frame where operations are performed "by group".

```js
result_pivot = dfm.dfd_groupby_pivot(df, group_by = ['group',"major", "response"], pivot_at = ["age"], operator="mean")
result_pivot.print()
```

|    | group   | major   | response   |   age_mean |
|---:|:--------|:--------|:-----------|------:|
|  0 | A       | biology | good       |    20 |
|  1 | A       | biology | ok         |    19 |
|  2 | A       | english | good       |    21 |
|  3 | B       | biology | bad        |    27 |
|  4 | B       | english | bad        |    18 |


### *dfd_pivot_wider*: "widens" data, increasing the number of columns and decreasing the number of rows. The inverse transformation is *dfd_pivot_longer()*

Let's use `result_pivot` (result from above) as input data frame for this use case. 


```js
result_wide = dfm.dfd_pivot_wider(result_pivot,  groupby_cols = ["group",  "response"], at_col = "major", value_col = "age_mean")
result_wide.print()
```

|    | group   | response   | age_mean_biology   |   age_mean_english |
|---:|:--------|:--------|:-----------|------:|
|  0 | A       | good | 20       |    21 |
|  1 | A       | ok | 19         |    NaN |
|  2 | B       | bad | 27       |    18 |

### *dfd_pivot_longer*:  increasing the number of rows and decreasing the number of columns. The inverse transformation is *dfd_pivot_wider()*.

Let's use `result_wide` (result from above) as input data frame for this use case. 

```js
result_long = dfm.dfd_pivot_longer(result_wide, keep_cols = ["group", "response"])
result_long.print()
```

|    | group   | response   | new_col_name   |  new_val_name  |
|---:|:--------|:--------|:-----------|------:|
|  0 | A       | good | age_mean_biology       |    20 |
|  1 | A       | ok | age_mean_biology         |    19 |
|  2 | B       | bad | age_mean_biology       |    27 |
|  3 | A       | good | age_mean_english        |    21 |
|  4 | A       | ok | age_mean_english        |    NaN |
|  5 | B       | bad | age_mean_english        |    18 |


