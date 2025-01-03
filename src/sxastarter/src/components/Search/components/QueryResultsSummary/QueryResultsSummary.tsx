// This component was generated by @sitecore-search/cli

type QueryResultsSummaryProps = {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalItemsReturned: number;
};

const QueryResultsSummary = ({
  currentPage,
  itemsPerPage,
  totalItems,
  totalItemsReturned,
}: QueryResultsSummaryProps) => {
  return (
    <div className="sitecore-summary-wrapper">
      Showing {itemsPerPage * (currentPage - 1) + 1} -{' '}
      {itemsPerPage * (currentPage - 1) + totalItemsReturned} of {totalItems} results
    </div>
  );
};
export default QueryResultsSummary;
