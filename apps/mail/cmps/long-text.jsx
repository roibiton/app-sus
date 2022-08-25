export class LongText extends React.Component {
  state = {
    
    isFullTextShown: false,
    description: '',
  }
  componentDidMount() {
    this.getDesc()
  }
  getDesc() {
    const desc = this.props.mailText
    if (desc.length < 50) {
      // this.description = desc
      this.setState({ description: desc, isFullTextShown: true })
    } else {
      // this.description = `${desc.substring(0,101)}...`
      this.setState({ description: `${desc.substring(0, 51)}...`, isFullTextShown: false })
    }
  }

  
  onToggleFullText = () => {
    const { isFullTextShown } = this.state
    const desc = this.props.mailText
    if (isFullTextShown) {
      this.setState({ description: `${desc.substring(0, 51)}...`, isFullTextShown: false })
    } else {
      this.setState({ description: desc, isFullTextShown: true })
    }
  }
  // }
  render() {
    // const { more, description } = this.state
    const { description, isFullTextShown } = this.state
    const desc = this.props.mailText
    const {val1,val2}=this.props
    console.log('desc:',desc)
    return (
      <section className="long-text">
        <p>{description}</p>
        {/* {more && <button onClick={this.onReadMore}>Read more...</button>} */}
        {desc.length > 50 && <button onClick={this.onToggleFullText}>{isFullTextShown ? val1 : val2}</button>}
      </section>
    )
  }
}