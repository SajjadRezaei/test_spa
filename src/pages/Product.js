import React, { Component } from 'react';
import axios from "axios";

class Product extends Component {
    constructor(props){
        super(props);
        this.state={
            product:{id:0}
        };
    }
    componentDidMount(){
        const { params } = this.props.match;

        axios.get(`http://roocket.org/api/products/${params.id}`)
            .then(response=>{

                if(response.data.status==='success'){
                    const {data}=response.data;
                    this.setState({
                        product:data
                    });
                }
            })
            .catch(error=>{
                console.log(error);
            });
    }
    render() {
        return (
            <div>
                <h2>عنوان محصول : {this.state.product.title}</h2>
                <p>{this.state.product.body}</p>
            </div>
        );
    }
}

export default Product;
