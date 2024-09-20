# TOC
* [About License](#about-license)
* [About Project](#about-project)
* [Features](#features)
  * [Syntax highlighting](#syntax-highlighting)

# About License
The full license is written [here](https://github.com/zero-plusplus/autohotkey-devtools?tab=readme-ov-file#about-license).

This project is not MIT licensed, unlike vscode-autohotkey-debug, but end users can use it without restrictions as long as they use it locally (any use that would harm anyone is of course prohibited).

Although not relevant to end users, please note that reference acts such as inclusion in vscode expansion pack are also prohibited.

# About Project
**Note: This extension is not yet complete.**

This extension is a VSCode implementation of a suite of tools being developed with the goal of providing an integrated development environment for AutoHotkey.

vscode-autohotkey-debug was separated from this project, but will be reorganized and integrated here as I needed to use the new license to continue development.

Since vscode-autohotkey-debug took a lot of time to release because so many features were implemented at once, I plan to repeat the minimum number of releases this time.

As a very wide range of features need to be implemented, development is expected to take more than 10 years. Please be patient and wait for its completion.

# Features
## Syntax highlighting
The following is a description of the syntax highlights that are associated with the language IDs provided.

<table>
<tr>
  <th>ID</th>
  <th>extension</th>
  <th>description</th>
</tr>
<tr>
  <td>autohotkey</td>
  <td>.ahk</td>
  <td>
    Apply the latest stable AutoHotkey version syntax highlighting. If you specify <a href="https://www.autohotkey.com/docs/v2/lib/_Requires.htm">#Requires</a> on the first line in the your AutoHotKey script, that its version of syntax highlighting will be applied.
  </td>
</tr>
<tr>
  <td>autohotkeynext</td>
  <td><strong><i>none</i></strong></td>
  <td>Apply the latest development/unstable AutoHotkey version syntax highlighting.</td>
</tr>
<tr>
  <td>autohotkey2</td>
  <td>.ahk2</td>
  <td>Apply AutoHotkey v2 syntax highlighting.</td>
</tr>
<tr>
  <td>autohotkeyl</td>
  <td>.ahkl</td>
  <td>Apply AutoHotkey v1.1 syntax highlighting.</td>
</tr>
</table>
