import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';
import { AppButton } from 'shared/ui/AppButton/AppButton';
import { AppInput } from 'shared/ui/AppInput/AppInput';
import cln from './AddCommentForm.module.scss';

export interface AddCommentFormProps {
className?: string;
onSendComment: (text: string) => void;
}

const AddCommentForm = memo((props: AddCommentFormProps) => {
    const {
        className,
        onSendComment,
    } = props;
    const { t } = useTranslation('articles');

    const [text, setText] = useState('');

    const onChangeHandler = useCallback((value: string) => {
        setText(value);
    }, []);

    const onClickHandler = useCallback(() => {
        onSendComment(text);
        setText('');
    }, [onSendComment, text]);

    return (

        <div
            className={classNames(cln.AddCommentForm, {}, [className])}
        >
            <AppInput
                data-testid='commentText'
                autoFocus
                placeholder={t('article_enter_comment_text')}
                value={text}
                onChange={onChangeHandler}
                type="text"
            />

            <AppButton
                data-testid='cancelBtn'
                className={cln.cancel}
                onClick={onClickHandler}
            >
                {t('article_send')}
            </AppButton>
        </div>
    );
});

export default AddCommentForm;
