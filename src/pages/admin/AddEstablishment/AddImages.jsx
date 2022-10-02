import React, { useEffect, useState, useMemo, useCallback } from "react";
import styles from "./addestablishment.module.scss";
import { useDropzone } from "react-dropzone";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Tooltip from "@mui/material/Tooltip";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 12,
  borderColor: "#707070",
  borderStyle: "dashed",
  backgroundColor: "white",
  color: "#707070",
  outline: "none",
  minHeight: "200px",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#17396D",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#d32f2f",
};

function AddImages({ name, id, setValue, errors }) {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(
            file,
            {
              preview: URL.createObjectURL(file),
            },
            setValue(name, acceptedFiles, { shouldValidate: true })
          )
        )
      );
    },
    [setValue, name]
  );

  const {
    getRootProps,
    getInputProps,
    isFocused,
    fileRejections,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": [],
    },
    onDrop,
    maxFiles: 15,
  });

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  const removeFile = (file) => () => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
    setValue(name, newFiles, { shouldValidate: true });
  };

  const removeAll = () => {
    setFiles([]);
    setValue(name, [], { shouldValidate: false });
  };
  console.log(files);

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const thumbs = files.map((file) => (
    <div className={styles.thumb} key={file.name}>
      <div className={styles.thumbInner}>
        <img
          src={file.preview}
          className={styles.img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
      <button className={styles.removeImage} onClick={removeFile(file)}>
        Remove
      </button>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <section className={styles.addImagesContainer}>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} name={name} id={id} multiple />
        <p>Drop images here, or click to select images</p>
        <span>Filetypes: PNG, JPEG</span>
      </div>
      {files.length > 0 ? (
        <Tooltip title="Remove All">
          <DeleteRoundedIcon
            className={styles.removeImageAll}
            onClick={removeAll}
          />
        </Tooltip>
      ) : null}
      <aside className={styles.thumbsContainer}>
        {thumbs}
        <ul className="errors">{fileRejectionItems}</ul>{" "}
        {errors.images ? (
          <span className="errors">{errors.images.message}</span>
        ) : (
          ""
        )}
      </aside>
    </section>
  );
}

export default AddImages;
