import { ref } from 'vue'
export function modalComposition() {

    const openModal = ref(false);
    const toggleModal = () => {
        openModal.value = !openModal.value;
    };

    return { openModal, toggleModal };
}
