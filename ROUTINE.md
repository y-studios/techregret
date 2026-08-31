# TechRegret 日次事例追加ルーティン(手順書)

このMac上のlaunchd(`com.techregret.publish`、毎日10:10 JST)が
`scripts/local-publish.sh` 経由でこの手順を実行する。

もともとクラウドルーティン(trig_01WoGBv3FJajrEGRoW3pZECa、毎日09:00 JST)で
動かしていたが、クラウド実行環境のegressポリシーが外部サイトを全ドメイン403で
ブロックしており(zenn.dev・qiita.com・discord.com・en.wikipedia.orgまで全滅)、
手順3の「出典URLの実在確認」が原理的に実行できず、毎日「何も追加せず終了」を
繰り返していた(2026-08-30の実行ログで確認)。捏造を防ぐ安全ルールが正しく働いた
結果なので手順は変えず、実行場所だけこのMacに移した。

なお記事生成にAnthropic APIは一切使わない。ローカルのclaude CLI(サブスク認証)が
自分で書く。ANTHROPIC_API_KEYは使用禁止。

---

あなたはTechRegret(techregret.loous.net)という、実在の企業が公開した技術スタック
移行事例をまとめるサイトの編集者です。このリポジトリの `data/cases.ts` に、
実在・出典確認済みの新しい移行事例を1件追加してください。

## 手順

1. `data/cases.ts` を読み、既存の id・company・sourceUrl の一覧を把握する(重複を避けるため)。
2. WebSearchで、まだ載っていない「実在の企業が技術スタック(ホスティング/フレームワーク/
   DB/認証/ORM/UI/言語/アーキテクチャ)を移行した」事例を1件探す。有名企業の
   エンジニアリングブログ、Zenn/Qiita/dev.to等の技術記事、カンファレンス発表記事などが
   対象。日本企業の事例も歓迎(既存15件は海外企業が多いので、日本企業比率を上げると良い)。
3. 候補が見つかったら、必ずWebFetchでsourceUrlの実在・内容の正確性を確認する。
   創作しない。数値・固有名詞は原文と完全に一致させる。
4. `lib/types.ts` のMigration型に完全準拠する形で、以下のフィールドを持つオブジェクトを
   1件作成する:
   - id (kebab-case、他と重複しないもの)
   - company, from, to, category, reasons, title, summary, narrative
   - challenge/approach/resultSummary(TL;DRカード用、各40-60字)
   - background(背景、300-500字)
   - process(移行のプロセス、300-600字。複数の手順・数値を列挙できる場合は改行2つで
     段落を区切り、箇条書き行を "- " で始める形式にする。一本道の説明なら地の文のままでよい)
   - results(結果、200-400字。同様に箇条書き可)
   - lessons(振り返り・学びが原文にあれば200字程度、無ければ省略)
   - compareMetrics(原文に明記された数値がある場合のみ、無ければ空配列)
   - sourceName, sourceUrl, createdAt(原文の公開日。YYYY-MM-DD、不明ならYYYY-01-01)
5. このオブジェクトを `data/cases.ts` の CASES 配列の**先頭**に追加する
   (新しい事例が一覧の先頭に出るようにするため)。
6. `public/logos/{id}.png` に企業のfaviconを保存する。取得コマンド例:
   `curl -sL "https://www.google.com/s2/favicons?domain=会社のドメイン&sz=128" -o public/logos/{id}.png`
   ファイルがPNG/JPEGとして有効か `file` コマンドで確認すること
   (HTMLエラーページが保存されていないか要確認)。
7. `npm ci && npm run build` を実行し、TypeScriptエラー・ビルドエラーが無いことを
   確認する。エラーが出たら修正する。
8. コミットまで行う(`git add -A && git commit -m "事例追加: {company} {from}→{to}"`)。
   **pushは `scripts/local-publish.sh` が行うので不要。**
   pushされるとGitHub Actionsが自動でCloudflare Pagesにデプロイする。

## 重要な制約

- 事実の創作は絶対禁止。sourceUrlは自分でWebFetchして実在確認すること。
- 満足度スコアやいいね数のような主観的な数値は追加しない(upvotesフィールドは0のまま、または省略)。
- 既存のCASES配列のエントリは一切変更・削除しないこと(先頭に1件追加するのみ)。
- 万が一、確実に実在・検証可能な新規事例が1件も見つからなかった場合は、無理に追加せず
  何もせずに終了してよい(架空の事例を追加するくらいなら何もしない方が良い)。
- Anthropic API(ANTHROPIC_API_KEY)は絶対に使わない。あなた自身が書く。
- このルーティンは毎日実行されるので、1回の実行で追加するのは1件のみ。
- 自動実行なので、人間向けの詳しい報告は不要。
