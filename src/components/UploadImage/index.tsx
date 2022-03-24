import React  from 'react';
import ImageUploading from 'react-images-uploading';


import * as S from './styles';

import ImageUpload from '../../assets/images/image-upload.png';

export function UploadImage({ images, handleImage }: any) {
  const maxNumber = 1;
  
  return (
    <S.UploadImageContainer>
      <ImageUploading
        multiple
        value={images}
        onChange={handleImage}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemove,
          dragProps,
        }) => (
          <div className="upload__image-wrapper">
            {!images.length  && (
              <button
                onClick={onImageUpload}
                {...dragProps}
             >
               <img src={ImageUpload} alt="image-upload" />
             </button>
            )}
              
            &nbsp;
            {imageList.map((image: any, index: number) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => {
                    onImageRemove(index)
                    handleImage([])
                  }}>Remover</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </S.UploadImageContainer>
  );
}