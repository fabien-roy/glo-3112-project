import { useState } from 'react';
import { NotificationEvent } from 'types/notifications';
import useFetchFromAPI from '../useFetchFromAPI';

export default function useGetNotifications() {
  const [notifications, setNotifications] = useState<NotificationEvent[]>([]);

  const { isLoading } = useFetchFromAPI(
    'getNotifications',
    setNotifications,
    null
  );

  return { notifications, setNotifications, isLoading };
}
