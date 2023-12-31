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

## バリデーション
**きちんとしたデータかどうかの入力チェック**<br>
- 保存形式に沿っている入力か
- 不正な値を入力させず正しい値を入力させる
- データベース管理セキュリティ強化
- 値をチェックする機能
- 正常ならば保存、問題ならばエラー表示で再入力を促す

**Express Validator**<br>
- Express用をインストール：npm install express-validator
- 新しいデータを作成するファイルadd.ejsの設定：add.ejsでinput valueの値を変更（例：value="<%= form.name %>"）
- プログラムの修正：hello.js

**サニタイズ処理（HTMLタグデータの無効化）**<br>
- ValidationChainの後に記述(hello.jsのpostメソッド)：.escape()
- HTMLでの不正な画面表示など（例：imgタグで意図しない画像の埋め込み、JSのscriptタグで意図しない動的指示など）を防ぐ
- 不正なアクセスや読み書きを防ぐ
- タグを入力されてもエスケープコード変換という形で表示や動的指示など上書き変更されないよう品質を保つ
- 明示的命名やコメントは避けたり、モジュールや関数で実装する方法が一般的

**カスタムバリデーション**<br>
- 年齢入力フォーマットで年齢範囲を指定することも可能

## Sequelizeを使用
**データベースをORMで楽に管理するパッケージ Sequelizeをインストール**<br>
- npm install sequelize <br>
    7 packages are looking for funding<br>
    run `npm fund` for details<br>
    資金提供を呼びかけているので`npm fund`からそのサイトをチェックしてねという表示<br>
    To address all issues (including breaking changes), run:<br>
    npm audit fix --force<br>
    Run `npm audit` for details.<br>
    脆弱性があるのでnpm audit fix --forceで解消してね、詳細は`npm audit`をチェックしてねという表示
- npm audit fix --forceだけ対応してfound 0 vulnerabilitiesが脆弱性０になればOK
- package.jsonをチェック
- npm startで起動に異常がないかチェックしておく

**Sequelzieコマンドプログラムパッケージ(便利にSequelizeを使うための)　Sequelize CLIをインストール**<br>
- npm install sequelize-cli<br>
- package.jsonをチェック、npm startで起動に異常がないかチェック
- インストールに異常がなければ初期化する：npx sequelize-cli init<br>
    Sequelize CLI [Node: 18.16.1, CLI: 6.6.2, ORM: 6.35.1]<br>
    Created "config/config.json"<br>
    Successfully created models folder at "/Users/lumi/Desktop/ex-gen-app/models".<br>
    Successfully created migrations folder at "/Users/lumi/Desktop/ex-gen-app/migrations".<br>
    Successfully created seeders folder at "/Users/lumi/Desktop/ex-gen-app/seeders".<br>
    初期化成功：バージョン情報、ファイル設定生成など完了している
- **configフォルダ**：設定情報の管理。config.jsonという設定ファイルが生成される。
    - ３つの設定（development:開発中の設定、test:テスト用の設定、production:正式リリースの設定）をチェック
    - デフォルトのdatabase, dialect, storageを利用してSQLite3用に設定する（MySQL, PostgressSQLの場合はまた違う項目が必要）
    - database:database_...の部分をデータベース名に修正
    - storage:はないので、storage:データベースファイルを追加
    - dialect:sqliteに修正
- **migrationsフォルダ**：マイグレーションというデータベース変更情報などを管理するファイルを扱う。
- **modelsフォルダ**：データベースアクセスに使用する「モデル」というオブジェクトを定義するところ。デフォルトで直下にindex.jsが生成される。
- **seedersフォルダ**：シーダーという初期データを扱うためのもの。

## Sequelize CLI　で簡単にテーブルにアクセスするための「モデル」を作成
- データベースのレコードをモデルのオブジェクトとして扱える
- Userというモデル（name:名前、pass:パスワード、mail:メール、age:年齢）
- Sequelize CLIを使うと簡単に作成できる
- VSCodeのターミナルで入力する<br>
    - npx sequelize-cli model:generate --name User --attributes name:string,pass:string,mail:string,age:integer
    - npx sequelize-cli model:generate --name (モデル名) --attributes （属性情報　属性:属性タイプ,属性:属性タイプ... ）
