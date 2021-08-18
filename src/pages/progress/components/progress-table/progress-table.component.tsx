import React, {useMemo} from 'react';

import DataTable from "../../../../components/data-table/data-table.component";
import DataPagination from "../../../../components/data-pagination/data-pagination.component";
import {useProgress} from "../../../../hooks/progress.hook";

interface Props {

}

const HealthTable = () => {
  const {data: {data, meta}} = useProgress();
  const {current_page, total} = meta;
  const {labels, keys} = useMemo(() => {
    const labels = [
      'progress:date',
      'progress:reportedBy',
      'progress:qualityLabel',
    ];
    const keys = ['date', 'reportedBy', 'quality'];

    return {labels, keys}
  }, []);

  const handlePageSet = () => {

  }

  return (
      <div>
        <DataTable
            labels={labels}
            keys={keys}
            data={data}
        />
        <DataPagination
            page={current_page}
            setPage={handlePageSet}
            total={total}
        />
      </div>
  )
};

export default HealthTable;
