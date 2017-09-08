import React from 'react';
import $ from 'jquery';

export class WikiSearch extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var { wikiSearch } = this.props;
        var status = wikiSearch.status;
        var title = wikiSearch.title;
        var snippet = wikiSearch.snippet;
        
        var snip = [];
        for(var i=0; i < snippet.length; i++) {
            var s = '';
            s = $('<p>' + snippet[i] + '</p>').text();
            snip.push(s);
        }
        console.log(snip);

        return(
            <div>
                {(status === 'close' ? 
                '' :
                <div>
                    <h4>{title[0]}</h4>
                    <h6 style={{fontWeight: "300", fontSize: "18px"}}>{snip[0]} .. .</h6>
                </div>
                )}
                
            </div>
        )
    }
}