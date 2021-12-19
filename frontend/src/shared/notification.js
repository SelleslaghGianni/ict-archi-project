import { ref } from 'vue'
export function notificationComposition() {

    const openNotification = ref(false);
    const toggleNotification = () => {
        openNotification.value = !openNotification.value;
    };

    return { openNotification, toggleNotification };
}
