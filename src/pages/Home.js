import React, { Component } from 'react';
import axios from "axios";
import Product from "../components/Product";
import InfiniteScroll from 'react-infinite-scroller';


class Home extends Component {

    constructor(props){
        super(props);
        this.state={
            articles:[],
            nextPage:1,
            hasMore:true
        }
    }
    handleLoadMore(){
        axios.get(`http://roocket.org/api/products?page=${this.state.nextPage}`)
            .then(response=>{
                if(response.data.status==="success"){
                    const {current_page,last_page,data}=response.data.data;
                    this.setState(prevState=>({
                        articles:[...prevState.articles,...data],
                        hasMore:current_page!==last_page,
                        nextPage:current_page+1
                    }));
                }
            })
            .catch(error=>{
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <div className="jumbotron rtl">
                    <h1>وبسایت تست</h1>
                    <p>لورم ایپسوم یا طرح‌نما (به انگلیسی: Lorem ipsum) به متنی آزمایشی و بی‌معنی در صنعت چاپ،
                        صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای
                        پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر
                        گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد. معمولا طراحان گرافیک برای صفحه‌آرایی،
                        نخست از متن‌های آزمایشی و بی‌معنی استفاده می‌کنند تا صرفا به مشتری یا صاحب کار خود نشان دهند که
                        صفحه طراحی یا صفحه بندی شده بعد از اینکه متن در آن قرار گیرد چگونه به نظر می‌رسد و قلم‌ها و
                        اندازه‌بندی‌ها چگونه در نظر گرفته شده‌است. از آنجایی که طراحان عموما نویسنده متن نیستند و وظیفه
                        رعایت حق تکثیر متون را ندارند و در همان حال کار آنها به نوعی وابسته به متن می‌باشد آنها با
                        استفاده از محتویات ساختگی، صفحه گرافیکی خود را صفحه‌آرایی می‌کنند تا مرحله طراحی و صفحه‌بندی را
                        به پایان برند.</p>
                </div>


                <InfiniteScroll className="row rtl"
                    pageStart={0}
                    loadMore={this.handleLoadMore.bind(this)}
                    hasMore={this.state.hasMore}
                    loader={<div className="loader" key={0}>Loading ...</div>}>
                    {

                        this.state.articles.map((product, index) =><Product product={product} key={index}/>)

                    }


                </InfiniteScroll>

            </div>
        );
    }
}

export default Home;
