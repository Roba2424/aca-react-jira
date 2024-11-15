import { Upload, Progress } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const ImgUpload = ({ progress, uploading, handleUpload }) => {
  const {
    userData: { uid, imgUrl, firstName, lastName },
  } = useSelector((store) => store.userProfile.authUserInfo);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {uploading ? (
        <Progress size={80} type="circle" percent={progress} />
      ) : (
        <PlusOutlined />
      )}
    </button>
  );

  return (
    <div>
      <Upload
        customRequest={handleUpload}
        listType="picture-card"
        fileList={[
          {
            uid: uid,
            name: `${firstName} ${lastName}`,
            status: "done",
            url: imgUrl,
          },
        ]}
      >
        {uploadButton}
      </Upload>
    </div>
  );
};

ImgUpload.propTypes = {
  progress: PropTypes.number.isRequired,
  uploading: PropTypes.bool.isRequired,
  handleUpload: PropTypes.func.isRequired,
};

export default ImgUpload;
