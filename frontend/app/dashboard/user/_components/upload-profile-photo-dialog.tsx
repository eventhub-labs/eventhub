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
import Dropzone from "react-dropzone";

export default function UploadProfilePhotoDialog() {
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
        <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <section className="border-2 border-dashed">
              <div
                {...getRootProps()}
                className="flex flex-col items-center justify-center p-10"
              >
                <input {...getInputProps()} />
                <FileUp size={30} />
                <p className="text-muted-foreground mt-4 px-8 text-center">
                  Drag &apos;n&apos; drop some file here, or click to select
                  file
                </p>
              </div>
            </section>
          )}
        </Dropzone>

        <Attachment state="idle">
          <AttachmentMedia variant="image">
            <Image
              src="/img/no-user.png"
              alt="uploaded-photo"
              width={100}
              height={100}
            />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
            <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label="Remove sales-dashboard.pdf">
              <XIcon />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>

        <Button variant="outline">Upload</Button>
      </DialogContent>
    </Dialog>
  );
}
