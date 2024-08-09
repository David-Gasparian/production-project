import { useTranslation } from 'react-i18next';
import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/Text/Text';
import { ArticlesList } from '@/entities/Article';
import { useFetchRecommendationArticlesQuery } from '../../api/RecommendedArticlesListApi';

interface RecommendedArticlesListProps {
    className?: string;
}

export const RecommendedArticlesList = memo((props: RecommendedArticlesListProps) => {
    const { className } = props;
    const { t } = useTranslation('articles');

    const { data: articles, error, isLoading } = useFetchRecommendationArticlesQuery(3);

    if (error || isLoading || !articles) {
        return null;
    }

    return (
        <div className={classNames('', {}, [className])}>
            <Text title={t('articles_recommendations')} />
            <ArticlesList
                target="_blank"
                articles={articles}
            />
        </div>
    );
});
