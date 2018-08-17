import React from 'react'

class Line extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const text = this.props.line.text
        const name = this.props.line.name

        return (
            <div className="line-container">
                <div className="line-text">{text}</div>
                <div className="line-character-name">{name}</div>
            </div>
        )
    }
}

export default Line;