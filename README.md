# doWork

<img src="https://img.shields.io/badge/-SCSS-CC6699?style=flat&logo=sass&logoColor=white"> <img src="https://img.shields.io/badge/-react-61DAFB?style=flat&logo=react&logoColor=white"> <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat&logo=Typescript&logoColor=white"> <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=Firebase&logoColor=white"> <br>
<a href="https://do-work.vercel.app/" target="_blank">https://do-work.vercel.app/</a>
<br>

## 1. Outline

doWork는 협업을 위해 스케쥴을 관리할 수 있는 서비스이다. 파이어베이스를 이용하여 데이터 바인딩하고 있다. 현재 typescript를 적용하며 기술적으로나 UI 측면으로 리뉴얼하고 있다. 브레인 스토밍을 통해 work에 대한 생각을 정리하였고 기획에 맞게 기능들을 구현해나갈 것이다.

<br>

### 기획
- 브레인 스토밍

![doWorkBrain](https://user-images.githubusercontent.com/92196967/202966960-321eff7a-012d-443c-9e1a-e53c7881b850.png)

- Process Flow

![doWorkFlow](https://user-images.githubusercontent.com/92196967/202952939-79eb0769-8bba-4759-9071-19644c2cbf3d.png)

- 디자인 : [doWork Figma](https://www.figma.com/file/sMXTsGVLePYJwoEsA1e26n/doWork?node-id=0%3A1&t=GqktNgDIHzG0dZMa-0)

<br>


### 주요 기능
현재 아래 기능들이 구현되어 있습니다.
- [로그인](./src/pages/Login.tsx)
- [회원가입](./src/pages/SignUp.tsx)
- [메인](./src/pages/Main.tsx)
    - 스케쥴 검색
    - 스케쥴 타임라인
    - status 필터
    - 캘린더
- [스케쥴 추가 모달](./src/feature/NewScheduleModal.tsx)
    - datepicker
    - 사용자 검색
- [스케쥴 조회/삭제 모달](./src/feature/ScheduleDetailModal.tsx)
- [마이페이지](./src/pages/MyPage.tsx)
    - 로그아웃
<br>

## 2. Folder Structure

```
📁 deeWork/
├── 📁 public/
├── 📁 src/
|    ├── 📁 assets/
|    ├── 📁 components/
|    ├── 📁 pages/
|    ├── 📁 types/
|    ├── 📜 App.tsx
|    ├── 📜 Constant.ts
|    ├── 📜 firebase.ts
|    ├── 📜 index.tsx
|    └── 📜 router.tsx
├── ⚙️ ts.confing.json
└── 📦 package.json
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
    ```javascript
    const request = async (url: string, options : Options): Promise<any> => {
      try {
        const response = await fetch(url, options);
        const json = await response.json();

        if(response.ok){
            return response.json();
        }
        
        throw new Error('에러입니다.')
      } catch (e) {
        console.log(e);
      }
    };
    ```

2. Unexpected any. Specify a different type.eslint@typescript-eslint/no-explicit-any 오류 : 타입 any의 노란색 물결
    - 원인 : eslint가 명시적으로 선언되는 any를 방지하기 위하여 뜨는 경고이다.
    - 해결 : eslintrc.js에 "@typescript-eslint/no-explicit-any": "off" 추가
    
3. 인터페이스 타입 설정에 따른 문제점
    - 원인 : 안에 같은 내용을 담은 인터페이스를 각 컴포넌트에서 생성하여 사용할 경우 서로 다른 인터페이스로 인식
    - 해결 : 인터페이스를 정의하는 파일을 만들어 export하여 사용
    
4. 캘린더 타임라인 화면 표시될 시 겹치지 않아도 위치가 0에서부터 시작하지 않는 문제.
    - 원인 : top의 값을 index에 따라 주었기 때문.
    - 해결 : 현재 해결 중입니다.

<br>

## 회고
회고록을 보시려면 [여기](https://velog.io/@dee0518/Memoir-%ED%95%A8%EA%BB%98-%EC%9D%BC%ED%95%B4%EC%9A%94-doWork-t8otrvg1)를 클릭해주세요:)
