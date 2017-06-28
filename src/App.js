import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

/*class App extends Component {
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
}*/

function filterList(list, search) {
    var realList = [];
    list.forEach((item)=>{
        if(!search){
            realList.push(item);
        }else if(item.name.indexOf(search.name)>=0){
            realList.push(item);
        }
    });
    return realList;
}

function pagination(list,index,per,handle) {
    var rows = [];
    list.forEach((item,index_item)=>{
        if(index_item >= (index-1)*per && index_item<index*per){
            rows.push(<ResultItem item={item} index={index_item} key={item.name} onHandleItemDelete={handle}></ResultItem>);
        }
    });
    return rows;
}

class Search extends Component{
    constructor(props){
        super(props);
    }

    handleSearchName = (e)=>{
        this.props.onHandleSearchName(e.target.value);
    };

    render(){
        return (
            <div className="Search">
                <label>姓名</label>&nbsp;&nbsp;
                <input type="text"
                       value={this.props.search.name}
                       onChange={this.handleSearchName}/>&nbsp;&nbsp;&nbsp;&nbsp;
                {/*<label>年龄</label>&nbsp;&nbsp;*/}
                {/*<input type="number" value={this.props.search.age}/>&nbsp;&nbsp;&nbsp;&nbsp;*/}
                {/*<label>年级</label>&nbsp;&nbsp;*/}
                {/*<select name="grade" id="grade" value={this.props.search.grade}>*/}
                    {/*<option value="null">请选择</option>*/}
                    {/*<option value="1">Grade 1</option>*/}
                    {/*<option value="2">Grade 2</option>*/}
                    {/*<option value="3">Grade 3</option>*/}
                    {/*<option value="4">Grade 4</option>*/}
                {/*</select>&nbsp;&nbsp;&nbsp;&nbsp;*/}
            </div>
        );
    }
}


class Pagination extends Component{
    constructor(props){
        super(props);
    }

    pagination_pre = ()=>{
        this.props.onHandlePagePre();
    };

    pagination_next = ()=>{
        this.props.onHandlePageNext();
    };

    render(){
        const total = filterList(this.props.data,this.props.search).length;
        return (
            <div className="pagination">
                共有<span>{total}</span>项,
                每页显示<span>{this.props.pagination.per}</span>项,
                当前显示第<span>{total===0?0:this.props.pagination.index}</span>/<span>{Math.ceil(total/this.props.pagination.per)}</span>页
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={this.pagination_pre} disabled={this.props.pagination.index<=1}>上一页</button>
                <button onClick={this.pagination_next} disabled={this.props.pagination.index>=Math.ceil(total/this.props.pagination.per)}>下一页</button>
            </div>
        );
    }
}

class ResultCap extends Component{
    constructor(props){
        super(props);
    }

    handleSort = (item,arr)=>{
        this.props.onHandleSort(item,arr);
    };

    render(){
        return (
            <div className="ResultCap">
                <span>序号</span>
                <span><input type="checkbox"/>全选</span>
                <span>姓名</span>
                <span>年龄
                    <i onClick={()=>{this.handleSort('age','up')}} style={{cursor: "pointer"}}>&nbsp;↑&nbsp;</i>&nbsp;&nbsp;
                    <i onClick={()=>{this.handleSort('age','down')}} style={{cursor: "pointer"}}>&nbsp;↓&nbsp;</i>
                </span>
                <span>年级
                    <i onClick={()=>{this.handleSort('grade','up')}} style={{cursor: "pointer"}}>&nbsp;↑&nbsp;</i>&nbsp;&nbsp;
                    <i onClick={()=>{this.handleSort('grade','down')}} style={{cursor: "pointer"}}>&nbsp;↓&nbsp;</i>
                </span>
                <span>操作</span>
            </div>
        );
    }
}

class ResultItem extends Component{
    constructor(props){
        super(props);
    }

