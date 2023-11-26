import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["400", "600"]
})

export const Logo = () => {
    return (
        <div className="hidden md:flex items-center gap-x-2">
            <Image src="/images/logo.png" height="35" width="35" alt="logo" className="dark:hidden" />
            <Image src="/images/logo-dark.png" height="35" width="35" alt="logo" className="hidden dark:block" />
            <p className={cn(
                "font-semibold",
                font.className
            )}>
                NoteCore
            </p>
        </div>
    )
}