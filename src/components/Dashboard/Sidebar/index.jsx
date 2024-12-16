import React from 'react';
import './Sidebar.css';
import UsageButton from "../UsageButton";
import UsageButton111 from "../UsageButton111"; // 假设这里有相关的CSS样式

const Sidebar = ({ isOpen }) => {
  return (
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <nav>
          <ul>
            <li><UsageButton/></li>
            <li><UsageButton111/></li>
          </ul>
        </nav>
      </div>
  );
};//仅占位

export default Sidebar;
