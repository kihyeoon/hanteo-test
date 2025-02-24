/**
 * React Query의 Infinite Query를 위한 초기 상태를 생성한다.
 */
export const createInitialQueryState = <TData>(initialData?: TData) => {
  return initialData
    ? {
        pages: [initialData],
        pageParams: [undefined],
      }
    : undefined;
};
