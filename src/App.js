import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      textTop: 'Random',
      textBottom: 'Meme',
      size: 24,
      randomImg: '',
      allImgs: [],
    };
  }

  handleClick = () => {
    const { allImgs } = this.state;
    let randomNumber = Math.floor(
      Math.random() * allImgs.length
    );

    this.setState({ randomImg: allImgs[randomNumber].url });
  };

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then(images => images.json())
      .then(response => {
        const { memes } = response.data;
        this.setState({ 
          allImgs: memes, 
        }, () => {
          this.handleClick();
        });
      });
  }

  handleChange(event, type) {
    const { value } = event.target;

    this.setState({
      [type]: value,
    })
  }

  render() {
    const { randomImg, size, textTop, textBottom } = this.state;

    return(
      <>
        <div className="form">
          <input className="inputText" type="text" value={textTop} placeholder="Enter the text here" onChange={e => this.handleChange(e, 'textTop')} />
          <input className="inputText" type="text" value={textBottom} placeholder="Enter the text here" onChange={e => this.handleChange(e, 'textBottom')} />
          <input className="inputText" type="number" value={size} onChange={e => this.handleChange(e, 'size')} />
          <button className="generate" onClick={this.handleClick}>Generate!</button>
        </div>
        <div className="result" style={ { fontSize: `${ size }px` } }>
          <figure className="image-wrapper"> 
            <img class="randomImage" src={randomImg} alt="backgroundImage"/>
          </figure>
          <h1 className="text text_top"> {textTop} </h1>
          <h1 className="text text_bottom"> {textBottom}</h1>
        </div>
      </>
    );
  }
}

export default App;


