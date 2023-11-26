import { Button } from "@/components/ui/button"
import { Logo } from "./logo"

export const Footer = () => {
    return (
        <div className="flex items-center w-full p-3 bg-background dark:bg-[#1F1F1F] z-50 border-t dark:border-t-[#181818] shadow-sm">
            <Logo />
            <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
                <Button variant="ghost" size="xs">
                    Privacy Policy
                </Button>
                <Button variant="ghost" size="xs">
                    Terms & Conditions
                </Button>
            </div>
        </div>
    )
}