- 入力後に表示される（生成したファイル名と位置するフォルダ名のパス）<br>
    Sequelize CLI [Node: 18.16.1, CLI: 6.6.2, ORM: 6.35.1]<br>
    New model was created at /Users/lumi/Desktop/ex-gen-app/models/user.js .<br>
    New migration was created at /Users/lumi/Desktop/ex-gen-app/migrations/20231204060605-create-user.js .<br>
- ディレクトリを確認<br>
    - modelsフォルダの中にuser.jsファイルが生成されている
    - migrationsフォルダの中に20231204060605-create-user.jsが生成されている
## Userモデルについて（user.jsをチェック）
- デフォルトで書かれているものを利用、またはカスタムもOK
- モデルは外部から利用するのでmodule.exportsとreturnしておく
- Userというオブジェクトを作成
- Userのassociateという値を設定
- Userをreturnする

## マイグレーションの実行(作成したモデル情報を元にデータベースを更新してくれる)
- VSCodeのターミナルで入力する<br>
    - npx sequelize-cli db:migrate --env development<br>
- 入力後に表示される<br>
    Sequelize CLI [Node: 18.16.1, CLI: 6.6.2, ORM: 6.35.1]<br>
    Loaded configuration file "config/config.json".<br>
    Using environment "development".<br>
    == 20231204060605-create-user: migrating =======<br>
    == 20231204060605-create-user: migrated (0.011s)<br>
- ディレクトリを確認<br>
    - db-dev.sqlite3ファイルが生成（マイグレーションによって生成されたデータベースファイル）
    - config.jsonで作成しているdevelopmentを命令しているので<br>
        storegeとしてdb-dev.sqlite3ができたという事<br>
        (リリースの際にはnpx sequelize-cli db:migrate --env developmentの部分を、npx sequelize-cli db:migrate --env productとする？)

## 生成されたdb-dev.sqlite3ファイルを確認
- 確認方法（VSCodeでは開けないエラー：このファイルはバイナリか、サポートされていないテキスト エンコードを使用しているため、テキスト エディターに表示されません。）
- DB Browserで開くと確認が可能（データベースのあるローカルPCでアプリから確認）
    - DB Browser for SQLiteアプリを開きGUIタブのOpenDataBaseクリック
    - 開発中のディレクトリから（Finder GUIより）db-dev.sqlite3をOpenクリック
    - 中身がDB Browser for SQLiteアプリ内に表示される
    - わかりにくい時はプリントをクリックするとリストで確認できる

## 20231204060605-create-user.jsを確認
- テーブルとカラムの情報の処理がなされている

## シーディング（モデルとデータベース側のテーブルを利用するため「最初に用意するレコード（シード）」を作成すること）の作成と、作成後の実行コマンド
- シーディングのスクリプトファイルの作成（sample-userという名で作成）
- VSCodeターミナルで入力：npx sequelize-cli seed:generate --name sample-user
    - 表示される<br>
        Sequelize CLI [Node: 18.16.1, CLI: 6.6.2, ORM: 6.35.1]<br>
        seeders folder at "/Users/lumi/Desktop/ex-gen-app/seeders" already exists.
        New seed was created at /Users/lumi/Desktop/ex-gen-app/seeders/20231204070259-sample-user.js .
- seedersフォルダに20231204070259-sample-user.jsファイルが生成されるので確認
    - down関数にシードを作成する際の処理を記述
    - downに元に戻す際の処理を記述
- シーディングファイルを記述後、実行が必要:npx sequelize-cli db:seed:all
    - 表示される<br>
    Sequelize CLI [Node: 18.16.1, CLI: 6.6.2, ORM: 6.35.1]<br>
    Loaded configuration file "config/config.json".<br>
    Using environment "development".<br>
    == 20231204070259-sample-user: migrating =======<br>
    == 20231204070259-sample-user: migrated (0.008s)<br>

## シーディング後のデータベース内テーブルへのアクセス（例：Usersテーブル）
- 例：Usersテーブルのレコードを全て取得しrouteres/users.jsに一覧表示するコードを実装
- テンプレートを用意(views/users/index.ejs)を作成

