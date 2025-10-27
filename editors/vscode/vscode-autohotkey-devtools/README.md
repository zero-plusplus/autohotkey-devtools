**NOTE: This document has been translated by a translator.**

**First of all**
------------------------------

**This extension is incomplete and highly experimental.**

If you encounter any problems, please report [here](https://github.com/zero-plusplus/autohotkey-devtools/issues).

**Goal**
------------------------------

"AutoHotkey Dev Tools" aims to become a powerful integrated development environment for AutoHotkey. ([vscode-autohotkey-debug](https://github.com/zero-plusplus/vscode-autohotkey-debug) was part of this plan.)

However, since this is a personal project, development is progressing very slowly, and it will take over a decade to complete.

> Although this project is incomplete, you can enable debugging features by separately installing [vscode-autohotkey-debug v1.11.1](https://marketplace.visualstudio.com/items?itemName=zero-plusplus.vscode-autohotkey-debug).
>
> Together with the [syntax highlighting described later](#syntax-highlight), it provides the minimum features required for a development environment.

**Implemented**
------------------------------

* [Syntax Highlight](#syntax-highlight)

**License**
------------------------------

This extension is protected by [license](https://github.com/zero-plusplus/autohotkey-devtools?tab=readme-ov-file#about-license) and cannot be included in other projects. However, for transparency, the source code is publicly available.

If you need to use the source code, etc. for any reason, please ensure it remains confined to local and private environments and is not shared with others.

The following are also prohibited:

* Including it in extension packs
* Calling this extension's functions from external sources
* Promoting integration with other extensions

This is to enable development at my own pace, free from external influence as much as possible. Please understand.

**Installation**
------------------------------

1. Install [VSCode](https://code.visualstudio.com/) with version `1.90.2` or higher
2. Install this extension. To learn how to install extensions, please see [here](https://code.visualstudio.com/docs/configure/extensions/extension-marketplace).

**Features**
------------------------------

## Syntax Highlight

The following versions are supported.

> If you want to learn about Language ID, please see [here](https://code.visualstudio.com/docs/languages/identifiers).

- v1.1.37.02
  - Language ID: `autohotkeyl`
  - Default File Extension: `.ahkl`
  > Note that the last character of `autohotkeyl` is `L`, not `1` (one). The name originates from the fact that v1.1 was [called AutoHotkeyL](https://www.autohotkey.com/docs/v2/v1-changes.htm).

* v2.0.19
  - Language ID: `autohotkey2`
  - Default File Extension: `.ahk2`

* v2.1-alpha.18
  - Language ID: `autohotkeynext`
  - Default File Extension: `.ahknext`

* [Version switching](#version-switching)
  - Language ID: `autohotkey`
  - Default File Extension: `.ahk`

Noteworthy point, it accurately highlights the command syntax of v1. (However, this applies only when line breaks are not included due to specification limitations.)

This is achieved by creating dedicated definitions for each command and subcommand, at the cost of definition files becoming more than ten times larger than standard ones.

This will be replaced with [semantic highlighting](https://code.visualstudio.com/api/language-extensions/semantic-highlight-guide) using a parser in the future.

### Version switching

Setting the language ID to `autohotkey` allows you to switch the highlighting version using [#Requires](https://www.autohotkey.com/docs/v2/lib/_Requires.htm). By default, it is highlighted as `autohotkey2`.

Currently, only simple version notation starting with the following is supported.

* `#Requires AutoHotkey v1`
* `#Requires AutoHotkey v2.0`
* `#Requires AutoHotkey v2.1`

### Other

The following highlights are supported.

* [Script Compiler Directives](https://www.autohotkey.com/docs/v2/misc/Ahk2ExeDirectives.htm)
* [jsdoc tags](https://jsdoc.app/)
