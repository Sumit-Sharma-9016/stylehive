import React from 'react'
import { useParams } from 'react-router-dom'

function CategoryCollection() {

    const {category} = useParams();

    return (
        <div>CategoryCollection of {category}</div>
    )
}

export default CategoryCollection