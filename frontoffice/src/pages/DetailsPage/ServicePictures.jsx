import React, { useState, useCallback } from 'react';
import { CardMedia, useMediaQuery, ImageListItemBar } from '@mui/material';
import Lightbox from 'yet-another-react-lightbox';
import { arrayOf } from '../../utils';
import { useRecordContext } from 'react-admin';

const ServicePictures = () => {
  const record = useRecordContext();
  const xs = useMediaQuery(theme => theme.breakpoints.down('sm'), { noSsr: true });
  const sm = useMediaQuery(theme => theme.breakpoints.down('md'), { noSsr: true });
  const [openImage, setOpenImage] = useState(false);
  const [index, setIndex] = useState(false);

  const showPicture = useCallback(
    index => {
      setIndex(index);
      setOpenImage(true);
    },
    [setOpenImage, setIndex]
  );

  return (
    <>
      <CardMedia
        // component="img"
        sx={{ width: xs ? undefined : sm ? '35%' : '50%', height: xs ? 150 : 230, cursor: 'pointer', position: 'relative' }}
        image={arrayOf(record['pair:depictedBy'])?.[0]}
        alt={record['pair:label']}
        onClick={() => showPicture(0)}
      >
        {arrayOf(record['pair:depictedBy']).length > 1 && (
          <ImageListItemBar
            sx={{
              background: 'rgba(0,0,0,0)',
              borderRadius: '5px',
              cursor: 'pointer',
              bottom: 0,
              '& .MuiImageListItemBar-title': {
                textAlign: 'center',
                fontSize: '18px',
                fontWeight: 500,
                // background: 'rgba(0,0,0,0.5)',
              }
            }}
            title={`+${arrayOf(record['pair:depictedBy']).length - 1} photo${arrayOf(record['pair:depictedBy']).length > 2 ? 's' : ''}`}
            position="top"
          />
        )}
      </CardMedia>
      <Lightbox
        styles={{ captionsTitle: { fontFamily: 'Geomanist' } }}
        open={openImage}
        index={index}
        close={() => setOpenImage(false)}
        slides={
          record &&
          arrayOf(record['pair:depictedBy']).map(imageUri => ({
            src: imageUri,
            title: record['pair:label']
          }))
        }
        render={arrayOf(record['pair:depictedBy']).length === 1 ? { buttonPrev: () => null, buttonNext: () => null } : undefined}
      />
    </>
  );
};

export default ServicePictures;
