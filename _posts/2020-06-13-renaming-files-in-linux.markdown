---
layout: article
title:  "Renaming files in Linux"
date:   2020-06-13 16:30:00 +0100
description: >-
    Some of the methods I've developed for renaming files in Linux.
author: Arun Sahadeo
table_of_contents: false
thumbnail:
    url: 'assets/images/linux-penguin.png'
    alt: 'Linux penguin'
    show_on_article: false
keywords:
    - linux
    - programming
    - bash
categories:
    - linux
    - productivity
---
There are many great command-line utilities I've come across for the express purpose of renaming files in Linux. Here are a few of them:

{:.whitney-bold}
### 1. mv

This is probably the most commonly used of all the utilities I will be mentioning in this article.

Here is a rudimentary example of the command in action:

{% highlight shell %}
mv oldfile.txt newfile.txt
{% endhighlight %}

`mv` really comes in handy when looping through files and passing shell variables that are expanded in Bash.

{:.whitney-bold}
### 2. Rename

What this command does is fairly self-explanatory, given its name.

As you can see from the following example, `rename` accepts regex arguments comprising the search pattern and the replacement text, with the second argument being the files to perform the regex operations on.

{% highlight shell %}
rename 's/\s/_/g' *.pdf
{% endhighlight %}

In my example, I replace any empty spaces with underscores in the filenames of PDFs in the current directory.

`rename` is probably the most robust of all the command-line utilities that can be used for renaming files, so it is definitely worth experimenting with.

### 3. cp

My last example of a built-in shell command for renaming files, `cp` differs from the previous two commands in that it is not so much used for moving files as it is for copying them.

{% highlight shell %}
cp oldfile newfile
{% endhighlight %}

Technically, this renames `oldfile` as `newfile`, but it does not replace `oldfile` as mentioned, instead making a copy called `newfile`.

According to [command line fu](https://www.commandlinefu.com/), there are a few other commands out there for renaming files - though not necessarily built-in ones.

Thanks for those who made it through to the end - I hope to do much more of these in the future.
