import React from 'react';
import queryString from 'query-string';

const About = ({location, match}) => {
    // const query = queryString.parse(location.search);

    // const detail = query.detail === 'true';

    return (
        <div>
            <h1>About</h1>
            <div>뭔가를 채워나가 봅시다</div>
        </div>
    );
};

export default About;