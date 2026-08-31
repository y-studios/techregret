#!/bin/bash
# このMac上でlaunchdから毎日実行するラッパー。
# クラウドルーティン(trig_01WoGBv3FJajrEGRoW3pZECa)がegress allowlistで
# 外部サイトを全ドメイン403ブロックされ、出典の実在確認ができず毎日
# 「何も追加せず終了」していたため、ローカル実行に切り替えた。
# (stackcost / digitalasset-partners-seo / internet-media-seo と同型)
#
# 記事生成にAnthropic APIは使わない。同梱のclaude CLI(サブスク認証)が自分で書く。
set -euo pipefail

# VSCode拡張は自動更新でバージョンが変わるため、パスは固定せず動的に解決する。
CLAUDE_BIN="$(ls -d "$HOME"/.vscode/extensions/anthropic.claude-code-*-darwin-x64/resources/native-binary/claude | sort -V | tail -n1)"
cd "$(dirname "$0")/.."

git pull --quiet origin main

"$CLAUDE_BIN" -p "リポジトリ直下の ROUTINE.md を読んで、そこに書かれている手順に厳密に従い、TechRegret(techregret.loous.net)の data/cases.ts に実在・出典確認済みの移行事例を1件だけ追加してください。出典はWebFetchで必ず実在確認し、確認できない場合は何も追加せずに終了してください。ANTHROPIC_API_KEY等のAnthropic APIと、Ahrefs(MCPツール含む)は絶対に使わず、あなた自身の推論で書いてください。コミットまで行えばよく、pushはこのスクリプトが行います。自動実行なので人間向けの詳しい報告は不要です。" \
  --dangerously-skip-permissions

if [ -n "$(git status --porcelain)" ]; then
  git add -A
  git commit -q -m "chore: TechRegret日次事例追加(ローカル実行)" || true
fi

git push --quiet origin main
