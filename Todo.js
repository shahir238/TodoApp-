import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button,Card,Table,Form,FormControl,Row,Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash,faUserEdit } from '@fortawesome/free-solid-svg-icons'


export default class Todo extends React.Component{
    constructor(props){
        super(props)
        this.state={
            item:"",
            
            description: "",
            id: "",
            todoItems:[]
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        
        // this.addData= this.addData.bind(this);
        
        this.delete= this.delete.bind(this);
        this.setUpdate= this.setUpdate.bind(this);
    }
        onChangeHandler(event){
            this.setState({
                [event.target.name]: event.target.value
            })
            
        }
        time() {
            var tempDate = new Date();
            var date = tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();
            const currDate = date;
            return currDate
          }
        
        // tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+
        // addData(){
        //     var inputVal = this.state.item;
        //     var itemInstance= this.state.todoItems;
        //     itemInstance.push(inputVal);
        //     this.setState({
        //         todoItems:itemInstance,
        //         item:''
        //     })
        // }
        
        delete(event){
            event.stopPropagation()
            var id = event.target.id;
            var itemInstance= this.state.todoItems;
            itemInstance.splice(id,1);
            this.setState({
                todoItems:itemInstance
                
            })
        }
        setUpdate(id){

   const selectedTodo = this.state.todoItems.filter(item => item.id === id)[0];
   this.setState({
       item: selectedTodo.item,
       description: selectedTodo.description,
       id:selectedTodo.id
   })
        }

        

        handleSubmit = (event) => {
            event.preventDefault()
            this.setState({
                todoItems: this.state.id.length === 0 ? [...this.state.todoItems, {
                    item: this.state.item,
                    description: this.state.description,
                    date: this.time(),
                    id: Math.floor(Math.random() * 100 / 10),
                   

                    

                }] : this.state.todoItems.map(e=> {
                    if(e.id===this.state.id){
                        return {...e, item:this.state.item,description:this.state.description}
                    }
                    return e
                })
                ,item:"",
            id:"",
            description: "",
            })
        }

      

    render() {
 
  
        
        return(
            <Card bg="light" border="secondary" text="#637561" style={{ width: '35%' }}  className="cd">

            <div className="header"><h1><Card.Title>Task Management App</Card.Title></h1></div>
            
           
            
            <div className="footer" >
<form onSubmit={this.handleSubmit}> 
<div className="input">
    <Form>
        <Row>
            <Col>
<FormControl  type="text" value={this.state.item} name="item" onChange={this.onChangeHandler} className="field" placeholder="Enter task" /></Col>
 <Col> <FormControl  type="text" value={this.state.description} name="description" onChange={this.onChangeHandler} className="field" placeholder="Enter Discription" /></Col>
 
               <Col> <Button type="submit" variant="success" style={{marginLeft:"-40px",marginBottom:"10px" }}>submit</Button></Col></Row></Form></div>
                <Table  responsive="sm" striped bordered hover size="sm">
           <thead >     <tr>
       <th className="task" >Task</th>
       <th className="desc" >Discription</th>
       <th className="time" >Time</th>
       <th className="action" >Action</th>
       </tr></thead>
    
        
           
       {this.state.todoItems.map((e, i)=> 
 <tbody > 
<tr> 

<td><span>{e.item}</span></td>
<td><span>{e.description}</span></td>
<td><span>{e.date}</span></td>
<td><span style={{paddingRight: "10px"}} onClick={this.delete} id={i} className="delete" ><FontAwesomeIcon  icon={faTrash}></FontAwesomeIcon></span><span style={{paddingLeft:"10px"}} onClick={() => this.setUpdate(e.id)} key={i}><FontAwesomeIcon  icon={faUserEdit}></FontAwesomeIcon></span></td>
 
</tr>
</tbody>
)} 
             
    </Table>
                </form>
            </div>
            
            </Card>
        )
    }
    
}


