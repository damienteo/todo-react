class List extends React.Component {
  constructor(){
    super()
    this.inputHandler = this.inputHandler.bind( this );
    this.addHandler = this.addHandler.bind( this );
  }

  state = {
    list : [],
    word : ""
  }

  inputHandler(event){
    this.setState({word: event.target.value});
    console.log("change", event.target.value);
  }

  // a button click handler that takes what is in the input, removes it from the input and pushes it into the list.
  addHandler(event){
    const {word, list} = this.state;
    // Create a length validation on the input. (Ex., must be more than 1 character and less than 200 characters)
    if (word.length >10 && word.length <200) {
      this.setState({word: " ", list: list.concat(word)});
      console.log(list);
    }
  }

  render() {
      console.log("rendering");
      return (
        <div className="list">
          <input onChange={this.inputHandler} value={this.state.word} />
          <AddItem addButton={this.addHandler} />
          <DisplayList list={this.state.list} />
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

  render() {

    let ListElements = this.props.list.map ( (item, index) => {
            return <li key={index}>{item}</li>
          });

    return(
      <ol>
        { ListElements }
      </ol>
    )
  }
}

ReactDOM.render(
    <List/>,
    document.getElementById('root')
);

