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

        if (field === 'isRead') {
            console.log('Value is:', value)
            if (value !== '') {
                value = (value === 'read')
            } else {
                value = undefined
            }
        }

        if (field === 'isStarred') {

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
        const { handleChange } = this
        const { filterBy } = this.state

        return <section className="mail-filter flex space-between">
            <div>
                <label htmlFor="by-search">in mail :</label>
                <input
                    name="search" id="by-search"
                    type="search"
                    onChange={this.handleChange}
                    value={filterBy.search}
                />
            </div>

            <div>
                <label htmlFor="by-read">Unread</label>
                <select id="by-read" name="isRead" onChange={handleChange}>
                    <option value="">All</option>
                    <option value="read">Read</option>
                    <option value="unread">Unread</option>
                </select>
            </div>

            <div>
                <label htmlFor="by-starred">Starred :</label>
                <select id="by-starred" name="isStarred" onChange={handleChange}>
                    <option value="">All</option>
                    <option value="starred">Starred</option>
                    <option value="unstarred">Unstarred</option>
                </select>
            </div>


        </section>
    }
}