# Playce-UI

- Playce 제품 Frontend 개발에서 공통적으로 사용할 수 있는 디자인 시스템

## 디자인 시스템 설치

- NEXUS 반영 전

```
// package.json 에 추가 후 yarn install
"playce-ui": "ssh://git@github.com:OpenSourceConsulting/playce-ui.git#dev",
```

## script

- Storybook 실행

```
npm run storybook
```

- 컴포넌트 작업 후 빌드 (build 스크립트가 아닌 yarn install 스크립트를 활용)

```
yarn install
```

- dist 폴더 삭제 후 생성

```
npm run prepare
```
