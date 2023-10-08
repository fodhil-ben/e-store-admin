"use client"

import { CldUploadWidget } from 'next-cloudinary'
import { Button } from '../ui/button'
import { Trash } from 'lucide-react';
import Image from 'next/image';
interface ImageUploadProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
}
const ImageUpload = ({ onChange, onRemove, value, disabled }: ImageUploadProps) => {
    const onUpload = (result: any) => {
        onChange(result.info.secure_url);
    };
    return (

        <div>
            <div className="mb-4 flex items-center gap-4">
                {value.map((url) => (
                    <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                        <div className="z-10 absolute top-2 right-2">
                            <Button type="button" onClick={() => onRemove(url)} variant="destructive" size="sm">
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                        <Image
                            fill
                            className="object-cover"
                            alt="Image"
                            src={url}
                        // width="
                        />
                    </div>
                ))}
            </div>
            <CldUploadWidget onUpload={onUpload} uploadPreset='qptmezjj'>
                {({ open }) => {
                    const onClick = (e: React.FormEvent) => {
                        e.preventDefault()
                        open()
                    }
                    return (
                        <Button onClick={onClick}>Upload an Image</Button>
                    )
                }}

            </CldUploadWidget>
        </div>
    )
}

export default ImageUpload