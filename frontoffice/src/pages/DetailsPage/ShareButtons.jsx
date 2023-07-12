import React from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { EmailShareButton, FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton, EmailIcon, FacebookIcon, TwitterIcon, LinkedinIcon, WhatsappIcon } from 'react-share';
import { useRecordContext } from 'react-admin';

const iconProps = { borderRadius: 10, size: 30, bgStyle: { fill: '#FF96A0' }};

const ShareButtons = () => {
  const record = useRecordContext();
  const xs = useMediaQuery(theme => theme.breakpoints.down('sm'), { noSsr: true });
  const buttonProps = { url: window.location.href, style: xs ? { marginRight: 8 } : { marginLeft: 8 } };
  const title = `Découvrez l'oasis ${record?.['pair:label']}`;

  return (
    <>
      <Typography color="secondary" variant="body2" gutterBottom>
        Partager la page
      </Typography>
      <Box display="flex">
        <EmailShareButton subject={title} {...buttonProps}>
          <EmailIcon {...iconProps} />
        </EmailShareButton>
        <FacebookShareButton quote={title} hashtag='#oasis' {...buttonProps}>
          <FacebookIcon {...iconProps} />
        </FacebookShareButton>
        <TwitterShareButton title={title} hashtags={['#oasis']} {...buttonProps}>
          <TwitterIcon {...iconProps} />
        </TwitterShareButton>
        <LinkedinShareButton title={title} {...buttonProps}>
          <LinkedinIcon {...iconProps} />
        </LinkedinShareButton>
        <WhatsappShareButton title={title} {...buttonProps}>
          <WhatsappIcon {...iconProps} />
        </WhatsappShareButton>
      </Box>
    </>
  );
};

export default ShareButtons;
