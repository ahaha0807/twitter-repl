# 実行の流れ

1. [プロジェクト作成](https://github.com/ahaha0807/twitter-repl/blob/master/USAGE.md#%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E4%BD%9C%E6%88%90%E6%96%B0%E8%A6%8F%E3%82%B3%E3%83%BC%E3%83%87%E3%82%A3%E3%83%B3%E3%82%B0%E9%96%8B%E5%A7%8B) :CREATE
2. [コードの追記（任意）](https://github.com/ahaha0807/twitter-repl/blob/master/USAGE.md#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%BF%BD%E8%A8%98%E6%96%B0%E8%A6%8F%E4%BD%9C%E6%88%90%E3%81%97%E3%81%9F%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%81%AB%E5%AF%BE%E3%81%97%E3%81%A6%E3%82%B3%E3%83%BC%E3%83%89%E3%82%92%E8%BF%BD%E8%A8%98%E3%81%99%E3%82%8B) :POST
3. [保存](https://github.com/ahaha0807/twitter-repl/blob/master/USAGE.md#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E4%BF%9D%E5%AD%98) :SAVE
4. [実行](https://github.com/ahaha0807/twitter-repl/blob/master/USAGE.md#%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E5%AE%9F%E8%A1%8C) :RUN

## 一連のやりとり
![](https://user-images.githubusercontent.com/16623885/36268006-bd822e50-12b8-11e8-823f-0e8f9c6898c8.png)

# 使い方

## プロジェクト作成（新規コーディング開始）

### 基本構文

```
@Tweet_REPL :CREATE [言語名（半角小文字）] [コード]
```

#### 注意点

- **必ずすべての要素を半角スペースで区切る！**
- 言語名の後は改行をし、下にコードを書くことは可能だが、半角スペースを忘れると「指定の言語は対応していません」エラーが表示されるので注意！
- 

### サンプル

```
@Tweet_REPL :CREATE javascript ←ここに半角スペースを忘れないで！
let sample = 100;
console.log(sample);
```

```
@Tweet_REPL :CREATE python ←ここに半角スペースを忘れないで！
sample = 100
print(sample + 10)
```

## コードの追記（新規作成したプロジェクトに対してコードを追記する）

### 基本構文

```
@Tweet_REPL :POST [コード]
```

#### 注意点

- **必ずすべての要素を半角スペースで区切る！**
- 言語名の後は改行をし、下にコードを書くことは可能だが、半角スペースを忘れると実行時に変なエラーが表示されたりするので注意！

### サンプル

```
@Tweet_REPL :POST ←ここに半角スペースを忘れないで！
sample += 100
console.log(sample); // 最初のlet sample の中身が引き継がれるので、200になる
```

## コードの保存

### 基本構文

```
@Tweet_REPL :SAVE (同じツイートになって送信できない場合は半角スペース後に好きな文字列を付けれます)
```

#### 注意点

- 保存を実行すると追記（:POST）はできなくなります
- プロジェクト作成（:CREATE）で新しくコードを書き始めるようにしてください。

### サンプル

```
@Tweet_REPL :SAVE hogehogeho----
```

## コードの実行

### 基本構文

```
@Tweet_REPL :RUN (同じツイートになって送信できない場合は半角スペース後に好きな文字列を付けれます)
```

### サンプル

```
@Tweet_REPL :RUN hogehogeho----
```

# 対応言語リスト

- c
- cpp
- objective-c
- java
- kotlin
- scala
- swift
- csharp
- go
- haskell
- erlang
- perl
- python
- python3
- ruby
- php
- bash
- r
- javascript
- coffeescript
- vb
- cobol
- fsharp
- d
- clojure
- elixir
- rust
- scheme
