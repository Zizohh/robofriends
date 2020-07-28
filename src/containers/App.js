import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import Scroll from '../components/Scroll';
import SearchBox from '../components/SearchBox';
import ErrorBoundary from '../components/ErrorBoundary';
import '../containers/App.css';

import { setSearchField, requestRobots } from '../actions'

const mapStateToProps =  state => {
	return {
		searchField: state.searchRobots.searchField,
		robots: state.requestRobots.robots,
		isPending: state.requestRobots.isPending,
		error: state.requestRobots.error 
	}
}

// Dispatch here is seen as what triggers the action. 
const mapDispatchToProps = (dispatch) => {
	return { 
		onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
		onRequestRobots: () => dispatch(requestRobots())
	}
}

/* STATE simply means the description of your app. In this case the 
The STATE that describe our application is the {robots} which is dynamic.
*/

/*PROPS are simply things that comes out of  STATE.
(A parent feeds STATE into a child component and as soon the child component
recieves the STATE, its a property).
*/

class App extends Component{
	// constructor(){
	// 	super()
	// 	this.state = {
	// 		robots: []
	// 		// searchfield: '',
	// 	}
	// }

	componentDidMount() {
		this.props.onRequestRobots();
		// console.log(this.props.store.getState());
		// fetch('https://jsonplaceholder.typicode.com/users')
		// .then(response=> {return response.json();})
		// .then(users =>this.setState({ robots: users }));
	}

	// onSearchChange = (event) =>{
	// 	this.setState({ searchfield: event.target.value });
	// }
	render() {
		// const { robots } = this.state
		const { searchField, onSearchChange, robots, isPending } = this.props;
			const filteredRobots =robots.filter(robot =>{
					return robot.name.toLowerCase().includes(searchField.toLowerCase());
			})
				return isPending ?
					 <h1>Loading</h1>:
					(
						<div className='tc'>
							<h1 className='f1'>Robofriends</h1>
							<SearchBox searchChange={onSearchChange}/>
							<Scroll>
								<ErrorBoundary>
									<CardList robots={filteredRobots}/>
								</ErrorBoundary>
							</Scroll>
						</div>
			   		);	
		}
	}
 
export default connect(mapStateToProps, mapDispatchToProps)(App); /* coonect() here is >> Higher order function is a fuction that returns another function */