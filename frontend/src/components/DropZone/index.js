import { useDropzone } from "react-dropzone";
import { useEffect, useState, useCallback } from "react";
import "./DropZone.css";

const DropZone = ({ files, setFiles }) => {
  const [errors, setErrors] = useState({});

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
    <div className="drop-zone-container">
      <div className="drop-zone-content">
        {files.length >= 5 ? (
          <div className="drop-zone">
            <p className="drop-zone-text">Maximum File Limit Reached</p>
          </div>
        ) : (
          <div
            {...getRootProps({
              className: "drop-zone",
            })}
            id={files.length >= 5 && "hidden"}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className="drop-zone-text">Drop the files here ...</p>
            ) : (
              <div>
                <p className="drop-zone-text">Drag photos here or click to select files</p>
                <p className="drop-zone-sub-text">PNG, JPG or JPEG</p>
              </div>
            )}
          </div>
        )}

        <p className="errors">{errors && errors.type}</p>
        <p className="errors">{errors && errors.size}</p>
        <p className="errors">{errors && errors.max}</p>
      </div>
      <div className="dz-preview-image-section">
        {files.map((file, i) => (
          <div key={i} className="dropzone-preview-image-shell">
            <img alt={i} className="dropzone-preview-image" src={file.preview} />
            <button className="dropzone-x-mark" onClick={(e) => removeFile(e, file.preview)}>
              <i class="fa-solid fa-xmark fa-lg" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropZone;
