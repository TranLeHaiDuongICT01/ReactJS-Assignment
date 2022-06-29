import React from 'react';
import { Link } from 'react-router-dom';
import Loading from './LoadingComponent';
import {
    Card, CardImg, CardImgOverlay,
    CardTitle, Breadcrumb, BreadcrumbItem
} from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';

function RenderMenuItem({ dish }) {
    return (
        <Card>
            <Link to={`/menu/${dish.id}`}>
                <CardImg width="100%" src={`${baseUrl}/${dish.image}`} alt={dish.name} />
                <CardImgOverlay>
                    <CardTitle className='dish-title'>{dish.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    );
}

const Menu = (props) => {

    const menu = props.dishes.dishes.map((dish) => {
        return (
            <div className="col-12 col-md-5 m-1" key={dish.id}>
                <RenderMenuItem dish={dish} />
            </div>
        );
    });
    if (props.dishes.isLoading) return (
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
      if (props.dishes.errMess) return (
        <div className="container">
          <div className="row">
            <h4 className="text-danger">{props.dishes.errMess}</h4>
          </div>
        </div>
      );

    return (
        <div className='container'>
            <div className='row'>
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Menu</BreadcrumbItem>
                </Breadcrumb>
                <div className='col-12'>
                    <h3>Menu</h3>
                </div>
            </div>
            <div className="row">
                {menu}
            </div>
        </div>
    );
}

export default Menu;