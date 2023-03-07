import { useRef, useState } from 'react';
import styles from './App.module.scss';
import bgImage from './assets/image.svg';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axiosInstance from './AxiosInstance/AxiosInstance';

const App = () => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imageUrlRef = useRef<HTMLParagraphElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const copyToClipboard = () => {
    if (imageUrlRef.current) {
      navigator.clipboard
        .writeText(imageUrl)
        .then(() => {
          alert('Image url copied to clipboard');
        })
        .catch((error) => {
          console.error('Error copying text to clipboard:', error);
        });
    }
  };

  const handleUpload = (e: any) => {
    setLoading(true);
    // Pass the options to axios as props, to get the progress simulation, we can use this to set the progress bar if we want, but in this case no need to add this.
    const options = {
      onUploadProgress: (progressEvent: any) => {
        const { loaded, total } = progressEvent;
        ``;
        const percentage = Math.floor((loaded * 100) / total);
        // setProgress(percentage);
      },
    };

    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image', image);

    console.log(image);

    axiosInstance
      .post('/image-upload-cloudinary', formData, options)
      .then((res) => {
        setImageUrl(res.data.result);
        setLoading(false);
      })
      .catch((err) => console.log(err.response));
  };

  const handleButtonClick = () => {
    if (fileInputRef?.current) fileInputRef?.current?.click();
  };

  console.log(Boolean(imageUrl));

  return (
    <div className={styles.AppContainer}>
      {!loading ? (
        <>
          <div className={styles.ImageUploader__paper}>
            <div className={styles.ImageUploader__header}>
              {Boolean(imageUrl) ? (
                <>
                  <CheckCircleIcon className={styles.SuccessIcon} />
                  <h1>Uploaded Successfully!</h1>
                </>
              ) : (
                <>
                  <h1>Upload your image</h1>
                  <p>File should be Jpeg,Png...</p>
                </>
              )}
            </div>
            <div className={styles.ImageUploader__input}>
              <label htmlFor="image-upload">
                <img
                  src={Boolean(imageUrl) ? imageUrl : bgImage}
                  alt="uploadImage"
                  id="image-upload"
                  className={Boolean(imageUrl) ? styles.ImageUrl : ''}
                />
              </label>
              <input
                ref={fileInputRef}
                onChange={(e) => handleUpload(e)}
                type="file"
                id="image-upload"
                accept="image/*"
              />
            </div>
            {Boolean(imageUrl) ? (
              <div className={styles.ImageUrlContainer}>
                <div className={styles.ImageUrlText}>
                  <p ref={imageUrlRef}>{imageUrl}</p>
                </div>
                <button onClick={copyToClipboard} className={styles.CopyLinkButton}>
                  Copy Link
                </button>
              </div>
            ) : (
              <div className={styles.ImageUploader__actions}>
                <p>Or</p>
                <button onClick={handleButtonClick}>Choose a file</button>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className={styles.ImageUploader__paper}>
            <div className={styles.ImageUploader__header}>
              <p>Uploading...</p>
            </div>
            <div className={styles.ProgressContainer}>
              <div className={styles.Progress__bar}></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
