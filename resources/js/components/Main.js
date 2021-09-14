import React from 'react';
import ReactDOM from 'react-dom';

export default function Main() {
    return (
        <div className="container">
            main
        </div>
    );
}

if (document.getElementById('main')) {
    ReactDOM.render(<Main />, document.getElementById('main'));
}
