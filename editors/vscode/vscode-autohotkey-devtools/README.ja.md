言語: [en](https://github.com/zero-plusplus/autohotkey-devtools/blob/main/editors/vscode/vscode-autohotkey-devtools/README.md) / ja

> **この拡張機能は未完成です。機能は少なく仕様も定まっていません。**

# 概要

この拡張機能は個人的な問題を解決しつつ、AutoHotkey統合開発環境を実現することを目指して1人で開発されています。

[vscode-autohotkey-debug](https://github.com/zero-plusplus/vscode-autohotkey-debug)と同じく新機能を追加することに重点を置いていますが、この時の失敗からリリース間隔を短くしつつ安定性を保てるように注意しながら開発を進めています。ただし、基礎部分の開発が進むまではリリース間隔が長くなることが予想されます。

次回追加される機能については[こちら](https://github.com/zero-plusplus/autohotkey-devtools/issues/5)を見てください。

## 実装済みの機能

現在は以下の機能がサポートされています。

* [シンタックスハイライト](#シンタックスハイライト)

将来的にデバッグ機能を提供する予定ですが、それまでの間は[vscode-autohotkey-debug](https://marketplace.visualstudio.com/items?itemName=zero-plusplus.vscode-autohotkey-debug)を別途インストールしてください。

## 注意事項

この拡張機能を含むAutoHotkeyに関連する私の[プロジェクトリポジトリ](https://github.com/zero-plusplus/autohotkey-devtools)はオープンソースではありません。透明性のために公開されているものの、独自性を維持するためにクローズドソースに似た非寛容な[ライセンス](https://github.com/zero-plusplus/autohotkey-devtools/blob/main/README.ja.md)が適用されています。

基本的に利用者を制限するライセンスではありません。ただし、このプロジェクト内のAutoHotkeyライブラリなどのソースコードをあなたのプロジェクトに含めたり、将来的に計画されている一部機能でこれらを含んだ状態で出力されたソースコードには上記ライセンスが適用されるのでご注意ください。

> 注意: 外部の拡張機能やその他プロジェクトからこの拡張機能の機能やソースコードを利用するなど、利用者としての範囲を超える利用はライセンスにより禁止されています。詳しくは[追加の注意事項](#追加の注意事項)をお読みください。

## 貢献

ライセンス上の問題と個人的な問題によりプルリクエストは受け付けていません。代わりに[Issues](https://github.com/zero-plusplus/autohotkey-devtools/issues)および[Discussions](https://github.com/zero-plusplus/autohotkey-devtools/discussions)にて機能リクエストやバグ報告などを受け付けています。もし、日本語で報告したい場合はDiscussionsを利用してください。

# 利用可能な機能
## シンタックスハイライト

> **ヒント:** この機能はエディタおよびマークダウンのコードブロック、後述の[ドキュメントコメント](#ドキュメントコメント)でも有効です。

### 言語ID

以下の[言語ID](https://code.visualstudio.com/docs/languages/identifiers)がサポートされており、AutoHotkey v1.1からv2.1までをサポートしています。

<table>
<tr>
  <th>言語ID</th>
  <th>拡張子</th>
  <th>説明</th>
</tr>
<tr>
  <td>autohotkey</td>
  <td>.ahk</td>
  <td>ソースコードを安定したバージョン(現在はv2.0)としてハイライトします。<a href="#任意のバージョンとしてハイライト">後述</a>するように<a href="https://www.autohotkey.com/docs/v2/lib/_Requires.htm">#Requires</a>ディレクティブを使うことで任意のバージョンでハイライトできます。</td>
</tr>
<tr>
  <td>autohotkeynext</td>
  <td>.ahknext</td>
  <td>ソースコードを開発中のバージョン(現在はv2.1)としてハイライトします。</td>
</tr>
<tr>
  <td>autohotkey2</td>
  <td>.ahk2</td>
  <td>ソースコードをv2(現在はv2.0)としてハイライトします。</td>
</tr>
<tr>
  <td>autohotkeyl</td>
  <td>.ahkl</td>
  <td>
    ソースコードをv1.1としてハイライトします。<br />
    <br />
    <blockquote><b>
      注意: 利用者には影響しないと思われますが、拡張機能開発時のデバッグ環境下において入力中にハイライトがちらつく問題が確認されています。問題が発生した場合は<a href="https://github.com/zero-plusplus/autohotkey-devtools/issues">Issues</a>にて報告ください。
    </b></blockquote>
    <br />
    <blockquote>
      <b>ヒント:</b> <code>autohotkeyl</code>の最後は<code>L</code>です。<a href="https://www.autohotkey.com/docs/v2/v1-changes.htm">AutoHotkey v1.1がAutoHotkey_Lと呼ばれていた</a>ことが由来です。
    </blockquote>
  </td>
</tr>
</table>

settings.jsonの`files.associations`を設定することで任意の拡張子に言語IDを割り当てることができます。

例えばAutoHotkey v1.1だけを利用している場合は以下のように割り当てるとよいでしょう。

```json
"files.associations": {
  "*.ahk": "autohotkeyl",
},
```

### 任意のバージョンとしてハイライト

言語IDに<code>autohotkey</code>を割り当てたソースコードでは[#Requires](https://www.autohotkey.com/docs/v2/lib/_Requires.htm)ディレクティブを使うことで以降のソースコードを任意のバージョンとしてハイライトさせることができます。今のところ`#Requires AutoHotkey vX.Y`のような簡単な書式のみをサポートしています。

### 特殊な条件によるハイライト

本来は必要に応じてハイライトするセマンティックハイライトを使って実装すべきものですが、技術的な問題によりシンタックスハイライトを使って実装しています。これはソースコード解析器が作成されるまでの一時的な機能です。

#### 定数

`UPPER_SNAKE_CASE`のように大文字のアルファベットと`_`で構成された変数を定数としてハイライトします。実際に定数として機能するわけではありませんのでご注意ください。

将来的に[ドキュメントコメント](#ドキュメントコメント)の`@const`タグを使って制御できるようにします。

#### 正規表現としてハイライト

`"i)^regexp$"`のように正規表現として扱える文字列を正規表現としてハイライトします。具体的には文字列が`)`から始まる、あるいは`im)`のように`)`の前に正規表現オプションが指定された場合です。

将来的に[ドキュメントコメント](#ドキュメントコメント)の`@type`タグなどを使って制御できるようにします。

意図せず正規表現としてハイライトされてしまう場合は<code>\`)</code>のようにエスケープすることで回避することができます。

#### コマンド引数

コマンドおよびディレクティブの引数は以下のようにハイライトされます。

* `Gui, New`における`New`のようなサブコマンドはコマンド名と同じようにハイライトします
* `Gui, GuiName:New`における`GuiName:`のようなGui名はラベルと同じようにハイライトします
* `AutoTrim, On`における`On`のようなキーワードは文字列としてハイライトし、スタイルを太文字に変更します(一部未対応)
* `Hotkey, If, expression`や`WinGetText, output`のように、式あるいは変数を受け付ける引数は式としてハイライトします
* `% expression`はどの引数に対しても式としてハイライトします
* `%variable%`における`variable`は変数としてハイライトします
* 省略しなければならない引数に対して値を指定した場合は、エラー(既定のダークテーマであれば赤色)としてハイライトします
* 上記以外は文字列としてハイライトします

### ドキュメントコメント

> **注意: ドキュメントコメントの仕様は定まっていません。仕様は変更される可能性があります。**

`/**`または`;;`から始まるコメントはドキュメントコメントとしてハイライトされます。

ドキュメントコメント内ではマークダウンとjsdocのブロックタグおよびインラインタグのハイライトがサポートされています。将来的に補完機能等での利用を計画しています。ただし、現段階ではjsdocタグとの互換性は保証されていません。

# 追加の注意事項

この拡張機能は独自性を維持するためにクローズドソースのような非寛容な[ライセンス](https://github.com/zero-plusplus/autohotkey-devtools/blob/main/README.ja.md)が使われています。また、独立性を高めるために利用者からのフィードバックを除いた第三者との協力はしないようにしています。

そのため、独自性及び独立性を維持するために以下の事を禁止しています。

* [vscode-autohotkey-debug](https://github.com/zero-plusplus/vscode-autohotkey-debug)以外との連携を保証していないため、他の拡張機能との連携が可能であるかのように説明しないでください。拡張機能パックに含んだり、外部からこの拡張機能の機能を実行するのも同じ理由でご遠慮ください

* 第三者の拡張機能が非推奨とされる場合において、移行先にこの拡張機能を選ぶのは不適切です。この拡張機能は独立したプロジェクトであり、他の拡張機能との互換性はありません

* その他、独立性および独自性を維持するうえで問題になることは禁止されます
