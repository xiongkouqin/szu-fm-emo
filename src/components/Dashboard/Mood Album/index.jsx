import React from "react";
import { Card, Row, Col, Progress } from 'antd';
import ReactECharts from 'echarts-for-react';

// 假数据
const fakeStats = {
  totalImage: 61,
  categories: [
    {
      name: 'Emotional Overview',
      files: [
        { type: 'Happiness😀', size: 10 },
        { type: 'Surprise😯', size: 5 },
        { type: 'Anger😕', size: 3 },
        { type: 'Sadness😒', size: 7 },
        { type: 'Disgust🤢', size: 12 },
        { type: 'Fear😨', size: 8 },
        { type: 'Neutral😐', size: 6 },
      ],
      color: ['#ff4d4f', '#ff7875', '#ffecb3', '#ffcc00', '#f56a00', '#ff9800', '#ff4500'],
    },
  ],
};

// 获取图表配置的函数
const getOption = (category) => ({
  series: [
    {
      name: 'Category Usage',
      type: 'pie',
      radius: '55%',
      center: ['70%', '50%'],
      data: category.files.map((file, index) => ({
        value: file.size,
        name: file.type,
        itemStyle: {
          color: category.color[index]
        }
      })),
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false
      },
      emphasis: {
        label: {
          show: true
        }
      }
    }
  ],
  tooltip: {
    trigger: 'item'
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    show: false
  },
  yAxis: {
    show: false
  }
});

const EmotionalOverview = () => (
    <>
      <Row gutter={[16, 16]}>
        {fakeStats.categories.map((category, index) => (
            <Col span={12} key={index}>
              <Card>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <h4 style={{ marginBottom: '0', fontSize: '18px', lineHeight: '1', display: 'inline-block' }}>{category.name}</h4>
                  </div>
                  <ReactECharts option={getOption(category)} style={{ height: '200px', width: '100%' }} />
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    <span>Total Images: {fakeStats.totalImage}</span>
                  </div>
                </div>
              </Card>
            </Col>
        ))}
      </Row>
    </>
);

export default EmotionalOverview;
