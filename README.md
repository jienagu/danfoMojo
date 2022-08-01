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
npm install danfoMojo

```