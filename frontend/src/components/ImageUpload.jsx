import { Upload, message } from "antd";
import Axios from "axios";
import ImgCrop from "antd-img-crop";

export default function FileUpload({ fileList, setFileList, error, setError }) {
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);

    if (newFileList.length === 0) {
      setError("Please upload at least one image.");
    } else {
      setError("");
    }
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onRemove = async (file) => {
    try {
      const fileName = file.response.result;
      await Axios.delete(`/api/fileupload/${fileName}`);
      message.success(`${file.name} removed successfully`);
    } catch (error) {
      console.error("Error removing file:", error);
      message.error(`Failed to remove ${file.name}`);
    }
  };

  console.log(error);
  return (
    <div>
      <ImgCrop rotationSlider aspect={3 / 2}>
        <Upload
          action="/api/fileupload"
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
          onRemove={onRemove}>
          {fileList.length < 5 && "+ Upload"}
        </Upload>
      </ImgCrop>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}
