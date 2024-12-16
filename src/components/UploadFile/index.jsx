import React, { useState } from "react";
import { faFileUpload, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button, Form, Modal, ProgressBar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { storage } from "../../API/firebase";
import { addFileUser } from "../../redux/actionCreators/filefoldersActionCreators";

const UploadFile = ({ currentFolder }) => {
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [progress, setProgress] = useState(0);

  const dispatch = useDispatch();
  const { userId, userFiles } = useSelector(
    (state) => ({
      userId: state.auth.userId,
      userFiles: state.filefolders.userFiles,
    }),
    shallowEqual
  );

  // 点击上传文件后执行的函数 
  const handleFileSubmit = (e) => {
    // 阻止默认行为 
    e.preventDefault();
    // 如果文件为空，提示需要选择文件 
    if (!file) return toast.dark("Please add file name!");
    // 获取文件的后缀名 
    const fileExtension = file.name.split(".").reverse()[0];
    // 允许上传的文件类型 
    const allowedExtensions = [
      "html",
      "php",
      "js",
      "jsx",
      "txt",
      "xml",
      "css",
      "c",
      "cpp",
      "java",
      "cs",
      "py",
      "json",
      "ppt",
      "pptx",
      "docx",
      "png",
      "jpg",
      "jpeg",
      "gif",
      "svg",
      "mp3",
      "mp4",
      "webm",
      "pdf",
    ];

    // 如果是不支持的类型，提示不支持 
    if (allowedExtensions.indexOf(fileExtension) === -1) {
      return toast.dark(`File with extension ${fileExtension} not allowed!`);
    }

    
    const filteredFiles =
      currentFolder === "root folder"
        ? userFiles.filter(
            (file) =>
              file.data.parent === "" &&
              file.data.name === fileName.split("\\").reverse()[0]
          )
        : userFiles.filter(
            (file) =>
              file.data.parent === currentFolder.docId &&
              file.data.name === fileName.split("\\").reverse()[0]
          );
    if (filteredFiles.length > 0)
      return toast.dark("This is alredy present in folder");

    const uploadFileRef = storage.ref(`files/${userId}/${file.name}`);

    uploadFileRef.put(file).on(
      "state_change",
      (snapshot) => {
        const newProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(newProgress);
      },
      (error) => {
        return toast.error(error.message);
      },
      async () => {
        const url = await uploadFileRef.getDownloadURL();
        if (currentFolder === "root folder") {
          dispatch(
            addFileUser({
              uid: userId,
              parent: "",
              data: "",
              name: file.name,
              url: url,
              path: [],
            })
          );
          setFile("");
          setProgress(0);
          setShowModal(false);
          return;
        }

        const path =
          currentFolder.data.path.length > 0
            ? [
                ...currentFolder.data.path,
                { id: currentFolder.docId, name: currentFolder.data.name },
              ]
            : [{ id: currentFolder.docId, name: currentFolder.data.name }];

        dispatch(
          addFileUser({
            uid: userId,
            parent: currentFolder.docId,
            data: "",
            name: file.name,
            url: url,
            path: path,
          })
        );
        setFile("");
        setProgress(0);
        setShowModal(false);
        return;
      }
    );
  };

  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>
            {progress && progress !== 100
              ? "Uploading..."
              : progress === 100
              ? "Uploaded"
              : "Upload File"}
          </Modal.Title>
          <Button
            variant="white"
            style={{ cursor: "pointer" }}
            onClick={() => setShowModal(false)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </Modal.Header>
        <Modal.Body>
          {progress && progress !== 100 ? (
            <ProgressBar now={progress} label={`${progress}%`} />
          ) : progress === 100 ? (
            <h1>File Uploaded Successfully</h1>
          ) : (
            <Form onSubmit={handleFileSubmit} encType="multipart/form-data">
              <Form.Group controlId="formBasicFolderName" className="my-2">
                <input
                  type="file"
                  className="file"
                  onChange={(e) => {
                    setFileName(e.target.value);
                    setFile(e.target.files[0]);
                  }}
                  custom="true"
                />
              </Form.Group>
              <Form.Group controlId="formBasicFolderSubmit" className="mt-5">
                <Button
                  type="submit"
                  className="form-control"
                  variant="primary"
                >
                  Upload File
                </Button>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
      </Modal>

      {/* 文件上传的按钮，点击后 显示Modal */}
      <Button
        onClick={() => setShowModal(true)}
        variant="outline-dark"
        className="border-1 d-flex align-items-center justify-content-between rounded-2"
      >
        <FontAwesomeIcon icon={faFileUpload} />
        &nbsp; Upload File
      </Button>
    </>
  );
};

export default UploadFile;
