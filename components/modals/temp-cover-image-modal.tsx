"use client"

import { Dialog, DialogContent, DialogHeader } from "../ui/dialog"
import { useState } from "react"
import { useEdgeStore } from "@/lib/edgestore"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useParams } from "next/navigation"
import { Id } from "@/convex/_generated/dataModel"
import { SingleTempImageDropzone } from "../single-temp-image-dropzone"
import { useTempCoverImage } from "@/hooks/use-temp-cover-image"
import { useCoverImage } from "@/hooks/use-cover-image"

export const TempCoverImageModal = () => {
    const params = useParams()
    const tempCoverImage = useTempCoverImage()
    const [file, setFile] = useState<File>()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { edgestore } = useEdgeStore()
    const update = useMutation(api.documents.update)

    const onClose = () => {
        setFile(undefined)
        setIsSubmitting(false)
        tempCoverImage.onClose()
    }

    const onTempChange = async (file?: File) => {
        if (file) {
            setIsSubmitting(true)
            setFile(file)

            const res = await edgestore.publicFiles.upload({
                    file,
                    options: {
                        replaceTargetUrl: tempCoverImage.tempUrl,
                        temporary: true
                    }
                })

            await update({
                id: params.documentId as Id<"documents">,
                tempCoverImage: res.url
            })

            onClose()
        }
    }

    return (
        <Dialog open={tempCoverImage.isOpen} onOpenChange={tempCoverImage.onClose}>
            <DialogContent>
                <DialogHeader>
                    <h2 className="text-center text-lg font-semibold">
                        Temporary Cover Image
                    </h2>
                </DialogHeader>
                <div>
                    <SingleTempImageDropzone className="w-full outline-none" disabled={isSubmitting} value={file} onTempChange={onTempChange} />
                </div>
            </DialogContent>
        </Dialog>
    )
}