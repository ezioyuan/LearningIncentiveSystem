import React from 'react';
import { Grid, Button, Typography, Card, CardContent, CardActions, LinearProgress } from '@material-ui/core';
import web3 from '../libs/web3';
import { Link } from '../routes';
import Project from '../libs/project';
import ProjectList from '../libs/projectList';
import withRoot from '../libs/withRoot';
import Layout from '../components/Layout';
import InfoBlock from '../components/InfoBlock';

class Index extends React.Component {
  static async getInitialProps({ req }) {
    const addressList = await ProjectList.methods.getProjects().call();
    const summaryList = await Promise.all(
      addressList.map(address =>
        Project(address)
          .methods.getSummary()
          .call()
      )
    );
    console.log({ summaryList });
    const projects = addressList.map((address, i) => {
      const [description, minInvest, maxInvest, goal, startTime, endTime, percent, balance, investorCount, paymentCount, owner] = Object.values(
        summaryList[i]
      );

      return {
        address,
        description,
        minInvest,
        maxInvest,
        goal,
        startTime,
        endTime,
        percent,
        balance,
        investorCount,
        paymentCount,
        owner,
      };
    });

    console.log(projects);

    return { projects };
  }

  render() {
    const { projects } = this.props;

    return (
      <Layout>
        <Grid container spacing={16}>
          {projects.length === 0 && <p>还没有目标，快去创建吧</p>}
          {projects.length > 0 && projects.map(this.renderProject)}
        </Grid>
      </Layout>
    );
  }

  renderProject(project) {
    const progress = project.percent;

    return (
      <Grid item md={6} key={project.address}>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {project.description}
            </Typography>
            <LinearProgress style={{ margin: '10px 0' }} color="primary" variant="determinate" value={progress} />
            <Grid container spacing={16}>
              <InfoBlock title={`${web3.utils.fromWei(project.goal, 'ether')} ETH`} description="激励上限" />
              <InfoBlock title={`${web3.utils.fromWei(project.minInvest, 'ether')} ETH`} description="最小激励金额" />
              <InfoBlock title={`${web3.utils.fromWei(project.maxInvest, 'ether')} ETH`} description="最大激励金额" />
              <InfoBlock title={`${project.startTime}`} description="目标开始时间" />
              <InfoBlock title={`${project.endTime}`} description="目标终止时间" />
              <InfoBlock title={`${project.percent}%`} description="目标完成度" />
              <InfoBlock title={`${project.investorCount}人`} description="参投人数" />
              <InfoBlock title={`${web3.utils.fromWei(project.balance, 'ether')} ETH`} description="剩余激励金额" />
            </Grid>
          </CardContent>
          <CardActions>
            <Link route={`/projects/${project.address}`}>
              <Button size="small" color="primary">
                立刻激励
              </Button>
            </Link>
            <Link route={`/projects/${project.address}`}>
              <Button size="small" color="secondary">
                查看详情
              </Button>
            </Link>
          </CardActions>
        </Card>
      </Grid>
    );
  }
}

export default withRoot(Index);
