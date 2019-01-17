import React, { Component } from 'react';
// import styled from 'styled-components';
import {Link} from 'react-router-dom';

import Hero from './Hero';


const RecipeListItem = ({recipe}) => {

    return (
        <article>
            <div className="major">
                <span className="date">{recipe.date || "03/24/1982"}</span>
                <h2>
                    <Link to={"/recipes/" + recipe.shortid}>{recipe.name}</Link>
                </h2>
            </div>
        </article>
    );
};

class Recipes extends Component {

    _recipes = [{
        featured: true,
        shortid: 'eD8Ds204',
        name: 'Masala Chai',
        slug: 'spiced milk tea from india',
        description: 'Masala chai is a delicately balanced tea that highlights the subtle complexities of Indian cuisine.  This creamy brew is perfumed with spicy cinnamon, floral cardamom and fragrant clove and anise that unite in your mouth in an explosion of flavor',
        image: {
            src: 'https://cdn.bougie.haus/images/recipes/eD8Ds204/masala_chai.jpg',
            title: 'masala chai spices',
        },
        video: {},
        versions: [{
            ingredients: [],
            process: []
        }]
    },{
        shortid: 'eD8Dsew4',
        name: 'Masala Chai',
        slug: 'spiced milk tea from india',
        description: 'Masala chai is a delicately balanced tea that highlights the subtle complexities of Indian cuisine.  This creamy brew is perfumed with spicy cinnamon, floral cardamom and fragrant clove and anise that unite in your mouth in an explosion of flavor',
        picture: 'url',
        versions: [{
            ingredients: [],
            process: []
        }]
    },{
        shortid: 'eDds8s20',
        name: 'Masal Chai',
        slug: 'spiced milk tea from india',
        description: 'Masala chai is a delicately balanced tea that highlights the subtle complexities of Indian cuisine.  This creamy brew is perfumed with spicy cinnamon, floral cardamom and fragrant clove and anise that unite in your mouth in an explosion of flavor',
        picture: 'url',
        versions: [{
            ingredients: [],
            process: []
        }]
    }];

    render() {
    
        const featuredRecipes = this._recipes.filter(recipe => recipe.featured ? recipe : null);

        const hero = featuredRecipes[Math.floor(Math.random() * featuredRecipes.length)];

        return (
            <div className="main">
                { !!hero ? <Hero hero={hero} /> : null }
                <section className="recipes">
                    {this._recipes.map((recipe, key) => {
                        if (recipe.shortid !== hero.shortid) {
                                return <RecipeListItem key={key} recipe={recipe}/>
                            }
                            return null;
                        })
                    } 
                </section>
            </div>
        );
    }
}


export default Recipes;