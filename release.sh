#!/bin/bash

# 현재 버전 가져오기
current_version=$(node -p "require('./package.json').version")
echo "Current version: $current_version"

# 새 버전 입력받기
read -p "Enter new version (current is $current_version): " new_version

# package.json 버전 업데이트
npm version $new_version --no-git-tag-version --force

# 모든 변경사항 커밋
git add .
git commit -m "Release version $new_version" --allow-empty

# 태그 생성 및 푸시
git tag -f "v$new_version"
git push -f origin master
git push -f origin "v$new_version"

echo "Release process initiated for version $new_version"
echo "GitHub Actions will automatically build and create a release"
echo "Check the progress at: https://github.com/Kevin-Studio-Dev/SpearfishForest4-HeliosLauncher/actions"