## p327図6-13表示されずバグ発生、p302−327のファイルやデータベースを再確認
- p307:list6-1:config.json確認（1205Done）
- p308:list6-2:config.json上書き（1205Done）
- p312:list6-3:models/user.js（1205Done）
- p317:list6-4:migrations/2023....create-user.js（1205Done）
- p320:list6-5:seeders/2023...sample-user.js確認（1205Done）
- p321:list6-6:seeders/2023...sample-user.js上書き（1205Doneモデルは成功、シーディングができていないかもしれないので、以下のコードをチェックしてから再シーディングを検討する）
- p324:list6-7:routes/users.js(1205Done)
- p326:list6-8:views/users/index.ejs(1205Done)
- p327:図6-13の表示をチェックhttp://localhost:3000/users
- 予想：モデルの作成は完了、データの中身がないため、シーディングができてないかと。undoしてdoする作業npx sequelize-cli db:seed:undo:allとnpx sequelize-cli db:seed:allを実行してみる
- バグ原因と対応（1205バグ修正完了）
    - app.jsのルーティング設定で/が抜けていたので追記（/users）
    - シーディングエラーでデータ中身が紛失していたため再シーディングを実行（undoとdo）

## クエリパラメーターでIDを表示したり検索する
- 特定の値：const id = req.query.idの値をwhereに指定してfindAllから検索
- id以下の値：const { Op }〜やid:{[Op.lte:id]}をwhereに指定してfindAllから検索（Operator less than-equal (<=のような比較演算子を使用)）
- nameなど一部を含む値：name：{[Op.like]:'%'+nm+'%'}<br>
http://localhost:3000/users?name=ko
- 複数条件and検索：age: {[Op.gte]:min, [Op.lte]:max}<br>
http://localhost:3000/users?min10&max=30

## ER図のDBeaverを導入

## エラー回避のコード修正
**list6-13(p337)技術書（undefinedエラー）**
db.User.findAll({
    where: {
      [Op.or]:[
        {name:{[Op.like]:'%'+nm+'%'}},
        {mail:{[Op.like]:'%'+ml+'%'}}
      ]
    }
  }).then(usrs => {
    var data = {
      title: 'Users/Index',
      content: usrs
    }
    res.render('users/index', data);
  });
});
を変更
**nameやmailがundefinedでないことを確認する処理を追加**
const whereClause = {};
  if (nm !== undefined) {
    whereClause.name = { [Op.like]: '%' + nm + '%' };
  }
  if (ml !== undefined) {
    whereClause.mail = { [Op.like]: '%' + ml + '%' };
  }

  db.User.findAll({
    where: whereClause
  }).then(usrs => {
    const data = {
      title: 'Users/Index',
      content: usrs
    };
    res.render('users/index', data);
  });
});

## CRUDバリデーション問題を解決するためのSequelizeバリデーション
- users/addで空情報を保存しないための特定条件の設定
- バリデーション機能を高めるにはExpress validatorではなく
- Sequelize独自バリデーションを使用し特定条件を設定すること
- エラーメッセージの表示設定（日本語設定可能）

## Sequelizeバリデーション設定
- is:パターン（正規表現パターンに合致する）
- not:パターン（正規表現パターンに合致しない）
- isEmail: true（メールアドレス形式）
- isUrl: true（URLの形式）
- isIP: true（IPアドレス形式）※IPv4,IPv6同様
- isAlpha: true（アルファベットのみ）
- isAlphanumeric: true（アルファベット＋数字のみ）
- isNumeric: true（数字のみ）
- isInt: true（整数値）
- isFloat: true（実数値）
- isDecimal: true（数値全般）
- isLowercase: true（小文字のみ）
- isUppercase: true（大文字のみ）
- notNull: true（nullでない）
- isNull: true（nullである）
- notEmpty:true（空でない（必須項目））
- equals: 値（指定の値に等しい）
- contains: 値（指定の値を含む）
- notContains: 値（指定の値を含まない）
- notIn: 配列（配列に含まれていない）
- isIn: 配列（配列に含まれている）
- len: [最小、最大]（指定範囲の長さ）
- isUUID: 整数（UUID値のみを許可）
- isDate:　true（日時の値）
- isAfter: 日時（指定日時を含まない〜）
- isBefore: 日時（指定日時を含まない〜）
- max: 値（最大値）
- min: 値（最小値）
- isCreditCard:true（クレジットカード形式）

## Sequelizeについて
- modelsを作成し、viewsで呼び出して表示
- モデルを取得する処理：findAll（whereなど）, findByPk（ID指定）を使用

## 修正前コミット1226










 


