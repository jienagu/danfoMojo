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

╔════════════╤═══════════════════╤═══════════════════╤═══════════════════╤═══════════════════╤═══════════════════╤═══════════════════╗
║            │ name              │ age               │ group             │ major             │ response          │ date              ║
╟────────────┼───────────────────┼───────────────────┼───────────────────┼───────────────────┼───────────────────┼───────────────────╢
║ 0          │ Tom               │ 20                │ A                 │ biology           │ good              │ 2020-04-01        ║
╟────────────┼───────────────────┼───────────────────┼───────────────────┼───────────────────┼───────────────────┼───────────────────╢
║ 1          │ nick              │ 21                │ A                 │ english           │ good              │ 2021-03-12        ║
╟────────────┼───────────────────┼───────────────────┼───────────────────┼───────────────────┼───────────────────┼───────────────────╢
║ 2          │ krish             │ 19                │ A                 │ biology           │ ok                │ 2021-03-12        ║
╟────────────┼───────────────────┼───────────────────┼───────────────────┼───────────────────┼───────────────────┼───────────────────╢
║ 3          │ jack              │ 18                │ B                 │ english           │ bad               │ 2020-04-01        ║
╟────────────┼───────────────────┼───────────────────┼───────────────────┼───────────────────┼───────────────────┼───────────────────╢
║ 4          │ Mike              │ 21                │ B                 │ biology           │ bad               │ 2020-04-01        ║
╟────────────┼───────────────────┼───────────────────┼───────────────────┼───────────────────┼───────────────────┼───────────────────╢
║ 5          │ Jan               │ 33                │ B                 │ biology           │ bad               │ 2020-07-01        ║
╚════════════╧═══════════════════╧═══════════════════╧═══════════════════╧═══════════════════╧═══════════════════╧═══════════════════╝
