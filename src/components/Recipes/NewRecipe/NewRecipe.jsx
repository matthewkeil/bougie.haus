import React, {Component} from 'react';
import { connect } from "react-redux";

import {ACT} from '../../../store';



export default connect()(class NewRecipe extends Component {
    click = () => {
        this.props.dispatch(ACT.recipes.createRecipe({recipe: {
            name: "Masala Chai",
            img: {
              url:
                "https://motherwouldknow.com/wp-content/uploads/2017/04/2017-04-24-chai-madeleines-spices-and-tea-w-1.jpg",
              alt: "masala chai"
            },
            slug: "spiced milk tea from india",
            description:
              "Masala chai is a delicately balanced tea that highlights the subtle complexities of Indian cuisine.  This creamy brew is perfumed with spicy cinnamon, floral cardamom and fragrant clove and anise that unite in your mouth in an explosion of flavor",
            // ingredients: {
            //   0: {
            //     qty: {
            //       value: 3,
            //       label: "g"
            //     },
            //     name: {
            //       simple: "ginger"
            //     },
            //     type: {
            //       stored: "dried",
            //       part: "whole"
            //     }
            //   },
            //   1: {
            //     id: 1,
            //     qty: {
            //       value: 1.5,
            //       label: "g"
            //     },
            //     name: {
            //       simple: "cinnamon"
            //     },
            //     type: {
            //       variety: "curled",
            //       stored: "dried",
            //       part: "whole"
            //     }
            //   },
            //   2: {
            //     id: 2,
            //     qty: {
            //       value: 0.65,
            //       label: "g"
            //     },
            //     name: {
            //       simple: "cinnamon"
            //     },
            //     type: {
            //       variety: "flat",
            //       stored: "dried",
            //       part: "whole"
            //     }
            //   },
            //   3: {
            //     id: 3,
            //     qty: {
            //       value: 0.6,
            //       label: "g"
            //     },
            //     name: {
            //       simple: "pepper"
            //     },
            //     type: {
            //       variety: "black",
            //       stored: "dried",
            //       part: "whole"
            //     }
            //   },
            //   4: {
            //     id: 4,
            //     qty: {
            //       value: 0.15,
            //       label: "g"
            //     },
            //     name: {
            //       simple: "pepper"
            //     },
            //     type: {
            //       variety: "tailed",
            //       stored: "dried",
            //       part: "whole"
            //     }
            //   },
            //   5: {
            //     id: 5,
            //     qty: {
            //       value: 0.15,
            //       label: "g"
            //     },
            //     name: {
            //       simple: "clove"
            //     },
            //     type: {
            //       stored: "dried",
            //       part: "whole"
            //     }
            //   },
            //   6: {
            //     id: 6,
            //     qty: {
            //       value: 0.15,
            //       label: "g"
            //     },
            //     name: {
            //       simple: "javentri",
            //       aliases: ["mace"]
            //     },
            //     type: {
            //       stored: "dried",
            //       part: "whole"
            //     }
            //   },
            //   7: {
            //     id: 7,
            //     qty: {
            //       value: 0.3,
            //       label: "g"
            //     },
            //     name: {
            //       simple: "star anise"
            //     },
            //     type: {
            //       stored: "dried",
            //       part: "whole"
            //     }
            //   },
            //   8: {
            //     id: 8,
            //     qty: {
            //       value: 1.25,
            //       label: "g"
            //     },
            //     name: {
            //       simple: "cardamom"
            //     },
            //     type: {
            //       variety: "green",
            //       stored: "dried",
            //       part: "whole"
            //     }
            //   },
            //   9: {
            //     id: 9,
            //     qty: {
            //       value: 0.5,
            //       label: "g"
            //     },
            //     name: {
            //       simple: "cardamom",
            //     },
            //     type: {
            //       variety: "black",
            //       stored: "dried",
            //       part: "whole"
            //     }
            //   },
            //   10: {
            //     id: 10,
            //     qty: {
            //       value: 9.2,
            //       label: "g",
            //       aliases: [
            //         {
            //           value: 4,
            //           label: "tea bags"
            //         }
            //       ]
            //     },
            //     name: {
            //       simple: "tea"
            //     },
            //     type: {
            //       brand: "Tetly",
            //       type: "black",
            //       stored: "dried",
            //       part: "whole"
            //     }
            //   },
            //   11: {
            //     id: 11,
            //     name: {
            //       simple: "sugar"
            //     },
            //     qty: {
            //       value: 40,
            //       label: "g"
            //     }
            //   },
            //   12: {
            //     id: 12,
            //     name: {
            //       simple: "water"
            //     },
            //     qty: {
            //       value: 350,
            //       label: "g"
            //     }
            //   },
            //   13: {
            //     id: 13,
            //     qty: {
            //       value: 350,
            //       label: "g"
            //     },
            //     name: {
            //       simple: "milk"
            //     },
            //     type: {
            //       variety: "whole",
            //       stored: "fresh"
            //     }
            //   }
            // },
            // steps: [
            //   {
            //     process: "grind",
            //     ingredients: [0, 1, 2, 3, 4, 5, 6, 7],
            //     until: `it is a fine powder`
            //   },
            //   {
            //     process: "grind",
            //     ingredients: [8, 9]
            //   },
            //   {
            //     process: "heat",
            //     ingredients: [12, 13],
            //     until: "it comes to a boil"
            //   }
            // ]
          }
        }))
    }

    render() {
        return (<h1 onClick={this.click}>sending</h1>)
    }
    
})