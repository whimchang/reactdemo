import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

function getList() {
    return {
        data: [
            {
                name: 'John1',
                age: 37,
                grade: 1
            },
            {
                name: 'John2',
                age: 19,
                grade: 2
            },
            {
                name: 'John3',
                age: 25,
                grade: 3
            },
            {
                name: 'John4',
                age: 11,
                grade: 4
            },
            {
                name: 'John5',
                age: 44,
                grade: 5
            },
            {
                name: 'John6',
                age: 27,
                grade: 6
            },
            {
                name: 'John7',
                age: 29,
                grade: 7
            },
            {
                name: 'John8',
                age: 41,
                grade: 4
            }
         ]
    }
}

function pagination(list,index,per) {
    var rows = [];
    list.map((item,index_item)=>{
        if(index_item >= (index-1)*per && index_item<index*per){
            rows.push(<ResultItem item={item} index={index_item} key={item.name}></ResultItem>);
        }
    });
    return rows;
}

class Search extends Component{
    render(){
        return (
            <div className="Search">
                <label>姓名</label>&nbsp;&nbsp;
                <input type="text" value={this.props.search.name}/>&nbsp;&nbsp;&nbsp;&nbsp;
                <label>年龄</label>&nbsp;&nbsp;
                <input type="number" value={this.props.search.age}/>&nbsp;&nbsp;&nbsp;&nbsp;
                <label>年级</label>&nbsp;&nbsp;
                <select name="grade" id="grade" value={this.props.search.grade}>
                    <option value="null">请选择</option>
                    <option value="1">Grade 1</option>
                    <option value="2">Grade 2</option>
                    <option value="3">Grade 3</option>
                    <option value="4">Grade 4</option>
                </select>&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
        );
    }
}

class Pagination extends Component{
    constructor(props){
        super(props);
        this.props.pagination.total = this.props.data.length;
    }

    pagination_pre(){
        console.log('page pre');
        this.props.pagination.index--;
    }

    pagination_next(){
        console.log('page next');
        this.props.pagination.index++;
        console.log(this.props.pagination);
    }

    render(){
        return (
            <div className="pagination">
                共有<span>{this.props.pagination.total}</span>项,
                当前显示第<span>{this.props.pagination.index}</span>/<span>{Math.ceil(this.props.pagination.total/this.props.pagination.per)}</span>页
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={()=>this.pagination_pre()} disabled={this.props.pagination.index==1}>上一页</button>
                <button onClick={()=>this.pagination_next()} disabled={this.props.pagination.index==Math.ceil(this.props.pagination.total/this.props.pagination.per)}>下一页</button>
            </div>
        );
    }
}

class ResultCap extends Component{
    render(){
        return (
            <div className="ResultCap">
                <span>序号</span>
                <span><input type="checkbox"/>全选</span>
                <span>item1</span>
                <span>item2</span>
                <span>item3</span>
                <span>操作</span>
            </div>
        );
    }
}

class ResultItem extends Component{
    render(){
        return (
            <div className="ResultItem">
                <span>{this.props.index +1}</span>
                <span><input type="checkbox"/></span>
                <span>{this.props.item.name}</span>
                <span>{this.props.item.age}</span>
                <span>{this.props.item.grade}</span>
                <span><button>delete</button></span>
            </div>
        );
    }
}

class ResultContent extends Component{
    constructor(props){
        super(props);
        console.log(this.props);
    }
    render(){
        var rows = [];
        // this.props.data.map((item,index)=>{
        //    rows.push(<ResultItem item={item} index={index} key={item.name}></ResultItem>);
        // });
        rows = pagination(this.props.data,this.props.pagination.index,this.props.pagination.per);
        return (
            <div className="ResultContent">
                <ResultCap></ResultCap>
                <div className="ResultList">
                    {rows}
                </div>
            </div>

        );
    }
}

class List extends Component{
    constructor(props){
        super(props);
        this.state = {
            search: {
                name: '',
                age: '',
                grade: ''
            },
            pagination: {
                index: 1,
                total: 0,
                //total: this.props.students.length,
                per: 5
            }
        };
    }
    render(){
        return(
            <div>
                <Search search={this.state.search}/>
                <ResultContent
                    data={this.props.students}
                    pagination={this.state.pagination}
                    search={this.state.search} />
                <Pagination
                    data={this.props.students}
                    pagination={this.state.pagination} />
            </div>
        );
    }
}

//export default App;
export default List;
