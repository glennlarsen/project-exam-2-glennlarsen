import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
  borderRadius: 12,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  boxSizing: "border-box",
  position: "relative",
  borderRadius: 12,
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
  borderRadius: 12,
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

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

function AddImages({ name, register, id, setValue, errors }) {
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

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "image/*": [".jpeg", ".jpg", ".png"],
      },
      minSize: 0,
      onDrop,
    });

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
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
      <button className="remove__image" onClick={removeFile(file)}>
        Remove
      </button>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <section className="add__images--container">
      <div {...getRootProps({ style })}>
        <TextField
          {...getInputProps()}
          type="file"
          name={name}
          id={id}
          multiple
          {...register(name)}
        />
        <p>Drop images here, or click to select images</p>
        <span>Filetypes: PNG, JPEG</span>
      </div>
      {files.length > 0 ? (
        <Tooltip title="Remove All">
          <DeleteRoundedIcon
            className="remove__image--all"
            onClick={removeAll}
          />
        </Tooltip>
      ) : null}
      <aside style={thumbsContainer}>{thumbs}</aside>
      {errors.images ? (
        <span className="errors">{errors.images.message}</span>
      ) : (
        ""
      )}
    </section>
  );
}

export default AddImages;
