export class MailFilter extends React.Component {

    state = {
        filterBy: {
            search: '',
            // minPrice: '',
            // maxPrice: ''
        },
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState((prevState) => ({
            filterBy: {
                ...prevState.filterBy,
                [field]: value
            }
        }), () => {
            this.props.onSetFilter(this.state.filterBy)
        })
        // this.props.onSetFilter(this.state.filterBy)
    }

    onFilter = (ev) => {
        ev.preventDefault()
        
    }

    render() {
        const { search} = this.state.filterBy
        return <section className="mail-filter">
            {/* <form onSubmit={this.onFilter}> */}
                <label htmlFor="by-search">in mail :</label>
                <input
                    name="search" id="by-search"
                    type="search"
                    onChange={this.handleChange}
                    value={search}
                    />

                {/* <input
                    type="text"
                    placeholder="by language.."
                    id="by-language"
                    name="language"
                    value={language}
                    onChange={this.handleChange}
                /> */}


                {/* <label htmlFor="by-min-price">Min Price :</label>
                <input
                    type="number"
                    placeholder="by min Price.."
                    id="by-min-Price"
                    name="minPrice"
                    value={minPrice}
                    onChange={this.handleChange}
                />

                <label htmlFor="by-max-Price">Max Price :</label>
                <input
                    type="number"
                    placeholder="by max Price.."
                    id="by-max-Price"
                    name="maxPrice"
                    value={maxPrice}
                    onChange={this.handleChange}
                /> */}

                

            {/* </form> */}
        </section>
    }
}