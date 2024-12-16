import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import FileUsageStats from '../FileUsageStats';
import MoodAlbum from "../Mood Album";
const UsageButton111 = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button type="white" onClick={showDrawer}  style={{ color: 'white', textAlign: 'center' }}>
        Emotional Overview
      </Button>
      <Drawer title="My Emotional Overview" onClose={onClose} open={open} size='large'>
        <MoodAlbum/>
      </Drawer>
    </>


  );
};
export default UsageButton111;