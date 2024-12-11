#!/bin/bash

# 현재 버전 가져오기
current_version=$(node -p "require('./package.json').version")
echo "Current version: $current_version"

# 새 버전 입력받기
read -p "Enter new version (current is $current_version): " new_version

# package.json 버전 업데이트
npm version $new_version --no-git-tag-version

# Git 커밋 및 태그 생성
git add package.json
git commit -m "Bump version to $new_version"
git tag "v$new_version"

# GitHub에 푸시
git push && git push --tags

echo "Release process initiated for version $new_version"
echo "GitHub Actions will automatically build and create a release"
