import { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./DropZone.css";

const DropZone = () => {
  const [errors, setErrors] = useState({});
  console.log("errors 👉", errors)
  const [files, setFiles] = useState([]);
  
  const maxImages = (images) => {
    if (files.length >= 5) {
      const err = {};
      err.max = "Maximum File Limit Reached";
      setErrors(err)
    } else {
      return null;
    }
  };

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setErrors({});
    if (acceptedFiles?.length) {
      setFiles((prev) => [
        ...prev,
        ...acceptedFiles.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) })),
      ]);
    }
    if (rejectedFiles[rejectedFiles.length - 1].errors) {
      const dropzoneErrors = rejectedFiles[rejectedFiles.length - 1].errors;
      const err = {};
      dropzoneErrors.forEach((error) => {
        if (error.code === "file-invalid-type")
          err.type = "The file must end in .png, .jpg , or .jpeg";
        if (error.code === "file-too-large") err.size = "The file is too large";
      });
      setErrors(err);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      image: [".png", ".jpg", ".jpeg"],
    },
    maxSize: 1024 * 1000,
    multiple: false,
    maxFiles: 5,
    validator: maxImages,
    disabled: files.length === 5 ? true : false,
  });

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  const removeFile = (e, preview) => {
    e.preventDefault();
    setFiles((files) => files.filter((file) => file.preview !== preview));
    URL.revokeObjectURL(preview);
  };

  return (
    <div className="drop-zone-modal">
        <div
          {...getRootProps({
            className: "drop-zone",
          })}
          id={files.length >= 5 && "hidden"}
        >
          <input {...getInputProps()}/>
          {files.length === 5 ? (
            <p className="drop-zone-text primary-color">Maximum File Limit Reached</p>
          ) : isDragActive ? (
            <p className="drop-zone-text primary-color">Drop the files here ...</p>
          ) : (
            <div>
              <p className="drop-zone-text primary-color">
                Drag photos here or click to select files
              </p>
              <p className="drop-zone-sub-text secondary-color">PNG, JPG or JPEG</p>
            </div>
          )}
        </div>
        <p className="errors">{errors.type}</p>
        <p className="errors">{errors.size}</p>
        <p className="errors">{errors.max}</p>
        <div className="dz-image-preview-section">
          {files.map((file, i) => (
            <div key={i} className="dz-image-preview-container">
              <img alt={i} className="dz-image-preview" src={file.preview} />
              <button className="dz-image-cancel" onClick={(e) => removeFile(e, file.preview)}>
                <i class="fa-solid fa-xmark fa-lg" />
              </button>
            </div>
          ))}
        </div>
    </div>
  );
};

export default DropZone;
