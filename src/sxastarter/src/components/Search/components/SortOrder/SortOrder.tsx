// This component was generated by @sitecore-search/cli

import type { SearchResponseSortChoice } from '@sitecore-search/data';
import { useSearchResultsActions } from '@sitecore-search/react';
import { SortSelect } from '@sitecore-search/ui';

type SortOrderProps = {
  options: Array<SearchResponseSortChoice>;
  selected: string;
};

const SortOrder = ({ options, selected }: SortOrderProps) => {
  const selectedSortIndex = options.findIndex((s) => s.name === selected);
  const { onSortChange } = useSearchResultsActions();
  return (
    <div>
      <label>Sort by:</label>
      <SortSelect.Root defaultValue={options[selectedSortIndex]?.name} onValueChange={onSortChange}>
        <SortSelect.Trigger className="sitecore-sort-select-trigger">
          <SortSelect.SelectValue className="sitecore-sort-select-value">
            {selectedSortIndex > -1 ? options[selectedSortIndex].label : ''}
          </SortSelect.SelectValue>
          <SortSelect.Icon className="sitecore-sort-select-icon" />
        </SortSelect.Trigger>
        <SortSelect.Content className="sitecore-sort-select-content">
          <SortSelect.Viewport className="sitecore-sort-select-viewport">
            {options.map((option) => (
              <SortSelect.Option
                value={option}
                key={option.name}
                className="sitecore-sort-select-option"
              >
                <SortSelect.OptionText className="sitecore-sort-select-option-text">
                  {option.label}
                </SortSelect.OptionText>
              </SortSelect.Option>
            ))}
          </SortSelect.Viewport>
        </SortSelect.Content>
      </SortSelect.Root>
    </div>
  );
};
export default SortOrder;