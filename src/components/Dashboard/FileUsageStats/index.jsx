import React, { useEffect } from "react";
import { Card, Row, Col, Progress, Spin, Space } from 'antd';
import ReactECharts from 'echarts-for-react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getUserUsageStats } from '../../../redux/actionCreators/filefoldersActionCreators';
import MyFileIcon from "../../Icon/FileIcon";
import MyCodeIcon from "../../Icon/CodeIcon";
import MyImageIcon from "../../Icon/ImageIcon";
import MyMediaIcon from "../../Icon/MediaIcon";

const icons = [
  <MyFileIcon />,
  <MyCodeIcon />,
  <MyImageIcon />,
  <MyMediaIcon />
]

// File type categories
const categories = [
  {
    name: 'Document Files',
    files: [
      { type: 'txt', size: 10 },
      { type: 'xml', size: 5 },
      { type: 'json', size: 3 },
      { type: 'docx', size: 7 },
      { type: 'pdf', size: 12 },
      { type: 'ppt', size: 8 },
      { type: 'pptx', size: 6 },
    ],
    color: ['#ff4d4f', '#ff7875', '#ffecb3', '#ffcc00', '#f56a00', '#ff9800', '#ff4500'],
  },
  {
    name: 'Code Files',
    files: [
      { type: 'html', size: 2 },
      { type: 'php', size: 4 },
      { type: 'js', size: 5 },
      { type: 'jsx', size: 3 },
      { type: 'css', size: 2 },
      { type: 'py', size: 6 },
      { type: 'c', size: 1 },
      { type: 'cpp', size: 2 },
      { type: 'java', size: 3 },
      { type: 'cs', size: 4 },
    ],
    color: ['#1890ff', '#40a9ff', '#69c0ff', '#b3d8ff', '#5c6bc0', '#7986cb', '#3f51b5', '#303f9f', '#1976d2', '#1565c0'],
  },
  {
    name: 'Image Files',
    files: [
      { type: 'png', size: 15 },
      { type: 'jpg', size: 20 },
      { type: 'jpeg', size: 18 },
      { type: 'gif', size: 5 },
      { type: 'svg', size: 3 },
    ],
    color: ['#00bcd4', '#009688', '#00796b', '#4caf50', '#2e7d32'],
  },
  {
    name: 'Media Files',
    files: [
      { type: 'mp3', size: 30 },
      { type: 'mp4', size: 50 },
      { type: 'webm', size: 40 },
    ],
    color: ['#ffa500', '#ff5722', '#d32f2f'],
  },
];

const FileUsageStats = () => {
  const dispatch = useDispatch();

  const { loading, stats, userId } = useSelector(
    (state) => ({
      loading: state.filefolders.userUsageStatsLoading,
      stats: state.filefolders.userUsageStats,
      userId: state.auth.userId,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (userId) {
      dispatch(getUserUsageStats(userId)); // 调用 Redux action 获取用户使用统计数据
    }
  }, [dispatch, userId]);

  if (loading || !stats) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin tip="Loading" size="large">
          Loading...
        </Spin>
      </div>
    );
  }

  console.log(stats)

  const totalStorage = 100; // Total storage in MB
  // const totalUsedSize = categories.reduce((sum, category) => {
  //   return sum + category.files.reduce((sum, file) => sum + file.size, 0);
  // }, 0);
  const totalUsedSize = (stats.totalUsage / 1024 / 1024).toFixed(2)
  const remainingStorage = totalStorage - totalUsedSize;

  // Convert bytes to a more readable format
  const formatSize = (sizeInBytes) => {
    if (sizeInBytes === 0) return '0 ';
    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    let unitIndex = 0;
    let size = sizeInBytes;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${size.toFixed(2)} ${units[unitIndex]}`;
  };

  // Generate ECharts options for each category
  // const getOption = (category) => {
  //   const data = category.files.map((file, idx) => ({
  //     value: file.size,
  //     name: file.type,
  //     itemStyle: { color: category.color[idx] },
  //   }));

  //   return {
  //     tooltip: {
  //       trigger: 'item',
  //       formatter: '{b}: {c}MB ({d}%)',
  //     },
  //     legend: {
  //       orient: 'vertical',
  //       left: 'left',
  //       textStyle: {
  //         fontSize: 12,
  //         color: '#000',
  //       },
  //       data: category.files.map((file) => file.type),
  //     },
  //     series: [
  //       {
  //         type: 'pie',
  //         radius: ['40%', '60%'],
  //         avoidLabelOverlap: false,
  //         label: {
  //           show: false,
  //         },
  //         labelLine: {
  //           show: false,
  //         },
  //         data,
  //       },
  //     ],
  //   };
  // };
  const getOption = (category) => {
    // Filter out files with size 0
    const validFiles = category.files.filter(file => file.size > 0);

    // If all files are size 0, show "No Data"
    if (validFiles.length === 0) {
      return {
        tooltip: {
          trigger: 'item',
          formatter: 'No Data',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          textStyle: {
            fontSize: 12,
            color: '#000',
          },
          data: ['No Data'],
        },
        series: [
          {
            type: 'pie',
            radius: ['40%', '60%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            data: [],
          },
        ],
      };
    }

    // Map files to chart data, converting size to a readable format
    const data = validFiles.map((file, idx) => ({
      value: file.size,
      name: file.type,
      itemStyle: { color: category.color[idx] },
      // Display size in a human-readable format
      tooltip: {
        trigger: 'item',
        formatter: `${file.type}: ${formatSize(file.size)} (${(file.size / category.files.reduce((acc, file) => acc + file.size, 0) * 100).toFixed(2)}%)`,
      },
    }));

    return {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        textStyle: {
          fontSize: 12,
          color: '#000',
        },
        data: validFiles.map((file) => file.type),
      },
      series: [
        {
          type: 'pie',
          radius: ['40%', '60%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
          },
          labelLine: {
            show: false,
          },
          data,
        },
      ],
    };
  };

  return (
    <>
      {/* Total Usage Progress */}
      <h3 style={{ textAlign: 'center' }}>Total Storage Usage</h3>
      <Row justify="center" align="middle" style={{ marginBottom: '20px' }}>
        <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Progress
            type="circle"
            percent={Math.round((totalUsedSize / totalStorage) * 100)}
            format={(percent) => `${percent}%`}
            size={'default'}
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
          />
          <div style={{ marginTop: '10px', fontSize: '16px', lineHeight: '1.5', textAlign: 'center' }}>
            <strong>Used:</strong> {totalUsedSize}MB / <strong>Total:</strong> {totalStorage}MB
            <br />
            <span style={{ color: '#8c8c8c' }}>
              <strong>Remaining:</strong> {remainingStorage}MB
            </span>
          </div>
        </Col>
      </Row>


      {/* Four category charts */}
      <Row gutter={[16, 16]}>
        {stats.categories.map((category, index) => (
          <Col span={12} key={index}>
            <Card>
              <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ marginRight: '-10px', fontSize: '18px', lineHeight: '1' }}>
                    {icons[index]}
                  </span>
                  <h4 style={{ marginBottom: 32, lineHeight: '1', display: 'inline-block' }}>{category.name}</h4>
                </div>
                <ReactECharts option={getOption(category)} style={{ height: '200px', width: '100%' }} />
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default FileUsageStats;
