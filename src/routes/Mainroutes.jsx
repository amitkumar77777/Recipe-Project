import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Recipes from '../pages/Recipes'
import Create from '../pages/Create'
import RecipeDetails from '../pages/RecipeDetails'
import PageNotFound from '../pages/PageNotFound'
import Fav from '../pages/Fav'

const Mainroutes = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/recipes' element={<Recipes />} />
                <Route path='/recipes/details/:id' element={<RecipeDetails/>} />
                <Route path='/create' element={<Create />} />
            <Route path='*' element={<PageNotFound />} />
            <Route path='/fav' element={<Fav />} /> 
            </Routes>
        </>
    )
}

export default Mainroutes