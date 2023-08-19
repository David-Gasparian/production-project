import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ArticleDetails } from 'entities/Article';
import { CommentsList } from 'entities/Comment';
import { Text } from 'shared/ui/Text/Text';
import { AsyncReducersList, useAsyncReducer } from 'shared/lib/hooks/useAsyncReducer';
import { useInitEffect } from 'shared/lib/hooks/useInitEffect';
import { AddCommentForm } from 'features/AddCommentForm';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { AppButton, AppButtonTheme } from 'shared/ui/AppButton/AppButton';
import { appRoutePaths } from 'shared/config/configRoute.tsx/configRoute';
import { Page } from 'widgets/Page/Page';
import { articleDetailsPageReducer, commentsSelectors } from '../model/slice/articleDetailsPageSlice';
import { fetchCommentsByArticleId } from '../model/services/fetchArticleDetailsComments/fetchCommentsByArticleId';
import { selectCommentsLoading } from '../model/selectors/selectCommentsLoading/selectCommentsLoading';
import { AddCommentForArticle } from '../model/services/AddCommentForArticle/AddCommentForArticle';
import cln from './ArticleDetailsPage.module.scss';

const asyncReducersList: AsyncReducersList = {
    articleDetailsComments: articleDetailsPageReducer,
};

const ArticleDetailsPage: FC = memo(() => {
    const { t } = useTranslation('articles');
    const { id } = useParams<{id: string}>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const comments = useSelector(commentsSelectors.selectAll);
    const isLoading = useSelector(selectCommentsLoading);

    useAsyncReducer(asyncReducersList, { removeAfterUnmount: true });

    useInitEffect(() => {
        if (!id) return;

        dispatch(fetchCommentsByArticleId({ id }));
    });

    const onSendComment = useCallback((text: string) => {
        dispatch(AddCommentForArticle({ text }));
    }, [dispatch]);

    const onGoBackHandler = useCallback(() => {
        navigate(appRoutePaths.articles);
    }, [navigate]);

    if (!id) {
        return (
            <Page className={cln.articleNotFound}>
                <Text className={cln.commentsTitle} title={t('article_not_found')} />
            </Page>
        );
    }

    return (
        <Page>
            <div className={cln.ArticleDetailsPage}>
                <div>
                    <AppButton
                        className={cln.loginBtn}
                        theme={AppButtonTheme.OUTLINED}
                        onClick={onGoBackHandler}
                    >
                        {t('article_go_back')}
                    </AppButton>
                </div>
                <ArticleDetails id={id} />
                <Text className={cln.commentsTitle} title={t('comments')} />
                <div className={cln.addCommentWrapper}>
                    <AddCommentForm onSendComment={onSendComment} />
                </div>
                <CommentsList isLoading={isLoading} comments={comments} />
            </div>
        </Page>
    );
});

export default ArticleDetailsPage;