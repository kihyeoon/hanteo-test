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
- React Query의 `HydrationBoundary`를 활용하여 서버에서 가져온 데이터를 클라이언트에 hydration합니다.
- `InitialMusicData` 클래스를 통해 초기 데이터 관리 로직을 캡슐화했습니다.

#### 장점

- 초기 로딩 시간 단축
- 첫 화면에서의 사용자 경험 향상

---

## 보완 사항

### 서버사이드 프리페칭 로직 최적화

#### Problem

- **Props Drilling**: 기존 `initialData` 방식은 서버에서 가져온 데이터를 컴포넌트 트리를 통해 전달해야 했습니다.

  - 깊은 컴포넌트 트리에서 데이터를 사용하려면 모든 중간 컴포넌트를 거쳐서 props를 전달해야 합니다. 이는 불필요한 리렌더링을 유발할 수 있습니다.
  - 동일한 데이터를 여러 컴포넌트에서 사용할 때 중복 전달이 필요했습니다.

#### Solution

```tsx
// src/app/page.tsx
export default async function Home() {
  // 서버 컴포넌트에서 QueryClient 인스턴스 생성 (React의 cache 함수로 래핑됨)
  const queryClient = getQueryClient();

  // 초기 카테고리 이름 가져오기
  const initialCategoryName = InitialMusicData.getInitialCategoryName(categories);

  // 서버에서 초기 데이터 미리 가져오기
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["chartList", initialCategoryName],
    queryFn: ({ pageParam = 0 }) => getChartList(initialCategoryName, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage: MusicChartResponse) => lastPage.nextCursor,
  });

  // 서버 상태를 dehydrate하여 직렬화된 데이터를 클라이언트에 전달
  const dehydratedState = dehydrate(queryClient);

  return (
    // HydrationBoundary를 통해 서버 상태를 클라이언트에 복원
    <ReactQueryHydration state={dehydratedState}>
      <Navigation categories={categories} />
      <main className="mx-auto size-full min-h-0 flex-1 bg-gray-100">
        <BannerCarousel />
        <CategoryCarousel categories={categories} />
      </main>
    </ReactQueryHydration>
  );
}
```

- **Hydrate API 도입**:

  - React Query의 공식 문서에서 권장하는 하이드레이션 API(`dehydrate`/`HydrationBoundary`)를 사용하도록 변경했습니다.
  - 서버에서 `prefetchInfiniteQuery`로 데이터를 미리 가져오고 `dehydrate`로 직렬화합니다.
  - 클라이언트에서는 `HydrationBoundary`를 통해 서버 상태를 복원합니다.

- **QueryClient 최적화**:
  - 서버 컴포넌트에서 React의 `cache` 함수를 사용하여 불필요한 `QueryClient` 인스턴스 중복 생성을 방지했습니다.
  - 적절한 캐시 설정을 추가해서 클라이언트에서 컴포넌트가 마운트될 때 발생하는 불필요한 리페칭을 방지했습니다.
    - `staleTime`: 60 \* 1000 (1분)

#### Effect

- **불필요한 리렌더링 최적화**:

  - Props Drilling 제거로 중간 컴포넌트들의 불필요한 리렌더링이 방지됩니다.

- **유연한 컴포넌트 구조**:

  - 데이터 접근 로직이 컴포넌트 계층 구조와 분리되어 컴포넌트 트리를 자유롭게 재구성할 수 있습니다.

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
