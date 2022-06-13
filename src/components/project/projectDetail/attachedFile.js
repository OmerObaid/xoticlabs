import { ProgressBar } from "react-bootstrap";

const AttachedFile = ({ fileName, handleRemoveImage, progressValue }) => {
  return (
    <>
      <div style={{ display: "flex", marginTop: "auto" }}>
        <div style={{ width: "8.5%" }}></div>
        <div
          style={{
            display: "flex",
            backgroundColor: "#f5f5f5",
            flex: "1",
            padding: "1rem",
            marginRight: "0.7rem",
            marginBottom: "0",
            textAlign: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p style={{ textAlign: "start" }}>{fileName}</p>
            {progressValue != "100" && (
              <progress value={progressValue} max={100}></progress>
            )}
          </div>
          <p
            style={{ verticalAlign: "center" }}
            onClick={handleRemoveImage}
            style={{ marginLeft: "auto", cursor: "pointer" }}
          >
            X
          </p>
        </div>
      </div>
    </>
  );
};

export default AttachedFile;
