import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState<File>();
  const [presignedUrl, setPresignedUrl] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const handlePresignedUrl = async () => {
    try {
      const formData = new FormData();
      formData.append("object_name", file?.name as string);

      const response = await axios.post(
        "http://localhost:5000/get_presigned_url",
        formData
      );
      setPresignedUrl(response.data.url);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = async () => {
    try {
      console.log(file?.type);
      console.log(presignedUrl);
      const res = await axios.put(presignedUrl, file, {
        headers: {
          "Content-Type": file?.type,
        },
      });
      console.log(res);

      setUploadMessage("File uploaded successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handlePresignedUrl}>Get Presigned URL</button>
      <button onClick={handleUpload}>Upload File</button>
      {uploadMessage && <p>{uploadMessage}</p>}
    </div>
  );
}

export default App;
