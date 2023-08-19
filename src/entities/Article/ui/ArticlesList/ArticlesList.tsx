import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { Article, ArticleView } from '../../model/types/article';
import { ArticlesListItem } from '../ArticlesListItem/ArticlesListItem';
import { ArticlesListItemSkeleton } from '../ArticlesListItem/ArticlesListItemSkeleton';
import cln from './ArticlesList.module.scss';

interface ArticlesListProps {
    className?: string;
    view?: ArticleView;
    articles: Article[];
    isLoading?: boolean;
}

const getSkeletons = (view: ArticleView) => {
    const isBig = view === ArticleView.BIG;
    const articleListForSkeleton = new Array(isBig ? 3 : 6).fill(1);

    return articleListForSkeleton.map(() => (
        <ArticlesListItemSkeleton
            view={view}
        />
    ));
};

export const ArticlesList = memo((props: ArticlesListProps) => {
    const {
        className, view = ArticleView.SMALL, articles, isLoading,
    } = props;

    const { t } = useTranslation('articles');

    if (!isLoading && !articles.length) {
        return (
            <Text
                className={cln.emptyText}
                text={(t('articles_empty'))}
            />
        );
    }

    return (
        <div
            className={classNames('', {}, [className, cln[view]])}
        >
            {
                articles
                    .map((article) => (
                        <ArticlesListItem
                            article={article}
                            key={article.id}
                            view={view}
                        />
                    ))
            }
            {isLoading && getSkeletons(view)}
        </div>
    );
});