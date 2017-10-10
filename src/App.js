import React from "react"
import * as BooksAPI from "./BooksAPI"
import "./App.css"
import SearchBooks from "./searchBooks"
import ShowBooks from "./showBooks"
import { Route } from "react-router-dom"

class App extends React.Component {

  state = {
    books:[],
    result:[]
  }

  // Get the books 

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  // Change a shelf of a book

  shelfChange = (book,shelf) => {
    BooksAPI.update(book,shelf).then((book) => {
      BooksAPI.getAll().then((books) => {
        this.setState({books})
      })
    })
  }

  // Get a search result

  search = (query) => {
    BooksAPI.search(query,20).then((result) => {
      this.setState({result})
    })
  }

  render() {
    return (
      <div>

        {/* Routes to render the components */}

          <Route exact path="/" render={() => (
            <ShowBooks books={this.state.books} changeShelf={this.shelfChange}/>
          )} />
          <Route exact path="/search" render={( {history} ) => (
            <SearchBooks search={this.search} searchResult={this.state.result} setShelf={this.shelfChange} books={this.state.books} />
          )} />
      </div>
    )
  }
}

export default App
