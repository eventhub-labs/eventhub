"use client";

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileUp, ImageUp, XIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { toast } from "sonner";

export default function UploadProfilePhotoDialog() {
  const [uploadedPhoto, setUploadedPhoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [attachmentState, setAttachmentState] = useState<
    "idle" | "done" | "uploading" | "processing" | "error"
  >("idle");

  useEffect(() => {
    if (!uploadedPhoto) {
      return;
    }

    const photoUrl = URL.createObjectURL(uploadedPhoto);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPreviewUrl(photoUrl);
    setAttachmentState("done");

    return () => {
      URL.revokeObjectURL(photoUrl);
    };
  }, [uploadedPhoto]);

  return (
    <Dialog>
      <DialogTrigger className="bg-muted hover:bg-muted-foreground absolute right-0 bottom-0 rounded-full p-1 transition hover:scale-110">
        <div className="rounded-full">
          <ImageUp size={20} />
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Image Uploading</DialogTitle>
          <DialogDescription>Choose file to upload</DialogDescription>
        </DialogHeader>
        <div className="flex gap-x-3">
          <Dropzone
            onDrop={(acceptedFiles: File[]) => {
              if (acceptedFiles.length > 1) {
                toast.warning("Maximum one file to upload");
                return;
              }

              const fileType = acceptedFiles[0].type;
              if (
                fileType !== "image/jpeg" &&
                fileType !== "image/png" &&
                fileType !== "image/webp"
              ) {
                toast.warning("Wrong file type");
                return;
              }

              setUploadedPhoto(acceptedFiles[0]);
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <section className="w-full border-2 border-dashed">
                <div
                  {...getRootProps()}
                  className="flex h-full w-full flex-col items-center justify-center p-5"
                >
                  <input {...getInputProps()} />
                  <FileUp size={30} />
                  <p className="text-muted-foreground mt-4 text-center">
                    Drag &apos;n&apos; drop some file here, or click to select
                    file
                  </p>
                </div>
              </section>
            )}
          </Dropzone>

          {uploadedPhoto && attachmentState !== "idle" && (
            <Attachment
              state={attachmentState}
              orientation="vertical"
              className="min-w-1/2"
            >
              <AttachmentMedia variant="image">
                <Image
                  src={previewUrl || "/img/no-user.png"}
                  alt="uploaded-photo"
                  width={100}
                  height={100}
                />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>{uploadedPhoto.name}</AttachmentTitle>
                <AttachmentDescription>
                  {uploadedPhoto.type}
                </AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions>
                <AttachmentAction
                  aria-label="Remove photo"
                  onClick={() => {
                    setUploadedPhoto(null);
                    setAttachmentState("idle");
                  }}
                >
                  <XIcon />
                </AttachmentAction>
              </AttachmentActions>
            </Attachment>
          )}
        </div>

        <Button
          variant="outline"
          onClick={() => setAttachmentState("uploading")}
        >
          Upload
        </Button>
      </DialogContent>
    </Dialog>
  );
}
