"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { ImageIcon, Timer, X } from "lucide-react";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgestore";
import { useTempCoverImage } from "@/hooks/use-temp-cover-image";
import { Skeleton } from "./ui/skeleton";
import { useMediaQuery } from "usehooks-ts";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useState } from "react";

interface CoverImageProps {
  url?: string;
  tempUrl?: string;
  preview?: boolean;
}

export const Cover = ({ url, tempUrl, preview }: CoverImageProps) => {
  const [isRemoving, setIsRemoving] = useState(false)
  const params = useParams();
  const coverImage = useCoverImage();
  const tempCoverImage = useTempCoverImage();
  const removeCoverImage = useMutation(api.documents.removeCoverImage);
  const removeTempCoverImage = useMutation(api.documents.removeTempCoverImage);
  const update = useMutation(api.documents.update);
  const { edgestore } = useEdgeStore();

  const onRemove = async () => {
    setIsRemoving(true)
    if (url) {
      await edgestore.publicFiles.delete({
        url: url,
      });
    }
    removeCoverImage({
      id: params.documentId as Id<"documents">,
    })
      .finally(() => setIsRemoving(false))
  };

  const onRemoveTemp = async () => {
    setIsRemoving(true)

    if (tempUrl) {
      await edgestore.publicFiles.delete({
        url: tempUrl,
      });
    }
    removeTempCoverImage({
      id: params.documentId as Id<"documents">,
    })
      .finally(() => setIsRemoving(false))
  };

  const handleDblClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    document.addEventListener("dblclick", onConfirm);
  };

  const onConfirm = async () => {
    if (tempUrl) {
      await edgestore.publicFiles.confirmUpload({
        url: tempUrl,
      });
    }

    await update({
      id: params.documentId as Id<"documents">,
      coverImage: tempUrl,
    });

    removeTempCoverImage({
      id: params.documentId as Id<"documents">,
    });
  };

  return (
    <div
      className={cn(
        "relative w-full h-[35vh] group",
        !url && !tempUrl && "h-[12vh]",
        url && tempUrl && "bg-muted"
      )}
    >
      {!!url && <Image src={url} alt="Cover" className="object-cover" fill />}
      {!!tempUrl && (
        <Image src={tempUrl} alt="Cover" className="object-cover" fill />
      )}
      {url && !preview && (
        <div className="opacity-100 md:opacity-0 md:group-hover:opacity-100 absolute bottom-5 right-2 md:right-5 flex items-center gap-x-2">
          <Button
            onClick={() => coverImage.onReplace(url)}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Change cover
          </Button>
          <Button
            onClick={onRemove}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <X className="h-4 w-4 mr-2" />
            {isRemoving ? (
                <p className="inline">
                  Removing cover
                  <span className="inline animate-ping">.</span>
                  <span className="inline animate-ping delay-100">.</span>
                  <span className="inline animate-ping delay-200">.</span>
                </p>
            ) : (
              <p>Remove cover</p>
            )}
          </Button>
        </div>
      )}
      {tempUrl && !preview && (
        <div className="opacity-100 md:opacity-0 md:group-hover:opacity-100 absolute bottom-2 right-3 md:right-5 flex items-center gap-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                onDoubleClick={handleDblClick}
                className="text-muted-foreground text-xs"
                variant="outline"
                size="sm"
              >
                <span className="flex items-center">
                  <Timer className="h-4 w-4 mr-2" />
                  24h
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="max-w-[220px] whitespace-normal"
              align="end"
            >
              <p className="text-xs text-center">
                this image will be set as your cover for 24 hours. After this
                period, the image will automatically be removed. Otherwise, you
                can double click this button to confirm it!
              </p>
            </PopoverContent>
          </Popover>

          <Button
            onClick={() => tempCoverImage.onReplace(tempUrl)}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Change cover
          </Button>
          <Button
            onClick={onRemoveTemp}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <X className="h-4 w-4 mr-2" />
            {isRemoving ? (
                <p className="inline">
                  Removing cover
                  <span className="inline animate-ping">.</span>
                  <span className="inline animate-ping delay-100">.</span>
                  <span className="inline animate-ping delay-200">.</span>
                </p>
            ) : (
              <p>Remove cover</p>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

Cover.Skeleton = function CoverSkeleton() {
  return <Skeleton className="w-full h-[35vh]" />;
};
