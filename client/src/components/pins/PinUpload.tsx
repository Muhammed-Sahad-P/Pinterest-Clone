// frontend/components/PinUpload.tsx
import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

const PinUpload: React.FC = () => {
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [imageUrl, setImageUrl] = useState<string>('');

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!image) return;

        const formData = new FormData();
        formData.append('image', image);

        try {
            setLoading(true);
            const response = await axios.post('/api/pins/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setLoading(false);
            setImageUrl(response.data.imageUrl);
        } catch (error) {
            setLoading(false);
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleImageChange} />
                <button type="submit" disabled={loading}>
                    {loading ? 'Uploading...' : 'Upload Pin'}
                </button>
            </form>

            {imageUrl && (
                <div>
                    <h3>Uploaded Image:</h3>
                    <Image src={imageUrl} alt="Uploaded Pin" className="rounded-lg w-full" width={500} height={300} />
                </div>
            )}
        </div>
    );
};

export default PinUpload;
