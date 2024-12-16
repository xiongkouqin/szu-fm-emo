import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
const EmotionButton = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Track Emotion 
      </Button>
      <Drawer title="Upload an Image to Track your Emotion today! " onClose={onClose} open={open} size='large'>

      </Drawer>
    </>
  );
};
export default EmotionButton;