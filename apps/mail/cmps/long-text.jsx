export class LongText extends React.Component {
    state = {
      
      isFullTextShown: false,
      text: '',
    }
    componentDidMount() {
      this.getDesc()
    }
    getDesc() {
      const txt = this.props.mailText
      if (txt.length < 27) {
        // this.description = desc
        this.setState({ text: txt, isFullTextShown: true })
      } else {
        // this.description = `${desc.substring(0,101)}...`
        this.setState({ text: `${txt.substring(0, 28)}...`, isFullTextShown: false })
      }
    }
  
  
    onToggleFullText = () => {
      const { isFullTextShown } = this.state
      const txt = this.props.mailText
      if (isFullTextShown) {
        this.setState({ text: `${desc.substring(0, 28)}...`, isFullTextShown: false })
      } else {
        this.setState({ text: desc, isFullTextShown: true })
      }
    }
    // }
    render() {
      // const { more, description } = this.state
      const { text, isFullTextShown } = this.state
      const desc = this.props.mailText
      console.log('desc:',desc)
      return (
        <section className="long-text">
          <p>{text}</p>
          {/* {more && <button onClick={this.onReadMore}>Read more...</button>} */}
          {desc.length > 100 && <button onClick={this.onToggleFullText}>{isFullTextShown ? '+' : '-'}</button>}
        </section>
      )
    }
  }