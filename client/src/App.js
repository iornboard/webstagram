import React, {Component, components} from 'react';
import './App.css';
import Customer from './components/Customer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import CustomerAdd from './components/CustomerAdd';
import Appbar from './components/Appbar';



// 스타일

const styles = theme => ({
  root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX : 'auto'
  },
  table: {
    minWidth: 1080
  },
  progress : {
    margin : theme.spacing.unit * 2
  }
 
});


// https://placeimg.com/64/64/any >> 아무 이미지나 가져와서 쓸 수 있음
// 리엑트에는 key 값이 필요함, 그래서 아무 키가 될 수 있는 것을 사용할 것
// callApi 랑 마운트 부분은 공부가 좀 더 필요할 듯

// API의 로딩 순서( 컴포넌트의 라이프 사이클)

//1) constructor()
//2) componentWillMount()
//3) render()
//4) componentDidMount() 

// props 나 state 의 변경이 있을경우) shouldComponentUpdate()

class App extends Component {

  //state 설정

  state = {
    customer : "",
    completed : 0
  }

  // 페이지 기본설정과 로딩

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);    // 0.02초마다 progress()가 실행됨
    this.callApi()
      .then(res => this.setState({customer : res}))
      .catch(err => console.log(err));
  }

  progress = () =>{
    const { completed } = this.state;
    this.setState({ completed : completed >= 100 ? 0 : completed +1 }); // progress >>  100을 넘어가면 0으로 초기화 / 이하이면 1씩 증가(0.02 초 마다)

  }

  // 클라이언트 <- 서버  (데이터를 받는 곳)

  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  // 페이지 폼

  render() {
    const { classes } =  this.props;

    return (
      <div className = {classes.root}>
        <Appbar/>
        <CustomerAdd/>
        <Paper>
          <Table className = {classes.table}>
            <TableHead>
              <TableRow>
                <TableCell> 번호 </TableCell>
                <TableCell> 사진 </TableCell>
                <TableCell> 이름  </TableCell>
                <TableCell> 생년월일  </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              
              {
                this.state.customer ? this.state.customer.map(c => {
                  return(
                    <Customer
                      key = {c.id} 
                      id = {c.id}
                      image= {c.image}
                      name= {c.name}
                      birthday= {c.birthday}
                    />
                  )
                })  
              : 
              <TableRow>
                <TableCell colSpan= '6' align = 'center'>
                  <CircularProgress className = {classes.progress} variant="determinate" value={this.state.completed} />
                </TableCell>
              </TableRow>
              }
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(App);
