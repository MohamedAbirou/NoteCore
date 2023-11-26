"use client"

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const DocumentsPage = () => {
    const { user } = useUser()
    const router = useRouter()
    const create = useMutation(api.documents.create)

    const onCreate = () => {
        const promise = create({ title: "Untitled" })
            .then((documentId) => router.push(`/documents/${documentId}`))

        toast.promise(promise, {
            loading: "Creating a new note...",
            success: "New note created!",
            error: "Failed to create a new note."
        })
    }

    return ( 
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <Image src="/images/empty.png" height="300" width="300" alt="empty" className="dark:hidden" />
            <Image src="/images/empty-dark.png" height="300" width="300" alt="empty" className="hidden dark:block" />
            <h2 className="text-lg font-medium">
                Welcome to {user?.firstName}&apos;s NoteCore
            </h2>
            <Button onClick={onCreate} className="group">
                <PlusCircle className="h-4 w-4 mr-2 group-hover:animate-bounce transition" />
                Create a note
            </Button>
        </div>
     );
}
 
export default DocumentsPage;