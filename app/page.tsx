"use client" ;
import { useCallback , useState} from "react";
import { useDropzone } from "react-dropzone";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function Home() {

    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(false);
    const [error , setError] = useState<string>("");
    const [summary, setSummary] = useState<string>("");


    const onDrop = useCallback(async (acceptedFiles: File[]) => {
      try {
        setError("");
        setUploadProgress(true);
        const formData = new FormData();
        formData.append("file", acceptedFiles[0]);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if(!response.ok) {
          throw new Error("failed to upload ");
        }

        const data = await response.json();
        setSummary(data.summary);



      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
        
      } finally {
        setLoading(false);
        setUploadProgress(false);
      }
      
    }, []);

    const { getRootProps, getInputProps , isDragActive } = useDropzone({
      onDrop,
      accept: {"application/pdf" : [".pdf"] } ,
      maxSize: 10*1024*1024,
    });

    return (
    <div className="container mx-auto p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">AI Document Assistant</h1>

        <div> { /*  add something */ }  </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="p-6 mb-8">
            <div {...getRootProps()} 
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer 
              transition-colors ${isDragActive
              ? "border-blue-500" 
              : "border-gray-300  dark:border-gray-700"

              }`}
              >
            
              <input {...getInputProps()} />
              {uploadProgress ? (
                <div className="flex items-center justify-center gap-2" >
                    <Loader2/>
                    <p>Processing .... </p>
                </div>
              ) : (
                <p>drag and drop PDF files here or click to select files </p>

              )}

            </div>
          </Card>

          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-4 ">
              {error}
            </div>
          )}

          {summary && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Summary</h2>
              <p className="text-gray-700 dark:text-gray-300 ">{summary}</p>
            </Card>
          )}


        </div>
      </div>
      
    </div>
  );
}







// "use client";
// import { useCallback, useState } from "react";
// import { useDropzone } from "react-dropzone";
// import { Card } from "@/components/ui/card";
// import { Loader2 } from "lucide-react";

// export default function Home() {
//   const [loading, setLoading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(false);
//   const [error, setError] = useState<string>("");
//   const [summary, setSummary] = useState<string>("");

//   const onDrop = useCallback(async (acceptedFiles: File[]) => {
//     try {
//       setError("");
//       setUploadProgress(true);
//       setLoading(true); // Set loading to true when upload starts



// //this is the difference between the two files 
      



//       if (!acceptedFiles || acceptedFiles.length === 0) {
//         throw new Error("No file selected");
//       }

//       const formData = new FormData();
//       formData.append("file", acceptedFiles[0]);
// //
//       console.log("Sending file:", acceptedFiles[0].name); // Log file name to verify it's being sent


//       const response = await fetch("/api/upload", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error("Failed to upload");
//       }

//       const data = await response.json();
//       setSummary(data.summary);

//     } catch (error) {
//       setError(error instanceof Error ? error.message : "An error occurred");
//     } finally {
//       setLoading(false);
//       setUploadProgress(false);
//     }
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: { "application/pdf": [".pdf"] },
//     maxSize: 10 * 1024 * 1024, // 10 MB size limit
//   });

//   return (
//     <div className="container mx-auto p-10">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold">AI Document Assistant</h1>
//         <div> {/* Add something here if needed */} </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="md:col-span-2">
//           <Card className="p-6 mb-8">
//             <div
//               {...getRootProps()}
//               className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
//                 isDragActive ? "border-blue-500" : "border-gray-300 dark:border-gray-700"
//               }`}
//             >
//               <input {...getInputProps()} />
//               {uploadProgress ? (
//                 <div className="flex items-center justify-center gap-2">
//                   <Loader2 />
//                   <p>Processing ...</p>
//                 </div>
//               ) : (
//                 <p>Drag and drop PDF files here or click to select files</p>
//               )}
//             </div>
//           </Card>

//           {error && (
//             <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-4">
//               {error}
//             </div>
//           )}

//           {summary && (
//             <Card className="p-6">
//               <h2 className="text-xl font-semibold mb-4">Summary</h2>
//               <p className="text-gray-700 dark:text-gray-300">{summary}</p>
//             </Card>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
