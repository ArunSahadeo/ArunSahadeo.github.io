---
layout: post
date: 2021-08-14 16:30:00+01:00
title:  "Searching for text on the command line"
description: >-
  What terminal commands can I run to find text in a file or from command output?
excerpt: >-
    What terminal commands can I run to find text in a file or from command output?
featured_image:
    filename: 'json-text.jpg'
    alt: 'JSON'
---

The terminal commands available to you to search for text, in either files or command output, depends on your operating system.

## Windows

Windows offers a built-in terminal command called [`findstr`], which while not being as full-featured and robust as my preferred terminal command for this purpose, still works pretty well.

You can run `findstr /?` to get a list of available switches / flags for the command (I often just run `findstr /I 'TEXT'` so that it is not case sensitive).

There is also [`find`], whose usage may be as follows:

```
find /I /N "Pattern" /path/to/file
```

Where /I allows the command to be case insensitive, and /N allows the line numbers containing the pattern to be printed.

## Linux

My favourite tool for searching text is [`grep`]. It is fairly intuitive and can be lightning fast depending on the options you pass to it.

This is a typical <span data-text="grep">`grep`</span> command I use:

```bash
grep -RnFil --exclude=\*.{dist,gif,git*,htaccess,htm,img,jp*g,json,lock,log,*map,Markdown,min.js,png,svg,txt,vue,vim*} --exclude-dir={.git,.gradle,.jekyll-cache,.next,.ssh,.vim,_site,bootstrap,bower,bower_components,brochure,build,caches,env,errors,img,lang*,locale,lib,media,node_modules,original,platforms,plugins,static_compiled,static,storage,tests,translations,twenty*,vendor,ViewerJS,wordpress,wp-admin,wp-includes,wp-json,www} '*STRING HERE*' .
```

Let&rsquo;s break it down, starting with the switches / flags passed to `grep`.

1. The first flag, `-R`, allows grep to recurse through directories within the current working directory.
2. The second flag, `-n`, suffixes each file with the line number in which the matching pattern was found.
3. The third flag, `-F`, allows grep to interpret the supplied pattern as a list of fixed strings, separated by newlines, any of which can be matched.
4. The fourth flag, `-i`, allows grep to be case insensitive.
5. The fifth flag, `-L`, allows grep to provide just the filenames matching the pattern, making it useful if you need to pipe those filenames to another command (please note that this overrides the `-n` switch).

Now to the main arguments.

1. `--exclude` allows you to exclude any filenames either by the complete filename or by file extension.
2. `--exclude-dir` allows you to stop grep from recursing into any of the specified directories.

[`findstr`]: https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/findstr
{: .font-weight-bold}
{:target="_blank"}
{:data-text="findstr"}
[`grep`]: https://linux.die.net/man/1/grep
{: .font-weight-bold}
{:target="_blank"}
{:data-text="grep"}
[`find`]: https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/find
{: .font-weight-bold}
{:target="_blank"}
{:data-text="find"}
