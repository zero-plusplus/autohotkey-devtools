Language: en / [jp](https://github.com/zero-plusplus/autohotkey-devtools/blob/main/editors/vscode/vscode-autohotkey-devtools/README.ja.md)

**NOTE: This document has been translated by a translator.**

# About License
> **Important**: **The full text of the license is [here](https://github.com/zero-plusplus/autohotkey-devtools?tab=readme-ov-file#about-license).**

**The license described here is not relevant to end users. You are free to use this extension as long as you do not include my source code in your project.**

---

This extension is not open source, although the source code is public for the sake of transparency. It is similar in nature to closed source in that the source code is not available. This is necessary to keep my future activities protected over the long term.

My projects, including [vscode-autohotkey-debug](https://github.com/zero-plusplus/vscode-autohotkey-debug), are my personal tools to achieve my goals. However, creating a good tool requires a lot of feedback.

For this reason I have made the tool available to the public. And I have implemented many features so that more users can use it. This is to create a cycle of increasing the number of users by continuing to offer features that can only be experienced with my extensions, and then adding new features based on the feedback I get from them.

However, the MIT license allows my source code to be used in extensions that would compete with it by adhering to a minimum set of rules. If the source code continues to be incorporated on a perpetual basis, this cycle can easily be broken, depending on the influence of the other party.

In addition, if both of them were installed at the same time, the same source code would exist in VSCode, which can be expected to cause some kind of conflict problem that did not exist before.

This is a major impact to the end user.

I regret that the above problem occurred because I used an MIT license that grants permission unnecessarily and did not specify in the README what I did not want you to do, so I will specify below what I especially do not want you to do.

* I am not going to cooperate with anyone. Again, this extension is a personal project. I only need end-user feedback

* Please do not include it in an extension pack. In particular, this extension is not designed to work with extensions from other authors and may cause problems. Extension packs are just a list of extensions to install, they cannot solve problems. Also, please do not write anything that recommends collaborating with this extension

* Please do not recommend installing my extension after you have stopped development of the extension and marked it as deprecated. This extension is independent and not compatible in features

* Please do not even try to call upon and use my extension features to increase the value of your program

---

Creating an integrated development environment for AutoHotkey on my own is too large a task and will require at least the next 10 years of continued development to complete.

For this reason, it is very important to create an environment where I can continue to develop at my own pace and not be influenced by anyone else. In other words, it is to create that environment that the license was changed, even resetting several years of activity.

I hope you understand that. Thank you for taking the time to look at this so far.

# TOC
* [About License](#about-license)
* [About Project](#about-project)
* [Features](#features)
  * [Syntax highlighting](#syntax-highlighting)

# About Project
**Note: This extension is not yet complete.**

This extension is a VSCode implementation of a suite of tools being developed with the goal of providing an integrated development environment for AutoHotkey.

[vscode-autohotkey-debug](https://github.com/zero-plusplus/vscode-autohotkey-debug) was separated from this project, but will be reorganized and integrated here as I needed to use the new license to continue development.

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
