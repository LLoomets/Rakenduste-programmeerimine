import React from "react"

// const Name = (title) => {
//     console.log({props});

//     //const title = props.title;
//     //const {title} = props;

//     return <h1>{title}</h1>;
// };

const Name = ({title = "World"}) => {
    return <h1>Hello {title}</h1>;

}

export default Name;