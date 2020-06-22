---
layout: article
title:  "How to lookup Linux commands"
date:   2020-06-22 17:00:00 +0100
description: >-
    Arun's top tips for finding out what certain Linux commands do.
author: Arun Sahadeo
table_of_contents: false
thumbnail:
    url: 'assets/images/linux-penguin.png'
    alt: 'Linux penguin'
    show_on_article: false
keywords:
    - linux
    - linux commands how-to
    - linux commands help
categories:
    - linux
    - productivity
---
There are a few solid command-line utilities for ensuring you have all the information you need on Linux commands, right at your fingertips.

{:.whitney-bold}
### 1. man

The oldest and most widely used of these commands, `man` interfaces with the UNIX online manual, known as the *man pages*, which documents low-level command-line tools, APIs and file formats. 

By default, the *man pages* use a terminal pager known as `less`, although this can be changed by modification of the shell variable `PAGER`. 

{:.whitney-bold}
### 2. info

Another useful tool, the `info` command reads documentation contained within the `info` format, and was designed by GNU to offer improvements over *man pages*.

As with the `man` command, `info` also uses `less` by default.

{:.whitney-bold}
### 3. help

Designed for beginners, the `help` command helps you learn about any built-in command by providing a short summary and by offering pattern matching, resolving your query to the nearest match.

If unable to provide the summary, and if unable to locate a relevant command, `help` will suggest other commands you can use to search for your queried command.
