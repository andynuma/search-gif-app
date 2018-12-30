import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import { Search } from "./components/Search";

class App extends React.Component {
  constructor() {
    super();
    this.state = { gifUrlList: [] };
  }

  renderImageList(list) {
    const imageList = list.map(url => {
      return (
        <li>
          <img src={url} />
        </li>
      );
    });
    return <ul>{imageList}</ul>;
  }

  render() {
    console.log(this.state.gifUrlList);
    return (
      <div>
        <Search search={this.giphyApi} />
        {this.renderImageList(this.state.gifUrlList)}
      </div>
    );
  }

  giphyApi = target => {
    const search = target;
    const key = "b6giUqrGBEpNKW0pPGc2CMCCRQd28Cyv";
    const limit = 10;

    const url = `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=${key}&limit=${limit}`;
    axios.get(url).then(res => {
      const data = res.data.data;
      const imageUrlList = data.map(item => item.images.downsized.url);
      this.setState({ gifUrlList: imageUrlList });
    });
  };
}

ReactDOM.render(<App />, document.getElementById("root"));
