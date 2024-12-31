// This component was generated by @sitecore-search/cli

import type { ChangeEvent } from 'react';
import { useCallback, useState } from 'react';

import type { PreviewSearchInitialState } from '@sitecore-search/react';
import { FilterEqual, WidgetDataType, usePreviewSearch, widget } from '@sitecore-search/react';
import { ArticleCard, Presence, PreviewSearch } from '@sitecore-search/ui';
import { PageController } from '@sitecore-search/react';
import Spinner from '../components/Spinner/Spinner';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

const DEFAULT_IMG_URL = 'https://placehold.co/500x300?text=No%20Image';
export type ArticleModel = {
  id: string;
  name?: string;
  title?: string;
  description?: string;
  image_url: string;
  url: string;
  source_id?: string;
};
type InitialState = PreviewSearchInitialState<'itemsPerPage'>;
interface PreviewSearchProps {
  defaultItemsPerPage?: number | 6;

  /**
   * An optional custom redirection handler that will be called when the user clicks on an article.
   * You can use your own redirection logic here, or any other side effect.
   * Examples
   * * (article: Article) => history.push(`/search?q=${article.id}`);
   * * (article: Article) => window.location.href = `/search?q=${article.id}`;
   * * (article: Article) => setRoute(`/custom/search/endpoint?q=${article.id}`);
   * @param article The article that was clicked.
   */
  itemRedirectionHandler?: (article: ArticleModel) => void;

  /**
   * An optional custom submit handler that will be called when the user submits the form by pressing the enter key.
   * You can use your own submit logic here, or any other side effect.
   * Most common use case is to redirect the user to a custom search page with the query string.
   * Examples
   * * (query: string) => history.push(`/search?q=${query}`);
   * * (query: string) => window.location.href = `/search?q=${query}`;
   * * (query: string) => setRoute(`/custom/search/endpoint?q=${query}`);
   * @param query The query string that was submitted.
   */
  submitRedirectionHandler?: (query: string) => void;
}
export const PreviewSearchComponent = ({
  defaultItemsPerPage = 6,
  itemRedirectionHandler,
  submitRedirectionHandler,
}: PreviewSearchProps) => {
  const { sitecoreContext } = useSitecoreContext();
  const [hasAnswer, setHasAnswer] = useState(false);

  const {
    widgetRef,
    actions: { onItemClick, onKeyphraseChange },
    queryResult,
    queryResult: { isFetching, isLoading },
  } = usePreviewSearch<ArticleModel, InitialState>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    query: (query): any => {
      query.getRequest().setSearchFilter(new FilterEqual('tags', sitecoreContext?.site?.name));
    },
    state: {
      itemsPerPage: defaultItemsPerPage,
    },
  });
  const loading = isLoading || isFetching;
  const keyphraseHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const target = event.target;
      if (target.value?.search('how do I cook pancakes') !== -1) {
        setHasAnswer(true);
      } else {
        setHasAnswer(false);
      }

      onKeyphraseChange({
        keyphrase: target.value,
      });
    },
    [onKeyphraseChange]
  );

  if (sitecoreContext?.language == 'fr-CA') {
    PageController.getContext().setLocaleLanguage('fr');
    PageController.getContext().setLocaleCountry('ca');
  } else if (sitecoreContext?.language == 'ja-JP') {
    PageController.getContext().setLocaleLanguage('ja');
    PageController.getContext().setLocaleCountry('jp');
  } else {
    PageController.getContext().setLocaleLanguage('en');
    PageController.getContext().setLocaleCountry('us');
  }

  return (
    <PreviewSearch.Root>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const { value: query } = e.currentTarget.elements[0] as HTMLInputElement;
          submitRedirectionHandler && submitRedirectionHandler(query);
        }}
        className="sitecore-preview-search-form"
      >
        <PreviewSearch.Input
          id="search-input"
          onChange={keyphraseHandler}
          autoComplete="off"
          placeholder="Type to search..."
          data-testid="contentPSLeftInput"
          className="sitecore-preview-search-input"
        />
      </form>
      <PreviewSearch.Content
        ref={widgetRef}
        className={'sitecore-preview-search-content' + (hasAnswer ? ' hasAnswer' : '')}
      >
        <Presence present={loading}>
          <Spinner />
        </Presence>
        <Presence present={!loading}>
          <>
            {hasAnswer && (
              <div className="position-left sitecore-preview-search-answer">
                <h3>How do I cook pancackes?</h3>
                <p>
                  Mix flour, baking powder, sugar, milk, eggs, and melted butter into a smooth
                  batter, then let it rest for a few minutes. Pour the batter onto a hot, greased
                  skillet, cook until bubbles form and flip to cook the other side until golden
                  brown.
                </p>
              </div>
            )}

            <PreviewSearch.Results defaultQueryResult={queryResult}>
              {({ isFetching: loading, data: { content: articles = [] } = {} }) => (
                <PreviewSearch.Items
                  data-loading={loading}
                  data-testid="contentPSResults"
                  className="sitecore-preview-search-items"
                >
                  <Presence present={loading}>
                    <Spinner />
                  </Presence>
                  {!loading &&
                    articles.map((article, index) => (
                      <PreviewSearch.Item
                        key={article.id}
                        asChild
                        data-testid="psContentItem"
                        className="sitecore-preview-search-item"
                      >
                        <PreviewSearch.PreviewSearchItemLink
                          href={new URL(article.url, window.location.origin).pathname}
                          onClick={() => {
                            // onItemClick is for tracking purposes
                            onItemClick({
                              id: article.id,
                              index,
                              sourceId: article.source_id,
                            });
                            itemRedirectionHandler && itemRedirectionHandler(article);
                          }}
                          className="sitecore-preview-search-link"
                        >
                          <ArticleCard.Root className="sitecore-article-root">
                            <div className="sitecore-article-image-wrapper">
                              <ArticleCard.Image
                                src={article.image_url || DEFAULT_IMG_URL}
                                className="sitecore-article-image"
                              />
                            </div>
                            <ArticleCard.Title className="sitecore-article-name">
                              {article.name || article.title}
                            </ArticleCard.Title>
                          </ArticleCard.Root>
                        </PreviewSearch.PreviewSearchItemLink>
                      </PreviewSearch.Item>
                    ))}
                </PreviewSearch.Items>
              )}
            </PreviewSearch.Results>
          </>
        </Presence>
      </PreviewSearch.Content>
    </PreviewSearch.Root>
  );
};

const PreviewSearchWidget = widget(
  PreviewSearchComponent,
  WidgetDataType.PREVIEW_SEARCH,
  'content'
);
export default PreviewSearchWidget;
