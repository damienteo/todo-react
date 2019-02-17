// import moment from 'moment';

class List extends React.Component {
  constructor(){
    super()
    this.inputHandler = this.inputHandler.bind( this );
    this.addHandler = this.addHandler.bind( this );
    this.deleteHandler = this.deleteHandler.bind( this );
    this.editHandler = this.editHandler.bind( this );
    this.setEditMode = this.setEditMode.bind( this );
    this.editInputHandler = this.editInputHandler.bind( this );
    this.doneHandler = this.doneHandler.bind( this );
  }

  state = {
    list : [],
    done: [],
    word : "",
    newWord : "",
    validation : "",
    editing : [],
  }

  inputHandler(event){
    console.log(this);
    this.setState({word: event.target.value});
  }

  // a button click handler that takes what is in the input, removes it from the input and pushes it into the list.
  addHandler(event){
    const {word, list} = this.state;
    // Create a length validation on the input. (Ex., must be more than 1 character and less than 200 characters)
    if (word.length >10 && word.length <200) {
      let todo = word + " - set at: " + moment().format('LLLL');
      this.setState({word: " ", validation:"", list: list.concat(todo)});
    } else {
      this.setState({validation: "Word length should be more than 10 characters."})
    }
  }

  // Write the code that takes things out of the list.
  deleteHandler(event){
    const {list} = this.state;
    let newList = [ ...list]
    let removed = newList.splice(event.target.value,1);
    this.setState({list: newList});
  }

  editInputHandler(event){
    this.setState({newWord: event.target.value});
  }

  // Write a todo list item component that edits it's content.
  editHandler(event){
    const {list, newWord} = this.state;
    let newList = [ ...list]
    let todo = newWord + " - updated at: " + moment().format('LLLL');
    newList[event.target.value] = todo;
    this.setState({list: newList, newWord: "", editing: []});
  }

  setEditMode(event){
    const {editing} = this.state;
    if (!editing.includes(event.target.value)) {
      if (editing[0]!=undefined) {
        // console.log("trying to splice",event.target.value);
        let newEditing = [ ...editing];
        newEditing.splice(0, 1, event.target.value);
        this.setState({editing: newEditing, newWord: ""});
      } else {
        this.setState({editing: editing.concat(event.target.value), newWord: ""});
      }
    };
  }

  // Create the ability to move todo items into a done list.
  doneHandler(event) {
    const {list, done} = this.state;
    let newList = [ ...list];
    let addToDone;
    addToDone = newList.splice(event.target.value, 1);
    this.setState({list: newList, done: done.concat(addToDone)});
  }

  render() {
    const {word, list, done, validation, editing} = this.state;
      console.log("rendering");
      return (
        <div className="list">
          <h1>{moment().format('LLLL')}</h1>
          <input onChange={this.inputHandler} value={word} />
          <AddItem addButton={this.addHandler} />
          <ShowValidation validation={validation} />
          <h1>NOT DONE!</h1>
          <DisplayList 
            list={list} 
            doneButton={this.doneHandler}
            deleteTask={this.deleteHandler}
            editTask={this.editHandler}
            setEditMode={this.setEditMode}
            editMode={editing}
            editInputHandler={this.editInputHandler}
          />
          <DisplayDone 
            done={done}
          />
        </div>
      );
  }
}


class AddItem extends React.Component {
  constructor(){
    super()
  }

  render() {
    return(
      <button 
        onClick={this.props.addButton}
      >
        add item
      </button>
    )
  }
}

// write the code that renders the list
class DisplayList extends React.Component {

  constructor(){
    super()
    this.switchEditMode = this.switchEditMode.bind(this);
    this.showEditInput = this.showEditInput.bind(this);
    this.showConfirmEdit = this.showConfirmEdit.bind(this);
  }

  switchEditMode = () => {
    console.log("switch")
  }

  showEditInput = (index) => {
    if (this.props.editMode.includes(index.index.toString())) {
      return "text";
    } else {
      return "hidden";
    }
  }

  showConfirmEdit = (index) => {

    const displayNone = {"display":"none"};
    const displayInline = {"display":"inline"};

    if (this.props.editMode.includes(index.index.toString())) {
      return displayInline;
    } else {
      return displayNone;
    }
  }

  render() {

    const {deleteTask, setEditMode, editInputHandler, editTask, doneButton, list} = this.props;

    let ListElements = list.map ( (item, index) => {
            return(
              <React.Fragment>
                <li key={index}>{item} </li>
                <button onClick={doneButton} value={index} > Set task as Done </button>
                <button onClick={deleteTask} value={index} > Remove this task </button>
                <button onClick={setEditMode} value={index} > Edit this task </button>
                <input type= {this.showEditInput({index})} onChange={editInputHandler}/>
                <button style={this.showConfirmEdit({index})} onClick={editTask} value={index}>Confirm Edit</button>
              </React.Fragment>
            ) 
          });
    return(
      <ol>
        { ListElements }
      </ol>
    )
  }
}

class DisplayDone extends React.Component {

  render() {

    let DoneElements = this.props.done.map ( (item, index) => {
            return(
              <React.Fragment>
                <li key={index}>{item}</li>
              </React.Fragment>
            ) 
          });
    return(
      <React.Fragment>
        <h1>DONE!</h1>
        <ol>
          { DoneElements }
        </ol>
      </React.Fragment>
    )
  }
}

class ShowValidation extends React.Component {

  render() {
    return(
      <p>
        { this.props.validation }
      </p>
    )
  }
}

ReactDOM.render(
    <List/>,
    document.getElementById('root')
);

