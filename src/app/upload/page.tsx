"use client"
import UploadForm from "@/components/UpdloadForm";

type Props = {}

const page = (props: Props) => {
    const handleUploadSuccess = (imageUrl: string, imageName: string) => {
        const newImage = {
          url: imageUrl,
          name: imageName,
          date: new Date().toLocaleString(),
        };
    
        const storedImages = JSON.parse(
          localStorage.getItem("uploadedImages") || "[]"
        );
        localStorage.setItem(
          "uploadedImages",
          JSON.stringify([...storedImages, newImage])
        );
      };
    
      return (
        <div className="container mx-auto py-10 px-4">
          <h1 className="text-4xl text-center font-bold text-gray-900 mb-8">
            Image Repository
          </h1>
          <UploadForm onUploadSuccess={handleUploadSuccess} />
        
        </div>
      );
    }
export default page