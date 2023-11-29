## Express generator、npm install
## npm startで起動、http://localhost:3000
    (ターミナル：起動時表示
        > ex-gen-app@0.0.0 start
        > node ./bin/www)
## github  https://github.com/lumijoe/ex-gen-app

## link href　のpublicフォルダのpublicは省略可能 /public/stylesheets... = /stylesheets...

## 流れ
    node.js実行→www（起動プログラム）→app.js(mainプログラム)→/index, /users, /hello
    →routesフォルダ（内のスクリプトindex.js,uses.js, hello.js）

## warnスルーOK
    ターミナル表示：body-parser deprecated undefined extended: provide extended option app.js:26:17
    body-parserが直接使用されていない場合express.urlencoded()の実際の実装がbody-parserに依存しているため表示される。
    Express 4.16.0以降では、body-parserがデフォルトで組み込まれていて警告表示となるがスルーOK

## app.jsの設定
    // 1:要モジュールのロード
    var createError = require('http-errors');        // error（エラー対処）
    var express = require('express');                // express（本体）
    var path = require('path');                      // path（ファイルパスを扱う）
    var cookieParser = require('cookie-parser');     // cookie-parser（値変換処理系）
    var logger = require('morgan');                  // logger morgan（reqログ出力系）

    // 2:ルート用モジュールのロード
    var indexRouter = require('./routes/index');
    var usersRouter = require('./routes/users');

    // 3:Expressオブジェクトの作成と基本設定
    var app = express();

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    // Middleware setup
    app.use(logger('dev'));                                  // logger dev
    app.use(express.json());                                 // express.json
    app.use(express.urlencoded({ extend: false }));          // express.urlencoded
    app.use(cookieParser());                                 // cookieParser
    app.use(express.static(path.join(__dirname, 'public'))); // express.static path.json

    // 4:app.useによる関数の組み込み
    // Serve routes using routers
    app.use('/', indexRouter);
    app.use('users', usersRouter);

    // 5:アクセスするルートとエラー用のapp.use作成
    // Catch 404 and forward to error handler
    app.use(function(req, res, next) {
    next(createError(404));
    });

    // Error handler
    app.use(function(err, req, res, next) {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Render the error page
    res.status(err.status || 500);
    res.render('error');
    });

    // 6:module.expressの設定
    module.express = app;

## フォーム送信（Body Parserパッケージ）
    最近のExpressではデフォルトで設定されている（レガシーではinstallが必要かも）
    node_modules/express/lib/express.jsをチェックする
        /**
        * Expose middleware
        */
        exports.json = bodyParser.json
        exports.query = require('./middleware/query');
        exports.static = require('serve-static');
        exports.urlencoded = bodyParser.urlencoded　があればOK

## クッキーより高機能なセッションのinstall(デフォルトで設定なし)
    npm install express-session、　起動確認（app.jsにrequireする）

## 外部サイトにアクセスしてデータを取り出すxml2jsモジュールのインストール
    npm install xml2js、routes/hello.jsでrequire
    https://news.google.com/rss?hl=ja&gl=JP&ceid=JP:ja（googleニュース）
    サーバー負荷をかけないために、アクセス頻度の間隔設定や、応急処置としてリンク先のコメントアウトで対応

## sqlite3をマックにインストールしてからデータベースを作成（GUIインストールをプロジェクト内で実行）、コードで使用できるようにターミナルでnpm install sqlite3 で使用できるように設定
    データを編集したいときは、アプリケーション内のデータベースにアクセスし、プロジェクト内のファイルを選択して編集する

## branch 278find　のテスト
    OK→fetch,merge済みにより、branch削除済み

## CRUD操作
    Create：新規保存（新しいレコードを作成して保存）
    Read：読み込み（レコードをデータベースから取り出し）
    Update：更新（レコードの内容フィールドの書き換え）
    Delete：削除（レコードの削除）

##

    