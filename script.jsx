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

  addHandler(event){
    const {word, list} = this.state;
    this.setState({word: " ", list: list.concat(word)});
    console.log(list);
  }

  render() {
      // render the list with a map() here

      console.log("rendering");
      return (
        <div className="list">
          <input onChange={this.inputHandler} value={this.state.word} />
          <AddItem addButton={this.addHandler} />
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

ReactDOM.render(
    <List/>,
    document.getElementById('root')
);

