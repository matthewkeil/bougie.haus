import React, { Component } from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core/styles';


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

const heroStyles = theme => {
    console.log(theme);

    return ({
        card: {
            paddingLeft: '8rem',
            paddingRight: '8rem',
            paddingTop: '8rem',
            paddingBottom: '6rem',
        },
        content: {
            textAlign: 'center',
            margin: 0,
            padding: 0,
            color: theme.palette.primary.dark
        },
        date: {
            fontSize: '1rem',
            padding: 0,
            marginTop: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: '4rem',
            color: 'inherit',
        },
        name: {
            fontWeight: 900,
            color: 'inherit'
        },
        slug: {
            color: 'inherit',
        }
    });
};

const Hero = withStyles(heroStyles)(({hero, classes}) => {

    function stringify(digit) {
        if (digit < 10) {
            return '0' + digit;
        }
        return `${digit}`;
    }

    function getToday(date) {
        const today = date instanceof Date ? date : new Date();
        const d = today.getDate();
        const m = today.getMonth() + 1;
        const y = today.getFullYear();
    
        return `${stringify(m)} / ${stringify(d)} / ${y}`;
    }

    return (<Card className={classes.card}>
        <CardActionArea>
            <CardContent className={classes.content}>
                <Typography className={classes.date}>{getToday(hero.date)}</Typography>
                <Typography variant="h2" className={classes.name}>
                    <Link to="" style={{textDecoration: 'none'}}>{hero.name}</Link>
                </Typography>
                <Typography variant="h4" className={classes.slug}>{hero.slug}</Typography>
            </CardContent>
            {!!hero.image 
                ? <CardMedia>
                    <Link to="">
                        <img src={hero.image.url} alt={hero.image.title} />
                    </Link>
                </CardMedia>
                : null}
        </CardActionArea>
        <CardActions>
            <Button>Full Recipe</Button>
        </CardActions>
    </Card>);
});

class Recipes extends Component {

    _recipes = [{
        featured: true,
        shortid: 'eD8Ds204',
        name: 'Masala Chai',
        slug: 'spiced milk tea from india',
        description: 'Masala chai is a delicately balanced tea that highlights the subtle complexities of Indian cuisine.  This creamy brew is perfumed with spicy cinnamon, floral cardamom and fragrant clove and anise that unite in your mouth in an explosion of flavor',
        picture: 'url',
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
                <section className="posts">
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