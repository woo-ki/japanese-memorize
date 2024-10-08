import { paginationStyle } from '@components/pages/dictionaryPage/Pagination/style.ts';
import { FC, useEffect, useState } from 'react';

type PaginationPropsType = {
  nowPage: number;
  totalPage: number;
  // eslint-disable-next-line no-unused-vars
  setPage: (page: number) => void;
};
const Pagination: FC<PaginationPropsType> = ({ nowPage, totalPage, setPage }) => {
  const [pageList, setPageList] = useState<number[]>([]);
  const [pageSize] = useState(5);

  // 페이지 리스트 생성
  const createPageList = () => {
    const tempPageList: number[] = [];

    const startPage = Math.floor((nowPage - 1) / pageSize) * pageSize + 1;
    let endPage = Math.floor((nowPage - 1) / pageSize) * pageSize + 5;
    if (endPage > totalPage) {
      endPage = totalPage;
    }
    for (let i = startPage; i <= endPage; i++) {
      tempPageList.push(i);
    }
    setPageList(tempPageList);
  };
  useEffect(() => {
    createPageList();
  }, [nowPage, totalPage]);

  const moveBack = () => {
    if (nowPage === 1) return;
    setPage(nowPage - 1);
  };
  const moveNext = () => {
    if (nowPage === totalPage) return;
    setPage(nowPage + 1);
  };

  return (
    <div css={paginationStyle}>
      <div id="pagination_item">
        <div className={`${nowPage === 1 && 'disabled'}`} onClick={moveBack}>
          &laquo;
        </div>
        {pageList.map((page) => (
          <div key={page} className={`${nowPage === page && 'active'}`} onClick={() => setPage(page)}>
            {page}
          </div>
        ))}
        <div className={`${nowPage === totalPage && 'disabled'}`} onClick={moveNext}>
          &raquo;
        </div>
      </div>
    </div>
  );
};

export default Pagination;
