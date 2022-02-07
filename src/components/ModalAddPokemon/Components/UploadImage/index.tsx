import React, { useState } from 'react';
import ImageUploading from 'react-images-uploading';


import * as S from './styles';

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
          isDragging,
          dragProps,
        }) => (
          <div className="upload__image-wrapper">
             <button
               style={isDragging ? { color: 'red' } : undefined}
               onClick={onImageUpload}
               {...dragProps}
             >
               Selecione para adicionar
             </button>
            &nbsp;
            {imageList.map((image: any, index: number) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  {/* <button onClick={() => onImageUpdate(index)}>Update</button> */}
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </S.UploadImageContainer>
  );
}