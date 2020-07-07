import React, { Component } from 'react';
import CardList from '../components/CardList';
import Scroll from '../components/Scroll';
import SearchBox from '../components/SearchBox';
import ErrorBoundary from '../components/ErrorBoundary';
import '../containers/App.css';


/* STATE simply means the description of your app. In this case the 
The STATE that describe our application is the {robots} which is dynamic.
*/

/*PROPS are simply things that comes out of  STATE.
(A parent feeds STATE into a child component and as soon the child component
recieves the STATE, its a property).
*/

class App extends Component{
	constructor(){
		super()
		this.state = {
			robots: [],
			searchfield: '',
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response=> {return response.json();})
		.then(users =>this.setState({ robots: users }));
	}

	onSearchChange = (event) =>{
		this.setState({ searchfield: event.target.value });
	}
	render() {
		const { robots, searchfield } = this.state;
			const filteredRobots =robots.filter(robot =>{
					return robot.name.toLowerCase().includes(searchfield.toLowerCase());
			})
				return !robots.length?
					 <h1>Loading</h1>:
					(
						<div className='tc'>
							<h1 className='f1'>Robofriends</h1>
							<SearchBox searchChange={this.onSearchChange}/>
							<Scroll>
								<ErrorBoundary>
									<CardList robots={filteredRobots}/>
								</ErrorBoundary>
							</Scroll>
						</div>
			   		);	
		}
	}
 
export default App;