    handleItemDelete = (item)=>{
        this.props.onHandleItemDelete(item);
    };

    render(){
        return (
            <div className="ResultItem">
                <span>{this.props.index +1}</span>
                <span><input type="checkbox"/></span>
                <span>{this.props.item.name}</span>
                <span>{this.props.item.age}</span>
                <span>{this.props.item.grade}</span>
                <span>
                    <button onClick={()=>{this.handleItemDelete(this.props.item)}}>delete</button>&nbsp;&nbsp;
                    <button onClick={()=>{this.handleItemDelete(this.props.item)}}>edit</button>&nbsp;&nbsp;
                </span>
            </div>
        );
    }
}

class ResultContent extends Component{
    constructor(props){
        super(props);
    }

    handleSort = (item,arr)=>{
        this.props.onHandleSort(item,arr);
    };

    handleItemDelete = (item)=>{
        this.props.onHandleItemDetele(item);
    };

    render(){
        const list = filterList(this.props.data,this.props.search);
        // const rows = pagination(this.props.data,this.props.pagination.index,this.props.pagination.per);
        const rows = pagination(list,this.props.pagination.index,this.props.pagination.per,this.handleItemDelete);
        if(rows.length==0){
            return (
                <div className="ResultContent">
                    <ResultCap onHandleSort={this.handleSort}></ResultCap>
                    <div className="ResultList">
                        无数据
                    </div>
                </div>
            );
        }else{
            return (
                <div className="ResultContent">
                    <ResultCap onHandleSort={this.handleSort}></ResultCap>
                    <div className="ResultList">
                        {rows}
                    </div>
                </div>
            );
        }

        /*return (
            <div className="ResultContent">
                <ResultCap onHandleSort={this.handleSort}></ResultCap>
                <div className="ResultList">
                    {rows}
                </div>
            </div>

        );*/
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
                //total: 0,
                //total: this.props.students.length,
                per: 3
            },
            realList: this.props.students
        };
    }

    handlePagePre = ()=>{
        this.setState((prevState) =>{
            pagination:{
                index: prevState.pagination.index--
            }
        });
    };

    handlePageNext = ()=>{
        this.setState((prevState)=>{
            pagination:{
                index: prevState.pagination.index++
            }
        })
    };

    handleSearchName = (name)=>{
        this.setState({
            search:{
                name: name
            }
        })
    };

    handleSort = (item,arr)=>{
        // console.log(item+'//'+arr);
        // if(item==='age'){
        //     this.setState((prevState)=>{
        //         realList:prevState.realList.sort((a, b) => {
        //             return arr==='up'?(a['age']-b['age']):(b['age']-a['age']);
        //         })
        //     })
        // }

        this.setState((prevState)=>{
            realList:prevState.realList.sort((a, b) => {
                return arr==='up'?(a[item]-b[item]):(b[item]-a[item]);
            })
        })
    };

    handleItemDelete = (item)=>{
        this.setState((preState)=>{
            preState.realList.splice(preState.realList.indexOf(item),1);
            realList: preState.realList;
            if(preState.realList.length%preState.pagination.per == 0){
                pagination:{
                    index: preState.pagination.index==0?preState.pagination.index:preState.pagination.index--
                }
            }
        })
    };

    render(){

        return(
            <div>
                <Search
                    search={this.state.search}
                    onHandleSearchName={this.handleSearchName}
                />
                <ResultContent
                    // data={this.props.students}
                    data = {this.state.realList}
                    search={this.state.search}
                    pagination={this.state.pagination}
                    onHandleSort={this.handleSort}
                    onHandleItemDetele={this.handleItemDelete}/>
                <Pagination
                    //data={this.props.students}
                    data = {this.state.realList}
                    search={this.state.search}
                    pagination={this.state.pagination}
                    onHandlePagePre={this.handlePagePre}
                    onHandlePageNext={this.handlePageNext}/>
            </div>
        );
    }
}

//export default App;
export default List;
