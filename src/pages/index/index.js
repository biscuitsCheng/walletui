import Taro, { Component } from '@tarojs/taro'
import { AtAvatar, AtDivider, AtTimeline, AtIcon } from "taro-ui"
import { View } from '@tarojs/components'

import PieChart from "../../components/PieChart";


import './index.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount() { }

  componentDidMount() { 

    const chartData = [
      {
        value: 100, name: '已花费100¥',
      },
      {
        value: 500, name: '剩余500¥'
      },
    ];

    const option = {
      series: [
        {
          name: '本月剩余',
          type: 'pie',
          center: ['50%', '50%'],
          radius: [0, '60%'],
          data: chartData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    this.pieChart.refresh(option);
  }
  refPieChart = (node) => this.pieChart = node

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <view>
        <View className='at-row title'>
          <View className='at-col at-col__offset-1'>
            <View>今日花费: 50¥</View>
            <View>今日剩余: 10¥</View>

          </View>
          <View className='at-col at-col-3 at-col__offset-2'><AtAvatar circle='true' openData={{ type: 'userAvatarUrl' }}></AtAvatar>
          </View>
        </View>
        <AtDivider content='¥我的小目标¥'>
        </AtDivider>
        <View className='at-row'>
          <View className='at-col at-col-3'>
             计划开销
          </View>
          <View className='at-col  at-col-6'>
            2019/8/26～2020/9/26 
          </View>
          <View className='at-col at-col__offset-1 at-col-2'>
            2000¥
          </View>
        </View>
        <View className='at-row'>
          <View className='at-col at-col-3'>
            定期存款
          </View>
          <View className='at-col  at-col-6'>
            2019/8/26～2020/12/26
          </View>
          <View className='at-col at-col__offset-1 at-col-2'>
            30000¥
          </View>
        </View>
        <AtDivider >

          <AtIcon value='star'></AtIcon>
        </AtDivider>
        <View className='at-row'>
          <View className='at-col  at-col-3'>
        <AtTimeline
          pending
          items={[
            { title: '早饭', content: ['8:00','12¥'], icon: 'check-circle' },
            { title: '午饭', content: ['11:59', '28¥'], icon: 'clock' },
            { title: '晚饭', content: ['18:50', '30¥'], icon: 'clock' }
          ]}
        >
            </AtTimeline>
          </View>
          <View className='at-col  at-col-8'>


            <PieChart ref={this.refPieChart} />
          </View>
        </View>
      </view>
    )
  }
}

