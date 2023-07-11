import React, { useCallback, useState } from "react";
import { useRecordContext } from "react-admin";
import { ImageList, ImageListItem, ImageListItemBar, Box } from '@mui/material';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const defaultToArray = value => (!value ? [] : Array.isArray(value) ? value : [value])

const Pictures = () => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(false);
  const record = useRecordContext();
  const pictures = record && defaultToArray(record['pair:depictedBy']).slice(0,4);

  const showPicture = useCallback((index) => {
    setIndex(index);
    setOpen(true);
  }, [setOpen, setIndex]);

  if (!pictures || pictures.length === 0) return null;

  return (
    <Box>
      <ImageList
        variant="quilted"
        cols={pictures.length === 1 ? 2 : 3}
        gap={10}
        rowHeight={190}
      >
        <ImageListItem cols={2} rows={2}>
          <img src={pictures[0]} style={{ borderRadius: '5px', cursor: 'pointer' }} onClick={() => showPicture(0)} />
        </ImageListItem>
        {pictures.length > 1 &&
          <ImageListItem cols={1} rows={pictures.length > 2 ? 1 : 2}>
            <img src={pictures[1]} style={{ borderRadius: '5px', cursor: 'pointer' }} onClick={() => showPicture(1)} />
          </ImageListItem>
        }
        {pictures.length > 2 &&
          <ImageListItem cols={1} rows={1}>
            <img src={pictures[2]} style={{ borderRadius: '5px', cursor: 'pointer' }} onClick={() => showPicture(2)} />
            {pictures.length > 3 &&
              <ImageListItemBar
                sx={{
                  background: 'rgba(0,0,0,0.5)',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  bottom: 0,
                  '& .MuiImageListItemBar-title': {
                    textAlign: 'center',
                    fontSize: '18px',
                    fontWeight: 500
                  }
                }}
                title={`+${pictures.length - 2} photos`}
                position="top"
                onClick={() => showPicture(2)}
              />
            }
          </ImageListItem>
        }
      </ImageList>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={pictures.map(p => ({ src: p }))}
      />
    </Box>
  );

};

export default Pictures;
