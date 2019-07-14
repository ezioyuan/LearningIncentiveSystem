import React from 'react';
import { Grid, Button, Typography, TextField, Paper, CircularProgress } from '@material-ui/core';
import web3 from '../../libs/web3';
import { Link } from '../../routes';
import ProjectList from '../../libs/projectList';
import withRoot from '../../libs/withRoot';
import Layout from '../../components/Layout';

class ProjectCreate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
      minInvest: 0,
      maxInvest: 0,
      goal: 0,
      startTime: 19210701,
      endTime: 19491001,
      percent: 0,
      errmsg: '',
      loading: false,
    };

    this.onSubmit = this.createProject.bind(this);
  }

  getInputHandler(key) {
    return e => {
      console.log(e.target.value);
      this.setState({ [key]: e.target.value });
    };
  }

  async createProject() {
    const { description, minInvest, maxInvest, goal, startTime, endTime, percent } = this.state;
    console.log(this.state);

    // 字段合规检查
    if (!description) {
      return this.setState({ errmsg: '目标名称不能为空' });
    }
    if (minInvest <= 0) {
      return this.setState({ errmsg: '目标最小激励金额必须大于0' });
    }
    if (maxInvest <= 0) {
      return this.setState({ errmsg: '目标最大激励金额必须大于0' });
    }
    if (maxInvest < minInvest) {
      return this.setState({ errmsg: '目标最小激励金额必须小于最大激励金额' });
    }
    if (goal <= 0) {
      return this.setState({ errmsg: '目标激励上限必须大于0' });
    }
    if (startTime >= endTime) {
      return this.setState({ errmsg: '结束时间必须迟于开始时间' });
    }
    if (percent < 0) {
      return this.setState({ errmsg: '目标完成度都必须大于0' });
    }
    if (percent >= 100) {
      return this.setState({ errmsg: '目标完成度必须小于100' });
    }

    const minInvestInWei = web3.utils.toWei(minInvest, 'ether');
    const maxInvestInWei = web3.utils.toWei(maxInvest, 'ether');
    const goalInWei = web3.utils.toWei(goal, 'ether');

    try {
      this.setState({ loading: true, errmsg: '' });

      await ethereum.enable();
      // 获取账户
      const accounts = await web3.eth.getAccounts();
      const owner = accounts[0];

      // 创建目标
      const result = await ProjectList.methods
        .createProject(description, minInvestInWei, maxInvestInWei, goalInWei, startTime, endTime, percent)
        .send({ from: owner, gas: '5000000' });

      this.setState({ errmsg: '目标创建成功' });
      console.log(result);

      setTimeout(() => {
        location.href = '/';
      }, 1000);
    } catch (err) {
      console.error(err);
      this.setState({ errmsg: err.message || err.toString });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <Layout>
        <Typography variant="title" color="inherit">
          创建目标
        </Typography>
        <Paper style={{ width: '60%', padding: '15px', marginTop: '15px' }}>
          <form noValidate autoComplete="off" style={{ marginBottom: '15px' }}>
            <TextField
              fullWidth
              required
              id="description"
              label="目标名称"
              value={this.state.description}
              onChange={this.getInputHandler('description')}
              margin="normal"
            />
            <TextField
              fullWidth
              required
              id="minInvest"
              label="最小激励金额"
              value={this.state.minInvest}
              onChange={this.getInputHandler('minInvest')}
              margin="normal"
              InputProps={{ endAdornment: 'ETH' }}
            />
            <TextField
              fullWidth
              required
              id="maxInvest"
              label="最大激励金额"
              value={this.state.maxInvest}
              onChange={this.getInputHandler('maxInvest')}
              margin="normal"
              InputProps={{ endAdornment: 'ETH' }}
            />
            <TextField
              fullWidth
              required
              id="goal"
              label="激励上限"
              value={this.state.goal}
              onChange={this.getInputHandler('goal')}
              margin="normal"
              InputProps={{ endAdornment: 'ETH' }}
            />
             <TextField
              fullWidth
              required
              id="startTime"
              label="目标开始时间"
              value={this.state.startTime}
              onChange={this.getInputHandler('startTime')}
              margin="normal"
            />
             <TextField
              fullWidth
              required
              id="endTime"
              label="目标结束时间"
              value={this.state.endTime}
              onChange={this.getInputHandler('endTime')}
              margin="normal"
            />
            <TextField
              fullWidth
              required
              id="percent"
              label="目标完成度"
              value={this.state.percent}
              onChange={this.getInputHandler('percent')}
              margin="normal"
              InputProps={{ endAdornment: '%' }}
            />
          </form>
          <Button variant="raised" size="large" color="primary" onClick={this.onSubmit}>
            {this.state.loading ? <CircularProgress color="secondary" size={24} /> : '创建目标'}
          </Button>
          {!!this.state.errmsg && (
            <Typography component="p" style={{ color: 'red' }}>
              {this.state.errmsg}
            </Typography>
          )}
        </Paper>
      </Layout>
    );
  }
}

export default withRoot(ProjectCreate);
