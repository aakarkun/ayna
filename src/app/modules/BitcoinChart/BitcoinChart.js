import React from 'react';
import Trend from 'react-trend';

export class BitcoinChart extends React.Component {
    render() {
        return(
            <div>
                <Trend data={[0, 10, 5, 22, 3.6, 11]} />
            </div>
        );
    }
}
