import { useState, useCallback } from "react"

export function useModal() {
    const [isOpen, setisOpen] = useState(false)
    const [modalData, setModalData] = useState(null)

    const openModal = useCallback((data = null) => {
        setModalData(data);
        setisOpen(true);
    }, [])
    const closeModal = useCallback(() => {
        setisOpen(false);
        setModalData(null);
    }, [])



    return { isOpen, modalData, openModal, closeModal }

}