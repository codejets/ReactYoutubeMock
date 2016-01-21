import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

import VideoList from './components/video-list'
import SearchBar from './components/search-bar'
import VideoDetail from './components/video-details'

const API_KEY = 'AIzaSyCIz3WQPoHDX3WVrTxreV1kGKE5D3RY4I8';


class App extends Component {
	constructor(props) {
		super(props);

		this.state = { 
			videos: [],
			selectedVideo:null
		};

		this.videoSearch('react');
		
	}

	videoSearch(term) {
		YTSearch({key: API_KEY, term: term},(videos) => {
			this.setState({ 
				videos:videos,
				selectedVideo: videos[0]
			});
		});
	}

	render() {
		const videoSearch = _.debounce((term) => { this.videoSearch(term) },500);

		return (
			<div>
				<SearchBar onSearchTermChange={videoSearch} />
				<VideoDetail video={this.state.selectedVideo} />
				<VideoList 
				onVideoSelect={selectedVideo => this.setState({selectedVideo})}
				videos={this.state.videos} />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.querySelector('.container'));