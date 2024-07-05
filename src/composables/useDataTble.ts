import { computed, ref } from "vue";

export const useDataTable = (data: any[], elementsPerPage: number,TotalPages:number) => {

  const paginatedData = ref<any[]>([]);
  const pages = ref(TotalPages);
  const actualPage = ref(1);

  const visiblePages = computed(() => {
    const visiblePagesCount = Math.min(5, pages.value);
    const middlePage = Math.ceil(visiblePagesCount / 2);
    let startPage = actualPage.value - middlePage + 1;
    let endPage = actualPage.value + middlePage -1;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(visiblePagesCount, pages.value);
    }

    if (endPage > pages.value) {
      endPage = pages.value;
      startPage = Math.max(1, endPage - visiblePagesCount + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  });

  const getDataPagination = (page: number) => {
    actualPage.value = page;
    let ini = (page - 1) * elementsPerPage;
    let fin = page * elementsPerPage;
    paginatedData.value = data.slice(ini, fin);
  };

  const getPreviusPage = () => {
    if (actualPage.value > 1) {
      actualPage.value -= 1;
    }
    getDataPagination(actualPage.value);
  };

  const getNextPage = () => {
    if (actualPage.value <= pages.value) {
      actualPage.value += 1;
    }
    getDataPagination(actualPage.value);
  };

  return {
    paginatedData,
    pages,
    actualPage,
    visiblePages,
    getDataPagination,
    getPreviusPage,
    getNextPage,
  };
};