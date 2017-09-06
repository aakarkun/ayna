import React from 'react';

export class Footer extends React.Component {
    render() {
        var date = new Date();
        var year = date.getFullYear();
        return(
            <div>
                <p>Copyright &copy; Ayna {year}</p> 
            </div>
        );
    }
}