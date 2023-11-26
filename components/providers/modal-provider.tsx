"use client"

import { useEffect, useState } from "react"
import { SettingsModal } from "../modals/settings-modal"
import { CoverImageModal } from "../modals/cover-image-modal"
import { TempCoverImageModal } from "../modals/temp-cover-image-modal"

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <SettingsModal />
            <CoverImageModal />
            <TempCoverImageModal />
        </>
    )
}