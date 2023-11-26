"use client"

import { Spinner } from "@/components/spinner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import { Navigation } from "./_components/navigation";
import { SearchCommand } from "@/components/search-command";

const PlatformLayout = ({
    children
} : {
    children: React.ReactNode
}) => {
    const { isAuthenticated, isLoading } = useConvexAuth()

    if (isLoading) {
        return (
            <div className="h-full flex flex-col items-center justify-center">
                <Spinner size="xl" />
                <p className="pt-3 text-muted-foreground inline">Getting things ready for you 
                    <span className="inline animate-ping">.</span>
                    <span className="inline animate-ping delay-100">.</span>
                    <span className="inline animate-ping delay-200">.</span>
                </p>
            </div>
        )
    }

    if (!isAuthenticated) {
        return redirect('/')
    }

    return (
        <div className="h-full flex dark:bg-[#1F1F1F]">
            <Navigation />
            <main className="flex-1 h-full overflow-y-auto">
                <SearchCommand />
                {children}
            </main>
        </div>
    );
}
 
export default PlatformLayout;