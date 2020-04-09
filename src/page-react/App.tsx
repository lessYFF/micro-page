import * as React from 'react';

interface Props {
    name: string
}

class App extends React.Component<Props> {
    render() {
        const { name } = this.props;
        return <div>Parcel {name}</div>;
    }
}

export default App;