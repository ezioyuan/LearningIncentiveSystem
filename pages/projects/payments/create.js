import React from 'react';
import { Grid, Button, Typography, TextField, Paper, CircularProgress } from '@material-ui/core';
import web3 from '../../../libs/web3';
import { Router } from '../../../routes';
import Project from '../../../libs/project';
import withRoot from '../../../libs/withRoot';
import Layout from '../../../components/Layout';

// https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
// import while asking accounts must await ethereum.enable();
class PaymentCreate extends React.Component {
  static async getInitialProps({ query }) {
    const contract = Project(query.address);

    const summary = await contract.methods.getSummary().call();
    const description = summary[0];
    const percent = summary[6];
    const balance = summary[7];
    const owner = summary[10];

    return { project: { address: query.address, description, owner, balance, percent } };
  }

  constructor(props) {
    super(props);

    this.state = {
      description: '',
      amount: 0,
      receiver: 0,
      percent: 0,
      errmsg: '',
      loading: false,
    };

    this.onSubmit = this.createPayment.bind(this);
  }

  getInputHandler(key) {
    return e => {
      console.log(e.target.value);
      this.setState({ [key]: e.target.value });
    };
  }

  async createPayment() {
    const { description, amount, receiver, percent } = this.state;
    console.log(this.state);

    // 字段合规检查
    if (!description) {
      return this.setState({ errmsg: '请求激励理由不能为空' });
    }
    if (amount <= 0) {
      return this.setState({ errmsg: '支出金额必须大于0' });
    }
    if (!web3.utils.isAddress(receiver)) {
      return this.setState({ errmsg: '收款人账户地址不正确' });
    }
    if (percent < 0) {
      return this.setState({ errmsg: '目标完成度都必须大于0' });
    }
    if (percent > 100) {
      return this.setState({ errmsg: '目标完成度不能超过100' });
    }

    const amountInWei = web3.utils.toWei(amount, 'ether');
    try {
      this.setState({ loading: true, errmsg: '' });

      await ethereum.enable();
      // 获取账户
      const accounts = await web3.eth.getAccounts();
      const sender = accounts[0];

      // 检查账户
      if (sender !== this.props.project.owner) {
        return window.alert('只有目标建立者能创建激励支出请求');
      }

      // 创建项目
      const contract = Project(this.props.project.address);
      const result = await contract.methods
        .createPayment(description, amountInWei, receiver, percent)
        .send({ from: sender, gas: '5000000' });

      this.setState({ errmsg: '激励支出创建成功' });
      console.log(result);

      setTimeout(() => {
        Router.pushRoute(`/projects/${this.props.project.address}`);
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
        <Typography variant="title" color="inherit" style={{ marginTop: '15px' }}>
          创建激励支出请求：{this.props.project.description}
        </Typography>
        <Paper style={{ width: '60%', padding: '15px', marginTop: '15px' }}>
          <form noValidate autoComplete="off" style={{ marginBottom: '15px' }}>
            <TextField
              fullWidth
              required
              id="description"
              label="支出理由"
              value={this.state.description}
              onChange={this.getInputHandler('description')}
              margin="normal"
            />
            <TextField
              fullWidth
              required
              id="percent"
              label="目标完成度更新"
              value={this.state.percent}
              onChange={this.getInputHandler('percent')}
              margin="normal"
              InputProps={{
                endAdornment: `%`,
              }}
            />
            <TextField
              fullWidth
              required
              id="amount"
              label="支出金额"
              value={this.state.amount}
              onChange={this.getInputHandler('amount')}
              margin="normal"
              InputProps={{
                endAdornment: `剩余激励 ${web3.utils.fromWei(this.props.project.balance.toString(), 'ether')} ETH`,
              }}
            />
            <TextField
              fullWidth
              required
              id="receiver"
              label="收款方"
              value={this.state.maxInvest}
              onChange={this.getInputHandler('receiver')}
              margin="normal"
            />
          </form>
          <Button variant="raised" size="large" color="primary" onClick={this.onSubmit}>
            {this.state.loading ? <CircularProgress color="secondary" size={24} /> : '保存'}
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

export default withRoot(PaymentCreate);
