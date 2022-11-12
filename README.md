# deeWork

<img src="https://img.shields.io/badge/-SCSS-CC6699?style=flat&logo=sass&logoColor=white"> <img src="https://img.shields.io/badge/-react-61DAFB?style=flat&logo=react&logoColor=white"> <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat&logo=Typescript&logoColor=white"> <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=Firebase&logoColor=white">

<br>

## 1. Outline

deeWork는 달력에 일정을 추가하여 스케쥴을 관리할 수 있는 서비스이다. 파이어베이스를 이용하여 데이터 통신을 하고 있으며 현재 typescript를 적용하며 리뉴얼하고 있다. 구현된 기능은 아래와 같다.
<br>

- 로그인/회원가입
- schedule관리할 수 있는 달력


<br>

## 2. Folder Structure

```
deeWork/
├── public/
├── src/
|    ├── assets/
|    ├── components/
|    ├── pages/
|    ├── types/
|    ├── App.tsx
|    ├── Constant.ts
|    ├── firebase.ts
|    ├── index.tsx
|    └── router.tsx
├── ts.confing.json
└── package.json
```
- assets : 이미지와 scss같은 정적인 파일을 담은 폴더
- components : 작은 단위의 컴포넌트를 담은 폴더
- pages : 화면을 구성하는 컴포넌트를 담은 폴더
- types : 글로벌로 선언되어야 하는 타입들을 담은 폴더

<br>

## 3. Issue & Slove

1. typescript 적용에 따른 타입 오류
    - 원인 : 비동기 호출하는 함수 부분에서 return값의 타입에 대한 오류가 발생했다. 
    - 해결 : async & await 문의 return 값은 Promise\<T\>의 형태로 지정되어야 한다.

2. Unexpected any. Specify a different type.eslint@typescript-eslint/no-explicit-any 오류 : 타입 any의 노란색 물결
    - 원인 : eslint가 명시적으로 선언되는 any를 방지하기 위하여 뜨는 경고이다.
    - 해결 : eslintrc.js에 "@typescript-eslint/no-explicit-any": "off" 추가
