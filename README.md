# Hanteo Chart

한터 글로벌 과제 프로젝트

---

## 주요 기능

### 카테고리 이동

- [x] 좌 <-> 우 슬라이드를 통해 카테고리간 이동을 할 수 있습니다.

### 카테고리 콘텐츠 리스트

- [x] 콘텐츠의 리스트는 무한 스크롤 형태로 구현되어 있습니다.

### 슬라이드 배너

- [x] 배너는 무한 루프로 동작합니다.
- [x] 좌 <-> 우 슬라이드를 통해 배너간 이동을 할 수 있습니다.

## 과제 진행시 주안점

### lazy loading으로 퍼포먼스 최적화

- **카테고리별 콘텐츠**는 **해당 카테고리를 실제로 선택(슬라이드 진입)했을 때**만 서버에 요청합니다.
- `InView` 컴포넌트를 구현하여 lazy loading을 선언적으로 사용했습니다.

<img width="500" src="https://github.com/user-attachments/assets/b432deb6-4144-4c1f-ade9-cbf4b374eae2">

#### 장점

- 초기 로딩 시간 단축
- 불필요한 네트워크 요청 감소
- 메모리 사용량 최적화
- 선언적 프로그래밍을 통한 코드 가독성 향상

### 차트 초기 데이터 서버 사이드 fetching

- 카테고리의 콘텐츠의 초기 데이터(20개)를 서버 사이드에서 미리 가져와 성능을 최적화했습니다.
- 나머지 콘텐츠는 lazy loading으로 클라이언트에서 필요할 때 가져옵니다.
- React Query의 `initialData` 옵션을 활용하여 서버에서 가져온 데이터를 클라이언트에 hydration합니다.
- `InitialMusicData` 클래스를 통해 초기 데이터 관리 로직을 캡슐화했습니다.

#### 장점

- 초기 로딩 시간 단축
- 첫 화면에서의 사용자 경험 향상

---

## 기술 스택

- **Frontend**: Next.js, React, TypeScript
- **State Management**: React Context API
- **Data Fetching**: react-query
- **Styling**: Tailwind CSS, shadcn/ui
- **Package Manager**: pnpm

---

## 프로젝트 구조

```
src
 ┣ app
 ┃ ┣ favicon.ico
 ┃ ┣ globals.css
 ┃ ┣ layout.tsx
 ┃ ┗ page.tsx
 ┣ components
 ┃ ┣ banner
 ┃ ┃ ┗ banner-carousel.tsx
 ┃ ┣ category
 ┃ ┃ ┗ category-carousel.tsx
 ┃ ┣ common
 ┃ ┃ ┣ blur-fade.tsx
 ┃ ┃ ┗ in-view.tsx
 ┃ ┣ layout
 ┃ ┃ ┣ footer.tsx
 ┃ ┃ ┗ navigation.tsx
 ┃ ┗ ui
 ┃ ┃ ┣ button.tsx
 ┃ ┃ ┣ carousel.tsx
 ┃ ┃ ┣ scroll-area.tsx
 ┃ ┃ ┗ skeleton.tsx
 ┣ constants
 ┃ ┣ categories.ts
 ┃ ┗ footer.ts
 ┣ contexts
 ┃ ┣ category-context.tsx
 ┃ ┗ providers.tsx
 ┣ features
 ┃ ┗ music
 ┃ ┃ ┣ components
 ┃ ┃ ┃ ┣ list-skeleton.tsx
 ┃ ┃ ┃ ┣ music-list-item.tsx
 ┃ ┃ ┃ ┗ music-list.tsx
 ┃ ┃ ┣ domain
 ┃ ┃ ┃ ┗ initial-music-data.ts
 ┃ ┃ ┣ hooks
 ┃ ┃ ┃ ┗ use-music-chart.ts
 ┃ ┃ ┣ lib
 ┃ ┃ ┃ ┗ api.ts
 ┃ ┃ ┗ types
 ┃ ┃ ┃ ┗ music.ts
 ┣ hooks
 ┃ ┗ useInView.ts
 ┣ lib
 ┃ ┣ query-utils.ts
 ┃ ┗ utils.ts
 ┗ types
 ┃ ┗ category.ts
```

---

## 설치 및 실행

1. 필요한 의존성을 설치합니다.

   ```
   pnpm install
   ```

2. 애플리케이션을 실행합니다.

   ```
   pnpm dev
   ```
