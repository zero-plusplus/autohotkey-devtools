**NOTE: This document has been translated by a translator.**

**Goal**
------------------------------

This extension aims to become a powerful integrated development environment for AutoHotkey ([vscode-autohotkey-debug](https://github.com/zero-plusplus/vscode-autohotkey-debug) was part of this plan).

It is currently in preview and is expected to remain incomplete for several years.

**Implemented**
------------------------------

* [Syntax Highlight](#syntax-highlight)

**Next**
------------------------------

Create a modern parser for error-tolerant IDEs.

However, since this is a very large undertaking, the initial goal is to make symbols such as variables and functions analyzable.

**License**
------------------------------

This extension is protected by [license](https://github.com/zero-plusplus/autohotkey-devtools?tab=readme-ov-file#about-license) and cannot be included in other projects. However, for transparency, the source code is publicly available.

If you need to use the source code, etc. for any reason, please ensure it remains confined to local and private environments and is not shared with others.

The following are also prohibited:

* Including it in extension packs
* Calling this extension's functions from external sources
* Promoting integration with other extensions

This is to enable development at my own pace, free from external influence as much as possible. Please understand.

**Features**
------------------------------

## Syntax Highlight

Supported versions: ([Language ID](https://code.visualstudio.com/docs/languages/identifiers) in parentheses).

* v1.1.37.02 (ahkl)
* v2.0.19 (ahk2)
* v2.1-alpha.18 (ahknext)

Noteworthy point, it accurately highlights the command syntax of v1. (However, this applies only when line breaks are not included due to specification limitations.)

This is achieved by creating dedicated definitions for each command and subcommand, at the cost of definition files becoming more than ten times larger than standard ones.

This will be replaced with [semantic highlighting](https://code.visualstudio.com/api/language-extensions/semantic-highlight-guide) using a parser in the future.