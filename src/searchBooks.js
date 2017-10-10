import React, {Component} from "react"
import { Link } from "react-router-dom"

class SearchBooks extends Component {

  // Define values for selecting shelves and searching

  state = {
    selectValue : "",
    query: "",
    allTerms : [
      "Android", "Art", "Artificial Intelligence", "Astronomy", "Austen", "Baseball", "Basketball", "Bhagat", "Biography", "Brief", "Business", "Camus", "Cervantes", "Christie", "Classics", "Comics", "Cook", "Cricket", "Cycling", "Desai", "Design", "Development", "Digital Marketing", "Drama", "Drawing", "Dumas", "Education", "Everything", "Fantasy", "Film", "Finance", "First", "Fitness", "Football", "Future", "Games", "Gandhi", "History", "History", "Homer", "Horror", "Hugo", "Ibsen", "Journey", "Kafka", "King", "Lahiri", "Larsson", "Learn", "Literary Fiction", "Make", "Manage", "Marquez", "Money", "Mystery", "Negotiate", "Painting", "Philosophy", "Photography", "Poetry", "Production", "Program Javascript", "Programming", "React", "Redux", "River", "Robotics", "Rowling", "Satire", "Science Fiction", "Shakespeare", "Singh", "Swimming", "Tale", "Thrun", "Time", "Tolstoy", "Travel", "Ultimate", "Virtual Reality", "Web Development", "iOS"
    ]
  }

  // Handle when the user presses enter

  handleSearch = (e) => {
    const str = e.target.value
    const lastDigit = str.substr(-1)

    if (lastDigit !== 'Enter'){
      this.setState({
        query: str
      })
    }

    const { query, allTerms } = this.state

    const arg = allTerms.find((element) => {
      return element.includes(query)
    })

    arg && this.props.search(arg) 
    
  }

  // Set selectValue to the shelf

  shelfChange = (e) => {
    this.setState({
      "selectValue" : e.target.value, 
    })
  }

  inShelf = (book) => {
    const { books } = this.props

    let ret = books.find((element) => {
      return element.id === book.id
    })

    ret = ret ? ret.shelf : 'none'

    return ret
  }

  render(){
    return(
      <div className="search-books">

        {/* Make the search bar */}

        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input onChange={this.handleSearch} type="text" placeholder="Search by title or author" value={this.state.query} />
          </div>
        </div>

        <div className="search-books-results">
          <ol className="books-grid">
            {/* Iterate through the search result displaying each book */}
            {this.props.searchResult ? this.props.searchResult.map(book =>
              <div className="book" key={book.id}>
                <div className="book-top">
                  <img className="book-cover" src={book.imageLinks.smallThumbnail} alt={book.title}/>
                  <div className="book-shelf-changer">
                    {/* Select to change shelf */}
                    <select id="shelfSelection" onChange={this.shelfChange} defaultValue={this.inShelf(book)} onBlur={() => {this.props.setShelf(book,this.state.selectValue)}}>
                      <option value="none" disabled>Move To...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want To Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors ? book.authors.join(', '): ''}</div>
              </div>
            ) :
            <div>
            No Search Results
            </div>
           }
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks