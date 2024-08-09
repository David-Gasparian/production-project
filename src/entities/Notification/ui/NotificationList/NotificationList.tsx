import { memo, useEffect } from 'react';

import { useFetchNotificationsQuery } from '@/entities/Notification/api/notificationApi';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { VStack } from '@/shared/ui/Stack';
import { NotificationItem } from '../NotificationItem/NotificationItem';

interface NotificationListProps {
    className?: string;
}

export const NotificationList = memo((props: NotificationListProps) => {
    const {
        className,
    } = props;

    const { data: notifications, isLoading, refetch } = useFetchNotificationsQuery();

    useEffect(() => {
        const intervalId = setInterval(() => {
            refetch();
        }, 5000);

        return () => clearInterval(intervalId);
    }, [refetch]);

    if (isLoading) {
        return (
            <VStack
                gap={8}
                className={classNames('', {}, [className])}
            >
                <Skeleton width="100%" height={80} border="10px" />
                <Skeleton width="100%" height={80} border="10px" />
                <Skeleton width="100%" height={80} border="10px" />
            </VStack>
        );
    }

    if (!notifications) {
        return null;
    }

    return (
        <VStack
            gap={8}
            className={classNames('', {}, [className])}
        >
            {notifications.map((item) => <NotificationItem key={item.id} notification={item} />)}
        </VStack>
    );
});
