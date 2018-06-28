import React, {Component} from 'react';
import {connect} from 'react-redux';

import Product from '../components/Product'
import * as actions from '../store/actions/index';

class ProdustList extends Component {
    render() {
        var products = this.props.products.map(product => {
            return (
                //    <Link to={'/posts'+post.id}>
                    <Product key={product.id}
                             name={product.name}
                             price={product.price}
                             image={product.image}
                             added={() => this.props.onAddToCart(product.name)}
                             removed={() => this.props.onRemoveFromCart(product.name)}/>
                //    </Link>
            )
        });
        return (
            <div className="product-list">
                {products}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        cart: state.cart
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAddToCart: (productName) => dispatch(actions.addProduct(productName)),
        onRemoveFromCart: (productName) => dispatch(actions.removeProduct(productName)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProdustList)