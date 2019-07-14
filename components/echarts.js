import React, { Component } from 'react';

// 引入 ECharts 主模块(这里路径引入错误参考上文文档描述)
import echarts from 'echarts/lib/echarts';

// 引入柱状图（这里放你需要使用的echarts类型 很重要）
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';

// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import { withStyles } from '@material-ui/core';

const styles = {
    container: {
        float: 'left',
        width: 400,
        height: 400
    }
}
class EchartsTest extends Component {
    // 基于准备好的dom，初始化echarts实例
    Echarts1() {
        var myChart = echarts.init(document.getElementById('echarts1'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: '目标统计',
                left: 'center',
                top: 20
            },
            dataset: {
                source: [
                    ['score', '小时', 'product'],
                    [89.3, 3078.26, '编程'],
                    [57.1, 1003.46, '写作'],
                    [74.4, 58.55, '音乐'],
                    [50.1, 324.34, '健身'],
                ]
            },
            grid: { containLabel: true },
            xAxis: { name: '小时' },
            yAxis: { type: 'category' },
            visualMap: {
                orient: 'horizontal',
                left: 'center',
                min: 10,
                max: 100,
                text: ['High Score', 'Low Score'],
                // Map the score column to color
                dimension: 0,
                inRange: {
                    color: ['#D7DA8B', '#E15457']
                }
            },
            series: [{
                type: 'bar',
                position: 'right',
                encode: {
                    // Map the "amount" column to X axis.
                    x: '小时',
                    // Map the "product" column to Y axis
                    y: 'product'
                }
            }]
        });
    }
    Echarts2() {
        var myChart = echarts.init(document.getElementById('echarts2'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: '目标每日完成情况',
                left: 'center',
                top: 20
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['编程', '写作', '音乐', '健身']
            },
            tooltip: {
                show: true
            },
            dataset: {
                source: [
                    ['product', '编程', '写作', '音乐', '健身'],
                    ['周一', 0.08, 0.2, 1.06, 0.96],
                    ['周二', 0.74, 0.89, 1.03, 1.08],
                    ['周三', 0.1, 0.2, 0.9, 1.0],
                    ['周四', 0.58, 1.25, 2.89, 1.03],
                    ['周五', 0.88, 0.5, 0.89, 0.7]
                ]
            },
            xAxis: { type: 'category' },
            yAxis: { },
            // Declare several bar series, each will be mapped
            // to a column of dataset.source by default.
            series: [
                { type: 'bar' },
                { type: 'bar' },
                { type: 'bar' },
                { type: 'bar' },
            ]
        })
    }
    Echarts3() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echarts3'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: '一天时间花费',
                left: 'center',
                top: 20
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c}h ({d}%)"
            },
            legend: {
                data: ['编程', '音乐', '吃饭', '上厕所', '（无项目)', '健身', '洗澡', '写作', '洗漱', '睡眠和其它']
            },
            series: [{
                    name: '',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },

                    data: [
                        { name: '编程', value: 5.9 },
                        { name: '音乐', value: 3.01 },
                        { name: '吃饭', value: 1.53 },
                        { name: '上厕所', value: 1.39 },
                        { name: '（无项目）', value: 1.22 },
                        { name: '健身', value: 1.03 },
                        { name: '洗澡', value: 0.56 },
                        { name: '写作', value: 0.45 },
                        { name: '洗漱', value: 0.23 },
                        { name: '睡眠和其它', value: 8.68 }
                    ]
                }]
        })
    }

    componentDidMount() {
        this.Echarts1();
        this.Echarts2();
        this.Echarts3();
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <div id="echarts1" style={{ width: 750, height: 400 }} className={classes.container}></div>

                <div id="echarts2" style={{ width: 700, height: 400 }} className={classes.container}></div>

                <div id="echarts3" style={{ width: 750, height: 400 }} className={classes.container}></div>
            </div>
        );
    }
}

export default withStyles(styles)(EchartsTest);
