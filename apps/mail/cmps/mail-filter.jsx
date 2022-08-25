export class MailFilter extends React.Component {

    state = {
        filterBy: {
            search: '',
            isRead: undefined,
            isStarred: undefined
        },
    }

    handleChange = ({ target }) => {
        const field = target.name
        var value = target.type === 'number' ? +target.value : target.value

        if (field === 'isRead' ) {
            console.log('Value is:', value)
            if (value !== '') {
                value = (value === 'read')
            } else {
                value = undefined
            }
        }
        
        if (field === 'isStarred' ) {
            console.log('Value is:', value)
            if (value !== '') {
                value = (value === 'starred')
            } else {
                value = undefined
            }
        }

        this.setState((prevState) => ({
            filterBy: {
                ...prevState.filterBy,
                [field]: value
            }
        }), () => {
            this.props.onSetFilter(this.state.filterBy)
        })
    }

    onFilter = (ev) => {
        ev.preventDefault()

    }

    render() {
        const {handleChange} = this
        const {filterBy} = this.state

        return <section className="mail-filter">

            <label htmlFor="by-search">in mail :</label>
            <input
                name="search" id="by-search"
                type="search"
                onChange={this.handleChange}
                value={filterBy.search}
            />

            <div>
                <select name="isRead" onChange={handleChange}>
                    <option value="">All</option>
                    <option value="read">Read</option>
                    <option value="unread">Unread</option>
                </select>
            </div>

            {/* <div>
                <select name="isStarred" onChange={handleChange}>
                    <option value="">none</option>
                    <option value="Starred">Starred</option>
                    <option value="Unstarred">Unstarred</option>
                </select>
            </div> */}

        
        </section>
    }
}