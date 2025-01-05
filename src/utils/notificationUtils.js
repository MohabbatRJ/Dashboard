import { Store as NotificationStore } from 'react-notifications-component';

export const showNotification = (title, message, type) => {
    NotificationStore.addNotification({
        title,
        message,
        type,
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 3000,
            onScreen: true
        }
    });
};