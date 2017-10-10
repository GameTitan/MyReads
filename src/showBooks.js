import React, {Component} from "react"
import { Link } from "react-router-dom"

class ShowBooks extends Component {

	/* 
	Define values to give the shelf parameter in the changeShelf
	and to make the shelves
	*/

	state = {
		"selectValue" : "",
		"shelves" : [
			{"name": "Currently Reading",
			"id" : "currentlyReading"},
			{"name": "Want To Read",
			"id" : "wantToRead"},
			{"name":"Read",
			"id":"read"}
		]
	}

	// To update the state when a shelf is selected

	shelfChange = (e) => {
		this.props.changeShelf({'id' : e.target.options[e.target.selectedIndex].getAttribute('data')},e.target.value)
	}


	render(){
		
		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>
					MyReads
					</h1>
				</div> 
				<div className="list-books-content">
					{/* Iterate through the shelves displaying the data */}
					{this.state.shelves.map(shelf =>
						<div className="bookshelf" key={shelf.id}>
							<h2 className="bookshelf-title">{shelf.name}</h2>
								<div className="bookshelf-books">
									<ol className="books-grid">
										{/* Iterate throught the books */}
										{this.props.books.filter(book => book.shelf === shelf.id).map(book =>
											<div className="book" key={book.id}>
												<div className="book-top">
													<img className="book-cover" src={book.imageLinks.smallThumbnail} alt={book.title}/>
													{/* Create the select to change shelves */}
													<div className="book-shelf-changer">
														{/* I use onChange to run the function*/}
														<select id="shelfSelection" defaultValue={(book.shelf) ? book.shelf : 'none'} onChange={this.shelfChange} >
															<option value='none' disabled>Move To...</option>
															<option value="currentlyReading" data={book.id}>Currently Reading</option>
															<option value="wantToRead" data={book.id}>Want To Read</option>
															<option value="read" data={book.id}>Read</option>
															<option value="none" data={book.id}>None</option>
														</select>
													</div>
												</div>
												{/* Display the remaining data */}
												<div className="book-title">{book.title}</div>
		                          				<div className="book-authors">{book.authors ? book.authors.join(', '): ''}</div>
											</div>
										)}
									</ol>
							</div>
						</div>
					)}
				</div>
				<div className="open-search">
	              <Link to="/search" >Search</Link>
	            </div>
			</div>
		)
	}
}

export default ShowBooks