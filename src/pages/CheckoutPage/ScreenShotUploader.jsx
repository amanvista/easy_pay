import React from 'react';

const ScreenshotUploader = ({
  paymentScreenshot,
  localImage,
  isUploading,
  fileInputRef,
  handleImageUpload,
  handleRemoveImage,
  handleConfirmUpload
}) => (
  <div className="upload-section">
    <h3 className="upload-title">Upload Payment Screenshot</h3>
    <div className="upload-container">
      {!paymentScreenshot ? (
        <label className="upload-box">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload}
            className="upload-input"
            ref={fileInputRef}
          />
          <div className="upload-content">
            <svg className="upload-icon" viewBox="0 0 24 24">
              <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
            </svg>
            <p className="upload-text">Click to upload or drag and drop</p>
            <p className="upload-hint">PNG, JPG, or JPEG (Max. 5MB)</p>
          </div>
        </label>
      ) : (
        <div className="preview-container">
          <div className="preview-header">
            <span>Receipt Preview</span>
            <button 
              onClick={handleRemoveImage}
              className="delete-btn"
              aria-label="Remove receipt"
              disabled={isUploading}
            >
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
              </svg>
            </button>
          </div>
          <div className="image-preview">
            <img 
              src={paymentScreenshot} 
              alt="Payment Receipt Preview" 
              className="preview-image"
            />
            <div className="reupload-overlay">
              <button 
                onClick={handleRemoveImage}
                className="reupload-btn"
                disabled={isUploading}
              >
                Upload Different File
              </button>
            </div>
          </div>
          {localImage && (
            <button 
              className="confirm-upload-btn"
              onClick={handleConfirmUpload}
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <span className="spinner"></span>
                  Uploading...
                </>
              ) : 'Confirm Upload'}
            </button>
          )}
        </div>
      )}
    </div>
  </div>
);

export default ScreenshotUploader;