import { computed, ref } from "vue";

export const useDataTable = (data: any[], elementsPerPage: number,TotalPages:number) => {

  const actualPage = ref(1);

  const visiblePages = computed(() => {
    const visiblePagesCount = Math.min(5, TotalPages);
    const middlePage = Math.ceil(visiblePagesCount / 2);
    let startPage = actualPage.value - middlePage + 1;
    let endPage = actualPage.value + middlePage -1;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(visiblePagesCount, TotalPages);
    }

    if (endPage > TotalPages) {
      endPage = TotalPages;
      startPage = Math.max(1, endPage - visiblePagesCount + 1);
    }

    const numbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    return numbers;
  });

  const getDataPagination = (page: number) => {
    actualPage.value = page;
    let ini = (page - 1) * elementsPerPage;
    let fin = page * elementsPerPage;
  };

  const getPreviusPage = () => {
    if (actualPage.value > 1) {
      actualPage.value -= 1;
    }
    getDataPagination(actualPage.value);
  };

  const getNextPage = () => {
    if (actualPage.value <= TotalPages) {
      actualPage.value += 1;
    }
    getDataPagination(actualPage.value);
  };

  return {
    pages: TotalPages,
    actualPage,
    visiblePages,
    getDataPagination,
    getPreviusPage,
    getNextPage,
  };
};