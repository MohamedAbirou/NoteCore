"use client"

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { SignUpButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Heading = () => {
    const { isAuthenticated, isLoading } = useConvexAuth()

    return ( 
        <div className="max-w-3xl space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                Your Ideas, Documents and Plans. Unified. Welcome to{" "}
                <span className="border-b-4 border-black dark:border-white border-dotted">
                    NoteCore
                </span>
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                NoteCore is the connected workspace where <br />
                better, faster work happens.
            </h3>
            {isLoading && (
                <div className="w-full flex items-center justify-center">
                    <Spinner size="lg" />
                </div>
            )}
            {isAuthenticated && !isLoading && (
                <Button className="group" asChild>
                    <Link href="/documents">
                        Enter NoteCore
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1.5 duration-300 transition" />
                    </Link>
                </Button>
            )}
            {!isAuthenticated && !isLoading && (
                <SignUpButton mode="modal">
                    <Button className="group">
                        Get NoteCore for free
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1.5 duration-300 transition" />
                    </Button>
                </SignUpButton>
            )}
        </div>
     );
}
